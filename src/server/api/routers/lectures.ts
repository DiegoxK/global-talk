import { z } from "zod";
import { lectures } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

const createLectureSchema = createInsertSchema(lectures, {});

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
        where: eq(lectures.levelId, input.levelId),
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

  getMyLectures: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    const myLectures = await ctx.db.query.lectures.findMany({
      with: {
        schedules: true,
        level: {
          with: {
            course: true,
          },
        },
        teacher: true,
      },
      where: eq(lectures.teacherId, user.id),
    });

    return myLectures;
  }),

  createLecture: protectedProcedure
    .input(createLectureSchema)
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
    }),
});
