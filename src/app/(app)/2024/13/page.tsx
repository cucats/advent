import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionThirteenMarkdown = (name: string) => String.raw`
--- Day 13: How elves are made. ---

With the snowstorm accurately predicted and accounted for, Santa finally starts feeling at ease once again. The atmosphere is jolly, festive, and altogether
devoid of JollyScript! With a cocoa in hand, you've just started settling down for some morning Stajano Explains when Patch starts banging on your door:

"You've been summoned!! To the GROTTO!!!"

You open the door to greet the dishevelled looking entry-level IT elf. You're met, however, by Patch staring straight through you;
his normal glazed-over stare is replaced by a wide-eyed look of awe. He continues in a hushed tone.

"No elf has ever been invited to the *grotto*. It's mythical, it's a place of great religious significance to us elves. And now YOU get to see it! The grotto's where Michael
Bublé was first grown in a vat!"

Patch gazes into the distance, a solitary tear rolling down his cheek.

...

The sleigh-ride to the grotto is arduous and cold, but you eventually arrive at a sprawling wood cabin. After parallel parking the sled out front, you go to knock
on the front door -- but it opens before your hand can make contact! Santa himself stands before you, his regular jolly demeanor replaced by a grim resolve.

"I have not been altogether honest with you, ${name}. The children that we planned to send coal to 3 days ago? It doesn't matter. Nothing matters. I just do that for fun."

You reel back in shock -- that fancy union find algorithm, all for nothing?

"Kids are all naughty, the 'nice' ones are just the cowards. The only truth I told is that they are affected by peer pressure! You can't just stop the pressure and turn a child
'nice' with coal, though."

He seems to grow taller and more imposing in front of you, his voice booming, his eyes burning with a fiery intensity.

"You don't get it, do you? You must **remove** the pressure. Drop the node. Excise the child. Each year I choose one to turn into an elf. The cycle continues. The
pressure is removed. The bold ones become cowards."

You're speechless. He stares at you and you stare at him. He offers you a mince pie and a tentative "Ho ho ho?"

---

This problem is *very* similar to Day 10:

\`k\` of \`n\` children have been identified by elf reconnaissance as being naughty.
By next christmas, the naughty children will influence all of their friends (and their friends' friends, and so on) to become
naughty too, eventually corrupting **all connected children** by any path of friendship.

With Santa's new horrifying revelation in mind, you must choose **one** child to turn into an elf to **minimise the naughtiness** spread next year. Transforming
a child will remove **both them and all of their friendship connections from the network**. The child you choose doesn't have to be naughty!

Your task is to find the optimal child to transform, and the resulting number of naughty children next year.

The input file will be in a specific format. The first line contains three integers, \`n\`, \`m\`, and \`k\`: the number of children, the number of friendships,
and the number of naughty children. The children are given IDs from \`0\` to \`n-1\`.

The next line contains \`k\` integers split by spaces, the list of naughty children's IDs.
\`m\` lines follow, each representing a friendship: \`x y\` means the child with ID \`x\` is a friend of the child with ID \`y\` (and vice-versa).

Give the answer in the form \`x,y\`, where \`x\` is the ID of the child that should be transformed, and \`y\` is the total number of naughty children next year (after the transformation).
If there are multiple optimal choices for the child, choose the lowest ID.
`;

export default async function Page() {
  const error = await protectQuestion("13");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionThirteenMarkdown(session.user?.nickname ?? session.user?.crsid ?? "Student")}</MarkdownRenderer>
    
      <a
        download="q13.input.txt"
        href={`/api/asset?questionNo=13&assetName=q13.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Friendship Data
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="13"
          session={session}
        />
      </div>
    </div>
  );
}
