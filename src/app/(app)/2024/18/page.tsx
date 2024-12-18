import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionEighteenMarkdown = String.raw`
--- Day 18: Sn0wdrift? ---

After the JollyScript compiler fiasco on Day 2, the Sn0wdrift Network hasn't been the same.
Originally designed to seamlessly relay messages between Santa's workshops worldwide, the system now scrambles everything into garbled nonsense.
Christmas lists, toy blueprints, even Santa's personal correspondence—nothing has come through unscathed.
 

“Honestly,” said Patch, nervously stacking marshmallows into a precarious tower, “I thought we fixed this! We *did* fix it! But then... something about the metadata packets got... uh... festive?”  

The elves are calling the phenomenon *Reindeer Code Shuffle*.
Messages don't just arrive scrambled; they're sorted by some strange, cryptic logic no one understands.
It's as if the Sn0wdrift Network invented its own secret alphabet—and now even Santa's Nice List is impossible to read.
 

*Patch shows you a list of nonsense words*

"It's supposed to be a list of toy requests, but instead, it's completely unintelligible.
Sorting it alphabetically by English rules makes even less sense."
Clearly, the Sn0wdrift Network is sorting messages according to its new “alphabet,” and your job is to figure out what it is.
 

Santa sighed as he handed you the latest garbled transmission.
“Fix this before Christmas Eve,” he said.
“If I get one more priority request for a 'blöörft' toy, I'm canceling hot cocoa privileges.”  

Patch whispered, “No pressure, but... if you crack the code, maybe we can use it to speed up sorting for next year!
Or, you know, make it *less* likely that every 'Nice' kid gets flagged as 'Naughty.'”  

Can you decode the Sn0wdrift Network's new sorting rules and restore order to Santa's communications?  

---

The Sn0wdrift Network has scrambled its messages using a strange new sorting logic, and you need to deduce the sorting order it follows.
 

You are given a list of words, where the words are claimed to have been sorted in alphabetical order - *but not according to the English alphabet*.
Instead, they follow a garbled, scrambled, befuddled alphabet determined by the Sn0wdrift Network.

Your task is to reconstruct the alphabet order used by the Sn0wdrift Network. It is guaranteed that there exists an order.

The input will be in a specific format. The first line contains an integer \`n\`, the number of words.
The next \`n\` lines contain the words in their supposed lexicographically sorted order.

Your answer should be the garbled alphabet. If there are multiple possible alphabets, return the lowest one lexicographically according to the *English* alphabet.

---

### Example
\`\`\`
5
wrt", "wrf", "er", "ett", "rftt"]\`
### Output
\`wertf\`
`;

export default async function Page() {
  const error = await protectQuestion("18");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionEighteenMarkdown}</MarkdownRenderer>
      <a
        download="q18.input.txt"
        href={\`/api/asset?questionNo=18&assetName=q18.input.txt\`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download ElfSpeak
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="18"
          session={session}
        />
      </div>
    </div>
  );
}
