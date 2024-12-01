"use client";

import { trpc } from "@/trpc/client";
import { useRef, useState } from "react";

export const TextAnswer = ({ questionNo, removeWhitespace }: { questionNo: string, removeWhitespace?: boolean }) => {
  const [session, { isLoading }] = trpc.getCurrentSession.useSuspenseQuery();
  const submitAnswerMutation = trpc.submitAnswer.useMutation();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const submitAnswer = (answer: string) => {
    submitAnswerMutation.mutate(
      { questionNo, answer: removeWhitespace ? answer.replace(/\s/g, "") : answer },
      {
        onSuccess: ({ correct }) => {
          formRef.current?.reset();
          setError(null);
          setSuccess(correct);
          console.log(success);
        },
        onError: (error) => {
          setError(error.message);
        },
      }
    );
  };

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
          className="border-[1px] w-48 border-zinc-300 bg-black text-highlight px-2 py-1 text-sm"
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
  ) : isLoading ? (
    <div>
      <h3>Loading...</h3>
    </div>
  ) : (
    <div>
      <h3>Please log in to submit an answer</h3>
    </div>
  );
};
