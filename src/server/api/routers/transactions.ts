import { transactions } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { env } from "@/env";

export const transactionRouter = createTRPCRouter({
  getAllTransactions: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    if (user.role !== env.ADMIN_ROLE) {
      throw new Error("Unauthorized");
    }

    const transactions = await ctx.db.query.transactions.findMany();

    return transactions;
  }),
});
