import { transactions } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, asc, count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { env } from "@/env";

export const transactionRouter = createTRPCRouter({
  getAllTransactions: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    if (user.role !== env.ADMIN_ROLE) {
      throw new Error("Unauthorized");
    }

    const pageTransactions = await ctx.db.query.transactions.findMany({
      with: {
        user: {
          columns: {
            name: true,
            lastName: true,
            email: true,
            phone: true,
            city: true,
            planType: true,
          },
          with: {
            program: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: desc(transactions.date),
    });

    return pageTransactions;
  }),
});
