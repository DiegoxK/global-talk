import { z } from "zod";
import { lectures } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";

export const lectureRouter = createTRPCRouter({
  getLectures: protectedProcedure
    .input(
      z.object({
        levelId: z.string().uuid(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.db.query.lectures.findMany({
        with: {
          level: true,
          teacher: true,
        },
        where: eq(lectures.levelId, input.levelId),
      });
    }),
});
