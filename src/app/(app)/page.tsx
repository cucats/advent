import { DateTimeProvider } from "@/components/datetime-context";
import { QuestionTimer } from "@/components/question-timer";
import { dateToQuestionNo } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import Link from "next/link";

export default async function Page() {
  const questions = await trpc.getQuestions();

  const sortedQuestions = questions.sort(
    (a, b) => a.releaseDateTime.getTime() - b.releaseDateTime.getTime()
  );

  return (
    <DateTimeProvider>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-xl flex flex-col gap-1 p-4">
          {sortedQuestions.map((question) => (
            <div key={question.id} className="w-full flex justify-between">
              <Link
                href={`/question/${dateToQuestionNo(question.date)}`}
                className="flex items-center space-x-4"
              >
                <h2 className="text-lg text-zinc-300 hover:text-zinc-100">
                  {dateToQuestionNo(question.date).padStart(2, "0")}
                </h2>{" "}
                <p className="text-lg text-zinc-500 hover:text-zinc-400">
                  {question.date}
                </p>
              </Link>
              <QuestionTimer releaseDateTime={question.releaseDateTime} />
            </div>
          ))}
        </div>
      </div>
    </DateTimeProvider>
  );
}
