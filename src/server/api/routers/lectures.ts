import { lectures } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const lectureRouter = createTRPCRouter({
  getLectures: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.lectures.findMany({
      with: {
        level: true,
        teacher: true,
      },
    });
  }),
});
