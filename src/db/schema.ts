import {
  date,
  integer,
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const questionTypeSchema = z.enum(["euler", "leetcode", "multiplayer"]);
export type QuestionType = z.infer<typeof questionTypeSchema>;

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  crsid: varchar({ length: 255 }).notNull().unique(),
  googleId: varchar({ length: 255 }).notNull().unique(),
});

export type User = InferSelectModel<typeof usersTable>;

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export const questionsTable = pgTable("questions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: date().notNull(),
  type: text().notNull(),
  answer: text(),
});

export const selectQuestionSchema = createSelectSchema(questionsTable, {
  type: questionTypeSchema,
});

export const sessionsTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = InferSelectModel<typeof sessionsTable>;

export const answersTable = pgTable("answers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  questionId: integer("question_id")
    .notNull()
    .references(() => questionsTable.id),
  answer: text().notNull(),
  timeCreated: timestamp("time_created", { withTimezone: true })
    .notNull()
    .defaultNow(),
  correct: boolean().notNull().default(false),
});

export const selectAnswerSchema = createSelectSchema(answersTable);
export const insertAnswerSchema = createInsertSchema(answersTable);
