import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { answersTable, questionsTable, questionTypeSchema, selectQuestionSchema } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getCurrentDate, questionNoToDate } from "@/lib/utils";
import { Question } from "@/lib/types";
import { TRPCError } from "@trpc/server";

export const appRouter = createTRPCRouter({
  getQuestions: baseProcedure.query(async () => {
    const questions = await db.query.questionsTable.findMany();
    return questions.map(q => {
      const parsedQuestion = selectQuestionSchema.parse(q);
      return {
        id: parsedQuestion.id,
        date: parsedQuestion.date,
        releaseDateTime: new Date(`${parsedQuestion.date}T11:00:00`),
      }
    })
  }),
  getQuestion: baseProcedure.input(z.object({ questionNo: z.string() })).query(async ({ input }): Promise<Question> => {
    const rawDate = questionNoToDate(input.questionNo);
    const date = new Date(`${rawDate}T11:00:00`);
    const currentDate = getCurrentDate();
    if (new Date(date) > currentDate) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Question not released yet!" });
    }

    const question = await db.query.questionsTable.findFirst({ where: eq(questionsTable.date, rawDate) });
    if (!question) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Question not found" });
    }

    return {
      id: question.id,
      date: question.date,
      type: questionTypeSchema.parse(question.type),
      releaseDateTime: new Date(`${rawDate}T11:00:00`),
    };
  }),
  submitAnswer: protectedProcedure.input(z.object({
    questionNo: z.string(),
    answer: z.string(),
  })).mutation(async ({ input, ctx }) => {
    const question = await db.query.questionsTable.findFirst({ where: eq(questionsTable.date, input.questionNo) });
    if (!question) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Question not found" });
    }

    await db.insert(answersTable).values({
      userId: ctx.user.id,
      questionId: question.id,
      answer: input.answer,
      correct: question.answer === input.answer,
    });
  }),
  getCurrentSession: baseProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.user,
      session: ctx.session,
    }
  }),
});

export type AppRouter = typeof appRouter;
