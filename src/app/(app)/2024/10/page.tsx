import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionTenMarkdown = String.raw`
--- Day 10: Offensive Naughtiness Reduction ---

After yesterday's Great Census, the number of elves seems to have conspicuously diminished. No matter -- more gingerbread cookies for you!
And now Santa seems to hold you in even highest esteem, with the promise of even greater intellectual tasks to come. This beats leetcode ANY day.

You think back to the shredded postcard from the Grinch, and start to wonder... is the Grinch truly the greatest source of Naughtiness?
If we were to optimise, wouldn't it be objectively correct to come down harder on naughty kids first to reduce naughty peer pressure?
It is time to embrace your inner Posh Cambridge Student and do what you do best: narc on the naughty kids.

You bring this up to Santa, and he seems overjoyed at the suggestion.

"Ho ho ho! What a festive idea! Let's get right on it -- that's what we mine the coal for!"

With a twinkle in his eye, he expands: "This is fantastic. I HATE children!"

---

Santa shows you a whitepaper produced by one of his research labs, formalising the phenomenon: Naughty children have the unfortunate ability to influence their friends,
eventually causing all connected children by any path of friendship to become naughty.

It's too late to change the number of naughty kids for this year, but you can still try to minimise the amount of naughtiness spread next year by distributing coal to certain naughty kids.
Giving coal to a naughty child will immediately turn them nice for next year, stopping them from spreading naughtiness.

Santa has identified \`k\` naughty children this Christmas. Unfortunately, he only has \`c\` pieces of coal left, due to a logistical problem which can only be attributed to **Patch**!
You must determine which \`c\` naughty children should be punished this Christmas, so that the amount of naughtiness spread next year is minimised. Note that giving coal to a naughty child
doesn't prevent them from becoming naughty again if they have a path to another naughty child.

The input file will be in a specific format. The first line contains four integers, \`n\`, \`m\`, \`k\`, and \`c\`: the number of children, the number of friendships, the amount of naughty children, and the number of pieces of coal that Santa has.
The next line contains \`k\` integers split by spaces, the list of naughty children's IDs.
\`m\` lines follow, each representing a friendship: \`x y\` means the child with ID \`x\` is a friend of the child with ID \`y\` (and vice-versa).

Your task is to find the \`c\` naughty children that should be punished this Christmas.

Give the answer in the form \`x,y,z,...\`, where \`x,y,z,...\` are the IDs of the naughty children that should be punished this Christmas.
If there are multiple choices for sets of punished children, choose the lowest set lexicographically.
`;

export default async function Page() {
  const error = await protectQuestion("10");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionTenMarkdown}</MarkdownRenderer>
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
