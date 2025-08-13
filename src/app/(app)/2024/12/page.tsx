import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";
import Image from "next/image";

const QuestionTwelveMarkdownPartOne = String.raw`
--- Day 12: Snowfall Prediction ---

You've never seen Santa so stressed out. Less than two weeks remain, and most of the North Pole is (metaphorically) on fire. Though you now know the speeds of the reindeer,
they can't achieve their turbo boost when the takeoff strip is snowed under -- and Santa's smartest elves have predicted a STORM on Christmas Eve.

Santa's labs have predicted, with a high degree of accuracy, the positions and sizes of falling snowflakes on Christmas Night. They allegedly obtained this through back-propogation on
quantum bogo-gradient mamba transformers. Unfortunately, they can't predict the actual useful information: the height of the resulting snow on the ground!

To start, you can model a cross-section of the snowfall as a 2D plane. Snowflakes of different sizes **(modelled as squares)** start at different X positions, at a height
above any previously landed snowflakes, and fall one at a time by travelling in the negative Y direction.

A snowflake continues falling until it **either lands on top of another snowflake or on the ground (the X axis)**. A snowflake brushing the side of another snowflake doesn't
count as landing on it, and it will fall straight past.

After each snowflake is dropped, you need to calculate the maximum height of the snowfall; i.e., **the height of the current tallest stack of snowflakes**.

You will be given a file containing the predicted snowflake data in a certain format. The first line
of the file, \`n\`, is the number of snowflakes, and \`n\` lines follow. Each line is of the form \`x s\`, where \`x\` is the snowflake's left edge x position and \`s\` is the edge length.
You must drop these snowflakes one at a time, in order!

Example:

If there are 3 predicted snowflakes:
1. X=1, S=2
2. X=2, S=3
3. X=6, S=1

The resulting snowfall would look like this:
`;

const QuestionTwelveMarkdownPartTwo = String.raw`
And the resulting highest snowfall heights after each snowflake falls would be \`[2,5,5]\`.

To submit your answer, calculate the sum of this resulting array. *(Note: this is a large number, and will not fit in a 32-bit integer)*
`;

export default async function Page() {
  const error = await protectQuestion("12");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionTwelveMarkdownPartOne}</MarkdownRenderer>
      <Image
        width={400}
        height={400}
        src="/snowfall.jpg"
        alt="Example snowfall image"
      />
      <MarkdownRenderer>{QuestionTwelveMarkdownPartTwo}</MarkdownRenderer>
      <a
        download="q12.input.txt"
        href={`/api/asset?questionNo=12&assetName=q12.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Snowflake Forecast
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="12"
          session={session}
        />
      </div>
    </div>
  );
}
