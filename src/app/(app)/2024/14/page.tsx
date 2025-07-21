import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionFourteenMarkdown = String.raw`
--- Day 14: Elf Internships. ---

Patch burst into the room, jingling with what could only be described as unnecessary urgency:
a toolbelt clinked with candy canes, measuring tape, and what appeared to be a rubber ducky debugger wearing a Santa hat.

"Alright, drop everything!" Patch declared, throwing a stack of peppermint paper onto your desk. "This is it. The big one. The **Holiday Crisis**."

You stared at him. "Did you break the tinsel sorter again?"

"No! That was last week. This is much bigger. Monumentally bigger. Like... like when the gingerbread supply chain collapsed in 2194!"

You squinted at the diagram. "What... is it?"

"It's supposed to run smoothly! And now it doesn't! Don't you see? This is more than just a mistake. It's a holiday catastrophe. Like when Dasher ate all the glitter glue and ruined the reindeer maneuvers presentation."

You sighed. "So what do you want me to do?"

Patch clasped his hands dramatically. "You're the only one who can fix this. Everyone else is busy making candy cane rocket ships or testing the snowflake accuracy machine. I need **you**."

He pointed at a smudged sheet of JollyScript, the festive 2D language that always looked like a Christmas decoration gone rogue.
"I was showing off, y'know? Wanted them to see how creative I can be, so I added some extra loops here, a little festive flourish there...
and, uh, now it doesn't work. But if you debug it for me, they'll think I fixed it myself. Brilliant, huh?"

Before you could object, Patch was already pacing, muttering about how the program was supposed to be "a snowstorm of festive elegance" but now "looked like reindeer hoofprints in wet frosting."

"I mean, how hard can it be?" he said, pointing at the mess of code. "You just need to find the part where it went only *slightly* catastrophic."

You glance at the program. "You're applying to **Jolly Street**? Is that what this is all about?"

"Of course! Everyone wants to intern at Jolly Street?"

"And of course they're big believers in JollyScript..." you mutter.

"It's the only programming language optimised for festive efficiency!" Patch exclaims unintelligently.

---

JollyScript is an enterprise-grade language for intelligent elves.
It's so festive, that every JollyScript program is shaped like a Christmas tree!

JollyScript operates on a stack of 4-bit integers, also known as nibbles.

The program is executed via a cursor on a 2-dimensional grid. The cursor starts at the asterisk symbol \`*\`, usually at the top of the tree, and moves downwards diagonally.
It can go either **left** or **right**, but its initial direction is **left**.

After the cursor encounters a command, it continues in the same direction as before, unless the command changes the direction. Here are the commands for JollyScript:

* \`/\`: Set the direction to **left**.
* \`${"\\"}\`: Set the direction to **right**.
* \`^\`: Fork the program into two serial (non-parallel) threads, one going left, and one going right. Run the left in the **left** direction completely. When that terminates, run the **right** branch.
* \`~\`: Terminate this thread.
* \`+\`: Pop \`a\`, then pop \`b\`. Push \`a + b\` onto the stack.
* \`-\`: Pop \`a\`, then pop \`b\`. Push \`b - a\` onto the stack.
* \`:\`: Duplicate the top of the stack.
* \`%\`: Swap the top two values of the stack.
* \`$\`: Pop and discard the top of the stack.
* \`?\`: Look at the top of the stack. If it is zero, set the direction to **left**. Otherwise, **decrement** the top of the stack, and set the direction to **right**.
* \`0-9, A-F\`: Push a hexadecimal digit onto the stack.
* \`.\`: Print the top of the stack as a hexadecimal digit.
* \`"\`: Toggle **printing** mode. Characters encountered will instead be printed until printing mode is turned off.
* \`n\`: Print a newline.
* \`{\`: Remember this cursor location (but not the direction).
* \`}\`: Go back to the location you remembered, continuing in the same direction.
* All other characters are ignored.

The following is an example program in JollyScript.

\`\`\`
       *
      {
     ^ \
    ^ \ ^
   ^ - ? "
  4 % . n #
 5   . } n "
~~~~~~~~~~~~~
     |_|
\`\`\`

This is the output of the example program.
\`\`\`
41

#00
\`\`\`

---

As you grab your tools and head to the JollyScript Console, the elves cheer behind you. "You're the only one who can fix this! We believe in you!"

You've been tasked with debugging a program that's supposed to print **FizzBuzz**.
However, due to mildly unintelligent elf brains, **exactly one** character in the program is wrong!

Can you find the bug?

Your answer should be the location of the incorrect character, in the format \`(line number, column number)\`.
`;

export default async function Page() {
    const error = await protectQuestion("14");
    const session = await getCurrentSession();
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
            <MarkdownRenderer>{QuestionFourteenMarkdown}</MarkdownRenderer>

            <a
                download="q14.input.txt"
                href={`/api/asset?questionNo=14&assetName=q14.input.txt`}
                className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
            >
                Download JollyScript Program
            </a>
            <div className="flex flex-col mt-16">
                <TextAnswer
                    removeWhitespace
                    ignoreCase
                    questionNo="14"
                    session={session}
                />
            </div>
        </div>
    );
}
