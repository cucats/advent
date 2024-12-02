import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const questionTwoMarkdown = String.raw`
--- Day 2: Sn0wdrift Network ---

Whoosh! You've landed at the North Pole. There's an eerie buzz in the cold artic air, and your Watch™ wristwatch is beeping about a 418 Error... perhaps a hot chocolate could help instead.

"Thank goodness you're here!" Patch exclaims, nearly tripping over a coil of blinking fairy lights.
"The polar communication network, Sn0wdrift, has been acting up ever since that Tinselware Update got pushed last week.

"Messages are getting corrupted! Instead of delivering Santa's orders, we've been getting nonsense messages!"
He grimaces. "One elf thought it was a virus and tried to install an anti-magic firewall. That just made things worse.
Now we've got Snowball Packet Collisions, Reindeer Data Droppage, and a runaway JollyScript Compiler..."

You raise an eyebrow. "JollyScript?"

"It's the only programming language optimized for festive efficiency!" Patch says unintelligently.

"Anyway, back to the problem. One of Santa's critical messages — your next destination — came through completely garbled. It's been corrupted by one of those faulty network towers!
We know how the towers mess things up, though. If you can decode the message, we can figure out where Santa needs you next."

*Patch hands you a printout of the corrupted message, which smells faintly of peppermint.*

"The towers normally send packets of length 16 bytes, which we join together after. I looked at the Tinselware Update Patch-notes (unrelated, I swear!) and it seems like
they tried to optimise their per-packet alphabet rotation subsystem..."

Can you decode the corrupted message?
`;

export default async function Page() {
  const error = await protectQuestion("2");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{questionTwoMarkdown}</MarkdownRenderer>
      <a
        download="q2.input.txt"
        href={`/api/asset?questionNo=2&assetName=q2.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Input file
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="2"
          session={session}
        />
      </div>
    </div>
  );
}
