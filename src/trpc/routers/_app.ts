import { baseProcedure, createTRPCRouter } from "../init";
import { selectQuestionSchema } from "@/db/schema";
import { db } from "@/db";

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
      }
    })
  }),
});

export type AppRouter = typeof appRouter;
