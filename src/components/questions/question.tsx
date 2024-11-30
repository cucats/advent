"use client";

import { trpc } from "@/trpc/client";
import { EulerQuestion } from "./euler-question";
import { LeetcodeQuestion } from "./leetcode-question";
import { MultiplayerQuestion } from "./multiplayer-question";

export const Question = ({ questionNo }: { questionNo: string }) => {
  const [data] = trpc.getQuestion.useSuspenseQuery({ questionNo });
  const [currentSession] = trpc.getCurrentSession.useSuspenseQuery();

  switch (data.type) {
    case "euler":
      return <EulerQuestion question={data} currentSession={currentSession} />;
    case "leetcode":
      return <LeetcodeQuestion question={data} />;
    case "multiplayer":
      return <MultiplayerQuestion question={data} />;
  }
};
