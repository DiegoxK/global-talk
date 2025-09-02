import { levels } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

export const levelRouter = createTRPCRouter({
  getFirstLevel: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;
    const programId = user.programId;

    if (!programId) {
      return ctx.db.query.levels.findFirst({
        columns: {
          id: true,
        },
      });
    }

    return ctx.db.query.levels.findFirst({
      where: and(eq(levels.programId, programId), eq(levels.level, 1)),
      columns: {
        id: true,
      },
    });
  }),

  getUserLevels: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const programId = user.programId;

    if (!programId) {
      const userLevels = await ctx.db.query.levels.findMany();
      return {
        levels: userLevels,
        currentUserLevel: user.current_level,
      };
    }

    const userLevels = await ctx.db.query.levels.findMany({
      where: eq(levels.programId, programId),
      orderBy: (levels, { asc }) => [
        asc(sql`CAST(split_part(${levels.name}, ' ', 2) AS INTEGER)`),
      ],
    });

    return {
      levels: userLevels,
      currentUserLevel: user.current_level,
    };
  }),

  getProgramLevelIds: protectedProcedure
    .input(
      z.object({
        programId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.db
        .select({
          value: levels.id,
          label: levels.name,
        })
        .from(levels)
        .where(eq(levels.programId, input.programId));
    }),
});
