import { lectureSessions, schedules } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/server/db";

export const scheduleRouter = createTRPCRouter({
  createSchedule: protectedProcedure
    .input(
      z.object({
        lectureId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      const schedule = await ctx.db.query.schedules.findFirst({
        where: eq(schedules.lectureSessionId, input.lectureId),
      });

      if (schedule) {
        throw new Error("Clase ya agendada");
      }

      const lectureScheduleNumber = await ctx.db
        .select({
          lectureSessionId: lectureSessions.id,
          schedulesCount: count(schedules.id).as("schedules_count"),
        })
        .from(lectureSessions)
        .leftJoin(schedules, eq(lectureSessions.id, schedules.lectureSessionId))
        .groupBy(lectureSessions.id)
        .where(eq(lectureSessions.id, input.lectureId));

      const scheduleCount = lectureScheduleNumber[0]?.schedulesCount ?? 0;

      if (scheduleCount >= 5) {
        throw new Error("Limite de 5 estudiantes por clase alcanzado");
      }

      await ctx.db.insert(schedules).values({
        lectureSessionId: input.lectureId,
        studentId: user.id,
      });
    }),

  removeSchedule: protectedProcedure
    .input(
      z.object({
        lectureId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      await ctx.db
        .delete(schedules)
        .where(
          and(
            eq(schedules.lectureSessionId, input.lectureId),
            eq(schedules.studentId, user.id),
          ),
        );
    }),
});
