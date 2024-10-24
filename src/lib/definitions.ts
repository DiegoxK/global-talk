import type { z } from "zod";
import type { userSchema } from "@/server/api/routers/user";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type User = z.infer<typeof userSchema>;

// Api calls return output types
export type UserWithRole = RouterOutput["user"]["getAllUsers"][number];
export type LectureSession =
  RouterOutput["lectureSession"]["getAvailableLectureSessions"][number];
export type TeacherLectureSession =
  RouterOutput["lectureSession"]["getMyTeacherLectureSessions"][number];
export type Level = RouterOutput["level"]["getUserLevels"]["levels"][number];
export type ProgramInfo = RouterOutput["program"]["getProgramName"];
export type UserHomeInfo = NonNullable<RouterOutput["user"]["getUserHomeInfo"]>;
export type Transaction =
  RouterOutput["transaction"]["getAllTransactions"][number];
export type Prompt = RouterOutput["prompt"]["getAllPrompts"][number];
