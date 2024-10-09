import { env } from "@/env";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  smallint,
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
export const Status = pgEnum("status", [
  "PENDING",
  "PAID",
  "REJECTED",
  "FAILED",
  "UNKNOWN",
  "INVALID",
  "MISMATCH",
]);
export const PlanType = pgEnum("planType", [
  "RECURRENT",
  "LEVEL",
  "COMPLETE",
  "STAFF",
  "EXTERNAL",
]);
export const Proficiency = pgEnum("proficiency", [
  "A0",
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
]);

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
    ip: varchar("ip", { length: 25 }),
    subscriptionId: varchar("subscription_id", { length: 255 }),
    planType: PlanType("plan_type").notNull(),
    groupId: serial("group_id")
      .references(() => groups.id)
      .notNull(),
    current_level: smallint("current_level").default(0).notNull(),
    customerId: varchar("customer_id", { length: 255 }),
    active: boolean("active").default(false).notNull(),
    image: varchar("image", { length: 255 }),
    name: varchar("name", { length: 25 }).notNull(),
    lastName: varchar("last_name", { length: 25 }).notNull(),
    phone: varchar("phone", { length: 25 }).notNull(),
    programId: varchar("program_id", { length: 255 })
      .references(() => programs.id)
      .notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
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
  group: one(groups, {
    fields: [users.groupId],
    references: [groups.id],
  }),
  schedules: many(schedules),
  lectureSessions: many(lectureSessions),
  accounts: many(accounts),
  transactions: many(transactions),
  program: one(programs, {
    fields: [users.programId],
    references: [programs.id],
  }),
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
  userId: varchar("user_id", { length: 255 })
    .references(() => users.id)
    .notNull(),
  description: text("description").notNull(),
  amount: varchar("ammount", { length: 255 }).notNull(),
  receipt: varchar("receipt", { length: 25 }).notNull(),
  date: date("date").notNull(),
  status: Status("status").notNull(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));

// ============================== LEVELS ================================
export const levels = createTable("level", {
  id: uuid("id").primaryKey().defaultRandom(),
  programId: varchar("program_id", { length: 255 })
    .references(() => programs.id)
    .notNull(),
  name: varchar("name", { length: 20 }).notNull(),
  level: smallint("level").notNull(),
});

export const levelsRelations = relations(levels, ({ one, many }) => ({
  program: one(programs, {
    fields: [levels.programId],
    references: [programs.id],
  }),
  lectures: many(lectures),
}));

// ============================== LECTURES ==============================
export const lectures = createTable("lecture", {
  id: uuid("id").primaryKey().defaultRandom(),
  levelId: uuid("level_id")
    .references(() => levels.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
});

export const lecturesRelations = relations(lectures, ({ one, many }) => ({
  level: one(levels, { fields: [lectures.levelId], references: [levels.id] }),
  lectureSessions: many(lectureSessions),
}));

// ============================== LECTURESESSIONS ==============================
export const lectureSessions = createTable("lecture_session", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: varchar("teacher_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  lectureId: uuid("lecture_id")
    .references(() => lectures.id)
    .notNull(),
  groupId: serial("group_id")
    .references(() => groups.id)
    .notNull(),
  meet_url: varchar("meet_url", { length: 255 }).notNull(),
  off2class_url: varchar("off2class_url", { length: 255 }).notNull(),
  date: date("date").notNull(),
  start_time: time("start_time").notNull(),
  end_time: time("end_time").notNull(),
  finished: boolean("finished").default(false).notNull(),
});

export const lectureSessionsRelations = relations(
  lectureSessions,
  ({ one, many }) => ({
    lecture: one(lectures, {
      fields: [lectureSessions.lectureId],
      references: [lectures.id],
    }),
    teacher: one(users, {
      fields: [lectureSessions.teacherId],
      references: [users.id],
    }),
    group: one(groups, {
      fields: [lectureSessions.groupId],
      references: [groups.id],
    }),
    schedules: many(schedules),
  }),
);

// ============================== PROGRAMS ==============================
export const programs = createTable("program", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  proficiency: Proficiency("proficiency").notNull(),
});

export const programsRelations = relations(programs, ({ many }) => ({
  levels: many(levels),
  users: many(users),
}));

// ============================== SCHEDULES ==============================
export const schedules = createTable("schedule", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: varchar("student_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  lectureSessionId: uuid("lecture_session_id")
    .references(() => lectureSessions.id, { onDelete: "cascade" })
    .notNull(),
});

export const schedulesRelations = relations(schedules, ({ one }) => ({
  student: one(users, {
    fields: [schedules.studentId],
    references: [users.id],
  }),
  lectureSession: one(lectureSessions, {
    fields: [schedules.lectureSessionId],
    references: [lectureSessions.id],
  }),
}));

// ============================== GROUP ===============================
export const groups = createTable("group", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  creationDate: date("date").notNull(),
  startingDate: date("starting_date").notNull(),
  currentLevel: smallint("current_level").notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  users: many(users),
  lectureSessions: many(lectureSessions),
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
