import { trpc } from "@/trpc/server"

export default async function Page() {
  const questions = await trpc.getQuestions();

  return (
    <div className="w-full flex flex-col items-center">
      {questions.map((question) => (
        <div key={question.id} className="w-full flex flex-col items-center">
          <h2 className="text-xl font-bold">{question.title}</h2>
          <p className="text-sm text-zinc-500">{question.date}</p>
        </div>
      ))}
    </div>
  );
}
