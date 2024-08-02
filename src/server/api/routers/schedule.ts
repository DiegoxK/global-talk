import { schedules } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { count, eq } from "drizzle-orm";
import { z } from "zod";

export const scheduleRouter = createTRPCRouter({});
