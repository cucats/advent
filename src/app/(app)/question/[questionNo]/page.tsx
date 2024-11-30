import { trpc } from "@/trpc/server";

export default async function Page({ params }: { params: { questionNo: string } }) {
  const question = await trpc.getQuestion({ questionNo: params.questionNo });

  return <div>{question.title}</div>;
}
