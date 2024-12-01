import { DateTimeProvider } from "@/components/datetime-context";
import { QuestionList } from "@/components/question-list";
import { trpc } from "@/trpc/server";
import { TRPCError } from "@trpc/server";

export type QuestionWithUserAnswer = Awaited<
  ReturnType<typeof trpc.getQuestions>
>[number] & {
  userAnswer:
    | Awaited<ReturnType<typeof trpc.getUserAnswers>>[number]
    | undefined;
};

export default async function Page() {
  const questions = await trpc.getQuestions();
  let userAnswers: Awaited<ReturnType<typeof trpc.getUserAnswers>>;
  try {
    userAnswers = await trpc.getUserAnswers();
  } catch (e) {
    if (e instanceof TRPCError && e.code === "UNAUTHORIZED") {
      // user is not logged in, can ignore
      userAnswers = [];
    } else {
      throw e;
    }
  }

  const sortedQuestions = questions.sort(
    (a, b) => a.releaseDateTime.getTime() - b.releaseDateTime.getTime()
  );

  const userAnswersMap = new Map(
    userAnswers.map((answer) => [answer.questionId, answer])
  );

  const questionsWithUserAnswers: QuestionWithUserAnswer[] =
    sortedQuestions.map((question) => {
      const userAnswer = userAnswersMap.get(question.id);
      return { ...question, userAnswer };
    });

  return (
    <DateTimeProvider>
      <div className="w-full flex flex-col items-center">
        <QuestionList questionsWithUserAnswers={questionsWithUserAnswers} />
      </div>
    </DateTimeProvider>
  );
}
