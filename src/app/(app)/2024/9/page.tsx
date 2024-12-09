import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionNineMarkdown = String.raw`
--- Day 9: Great Elf Census ---

After yesterday's turmoil, Santa has gone into serious panic mode as to the state of his workforce -- if they can't even count down from 99, how can they be expected to create the world's
toys? The situation is even worse: Santa's lost track of how many elves there even are! Or where they come from! Or whether they sleep or eat or anything!

In a frosty flurry, Santa issued some Merry Memos, mainlined a couple dozen migraine pills, and commissioned the Great Elf Census with you and Patch at the helm. What is he going to do
with this information? Almost certainly fire people. Do you feel ethically at fault? No. They invented JollyScript.

---

To count the elves, you of course focus on their only purpose: their labor. Each elf is acutely aware of how many other elves do the same exact job as them,
since Santa only pays the top 20 or so elves doing any one job.

Patch made use of this to ask a subset of elves how many other elves do the same job as them. After asking these elves, he collected the answers into
a list \`answers\`, where \`answers[i]\` is the answer of the \`i\`th elf.

Given this list, you need to determine the **minimum possible** number of elves working under Santa.

Example:

\`\`\`
answers = [1, 2, 2]
\`\`\`

In this case, the two elves that answered 2 could both be working the same job, meaning there's only 1 elf remaining un-asked for that job. For the elf that answered 1,
there is definitely 1 other elf working that job that hasn't been asked. Therefore, the minimum total number of elves is 5 -- 2 elves that answered 2, 1 elf that answered 1,
1 elf working the same job as the elf that answered 1, and 1 elf working the same job as the elves that answered 2.
`;

export default async function Page() {
  const error = await protectQuestion("9");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionNineMarkdown}</MarkdownRenderer>
      <a
        download="q9.input.txt"
        href={`/api/asset?questionNo=9&assetName=q9.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Elf Answers
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="9"
          session={session}
        />
      </div>
    </div>
  );
}
