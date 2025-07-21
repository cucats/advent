import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionSeventeenMarkdown = String.raw`
--- Day 17:  ---

We're in the home stretch now! Just over a week to Christmas and soon none of us will have to write (or solve) AOC puzzles ever again!

You shake your head, confused, wondering where that thought came from. What's an AOC? You must help Santa and Patch!!

Unfortunately, though the throughput of toys is now very high -- mostly due to your efforts! -- the output quality of the toys is not up to standard. Robots
are missing arms, dolls are headless, stuffed bears are missing their stuffing, and so on.

You're not sure you can face returning to the workshop itself again, so perhaps it's better to focus on the quality control. Surely this can't be too hard, right?

---

The Elf Quality Control Line consists of a line of \`n\` elves in a row, each having a queue of toys in front of them to inspect. Due to criminal negligence and a fundamental
elven incompetence, these queues are of completely varying lengths -- some elves have only a few toys to inspect, while others have thousands!

You are tasked with determining the optimal way to re-distribute the toys between the elves, such that they all have an equal number of toys to inspect.

You do this in a number of 'moves'. In each move, you can tell any \`m\` elves \`(1 <= m <= n)\` to give one toy from their queue to the queue of the elf directly to their left or right.

The input file is in a certain format. The first line is the number of elves, \`n\`. The next line consists of \`n\` integers, each representing the number of toys in the starting queue of the
corresponding elf.

Calculate the minimum number of 'moves' required to make all the elves have an equal number of toys!

Example:

elves = \`[1, 0, 5]\`

\`\`\`
Move 1:    1     0 <-- 5    =>    1     1     4
Move 2:    1 <-- 1 <-- 4    =>    2     1     3
Move 3:    2     1 <-- 3    =>    2     2     2
\`\`\`

Answer: \`3\`
`;

export default async function Page() {
    const error = await protectQuestion("17");
    const session = await getCurrentSession();
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
            <MarkdownRenderer>{QuestionSeventeenMarkdown}</MarkdownRenderer>
            <a
                download="q17.input.txt"
                href={`/api/asset?questionNo=17&assetName=q17.input.txt`}
                className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
            >
                Download Quality Control Input
            </a>
            <div className="flex flex-col mt-16">
                <TextAnswer
                    removeWhitespace
                    ignoreCase
                    questionNo="17"
                    session={session}
                />
            </div>
        </div>
    );
}
