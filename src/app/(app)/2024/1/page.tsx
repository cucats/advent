import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";

const questionOneMarkdown = String.raw`
# Question 1

...

$\sum_{i=1}^{10} i = 55$
`;

export default async function Page() {
  const error = await protectQuestion("1");
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl p-4">
      <MarkdownRenderer>{questionOneMarkdown}</MarkdownRenderer>
      <div className="flex flex-col gap-4">
        <TextAnswer questionNo="1" />
      </div>
    </div>
  );
}
