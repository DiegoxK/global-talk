import { z } from "zod";
import { lectures } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { env } from "@/env";

const createLectureSchema = createInsertSchema(lectures, {
  teacherId: z.undefined(),
});

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

  editLecture: protectedProcedure
    .input(createLectureSchema)
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      if (user.role !== env.TEACHER_ROLE && user.role !== env.ADMIN_ROLE) {
        throw new Error("Only teachers can edit lectures");
      }

      if (!input.id) {
        throw new Error("Lecture id is required");
      }

      await ctx.db
        .update(lectures)
        .set({
          ...input,
          teacherId: user.id,
        })
        .where(eq(lectures.id, input.id));
    }),

  createLecture: protectedProcedure
    .input(createLectureSchema)
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      if (user.role !== env.TEACHER_ROLE && user.role !== env.ADMIN_ROLE) {
        throw new Error("Only teachers can create lectures");
      }

      await ctx.db.insert(lectures).values({
        ...input,
        teacherId: user.id,
      });
    }),
});
