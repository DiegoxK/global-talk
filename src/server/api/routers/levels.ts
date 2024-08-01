import { levels } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const levelRouter = createTRPCRouter({
  getFirstLevel: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;
    const courseId = user.courseId;

    if (!courseId) {
      return ctx.db.query.levels.findFirst({
        columns: {
          id: true,
        },
      });
    }

    return ctx.db.query.levels.findFirst({
      where: eq(levels.courseId, courseId),
      columns: {
        id: true,
      },
    });
  }),

  getUserLevels: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;
    const courseId = user.courseId;

    if (!courseId) {
      return ctx.db.query.levels.findMany();
    }

    return ctx.db.query.levels.findMany({
      where: eq(levels.courseId, courseId),
    });
  }),

  getCourseLevelsIds: protectedProcedure
    .input(
      z.object({
        courseId: z.string().uuid(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.db
        .select({
          value: levels.id,
          label: levels.name,
        })
        .from(levels)
        .where(eq(levels.courseId, input.courseId));
    }),
});
