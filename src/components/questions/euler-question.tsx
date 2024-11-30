"use client";

import { Question } from "@/lib/types";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import { MarkdownRenderer } from "./markdown-renderer";
import { trpc } from "@/trpc/client";
import { RouterOutput } from "@/trpc/client";

export const EulerQuestion = ({
  question,
  currentSession,
}: {
  question: Question;
  currentSession: RouterOutput["getCurrentSession"];
}) => {
  const submitAnswerMutation = trpc.submitAnswer.useMutation();

  const submitAnswer = (answer: string) => {
    submitAnswerMutation.mutate({ questionNo: question.date, answer });
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl w-full">
      <h1 className="text-xl font-bold text-zinc-200">
        <span className="text-zinc-400 mr-4">{question.date}</span>
        {question.title}
      </h1>
      <MarkdownRenderer>{question.question}</MarkdownRenderer>
      {currentSession.user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAnswer(e.currentTarget.answer.value);
          }}
          className="flex gap-4"
        >
          <input
            type="text"
            name="answer"
            className="bg-black text-highlight border-[1px] border-zinc-200 px-2 py-1 text-sm"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};
