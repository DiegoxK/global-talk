import { prompts } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import OpenAI from "openai";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { ChatCompletionRole } from "openai/resources/index.mjs";

const openai = new OpenAI();

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

  getAiResponse: protectedProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            content: z.string(),
            role: z.enum(["system", "user", "assistant"]),
          }),
        ),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: input.messages,
      });

      if (completion?.choices[0]?.message) {
        return completion.choices[0].message.content;
      }

      throw new Error("Error al obtener respuesta del chat");
    }),
});
