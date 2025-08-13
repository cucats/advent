import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
// import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
// import { getCurrentSession } from "@/lib/session";

const QuestionSevenMarkdown = String.raw`
Question writers taking a break today! :-)
`;

export default async function Page() {
  const error = await protectQuestion("7");
  // const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionSevenMarkdown}</MarkdownRenderer>
    </div>
  );
}
