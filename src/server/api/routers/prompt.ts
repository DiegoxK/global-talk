import { prompts } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import OpenAI from "openai";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { ChatCompletionRole } from "openai/resources/index.mjs";
import { env } from "@/env";

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
        description: prompts.description,
      })
      .from(prompts);
  }),

  getAllPrompts: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    if (user.role !== env.ADMIN_ROLE) {
      throw new Error("Unauthorized");
    }

    return ctx.db.query.prompts.findMany();
  }),

  createPrompt: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        prompt: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      if (user.role !== env.ADMIN_ROLE) {
        throw new Error("Unauthorized");
      }

      return await ctx.db.insert(prompts).values({
        name: input.name,
        prompt: input.prompt,
        description: input.description,
      });
    }),

  updatePrompt: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string(),
        prompt: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      if (user.role !== env.ADMIN_ROLE) {
        throw new Error("Unauthorized");
      }

      if (input.id) {
        return await ctx.db
          .update(prompts)
          .set({
            name: input.name,
            prompt: input.prompt,
            description: input.description,
          })
          .where(eq(prompts.id, input.id));
      }
    }),

  deletePrompt: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      if (user.role !== env.ADMIN_ROLE) {
        throw new Error("Unauthorized");
      }

      return await ctx.db.delete(prompts).where(eq(prompts.id, input.id));
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
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      console.log(input.messages);

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
