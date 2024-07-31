import { z } from "zod";
import { lectures, schedules } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq, ne } from "drizzle-orm";

export const lectureRouter = createTRPCRouter({
  getLectures: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;

      //TODO: ommit teacher email
      const levelLectures = await ctx.db.query.lectures.findMany({
        with: {
          schedules: true,
          level: true,
          teacher: true,
        },
        where: and(eq(lectures.levelId, input.levelId)),
      });

      const availableLectures = levelLectures.filter((lecture) => {
        if (lecture.schedules.length === 0) {
          return true;
        }
        return lecture.schedules.some((schedule) => {
          if (schedule.studentId === user.id) {
            return false;
          }
        });
      });

      return availableLectures;
    }),
});
