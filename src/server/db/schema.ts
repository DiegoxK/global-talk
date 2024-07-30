import { env } from "@/env";
import { desc, relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  decimal,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

const STUDENT = env.STUDENT_ROLE;
const TEACHER = env.TEACHER_ROLE;
const ADMIN = env.ADMIN_ROLE;

export const UserRole = pgEnum("userRole", [STUDENT, TEACHER, ADMIN]);
export const Status = pgEnum("status", ["PENDING", "CANCELED", "ACCEOPTED"]);

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `global-talk_${name}`);

// ============================== USERS ==============================
export const users = createTable(
  "user",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => sql`gen_random_uuid()`),
    role: UserRole("role").default(STUDENT).notNull(),
    image: varchar("image", { length: 255 }),
    name: varchar("name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    courseId: uuid("course_id").references(() => courses.id),
    emailVerified: timestamp("email_verified", {
      mode: "date",
      withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(table.email),
    };
  },
);

export const usersRelations = relations(users, ({ one, many }) => ({
  courses: one(courses, {
    fields: [users.courseId],
    references: [courses.id],
  }),
  schedules: many(schedules),
  lectures: many(lectures),
  accounts: many(accounts),
}));

// ============================ Prompts ================================
export const prompts = createTable("prompt", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  prompt: text("prompt").notNull(),
});

// ============================ Transactions ============================
export const transactions = createTable("transaction", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id),
  description: text("description").notNull(),
  receipt: varchar("receipt", { length: 6 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 10 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  date: date("date").notNull(),
  status: Status("status").default("PENDING").notNull(),
});

// ============================== LEVELS ================================
export const levels = createTable("level", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseId: uuid("course_id")
    .references(() => courses.id)
    .notNull(),
  name: varchar("name", { length: 20 }).notNull(),
});

export const levelsRelations = relations(levels, ({ one }) => ({
  course: one(courses, {
    fields: [levels.courseId],
    references: [courses.id],
  }),
}));

// ============================== LECTURES ==============================
export const lectures = createTable("lecture", {
  id: uuid("id").primaryKey().defaultRandom(),
  levelId: uuid("level_id")
    .references(() => levels.id)
    .notNull(),
  teacherId: varchar("teacher_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 25 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  meet_url: varchar("meet_url", { length: 255 }).notNull(),
  off2class_url: varchar("off2class_url", { length: 255 }).notNull(),
  date: date("date").notNull(),
  start_time: time("start_time").notNull(),
  end_time: time("end_time").notNull(),
  finished: boolean("finished").default(false).notNull(),
});

export const lecturesRelations = relations(lectures, ({ one, many }) => ({
  level: one(levels, { fields: [lectures.levelId], references: [levels.id] }),
  teacher: one(users, {
    fields: [lectures.teacherId],
    references: [users.id],
  }),
  schedules: many(schedules),
}));

// ============================== COURSES ==============================
export const courses = createTable("course", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  price: decimal("price").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  students: many(users),
  levels: many(levels),
}));

// ============================== SCHEDULES ==============================
export const schedules = createTable("schedule", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: varchar("student_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  lectureId: uuid("lecture_id")
    .references(() => lectures.id)
    .notNull(),
});

export const schedulesRelations = relations(schedules, ({ one }) => ({
  student: one(users, {
    fields: [schedules.studentId],
    references: [users.id],
  }),
  lecture: one(lectures, {
    fields: [schedules.lectureId],
    references: [lectures.id],
  }),
}));

// ============================== AUTH ===============================
export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
