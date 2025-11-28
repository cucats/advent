import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const questionOneMarkdown = String.raw`
Note: This is the 2024 question. Replace this with the new one!

---

--- Day 1: Debugging Christmas ---

It was a peaceful December morning at the North Pole. Santa was sipping his gingerbread latte, with Mrs Claus knitting matching jumpers. Everything seemed perfect. Too perfect.

As the countdown to December 25th began, the unthinkable happened. Somewhere deep inside the Holiday Algorithm, something went horribly wrong.
Instead of neatly organising the Naughty/Nice lists and gift orders, the algorithm started spitting out _nonsense_:

* Little Timmy was scheduled to receive 41 left-foot socks.
* Goody Gerda was due to receive 10 tonnes of coal.
* The GPS coordinates for Santa's sleigh were inexplicably set to the moon.

The elves stared at the screens, horrified. "This... this can't be right!" said Tinker, the coding intern elf.
No one dared to tell Santa. "Is this... a stack overflow?" "No," murmured Jingle, the head elf, trembling. "It's worse. **It's a heap of bugs.**"

The elves quickly turn to the only people they knew who could save Christmas. "There's got to be some intelligent life in Cambridge!" remarked Tinker.
"For each problem you solve, we'll reward you with **one star**!", said Holly, head of Elven Resources. "If you get **all twenty-five stars** by 25th December,
we'll reward you greatly! And so, they send you off in a sleigh to the North Pole.

Unfortunately, the sleigh's GPS is reading bogus numbers! Before taking off, the sleigh needs to be calibrated.
The route planner has been loaded with a list of coordinates, but the destination (the last of the coordinates) isn't properly set.
The North Pole should always be at \`(0, 0)\`, but right now it's off by some amount!

To fix this, we need to adjust the entire route so the destination aligns with \`(0, 0)\`. For example, if the route loaded in the GPS is
\`[(4, -2), (3, 2), (1, 3), (-1, 1), (-3, -2)]\`, then we must add \`(3, 2)\` to every coordinate to make the final destination, the North Pole, \`(0, 0)\`.
Here, after adding \`(3, 2)\` to every coordinate, we would get \`[(7, 0), (6, 4), (4, 5), (2, 3), (0, 0)]\`. For your answer, you should return the coordinate
that is furthest away (by Euclidean Distance) from the North Pole, so in this example, you would return \`(6, 4)\`.

The input file will be in a particular format. The first line contains an integer, \`N\`. \`N\` lines follow, each containing two integers separated by
a space, representing the \`x\` and \`y\` coordinates of the point.

The answer should be given in the format \`(x, y)\`.
`;

export default async function Page() {
  const error = await protectQuestion("1");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{questionOneMarkdown}</MarkdownRenderer>
      <a
        download="q1.input.txt"
        href={`/api/asset?questionNo=1&assetName=q1.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Input file
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer removeWhitespace questionNo="1" session={session} />
      </div>
    </div>
  );
}
