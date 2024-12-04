import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionFourMarkdown = String.raw`
--- Day 4: JollyScript Bootcamp ---

You've barely had the chance to rest on your laurels when Patch comes banging on the (gingerbread) door of your (gingerbread) hotel room.

"You did a great job back there, real jolly! Real merry!" He says through gritted teeth.

You're confused -- you wrote a pretty neat algo for the Confectionery Lab's Accelerator, didn't you? There must be something else going on...
you throw on your new Santa x Lululemon x Cambridge hoodie and brace for the biting North Pole frost.

You catch Patch muttering to himself; *"That was my chance! To bust the elf union! Now santa's gonna be SO mad..."*

When he sees you, he flips on the merry switch and leads you excitedly outside.

"Really, that was fantastic! Super impressive! We've been talking and I think it's time for you to tackle one of the most serious bugs this Christmas
-- a crucial microservice in the Holiday Algorithm has failed, and isn't outputting what it should."

You take a deep breath. After all that Ocaml training, you can deal with ANY esolang. "It's written in JollyScript, isn't it."

"It's the only programming language optimised for festive efficiency!" Patch exclaims unintelligently.

"You said that yesterday, though?"

"No, two days ago!"

---

JollyScript is an enterprise grade language for intelligent elves.
It's so festive, that every JollyScript program is shaped like a Christmas tree!

JollyScript operates on a stack of integers.

The cursor starts at the asterisk at the top of the tree \`*\`, and moves downwards. It can go either **left** or **right**, but its initial direction is **left**.

After the cursor encounters a command, it continues in the same direction as before, unless the command changes the direction. Here are the commands for JollyScript:

* \`/\`: Set the direction to **left**.
* \`\\\`: Set the direction to **right**. *(just one backslash - markdown rendering issue)*
* \`^\`: Fork the program into two threads, one going left, and one going right. Run the left branch completely. When that terminates, run the right branch.
* \`:\`: Duplicate the top of the stack.
* \`%\`: Swap the top two values of the stack.
* \`+\`: Pop \`a\`, then pop \`b\`. Push \`a + b\` onto the stack.
* \`-\`: Pop \`a\`, then pop \`b\`. Push \`b - a\` onto the stack.
* \`?\`: Look at the top of the stack. If it is zero, set the direction to **left**. Otherwise, decrement the top of the stack, and set the direction to **right**.
* \`$\`: Pop and discard the top of the stack.
* \`0-9\`: Push a digit onto the stack.
* \`"\`: Toggle **printing** mode. Characters encountered will instead be printed until printing mode is turned off.
* \`A-F\` (Capital letters): Push a hexadecimal digit onto the stack.
* \`n\`: Print a newline.
* \`{\`: Remember this cursor location.
* \`}\`: Go back to the location you remembered.
* \`~\`: Terminate this thread.

As you grab your tools and head to the JollyScript Console, the elves cheer behind you. "You're the only one who can fix this! We believe in you!"

You've been tasked with debugging a program that's supposed to print the **Twelve Days of Christmas**. Due to clumsy elf fingers, **exactly one** character in the program is wrong!

Can you find the bug?

Your answer should be the column number multiplied by the row number of the incorrect characters.
`;

export default async function Page() {
  const error = await protectQuestion("3");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionFourMarkdown}</MarkdownRenderer>
      <a
        download="q4.input.txt"
        href={`/api/asset?questionNo=4&assetName=q4.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download JollyScript Program
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="4"
          session={session}
        />
      </div>
    </div>
  );
}
