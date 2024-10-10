import { groups } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const groupRouter = createTRPCRouter({
  getgroups: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        value: groups.id,
        label: groups.name,
      })
      .from(groups);
  }),
});
