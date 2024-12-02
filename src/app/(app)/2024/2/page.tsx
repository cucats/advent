import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const questionTwoMarkdown = String.raw`
--- Day 2: ... ---
...
`;

export default async function Page() {
  const error = await protectQuestion("2");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{questionTwoMarkdown}</MarkdownRenderer>
      <a
        download="q2.input.txt"
        href={`/api/asset?questionNo=2&assetName=q2.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Input file
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer removeWhitespace questionNo="2" session={session} />
      </div>
    </div>
  );
}
