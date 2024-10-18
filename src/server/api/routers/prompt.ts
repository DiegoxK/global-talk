import { prompts } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";

export const promptRouter = createTRPCRouter({
  getPrompts: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;

    if (!user) {
      throw new Error("Unauthorized");
    }

    return ctx.db
      .select({
        label: prompts.name,
        value: prompts.prompt,
      })
      .from(prompts);
  }),
});
