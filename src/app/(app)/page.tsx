import { DateTimeProvider } from "@/components/datetime-context";
import { QuestionTimer } from "@/components/question-timer";
import { dateToQuestionNo } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import { TRPCError } from "@trpc/server";
import Link from "next/link";

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

  const questionsWithUserAnswers = sortedQuestions.map((question) => {
    const userAnswer = userAnswersMap.get(question.id);
    return { ...question, userAnswer };
  });

  return (
    <DateTimeProvider>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-lg flex flex-col gap-1 p-4 mb-32">
          {questionsWithUserAnswers.map((question) => (
            <div key={question.id} className="w-full flex justify-between">
              <Link
                href={`/2024/${dateToQuestionNo(question.date)}`}
                className="flex items-center space-x-4"
              >
                <h2 className="text-lg text-zinc-200 hover:text-zinc-300">
                  {dateToQuestionNo(question.date).padStart(2, "0")}
                </h2>{" "}
                <p className="text-lg text-zinc-400 hover:text-zinc-300">
                  {question.date}
                </p>
                {question.userAnswer && (
                  <span className="text-lg text-zinc-400">
                    ⭐ {question.userAnswer.score}
                  </span>
                )}
              </Link>
              <QuestionTimer releaseDateTime={question.releaseDateTime} />
            </div>
          ))}
        </div>
      </div>
    </DateTimeProvider>
  );
}
