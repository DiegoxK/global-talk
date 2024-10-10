import { levels } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
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
      where: eq(levels.programId, programId),
      columns: {
        id: true,
      },
    });
  }),

  getUserLevels: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;
    const programId = user.programId;

    if (!programId) {
      return ctx.db.query.levels.findMany();
    }

    return ctx.db.query.levels.findMany({
      where: eq(levels.programId, programId),
    });
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
