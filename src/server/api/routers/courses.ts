import { z } from "zod";
import { courses } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";

export const courseRouter = createTRPCRouter({
  getCourseName: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;

    if (user.courseId) {
      return ctx.db.query.courses.findFirst({
        columns: {
          name: true,
          proficiency: true,
        },
        where: eq(courses.id, user.courseId),
      });
    }
  }),
});
