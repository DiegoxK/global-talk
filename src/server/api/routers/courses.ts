import { z } from "zod";
import { courses } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";

export const courseRouter = createTRPCRouter({
  getCourses: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.courses.findMany();
  }),

  getCoursesIds: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        value: courses.id,
        label: courses.name,
      })
      .from(courses);
  }),

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
