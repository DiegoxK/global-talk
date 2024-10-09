import { schedules } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";

export const scheduleRouter = createTRPCRouter({
  createSchedule: protectedProcedure
    .input(
      z.object({
        lectureId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      // TODO: Prevent submition if the lecture already has 5 scheduled students

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
