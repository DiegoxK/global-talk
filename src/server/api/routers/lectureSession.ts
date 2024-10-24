import { z } from "zod";
import {
  programs,
  lectureSessions,
  levels,
  schedules,
  users,
  lectures,
  groups,
} from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, count, eq, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { env } from "@/env";
import { db } from "@/server/db";

const createLectureSessionSchema = createInsertSchema(lectureSessions, {
  teacherId: z.undefined(),
});

// Obtain a table that gets the schedulesCount to each session
const scheduleCount = db
  .select({
    lectureSessionId: lectureSessions.id,
    schedulesCount: count(schedules.id).as("schedules_count"),
  })
  .from(lectureSessions)
  .leftJoin(schedules, eq(lectureSessions.id, schedules.lectureSessionId))
  .groupBy(lectureSessions.id)
  .as("schedule_count");

const lectureSessionCardSchema = {
  id: lectureSessions.id,
  name: lectures.title,
  description: lectures.description,
  meetUrl: lectureSessions.meetUrl,
  off2classUrl: lectureSessions.off2classId,
  date: lectureSessions.date,
  startTime: lectureSessions.startTime,
  endTime: lectureSessions.endTime,
  isFinished: lectureSessions.finished,
  proficiency: programs.proficiency,
  teacherName: sql<string>`concat(${users.name}, ' ', ${users.lastName})`.as(
    "teacher_name",
  ),
  teacherImage: users.image,
  levelName: levels.name,
  schedulesCount: scheduleCount.schedulesCount,
};

export const lectureSessionRouter = createTRPCRouter({
  getScheduledLectureSessions: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;

      const scheduledLectures = await ctx.db
        .select(lectureSessionCardSchema)
        .from(lectureSessions)
        .leftJoin(
          scheduleCount,
          eq(lectureSessions.id, scheduleCount.lectureSessionId),
        )
        .leftJoin(users, eq(lectureSessions.teacherId, users.id))
        .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .leftJoin(programs, eq(levels.programId, programs.id))
        .leftJoin(schedules, eq(lectureSessions.id, schedules.lectureSessionId))
        .where(
          and(
            eq(lectureSessions.finished, false),
            eq(levels.id, input.levelId),
            eq(lectureSessions.groupId, user.groupId),
            eq(programs.id, user.programId),
            eq(schedules.studentId, user.id),
          ),
        );

      return scheduledLectures;
    }),

  getAvailableLectureSessions: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;

      const scheduled = ctx.db
        .select({
          lectureTitle: lectures.title,
        })
        .from(lectureSessions)
        .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .leftJoin(programs, eq(levels.programId, programs.id))
        .leftJoin(schedules, eq(lectureSessions.id, schedules.lectureSessionId))
        .where(
          and(
            eq(levels.id, input.levelId),
            eq(lectureSessions.groupId, user.groupId),
            eq(programs.id, user.programId),
            eq(schedules.studentId, user.id),
          ),
        )
        .as("scheduled");

      const query = ctx.db
        .select(lectureSessionCardSchema)
        .from(lectureSessions)
        .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
        .leftJoin(scheduled, eq(lectures.title, scheduled.lectureTitle))
        .leftJoin(
          scheduleCount,
          eq(lectureSessions.id, scheduleCount.lectureSessionId),
        )
        .leftJoin(users, eq(lectureSessions.teacherId, users.id))
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .leftJoin(programs, eq(levels.programId, programs.id))
        .where(
          and(
            eq(lectureSessions.finished, false),
            sql`${scheduled.lectureTitle} IS NULL`,
            eq(levels.id, input.levelId),
            eq(lectureSessions.groupId, user.groupId),
            eq(programs.id, user.programId),
          ),
        );

      const availableLectures = await query;

      return availableLectures;
    }),

  getFinishedLectureSessions: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;

      const scheduled = ctx.db
        .select({
          lectureTitle: lectures.title,
        })
        .from(lectureSessions)
        .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .leftJoin(programs, eq(levels.programId, programs.id))
        .leftJoin(schedules, eq(lectureSessions.id, schedules.lectureSessionId))
        .where(
          and(
            eq(levels.id, input.levelId),
            eq(lectureSessions.groupId, user.groupId),
            eq(programs.id, user.programId),
            eq(schedules.studentId, user.id),
          ),
        )
        .as("scheduled");

      const query = ctx.db
        .select(lectureSessionCardSchema)
        .from(lectureSessions)
        .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
        .leftJoin(scheduled, eq(lectures.title, scheduled.lectureTitle))
        .leftJoin(
          scheduleCount,
          eq(lectureSessions.id, scheduleCount.lectureSessionId),
        )
        .leftJoin(users, eq(lectureSessions.teacherId, users.id))
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .leftJoin(programs, eq(levels.programId, programs.id))
        .where(
          and(
            eq(lectureSessions.finished, true),
            sql`${scheduled.lectureTitle} IS NULL`,
            eq(levels.id, input.levelId),
            eq(lectureSessions.groupId, user.groupId),
            eq(programs.id, user.programId),
          ),
        );

      const finishedLectures = await query;

      return finishedLectures;
    }),

  getMyTeacherLectureSessions: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    return ctx.db
      .select({
        ...lectureSessionCardSchema,
        lectureId: lectures.id,
        levelId: levels.id,
        programId: programs.id,
        groupId: groups.id,
      })
      .from(lectureSessions)
      .leftJoin(
        scheduleCount,
        eq(lectureSessions.id, scheduleCount.lectureSessionId),
      )
      .leftJoin(users, eq(lectureSessions.teacherId, users.id))
      .leftJoin(lectures, eq(lectureSessions.lectureId, lectures.id))
      .leftJoin(levels, eq(lectures.levelId, levels.id))
      .leftJoin(programs, eq(levels.programId, programs.id))
      .leftJoin(groups, eq(lectureSessions.groupId, groups.id))
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

  endLectureSession: protectedProcedure
    .input(
      z.object({
        sessionRecording: z.string().url(),
        lectureSessionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      if (user.role !== env.TEACHER_ROLE && user.role !== env.ADMIN_ROLE) {
        throw new Error("Only teachers can end lectureSessions");
      }

      await ctx.db
        .update(lectureSessions)
        .set({
          finished: true,
          meetUrl: input.sessionRecording,
        })
        .where(eq(lectureSessions.id, input.lectureSessionId));
    }),
});
