import { columns } from "@/app/(routes)/academy/admin/users/components/columns";
import { env } from "@/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { groups, lectures, levels, programs, users } from "@/server/db/schema";
import { count, eq, sql } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

function isValidImageUrl(url: string): boolean {
  const imageUrlPattern = /\.(jpeg|jpg|png|bmp|webp)$/i;
  const urlPattern = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/i;

  return urlPattern.test(url) && imageUrlPattern.test(url);
}

export const userSchema = createSelectSchema(users);

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    if (user.role !== env.ADMIN_ROLE) {
      throw new Error("Unauthorized");
    }

    const users = await ctx.db.query.users.findMany({
      columns: {
        image: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        city: true,
        planType: true,
        current_level: true,
        phone: true,
        active: true,
      },
      with: {
        program: {
          columns: {
            id: true,
            name: true,
            proficiency: true,
          },
        },
        group: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    const usersWithRole = users.map((user) => {
      return {
        ...user,
        role:
          user.role === env.ADMIN_ROLE
            ? "Admin"
            : user.role === env.TEACHER_ROLE
              ? "Profesor"
              : "Estudiante",
      };
    });

    return usersWithRole;
  }),
  createUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        city: z.string(),
        programId: z.string(),
        current_level: z.number(),
        groupId: z.number(),
        active: z.boolean(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      if (user.role !== env.ADMIN_ROLE) {
        throw new Error("Unauthorized");
      }

      const userEmail = input.email;

      const userExist = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, userEmail),
      });

      if (userExist) {
        throw new Error("User already exists");
      }

      const currentRole =
        input.role === "Admin"
          ? env.ADMIN_ROLE
          : input.role === "Profesor"
            ? env.TEACHER_ROLE
            : env.STUDENT_ROLE;

      return await ctx.db.insert(users).values({
        name: input.name,
        lastName: input.lastName,
        email: userEmail,
        phone: input.phone,
        city: input.city,
        programId: input.programId,
        groupId: input.groupId,
        current_level: input.current_level,
        active: input.active,
        planType: "EXTERNAL",
        role: currentRole,
      });
    }),

  updateUserAsAdmin: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        city: z.string(),
        programId: z.string(),
        current_level: z.number(),
        groupId: z.number(),
        active: z.boolean(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      if (user.role !== env.ADMIN_ROLE) {
        throw new Error("Unauthorized");
      }

      const userEmail = input.email;

      const userExist = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, userEmail),
      });

      if (userExist) {
        const currentRole =
          input.role === "Admin"
            ? env.ADMIN_ROLE
            : input.role === "Profesor"
              ? env.TEACHER_ROLE
              : env.STUDENT_ROLE;

        return await ctx.db
          .update(users)
          .set({
            name: input.name,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            city: input.city,
            programId: input.programId,
            groupId: input.groupId,
            current_level: input.current_level,
            active: input.active,
            role: currentRole,
          })
          .where(eq(users.email, userEmail));
      }

      throw new Error("El usuario no existe");
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        img: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const userEmail = ctx.session.user.email;

      const user = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, userEmail),
      });

      if (input.img && !isValidImageUrl(input.img)) {
        throw new Error("La url de la imagen no es válida");
      }

      if (user && user.id === userId) {
        return await ctx.db
          .update(users)
          .set({
            name: input.name,
            lastName: input.lastName,
            email: input.email,
            image: input.img,
          })
          .where(eq(users.id, userId));
      }

      throw new Error("Unauthorized");
    }),

  deleteUser: protectedProcedure
    .input(
      z.object({
        userEmail: z.string().email(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;

      if (user.role !== env.ADMIN_ROLE) {
        throw new Error("Unauthorized");
      }

      await ctx.db.delete(users).where(eq(users.email, input.userEmail));
    }),

  getUserHomeInfo: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    const userHomeInfo = await ctx.db
      .select({
        image: users.image,
        studentFullName:
          sql<string>`concat(${users.name}, ' ', ${users.lastName})`.as(
            "student_full_name",
          ),
        levelCount: count(levels.id).as("level_count"),
        lecturesCount: count(lectures.id).as("lectures_count"),
        programName: programs.name,
        programProficiency: programs.proficiency,
        currentUserLevel: users.current_level,
        startDate: groups.startingDate,
      })
      .from(users)
      .leftJoin(groups, eq(users.groupId, groups.id))
      .leftJoin(programs, eq(users.programId, programs.id))
      .leftJoin(levels, eq(levels.programId, programs.id))
      .leftJoin(lectures, eq(lectures.levelId, levels.id))
      .where(eq(users.id, user.id))
      .groupBy(
        users.id,
        users.image,
        users.name,
        users.lastName,
        programs.name,
        programs.proficiency,
        users.current_level,
        groups.startingDate,
      );

    return userHomeInfo[0];
  }),
});
