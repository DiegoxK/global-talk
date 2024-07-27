import type { z } from "zod";
import type { userSchema } from "@/server/api/routers/user";

export type User = z.infer<typeof userSchema>;
