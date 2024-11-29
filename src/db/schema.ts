import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export const questionsTable = pgTable("questions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: date().notNull(),
  title: text().notNull(),
});

export const selectQuestionSchema = createSelectSchema(questionsTable);

