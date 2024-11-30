import { EulerQuestion } from "@/components/questions/euler-question";
import { LeetcodeQuestion } from "@/components/questions/leetcode-question";
import { MultiplayerQuestion } from "@/components/questions/multiplayer-question";
import { trpc } from "@/trpc/server";

export default async function Page(props: { params: Promise<{ questionNo: string }> }) {
  const params = await props.params;
  const question = await trpc.getQuestion({ questionNo: params.questionNo });

  switch (question.type) {
    case "euler":
      return <EulerQuestion question={question} />;
    case "leetcode":
      return <LeetcodeQuestion question={question} />;
    case "multiplayer":
      return <MultiplayerQuestion question={question} />;
  }

  throw new Error("Invalid question type");
}
