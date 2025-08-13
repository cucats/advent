import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionSixteenMarkdown = String.raw`
--- Day 16: Song Re-Constructor 6174 ---

It was an unsnowy grey December afternoon, and Patch the elf had just unveiled his latest project to great fanfare.
Well, mostly his own fanfare.
"Behold!" he said, waving a large scroll covered in colorful scribbles,
"The Song Reconstructor 6174! It can rebuild any Christmas carol, no matter how jumbled the lyrics!"

You raise an eyebrow. "6174! is a large number indeed. r/unexpectedfactorial."

"Huh?" Patch said, clearly offended. "This is science! But... there's a tiny problem."
Patch holds up a piece of peppermint paper that looked more like a ransom note than a carol.
"See, I loaded the memory banks with fragments of lyrics. Now it's stuck trying to
reconstruct the full songs, and I think it's gone rogue. It mashed up Silent Night with Grandma Got Run Over by a Reindeer. Terrifying."

The elves gathered around, scratching their heads.
Candyfloss, the head of Quality Uncontrol, finally chimed in.
"What you're saying is, we need to figure out how to chain these fragments
back together properly, to get the original songs, right?"

"Exactly!" Patch exclaimed unintelligently.

---

Patch's state-of-the-art Song Re-Constructor 6174 can piece together **broken CDs**! It has been loaded with a set of CD fragments.
Each fragment has been helpfully labelled with the lyrics of that portion of the song, e.g. \`jinglebells\`.
The machine is programmed to **clone, slice and dice** these fragments, and reconstruct the complete song, but the process isn't perfect -
when a fragment is cut up, only the **later portion** can be used, such as \`bells\`. Fragments can be cloned and used **multiple times**.

Your job is to help it figure out how to reconstruct each Christmas song using the fewest fragments possible.

You are given the target song as a string, \`s\`, which needs to be reconstructed.
You are also given \`n\` strings \`g[0],g[1],...,g[n-1]\`, which represent the lyrics of the available fragments.
The lyrics of each fragment can be used to provide any of its suffixes.

Determine the **minimum number of fragments** needed to reconstruct \`s\`.
If \`s\` cannot be reconstructed from the given fragments, return \`-1\`.

The first line contains \`t\`, the number of test cases.
Each test case begins with an integer \`n\`, the number of fragments,
followed by the target string \`s\` on the next line.
The subsequent \`n\` lines each contain the lyrics for each fragment, \`g[i]\`.

Your answer should be the **sum of the answers to the test cases**.
`;

export default async function Page() {
  const error = await protectQuestion("16");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionSixteenMarkdown}</MarkdownRenderer>
      <a
        download="q16.input.txt"
        href={`/api/asset?questionNo=16&assetName=q16.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Jumbled up Lyrics
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="16"
          session={session}
        />
      </div>
    </div>
  );
}
