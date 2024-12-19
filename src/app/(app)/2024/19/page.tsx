import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionNineteenMarkdown = String.raw`
--- Day 19: Decoy Sleigh ---

Word has spread through Santa's Village that the Grinch is bringing the festive offensive closer to home. No more freezing Cambridge over, this time he means *business*.

A tipoff was sent in that the Grinch has set up a base in the North Pole, and his main plan is to steal Santa's sleigh on Christmas Eve!
He'll take all the presents and give them to the naughty kids -- and this is, of course, a disaster.

You can't rely on elf security systems to keep the sleigh safe, so you've hatched a cunning plan: you'll set up a decoy sleigh for the Grinch to steal! This decoy will be
identical to Santa's sleigh in every way, and will even have real presents to sell the ploy. The only (rather important) difference is that the decoy sleigh will be programmed
to nosedive over the Pacific Ocean.

Unfortunately, when you requested the decoy sleigh to be set up, the elves accidentally loaded up the presents randomly into the two sleighs! You *expressly* requested the two sleighs
to be identical, with a mirror copy of each present, but oh well. Elven incompetence is a convenient device to make programming problems.

---

You have two sleighs containing \`n\` presents each. You know, to start out with, the sizes of the presents in each sleigh -- this is given by two integer arrays.

To make sure that the Grinch takes the bait, you need to make both sleighs **equal**. From the Grinch's point of view, the two sleighs are indistinguishable if they have
the same number of presents of each size. i.e. sorting the two sleighs' present arrays by present size should yield two identical arrays.

You have an operation that you can tell Patch to perform, swapping the present at index \`i\` of sleigh one with the present at index \`j\` of sleigh two. Luckily -- due
to the elf union finally being busted by Santa -- he's not allowed to complain about long working hours, and he can perform this operation as many times as you want!

You do need to make sure it doesn't take too long, though. The cost, in time, of each operation
is the **minimum** of the present sizes at indices \`i\` and \`j\` of the two sleighs.

The total time taken to make the sleighs equal is the sum of the costs of all the operations you tell Patch to perform. What's the minimum time it will take to make the two sleighs identical?

Example:

Sleigh 1: \`[5,3,3,4]\`, Sleigh 2: \`[2,5,4,2]\`

The minimum possible overall cost would be 2; you can swap the present at index \`1\` of sleigh 1 with the present at index \`0\` of sleigh 2. The cost of this operation is 2, since the
two presents have sizes 3 and 2, the minimum of which is 2.

After this operation, the sleighs are \`[5,2,3,4]\` and \`[3,5,4,2]\`. Sorting these yields \`[2,3,4,5]\` and \`[2,3,4,5]\`, which are identical, with total cost 2.
`;

export default async function Page() {
  const error = await protectQuestion("19");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionNineteenMarkdown}</MarkdownRenderer>
      <a
        download="q19.input.txt"
        href={`/api/asset?questionNo=19&assetName=q19.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Starting Weights
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="19"
          session={session}
        />
      </div>
    </div>
  );
}
