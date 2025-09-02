import {
  lectures,
  lectureSessions,
  levels,
  schedules,
} from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

export const lectureRouter = createTRPCRouter({
  getLevelLectureIds: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.db
        .select({
          value: lectures.id,
          label: lectures.title,
        })
        .from(lectures)
        .where(eq(lectures.levelId, input.levelId));
    }),

  getLecturesFromLevel: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = ctx.session.user;

      const viewedLectures = ctx.db
        .select({
          lectureId: lectures.id,
          viewed: sql<boolean>`TRUE`.as("viewed"),
        })
        .from(schedules)
        .leftJoin(
          lectureSessions,
          eq(schedules.lectureSessionId, lectureSessions.id),
        )
        .leftJoin(lectures, eq(lectures.id, lectureSessions.lectureId))
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .where(
          and(
            eq(schedules.studentId, user.id),
            eq(lectureSessions.finished, true),
          ),
        )
        .as("viewedLectures");

      const myLectures = await ctx.db
        .select({
          lectureName: lectures.title,
          viewed: viewedLectures.viewed,
        })
        .from(lectures)
        .leftJoin(levels, eq(lectures.levelId, levels.id))
        .leftJoin(viewedLectures, eq(lectures.id, viewedLectures.lectureId))
        .where(eq(levels.id, input.levelId))
        .orderBy(sql`CAST(split_part(${lectures.title}, '.', 1) AS INTEGER)`);

      return myLectures;
    }),
});
