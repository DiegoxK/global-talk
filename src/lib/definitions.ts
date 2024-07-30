import type { z } from "zod";
import type { userSchema } from "@/server/api/routers/user";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type User = z.infer<typeof userSchema>;
export type Lecture = RouterOutput["lecture"]["getLectures"][number];
