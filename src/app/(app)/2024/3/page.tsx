import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const questionThreeMarkdown = String.raw`
--- Day 3: Faulty Mint Boosters ---

After a long day of sleigh-riding, elf-listening, panopto-watching, and elf-ignoring, you finally pull into the Confectionary Laboratory's parking lot.
You jump off the sleigh, pull up your trusty quant socks, and hurry inside, with Patch close behind.

You're greeted by a scene of absolute disarray. The place is littered with mince pies -- piles upon piles of them, as far as the eye can see.
Wild-eyed white-coated elves scurry in every direction, with a pulsing ring of green and red light looming above it all: the Peppermint Accelerator itself!

Patch, nearly tripping over a coil of blinking fairy lights, manages to grab a passing elf and drag them over to you.

"You've been sent? By Santa? I fear it's too late for that. The Peppermint Accelerator is going critical!"

You nod, trying to look calm. "Don't worry. I did Intro to Graphics Tick 2. What's going on?"

The elf gulps. "Well, the Peppermint Accelerator is a device we use to ensure perfect minty-ness for our candy canes.
Once we get our candy zooming faster than light, we collide them in the Spiral Infuser to create bursts of festive freshness. It's all very scientific."

*You climb the stairs to the accelerator, and sit down in front of the conspicuously festive console.*

---

"The accelerator is a giant **ring-shaped circuit** where bursts of peppermint particles zoom around.
The particles can vibrate at one of three frequency levels: **low**, **medium**, or **high**.
Along the circuit, there are several **mint boosters** that interact with the particles to keep them in motion.

However, some of the mint boosters are faulty!
A faulty booster cannot interact with peppermint particles at a particular frequency, so the particles must switch frequencies to bypass these faulty boosters.

Fortunately, Santa's **quantum raygun** can zap the particles and change their frequency at any booster!
However, the raygun is expensive to use, and Santa insists on minimising the number of times it's fired.
Santa would probably bust our elf union if we used it too much...
We need you calculate the **minimum amount of zaps** needed to avoid the faulty boosters **per loop**!"

The console beeps, and supplies you with an array of mint booster statuses.
* The **index** of the array represents the booster's position in the circuit.
* The **value** at that index indicates the frequency the booster cannot handle:
  * \`0\` for low,
  * \`1\` for medium,
  * \`2\` for high,
  * \`-1\` means the booster is **working properly** and accepts particles of any frequency.

For example, the array \`[0, 0, 2, -1, 2, 1, -1]\` represents the following circuit, where X denotes a faulty frequency of a booster:

\`\`\`
 Index: 012345601234560123456 ...
   Low: XX-----XX-----XX----- ...
Medium: -----X------X------X- ...
  High: --X-X----X-X----X-X-- ...
\`\`\`

In this case, the minimum amount of zaps needed per loop is **2**.
One such way this could happen is if the particles started at medium frequency, got zapped to low frequency at booster 2/3/4, and zapped back to medium frequency at booster 6.
This would simply repeat every loop.

\`\`\`
 Index: 012345601234560123456 ...
   Low: XX-#==#XX-#==#XX-#==# ...
Medium: ===#-X#===#X-#===#-X#...
  High: --X-X----X-X----X-X-- ...
\`\`\`

Starting from high in this example would require **3** zaps per loop -- zapping to medium in booster 0/1, then to low in booster 2/3/4, then back to high at booster 5 or 6.


The input file will be in a particular format. The first line contains an integer, \`N\`, which is the number of test cases.
\`N\` lines follow, each containing an array of **200** integers in the format above for a particular test case. For each test case, you should compute the minimum number of zaps required to bypass the faulty boosters, per loop.

Your answer should be an integer, representing the sum of the computed minimum number of zaps for each test case.
`;

export default async function Page() {
  const error = await protectQuestion("3");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{questionThreeMarkdown}</MarkdownRenderer>
      <a
        download="q3.input.txt"
        href={`/api/asset?questionNo=3&assetName=q3.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Mint Booster Statuses
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="3"
          session={session}
        />
      </div>
    </div>
  );
}
