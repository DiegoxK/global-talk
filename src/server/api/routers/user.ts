import { createHash } from "crypto";
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

interface GravatarResponse {
  hash: string;
  display_name: string;
  profile_url: string;
  avatar_url: string;
  avatar_alt_text: string;
  location: string;
  description: string;
  job_title: string;
  company: string;
  verified_accounts: string[];
  pronunciation: string;
  pronouns: string;
}

export const userSchema = createSelectSchema(users);

function hashStringToSHA256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

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

  getAllStudents: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    if (user.role !== env.ADMIN_ROLE && user.role !== env.TEACHER_ROLE) {
      throw new Error("Unauthorized");
    }

    const students = await ctx.db.query.users.findMany({
      columns: {
        image: true,
        name: true,
        lastName: true,
        email: true,
        city: true,
        phone: true,
        active: true,
        current_level: true,
      },
      with: {
        program: {
          columns: {
            name: true,
            proficiency: true,
          },
        },
        group: {
          columns: {
            name: true,
          },
        },
      },
      where: eq(users.role, env.STUDENT_ROLE),
    });

    return students;
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const userEmail = ctx.session.user.email;

      // if (input.email) {
      //   const user = await ctx.db.query.users.findFirst({
      //     where: (table, funcs) => funcs.eq(table.email, input.email),
      //   });

      //   if (user && user.id !== userId) {
      //     throw new Error("El correo ya está en uso");
      //   }
      // }

      const user = await ctx.db.query.users.findFirst({
        where: (table, funcs) => funcs.eq(table.email, userEmail),
      });

      if (user && user.id === userId) {
        return await ctx.db
          .update(users)
          .set({
            name: input.name,
            lastName: input.lastName,
            // email: input.email,
          })
          .where(eq(users.id, userId));
      }

      throw new Error("Unauthorized");
    }),

  updateProfileImage: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const userEmail = ctx.session.user.email;

    const user = await ctx.db.query.users.findFirst({
      where: (table, funcs) => funcs.eq(table.email, userEmail),
    });

    if (user && user.id === userId) {
      const profileIdentifier = hashStringToSHA256(user.email);

      const response = await fetch(
        `https://api.gravatar.com/v3/profiles/${profileIdentifier}`,
      );

      const data = (await response.json()) as GravatarResponse;

      if (data.avatar_url) {
        return await ctx.db
          .update(users)
          .set({
            image: data.avatar_url,
          })
          .where(eq(users.id, userId));
      }

      throw new Error(
        `No se encontró ninguna imagen o cuenta de gravatar para el correo: ${user.email}`,
      );

      // return await ctx.db.update(users).set({}).where(eq(users.id, userId));
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

    const levelCountQuery = ctx.db
      .select({
        programId: programs.id,
        levelCount: count(levels.id).as("level_count"),
      })
      .from(programs)
      .leftJoin(levels, eq(programs.id, levels.programId))
      .where(eq(programs.id, user.programId))
      .groupBy(programs.id)
      .as("level_count_query");

    const userHomeInfo = await ctx.db
      .select({
        image: users.image,
        studentFullName:
          sql<string>`concat(${users.name}, ' ', ${users.lastName})`.as(
            "student_full_name",
          ),
        levelCount: levelCountQuery.levelCount,
        lecturesCount: count(lectures.id).as("lectures_count"),
        programName: programs.name,
        programProficiency: programs.proficiency,
        currentUserLevel: users.current_level,
        startDate: groups.startingDate,
        active: users.active,
      })
      .from(users)
      .leftJoin(groups, eq(users.groupId, groups.id))
      .leftJoin(programs, eq(users.programId, programs.id))
      .leftJoin(levelCountQuery, eq(levelCountQuery.programId, programs.id))
      .leftJoin(levels, eq(levels.programId, programs.id))
      .leftJoin(lectures, eq(lectures.levelId, levels.id))
      .where(eq(users.id, user.id))
      .groupBy(
        users.id,
        users.image,
        users.name,
        users.lastName,
        programs.name,
        levelCountQuery.levelCount,
        programs.proficiency,
        users.current_level,
        groups.startingDate,
      );

    return userHomeInfo[0];
  }),
});
