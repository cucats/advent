import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionNineMarkdown = String.raw`
--- Day 10: Naughty or Nice ---


---

Santa has noticed a troubling trend among children: naughtiness **spreads**! Naughty children have the unfortunate ability to influence their friends, eventually causing the maximum possible number of children to become naughty.
Santa has identified \`k\` naughty children this Christmas, and wants to make sure they get punished, so that naughtiness is minimised next year. Unfortunately, he only has \`c\` pieces of coal left, due to a logistical problem which can only be attributed to **Patch**.

Santa wants to prevent as much naughtiness as possible. He can choose \`c\` children to receive coal this Christmas, which will hopefully make them nice again. Removing a child means that they start the year as nice and will not spread naughtiness, but they could still become naughty afterwards!

The input file will be in a specific format. The first line contains four integers, \`n\`, \`m\`, \`k\`, and \`c\`, which are the number of children, the number of friendships, the amount of naughty children, and the number of pieces of coal that Santa has.
The next line contains \`k\` integers, the list of naughty children.
\`m\` lines follow, each representing a friendship: \`x y\` means \`x\` is a friend of \`y\` (and vice-versa).

Your task is to find the minimum amount of naughty children, after punishing \`c\`.
`;

export default async function Page() {
  const error = await protectQuestion("10");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionNineMarkdown}</MarkdownRenderer>
      <a
        download="q10.input.txt"
        href={`/api/asset?questionNo=10&assetName=q10.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Elf Answers
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="10"
          session={session}
        />
      </div>
    </div>
  );
}
