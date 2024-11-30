import { Question } from "@/components/questions/question";
import { trpc } from "@/trpc/server";

export default async function Page(props: {
  params: Promise<{ questionNo: string }>;
}) {
  const params = await props.params;
  void trpc.getQuestion.prefetch({ questionNo: params.questionNo });

  return <Question questionNo={params.questionNo} />;
}
