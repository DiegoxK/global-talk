import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";

import { env } from "@/env";
import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";

import {
  sendVerificationRequest,
  generateVerificationToken,
} from "@/lib/email-config";

import type { User } from "@/lib/definitions";
import { cookies } from "next/headers";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/adapters" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AdapterUser extends User {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account) {
        const accountProvider = account.provider;

        // If the user is signing in with another provider, redirect them the provider sign in
        if (accountProvider !== "email") {
          return true;
        }

        /**  If the user is signing in with email, check if the email exists in the User db
         *@see https://next-auth.js.org/providers/email#sending-magic-links-to-existing-users
         */

        const userEmail = user.email;
        if (userEmail) {
          const userExist = await db.query.users.findFirst({
            where: (table, funcs) => funcs.eq(table.email, userEmail),
          });
          if (userExist) {
            cookies().set({
              name: "otp-email",
              value: userEmail,
              maxAge: 10 * 60,
              sameSite: "lax",
            });
            return true; //if the email exists in the User schema, email them a magic code link
          }
          return "/pricing?email=" + userEmail; //if the email does not exist in the User schema, redirect them to the pricing page with the email pre-filled in the form
        }
      }
      return false; // Return false to display a default error message
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        userRole: user.userRole,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      maxAge: 10 * 60, // 10 minutes
      sendVerificationRequest,
      generateVerificationToken,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
