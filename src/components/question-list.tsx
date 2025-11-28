"use client";

import Link from "next/link";
import { useDateTime } from "./datetime-context";
import type { QuestionWithUserAnswer } from "@/app/(app)/page";
import { cn, dateToQuestionNo } from "@/lib/utils";
import { QuestionTimer } from "./question-timer";

export const QuestionList = ({
  questionsWithUserAnswers,
}: {
  questionsWithUserAnswers: QuestionWithUserAnswer[];
}) => {
  const { currentDateTime } = useDateTime();

  return (
    <div className="w-full max-w-lg flex flex-col gap-1 p-4 mb-32">
      {questionsWithUserAnswers.map((question) => (
        <div key={question.id} className="w-full flex justify-between">
          <Link
            href={`/2025/${dateToQuestionNo(question.date)}`}
            className={cn(
              "flex items-center space-x-4",
              question.skipped || question.releaseDateTime > currentDateTime
                ? "pointer-events-none text-zinc-500 cursor-not-allowed"
                : "text-zinc-200 hover:text-zinc-300",
            )}
          >
            <h2 className="text-lg">
              {dateToQuestionNo(question.date).padStart(2, "0")}
            </h2>{" "}
            <p className="text-lg">{question.date}</p>
            {question.skipped ? null : question.userAnswer ? (
              <span className="text-lg text-zinc-400">
                ⭐ {question.userAnswer.score}
              </span>
            ) : question.releaseDateTime < currentDateTime ? (
              <span className="text-lg text-zinc-400">
                next answer worth {question.nextScore}
              </span>
            ) : null}
          </Link>
          <QuestionTimer
            releaseDateTime={question.releaseDateTime}
            skipped={question.skipped}
          />
        </div>
      ))}
    </div>
  );
};
