import { z } from "zod";
import {
  programs,
  lectureSessions,
  levels,
  schedules,
  users,
  lectures,
} from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, count, eq, isNull, ne, not, or, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { env } from "@/env";
import { db } from "@/server/db";

const createLectureSessionSchema = createInsertSchema(lectureSessions, {});

// Obtain a table that gets the schedulesCount to each session
const sq = db
  .select({
    lectureSessionId: lectureSessions.id,
    schedulesCount: count(schedules.id).as("schedule_count"),
  })
  .from(lectureSessions)
  .leftJoin(schedules, eq(lectureSessions.id, schedules.lectureSessionId))
  .groupBy(lectureSessions.id)
  .as("sq");

const lectureSessionCardSchema = {
  id: lectureSessions.id,
  meetUrl: lectureSessions.meet_url,
  off2classUrl: lectureSessions.off2class_url,
  date: lectureSessions.date,
  startTime: lectureSessions.start_time,
  endTime: lectureSessions.end_time,
  isFinished: lectureSessions.finished,
  proficiency: programs.proficiency,
  teacherName: sql<string>`concat(${users.name}, ' ', ${users.lastName})`.as(
    "teacher_name",
  ),
  teacherImage: users.image,
  levelName: levels.name,
  schedulesCount: sq.schedulesCount,
};

export const lecturesSessionRouter = createTRPCRouter({
  getScheduledLectures: protectedProcedure
    .input(
      z.object({
        lectureId: z.string().uuid(),
      }),
    )
    .query(({ input, ctx }) => {
      const user = ctx.session.user;

      return ctx.db
        .select(lectureSessionCardSchema)
        .from(lectureSessions)
        .leftJoin(sq, eq(lectureSessions.id, sq.lectureSessionId))
        .leftJoin(users, eq(lectureSessions.teacherId, users.id))
        .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
        .leftJoin(schedules, eq(lectureSessions.id, schedules.lectureSessionId))
        .leftJoin(programs, eq(levels.programId, programs.id))
        .where(
          and(
            eq(lectureSessions.lectureId, input.lectureId),
            eq(schedules.studentId, user.id),
          ),
        );
    }),

  getAvailableLectureSessions: protectedProcedure
    .input(
      z.object({
        lectureId: z.string().uuid(),
      }),
    )
    .query(({ input, ctx }) => {
      const user = ctx.session.user;

      return ctx.db
        .select(lectureSessionCardSchema)
        .from(lectureSessions)
        .leftJoin(sq, eq(lectureSessions.id, sq.lectureSessionId))
        .leftJoin(users, eq(lectureSessions.teacherId, users.id))
        .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
        .leftJoin(schedules, eq(lectureSessions.id, schedules.lectureSessionId))
        .leftJoin(programs, eq(levels.programId, programs.id))
        .where(
          and(
            eq(lectureSessions.lectureId, input.lectureId),
            or(
              isNull(schedules.studentId),
              not(eq(schedules.studentId, user.id)),
            ),
          ),
        );
    }),

  getMyTeacherLectureSessions: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    return ctx.db
      .select({
        ...lectureSessionCardSchema,
        programId: programs.id,
        levelId: levels.id,
      })
      .from(lectureSessions)
      .leftJoin(sq, eq(lectureSessions.id, sq.lectureSessionId))
      .leftJoin(users, eq(lectureSessions.teacherId, users.id))
      .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
      .leftJoin(programs, eq(levels.programId, programs.id))
      .where(eq(lectureSessions.teacherId, user.id));
  }),

  editLectureSession: protectedProcedure
    .input(createLectureSessionSchema)
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      if (user.role !== env.TEACHER_ROLE && user.role !== env.ADMIN_ROLE) {
        throw new Error("Only teachers can edit lectureSessions");
      }

      if (!input.id) {
        throw new Error("LectureSession id is required");
      }

      await ctx.db
        .update(lectureSessions)
        .set({
          ...input,
          teacherId: user.id,
        })
        .where(eq(lectureSessions.id, input.id));
    }),

  createLectureSession: protectedProcedure
    .input(createLectureSessionSchema)
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      if (user.role !== env.TEACHER_ROLE && user.role !== env.ADMIN_ROLE) {
        throw new Error("Only teachers can create lectureSessions");
      }

      await ctx.db.insert(lectureSessions).values({
        ...input,
        teacherId: user.id,
      });
    }),

  deleteLectureSession: protectedProcedure
    .input(
      z.object({
        lectureSessionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      if (user.role !== env.TEACHER_ROLE && user.role !== env.ADMIN_ROLE) {
        throw new Error("Only teachers can delete lectureSessions");
      }

      await ctx.db
        .delete(lectureSessions)
        .where(eq(lectureSessions.id, input.lectureSessionId));
    }),
});
