"use client";

import { trpc } from "@/trpc/client";
import { EulerQuestion } from "./euler-question";
import { LeetcodeQuestion } from "./leetcode-question";
import { MultiplayerQuestion } from "./multiplayer-question";

export const Question = ({ questionNo }: { questionNo: string }) => {
  const [data] = trpc.getQuestion.useSuspenseQuery({ questionNo });

  switch (data.type) {
    case "euler":
      return <EulerQuestion question={data} />;
    case "leetcode":
      return <LeetcodeQuestion question={data} />;
    case "multiplayer":
      return <MultiplayerQuestion question={data} />;
  }
};
