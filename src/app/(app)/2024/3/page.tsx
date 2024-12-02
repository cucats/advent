import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const questionThreeMarkdown = String.raw`
--- Day 3: Mince Pie Avoidance System ---

After a long day of sleigh-riding, elf-listening, panopto-watching, and elf-ignoring, you finally pull into the Candy Cane Accelerator's parking lot.
You jump off the sleigh, pull up your trusty quant socks, and hurry inside, with Patch close behind.

You're greeted by a scene of absolute disarray. The place is littered with mince pies -- piles upon piles of them, as far as the eye can see.
Wild-eyed white-coated elves scurry in every direction, with a pulsating ring of green and red light looming above it all: the Candy Cane Accelerator itself!

Patch, nearly tripping over a coil of blinking fairy lights, manages to grab a passing elf and drag them over to you.

"You've been sent? By Santa? I fear it's too late for that. The Candy Cane Accelerator is going critical!"

You nod, trying to look calm. "Don't worry. I did Intro to Graphics Tick 2. What's going on?"

The elf gulps. "Well, the Candy Cane Accelerator is a device we use to assess this year's Christmas Spirit levels. If we spin a candy cane fast enough, we can
calculate the world's merriness. It's all very scientific."

*She leads you over to a set of stairs as she continues.*

"The problem is, management sent over a new Pie-o-matic machine last week to help alleviate stress levels. This is a rather stressful environment, and it went
into overdrive! It's now spitting out mince pies like there's no tomorrow, and hundreds have got into the accelerator! It's too late to fix the Pie-o-matic, but
we can still save the day by reading a Christmas Spirit level for this year."

*You climb the stairs to the accelerator, and sit down in front of the conspicuously festive console.*

---

"The ring is split into **n** discrete **points**, each having **3 lanes** (\`[0,1,2]\`), with a mince pie potentially flying in one of the lanes.
We need to write a program that moves a candy cane from **point 0** to **point n-1** without hitting any mince pies, ending in the same lane that it started in to maintain the loop.
We have access to a quantum raygun tuned to the Merry frequency, and we can use it to bounce the candy cane between lanes. This
raygun is very expensive though, and Santa would probably bust our elf union if we used it too much..."

The console beeps, and supplies you with an array of projected mince pie locations. The array index represents the **point**, and the value at that index represents the **lane** a
mince pie is in, or \`-1\` if no mince pie is present.

i.e. \`[-1, 0, 2, -1, 2, 1]\` would be interpreted as:

\`\`\`
Points: 012345
Lane 0: -X----
Lane 1: -----X
Lane 2: --X-X-
\`\`\`

In this instance, the smallest number of bounces possible would be 2: starting in lane 0, bouncing to lane 1 at point 0, then bouncing back to lane 0 at point 2 (or point 3/4).
If you start in lane 2, the smallest number of bounces possible would be 3: starting in lane 2, bouncing to lane 1 at point 1, bouncing to lane 0 at point 4, then
bouncing back to lane 2 at point 5.

The input file will be in a particular format. The first line contains an integer, \`N\`, which is the number of test cases.
\`N\` lines follow, each containing an array of integers in the format above for a particular test case. For each test case, you should compute the minimum
number of bounces required to shoot the candy cane from \`point 0\` to \`point n-1\` without hitting any mince pies, ending in the same lane that it started in.

Your answer should be an integer, representing the sum of the computed minimum number of bounces for each test case.

...

*As you sit down to solve this, the Pie-o-matic shoots a mince pie right at you -- you duck, but you swear you saw the letters **DP** etched into the pie as it sailed past...*
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
        Download Mince Pie Locations
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
