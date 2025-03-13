import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { lectureSessionRouter } from "./routers/lectureSession";
import { scheduleRouter } from "./routers/schedule";
import { levelRouter } from "./routers/levels";
import { programRouter } from "./routers/program";
import { epaycoRouter } from "./routers/epayco";
import { lectureRouter } from "./routers/lecture";
import { groupRouter } from "./routers/group";
import { promptRouter } from "./routers/prompt";
import { transactionRouter } from "./routers/transactions";
import { emailRouter } from "./routers/email";
import { brevoRouter } from "./routers/brevo"; // Importa el router de Brevo

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  epayco: epaycoRouter,
  program: programRouter,
  schedule: scheduleRouter,
  level: levelRouter,
  lectures: lectureRouter,
  groups: groupRouter,
  user: userRouter,
  email: emailRouter,
  lectureSession: lectureSessionRouter,
  prompt: promptRouter,
  transaction: transactionRouter,
  brevo: brevoRouter, // Agrega el router de Brevo sin modificar lo demás
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);