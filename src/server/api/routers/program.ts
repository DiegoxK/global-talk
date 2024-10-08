import { z } from "zod";
import { programs } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";

export const programRouter = createTRPCRouter({
  getPrograms: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.programs.findMany();
  }),

  getProgramsIds: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        value: programs.id,
        label: programs.name,
      })
      .from(programs);
  }),

  getProgramName: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;

    if (user.programId) {
      return ctx.db.query.programs.findFirst({
        columns: {
          name: true,
          proficiency: true,
        },
        where: eq(programs.id, user.programId),
      });
    }
  }),
});
