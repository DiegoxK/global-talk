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
export type TeacherLecture =
  RouterOutput["lectureSession"]["getMyTeacherLectureSessions"][number];
export type Level = RouterOutput["level"]["getUserLevels"][number];
export type ProgramInfo = RouterOutput["program"]["getProgramName"];
