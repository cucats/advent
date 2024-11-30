import { baseProcedure, createTRPCRouter } from "../init";
import { questionsTable, questionTypeSchema, selectQuestionSchema } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getCurrentDate, questionNoToDate } from "@/lib/utils";
import { Question } from "@/lib/types";

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
      throw new Error("Question not released yet!");
    }

    const question = await db.query.questionsTable.findFirst({ where: eq(questionsTable.date, rawDate) });
    if (!question) {
      throw new Error("Question not found");
    }

    return {
      id: question.id,
      date: question.date,
      title: question.title,
      type: questionTypeSchema.parse(question.type),
      releaseDateTime: new Date(`${rawDate}T11:00:00`),
      question: question.question,
    };
  }),
});

export type AppRouter = typeof appRouter;
