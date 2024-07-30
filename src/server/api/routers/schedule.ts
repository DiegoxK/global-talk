import { schedules } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { count, eq } from "drizzle-orm";
import { z } from "zod";

export const scheduleRouter = createTRPCRouter({
  scheduleNumber: protectedProcedure
    .input(
      z.object({
        lectureId: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const schedule = await ctx.db
        .select({ count: count() })
        .from(schedules)
        .where(eq(schedules.lectureId, input.lectureId));

      return schedule[0];
    }),
});
