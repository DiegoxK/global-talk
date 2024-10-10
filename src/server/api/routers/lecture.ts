import { lectures } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
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
});
