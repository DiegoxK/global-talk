import { env } from "@/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

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
      },
      with: {
        courses: {
          columns: {
            id: true,
            name: true,
            proficiency: true,
          },
        },
      },
    });

    const usersWithRole = users.map((user) => {
      return {
        ...user,
        roleName:
          user.role === env.ADMIN_ROLE
            ? "Admin"
            : user.role === env.TEACHER_ROLE
              ? "Profesor"
              : "Estudiante",
      };
    });

    return usersWithRole;
  }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        lastName: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userEmail = input.email;

      const userExist = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, userEmail),
      });

      if (userExist) {
        throw new Error("User already exists");
      }

      // return await ctx.db.insert(users).values({
      //   name: input.name,
      //   lastName: input.lastName,
      //   email: userEmail,
      // });
    }),

  updateUserName: protectedProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return await ctx.db
        .update(users)
        .set({
          name: input.username,
        })
        .where(eq(users.id, userId));
    }),

  updateImage: protectedProcedure
    .input(
      z.object({
        img: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // TODO: Delete previous image

      return await ctx.db
        .update(users)
        .set({
          image: input.img,
        })
        .where(eq(users.id, userId));
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        img: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const userEmail = input.email;

      const user = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, userEmail),
      });

      if (user && user.id === userId) {
        return await ctx.db
          .update(users)
          .set({
            name: input.name,
            image: input.img,
          })
          .where(eq(users.id, userId));
      }

      throw new Error("Unauthorized");
    }),
});
