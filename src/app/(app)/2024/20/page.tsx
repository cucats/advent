import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionTwentyMarkdown = String.raw`
--- Day 20: Did you mean: *pico*? ---

"You've never used *pico*?" asked Grindle, peering over his half-moon glasses like Patch had just admitted to coding in crayon.
"It's like, the backbone of all JollyStreet infrastructure! Every line of code, every blueprint, every list — it's done in pico."

Patch squinted at the tiny, glowing BSU flash drive in Grindle's hand. "Looks... old-fashioned. Does it even have syntax highlighting?"

Grindle gasped. "Syntax highlighting? Syntax highlighting?!
Stupid elf, if you need colors to tell you what's wrong, then maybe coding isn't for you."

Patch stared. "Okay, fine, but why's it called *pico*?"

Grindle smirked. "Because it's the smallest.
Efficient. Minimalistic. It doesn't waste resources on bells and whistles.
It's just you, the text, and a whole lot of judgment."

"Judgment?" Patch raised an eyebrow.

"Oh, you'll see." Grindle handed over the BSU drive. "Go on. Install it. But don't cry when it tells you you're incompetent."

Later, in their cubicle, Patch booted up *pico* for the first time. The screen flickered to life with a blaring **BEEP**.

**WHAT IS YOUR FUNCTION?**

the screen demanded in all caps.

Patch typed cautiously: "Code. For efficiency."

The editor paused, as if considering this.

**WE SHALL SEE. PRESS \`:enew\` TO PROVE YOU ARE WORTHY.**

Patch obeyed. The screen blinked.

**INCORRECT KEY SEQUENCE. TRY AGAIN.**

"But I pressed it," muttered Patch.

**NO, YOU PRESSED \`:eeww\`. LEARN YOUR FINGERS.**

An hour later, Grindle strolled by to find Patch clutching their head. "What's wrong?"

"It — it insulted me. Said I type like a penguin on roller skates!"

"Sounds about right," Grindle said, nodding approvingly. "It's designed to humble you."

Patch threw their hands up. "It refused to let me paste a snippet! Said I hadn't 'earned clipboard privileges' yet!"

"Ah, yes, classic *pico*. It builds character." Grindle patted Patch on the back.
"By the time you've mastered it, you'll be editing code faster than Blitzen can debug a sleigh module."

Patch groaned, turning back to the screen. It had gone ominously quiet, save for the blinking cursor.

**HOW MANY LINES OF UNUSED CODE DO YOU LEAVE IN YOUR PROJECTS?**

Patch hesitated. "I don't know — sometimes a few?"

The screen filled with blinking text: 

**DISGUSTING. REMOVE YOURSELF FROM THIS TERMINAL IMMEDIATELY.**

---

*pico* is a text editor exclusively for the most resilient of elves.

You are given a target string, and you must find the minimum number of moves required to recreate it.
The allowed moves are:

* Type a letter: Append one character to the end of the string.
* Copy a substring: Select a substring within the current text buffer and copy it to the clipboard, overwriting any previous clipboard value.
* Paste the clipboard: Append the entire clipboard value to the end of the string.

Can you help Patch optimize their commands and impress the JollyStreet team?

The first line of the input file contains a single integer, \`n\`, the number of test cases.
\`n\` test cases follow, each containing a line with a string.
For each test case, you start with an empty text buffer and clipboard.

Your answer should be the sum of the **minimum amount of moves** for each test case.
`;

export default async function Page() {
  const error = await protectQuestion("20");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionTwentyMarkdown}</MarkdownRenderer>
      <a
        download="q20.input.txt"
        href={`/api/asset?questionNo=20&assetName=q20.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Strings
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="20"
          session={session}
        />
      </div>
    </div>
  );
}
