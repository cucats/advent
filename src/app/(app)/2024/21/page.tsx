import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { protectQuestion } from "@/lib/auth";

const QuestionTwentyOneMarkdown = String.raw`
Question writers taking a break today! :-)
`;

export default async function Page() {
  const error = await protectQuestion("21");
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionTwentyOneMarkdown}</MarkdownRenderer>
    </div>
  );
}
