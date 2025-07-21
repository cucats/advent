import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import {
  answersTable,
  questionsTable,
  questionTypeSchema,
  usersTable,
} from "@/db/schema";
import { db } from "@/db";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import {
  dateToQuestionNo,
  getCurrentDate,
  questionNoToDate,
} from "@/lib/utils";
import { Question } from "@/lib/types";
import { TRPCError } from "@trpc/server";
import { calculateScore } from "@/lib/scoring";

const ADMIN_IDS = ["7", "8"];

export const appRouter = createTRPCRouter({
  getQuestions: baseProcedure.query(async () => {
    const questions = await db
      .select({
        id: questionsTable.id,
        date: questionsTable.date,
        answerCount: sql<string>`COUNT(${answersTable.id})`,
        answer: questionsTable.answer,
      })
      .from(questionsTable)
      .leftJoin(answersTable, eq(questionsTable.id, answersTable.questionId))
      .groupBy(questionsTable.id)
      .orderBy(desc(questionsTable.date));

    return questions.map((q) => {
      const nextScore = calculateScore(
        parseInt(dateToQuestionNo(q.date)),
        parseInt(q.answerCount) + 1,
      );
      return {
        id: q.id,
        date: q.date,
        releaseDateTime: new Date(`${q.date}T13:00:00`),
        skipped: q.answer === null,
        nextScore,
      };
    });
  }),
  getQuestion: baseProcedure
    .input(z.object({ questionNo: z.string() }))
    .query(async ({ input, ctx }): Promise<Question> => {
      const rawDate = questionNoToDate(input.questionNo);
      const date = new Date(`${rawDate}T13:00:00`);
      const currentDate = getCurrentDate();
      if (
        new Date(date) > currentDate &&
        !ADMIN_IDS.includes(ctx.user?.id?.toString() ?? "")
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Question not released yet!",
        });
      }

      const question = await db.query.questionsTable.findFirst({
        where: eq(questionsTable.date, rawDate),
      });
      if (!question) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Question not found",
        });
      }

      return {
        id: question.id,
        date: question.date,
        type: questionTypeSchema.parse(question.type),
        releaseDateTime: new Date(`${rawDate}T13:00:00`),
      };
    }),
  submitAnswer: protectedProcedure
    .input(
      z.object({
        questionNo: z.string(),
        answer: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const rawDate = questionNoToDate(input.questionNo);

      const question = await db.query.questionsTable.findFirst({
        where: eq(questionsTable.date, rawDate),
      });
      if (!question) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Question not found",
        });
      }

      const existingAnswer = await db.query.answersTable.findFirst({
        where: and(
          eq(answersTable.userId, ctx.user.id),
          eq(answersTable.questionId, question.id),
        ),
      });

      if (existingAnswer) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Question already solved",
        });
      }

      const correct = question.answer === input.answer;

      if (correct) {
        const answers = await db.query.answersTable.findMany({
          where: eq(answersTable.questionId, question.id),
          orderBy: [asc(answersTable.timeCreated)],
          limit: 10,
        });

        const score = Math.ceil(
          calculateScore(parseInt(input.questionNo), answers.length + 1),
        );

        await db.insert(answersTable).values({
          userId: ctx.user.id,
          questionId: question.id,
          score,
        });
      }

      return {
        correct,
      };
    }),
  getCurrentSession: baseProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.user,
      session: ctx.session,
    };
  }),
  setNickname: protectedProcedure
    .input(z.object({ nickname: z.string().min(1).max(32) }))
    .mutation(async ({ input, ctx }) => {
      await db
        .update(usersTable)
        .set({ nickname: input.nickname })
        .where(eq(usersTable.id, ctx.user.id));
    }),
  getUserQuestionAnswered: protectedProcedure
    .input(z.object({ questionNo: z.string() }))
    .query(async ({ input, ctx }) => {
      const rawDate = questionNoToDate(input.questionNo);
      const question = await db.query.questionsTable.findFirst({
        where: eq(questionsTable.date, rawDate),
      });
      if (!question) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Question not found",
        });
      }

      const answer = await db.query.answersTable.findFirst({
        where: and(
          eq(answersTable.userId, ctx.user.id),
          eq(answersTable.questionId, question.id),
        ),
      });

      return answer
        ? {
            score: answer.score,
            timeCreated: answer.timeCreated,
          }
        : null;
    }),
  getLeaderboard: baseProcedure.query(async () => {
    // get all users, joined with their answers, with the scores summed up. order by score descending
    const leaderboard = await db
      .select({
        userId: usersTable.id,
        nickname: usersTable.nickname,
        crsid: usersTable.crsid,
        score: sql<number>`coalesce(sum(${answersTable.score}), 0)`,
        stars: sql<number>`count(${answersTable.id})`,
      })
      .from(usersTable)
      .leftJoin(answersTable, eq(answersTable.userId, usersTable.id))
      .groupBy(usersTable.id)
      .orderBy(
        desc(sql<number>`coalesce(sum(${answersTable.score}), 0)`),
        usersTable.id,
      );
    return leaderboard;
  }),
  getUserAnswers: protectedProcedure.query(async ({ ctx }) => {
    const answers = await db.query.answersTable.findMany({
      where: eq(answersTable.userId, ctx.user.id),
    });
    return answers;
  }),
});

export type AppRouter = typeof appRouter;
