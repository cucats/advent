"use client";

import { SessionValidationResult } from "@/lib/session";
import { trpc } from "@/trpc/client";
import { useRef, useState } from "react";

export const TextAnswer = ({
  questionNo,
  removeWhitespace,
  session
}: {
  questionNo: string;
  removeWhitespace?: boolean;
  session: SessionValidationResult;
}) => {
  const submitAnswerMutation = trpc.submitAnswer.useMutation();
  const {
    data: userQuestionAnswered,
    refetch,
  } = trpc.getUserQuestionAnswered.useQuery({ questionNo });
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const submitAnswer = (answer: string) => {
    submitAnswerMutation.mutate(
      {
        questionNo,
        answer: removeWhitespace ? answer.replace(/\s/g, "") : answer,
      },
      {
        onSuccess: ({ correct }) => {
          formRef.current?.reset();
          if (correct) {
            refetch();
          } else {
            setError("Incorrect answer, try again!");
          }
        },
        onError: (error) => {
          setError(error.message);
        },
      }
    );
  };

  if (userQuestionAnswered) {
    return (
      <div className="text-foreground">
        You&apos;ve solved this problem, and earned {userQuestionAnswered.score}{" "}
        points!
      </div>
    );
  }

  return session.user ? (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        submitAnswer(e.currentTarget.answer.value);
      }}
      className="flex items-center gap-4 w-full justify-center"
    >
      <div className="flex flex-col w-48 relative">
        <input
          type="text"
          name="answer"
          className="border-[1px] w-48 border-zinc-300 bg-black text-highlight px-2 py-1"
        />
        {error && (
          <div className="text-red-500 absolute text-sm top-10 w-96">
            {error}
          </div>
        )}
      </div>
      <button
        disabled={submitAnswerMutation.isPending}
        type="submit"
        className="text-foreground hover:text-highlight disabled:text-green-800 disabled:cursor-not-allowed disabled:hover:text-green-800"
      >
        [submit]
      </button>
    </form>
  ) : (
    <div>
      <h3>Please log in to submit an answer</h3>
    </div>
  );
};
