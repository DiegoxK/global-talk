import { z } from "zod";
import {
  courses,
  lectures,
  levels,
  schedules,
  users,
} from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, count, eq, isNull, ne, not, or, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { env } from "@/env";
import { db } from "@/server/db";

const createLectureSchema = createInsertSchema(lectures, {
  teacherId: z.undefined(),
});

// Obtain a table that gets the schedulesCount to each lecture
const sq = db
  .select({
    lectureId: lectures.id,
    schedulesCount: count(schedules.id).as("schedule_count"),
  })
  .from(lectures)
  .leftJoin(schedules, eq(lectures.id, schedules.lectureId))
  .groupBy(lectures.id)
  .as("sq");

const lectureCardSchema = {
  id: lectures.id,
  name: lectures.name,
  description: lectures.description,
  meetUrl: lectures.meet_url,
  off2classUrl: lectures.off2class_url,
  date: lectures.date,
  startTime: lectures.start_time,
  endTime: lectures.end_time,
  isFinished: lectures.finished,
  teacherName: sql<string>`concat(${users.name}, ' ', ${users.lastName})`.as(
    "teacher_name",
  ),
  teacherImage: users.image,
  levelName: levels.name,
  schedulesCount: sq.schedulesCount,
};

export const lectureRouter = createTRPCRouter({
  getScheduledLectures: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(({ input, ctx }) => {
      const user = ctx.session.user;

      return ctx.db
        .select(lectureCardSchema)
        .from(lectures)
        .leftJoin(sq, eq(lectures.id, sq.lectureId))
        .leftJoin(users, eq(lectures.teacherId, users.id))
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .leftJoin(schedules, eq(lectures.id, schedules.lectureId))
        .where(
          and(
            eq(lectures.levelId, input.levelId),
            eq(schedules.studentId, user.id),
          ),
        );
    }),

  getAvailableLectures: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(({ input, ctx }) => {
      const user = ctx.session.user;

      return ctx.db
        .select(lectureCardSchema)
        .from(lectures)
        .leftJoin(sq, eq(lectures.id, sq.lectureId))
        .leftJoin(users, eq(lectures.teacherId, users.id))
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .leftJoin(schedules, eq(lectures.id, schedules.lectureId))
        .where(
          and(
            eq(lectures.levelId, input.levelId),
            or(
              isNull(schedules.studentId),
              not(eq(schedules.studentId, user.id)),
            ),
          ),
        );
    }),

  getMyTeacherLectures: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    return ctx.db
      .select({
        ...lectureCardSchema,
        courseId: courses.id,
        levelId: levels.id,
      })
      .from(lectures)
      .leftJoin(sq, eq(lectures.id, sq.lectureId))
      .leftJoin(users, eq(lectures.teacherId, users.id))
      .leftJoin(levels, eq(lectures.levelId, levels.id))
      .leftJoin(courses, eq(levels.courseId, courses.id))
      .where(eq(lectures.teacherId, user.id));
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
