import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionEightMarkdown = String.raw`
--- Day 8: Meltdown ---

Santa's workshop is abuzz with activity, and the air is filled with the hum of festive coding and gift-making.
This year, Santa decided to automate part of the holiday cheer with the help of some songs.

Patch spots you hiding in the corner.
"Oh, you're here again! Disaster! Catastrophe! The sing-a-song program is broken, and I'm pretty sure it's _your_ fault."

"But I just got here! How is this my fault?", you exclaim.

"Uh, because you're like, the closest person to the bug? Proximity blame."

"Can't argue with that. But what songs?"

"Yes! You know, the '99 Glasses of Milk on the Wall' song? It's crucial for morale! The assembly line elves sing it while they work to keep rhythm. Without it, they start... improvising."

Patch gestures to a group of elves clumsily assembling toys.
One elf chants, “87 marshmallows in a bag,” while another responds, “What's the next verse?”

"See? It's a disaster!", Patch cries. "They can't remember the lyrics, even though it's the same thing over and over.
They're just not wired for repetition! That's why we made a program to sing it for them. But now it's broken, and instead of singing about cookies and milk, it's yelling about... Jack's Gelato."

Patch thrusts a printout of the JollyScript program into your hands.
The code, shaped like a festive spruce tree, sparkles with horror.

"Why JollyScript?", as you roll your eyes. "Couldn't you go with something more standard, you know, like Haskell?"

"It's the only programming language optimised for fes-" BAM! Suddenly Santa slams the door open, squishing Patch in an instant.
Santa's debugging alarm (a giant blinking candy cane) has gone off. It turns out the JollyScript code powering the song has a bug, and now the song ends prematurely.
Instead of going from 99 to 0, the song is in a nonsensical order!

Santa growls with despair. "The elves are in a frenzy. They can't work without the song!"

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

You've been tasked with debugging a program that's supposed to print **99 Glasses of Milk**.
However, due to unintelligent elf brains, **exactly one** character in the program is wrong!

Can you find the bug?

Your answer should be the location of the incorrect character, in the format \`(line number, column number)\`.
`;

export default async function Page() {
  const error = await protectQuestion("8");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionEightMarkdown}</MarkdownRenderer>
      <a
        download="q8.input.txt"
        href={`/api/asset?questionNo=8&assetName=q8.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download JollyScript Program
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="8"
          session={session}
        />
      </div>
    </div>
  );
}
