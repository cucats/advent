"use client";

import { trpc } from "@/trpc/client";

export const TextAnswer = ({ questionNo }: { questionNo: string }) => {
  const [session, { isLoading }] = trpc.getCurrentSession.useSuspenseQuery();
  const submitAnswerMutation = trpc.submitAnswer.useMutation();

  const submitAnswer = (answer: string) => {
    submitAnswerMutation.mutate({ questionNo, answer });
  };

  return session.user ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitAnswer(e.currentTarget.answer.value);
      }}
      className="flex items-center gap-4 w-full justify-center"
    >
      <input
        type="text"
        name="answer"
        className="border-[1px] w-48 border-zinc-300 bg-black text-highlight px-2 py-1 text-sm"
      />
      <button type="submit" className="text-foreground hover:text-highlight">
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
