import { schedules } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { count, eq } from "drizzle-orm";
import { z } from "zod";

export const scheduleRouter = createTRPCRouter({
  getScheduledLectures: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    return ctx.db.query.schedules.findMany({
      with: {
        lecture: {
          with: {
            schedules: true,
            level: true,
            teacher: true,
          },
        },
      },
      where: eq(schedules.studentId, user.id),
    });
  }),
});
