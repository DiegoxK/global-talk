import { schedules } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { count, eq } from "drizzle-orm";
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
        lectureId: input.lectureId,
        studentId: user.id,
      });
    }),
});
