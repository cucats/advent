import { baseProcedure, createTRPCRouter } from "../init";
import { questionsTable, selectQuestionSchema } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { questionNoToDate } from "@/lib/utils";

export const appRouter = createTRPCRouter({
  getQuestions: baseProcedure.query(async () => {
    const questions = await db.query.questionsTable.findMany();
    return questions.map(q => {
      const parsedQuestion = selectQuestionSchema.parse(q);
      return {
        id: parsedQuestion.id,
        date: parsedQuestion.date,
        title: parsedQuestion.title,
        type: parsedQuestion.type,
        releaseDateTime: new Date(`${parsedQuestion.date}T11:00:00`),
      }
    })
  }),
  getQuestion: baseProcedure.input(z.object({ questionNo: z.string() })).query(async ({ input }) => {
    const rawDate = questionNoToDate(input.questionNo);
    const date = new Date(`${rawDate}T11:00:00`);
    const currentDate = new Date();
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
      type: question.type,
      releaseDateTime: new Date(`${rawDate}T11:00:00`),
    };
  }),
});

export type AppRouter = typeof appRouter;
