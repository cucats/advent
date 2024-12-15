import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionFifteenMarkdown = String.raw`
--- Day 15: JollyStreet Advertising ---

You wake up to find an ENORMOUS stuffed stocking at the foot of your bed! In a slight sense of panic, you realise someone must have snuck in while you were sleeping...

You empty the stocking onto the floor, and a mountain of sweets and chocolates spill out, followed by a T-shirt and a note. The note promises untold riches, prestige,
and 'complex problems' with 'expert colleagues'. That sounds great to you! The only caveat is that you must do unpaid labour for them first -- maybe you should go with
Jump Sleighing or Optibrrr instead...

---

JollyStreet wants to advertise their internships to the carefully molded JollyScript experts at the North Pole. They have a billboard in Santa's Village,
and they wish to maximise the height of this billboard, so that it can be seen by the most elves!

The billboard will have two candy cane supports, one on each side. The two supports must be an equal height.

You will be given a collection of smaller candy canes that can be glued together to form longer canes. For example, if you have the candy canes of length \`2\`, \`3\`, and \`5\`,
you can glue them together to form a cane of length \`10\`.

You will be given the input file in a certain format. The first line, \`n\`, is the number of candy canes. The next line will be a list of \`n\` space-separated integers,
the lengths of the candy canes!

Calculate the maximum height of the billboard that can be achieved, given that the two supports must be an equal height.
`;

export default async function Page() {
  const error = await protectQuestion("15");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionFifteenMarkdown}</MarkdownRenderer>
      <a
        download="q15.input.txt"
        href={`/api/asset?questionNo=15&assetName=q15.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download JollyStreet Data
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="15"
          session={session}
        />
      </div>
    </div>
  );
}
