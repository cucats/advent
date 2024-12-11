import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionElevenMarkdown = String.raw`
--- Day 11: Reindeer Racing ---

*Patch, slowly sneaking up behind you, quietly taps on your shoulder as you lay in the log cabin at West Hub... wait no... North hub...*

"So, uh, you're here to figure out the reindeer thing, huh? Cool, cool. I mean, it's not like I was just about to take a nap in the cookie storage or anything.
Anyway, racing reindeer. Big deal. HUGE deal. Do you even know how fast these guys are? Like,
Blitzen once zoomed so fast, he set a gingerbread house on fire. True story!"

"Wait, reindeer can set things on fire?"

*Patch:* "Look, I'm no reindeer physicist, okay? I just observe. But yeah, he totally scorched the frosting right off it.
Which was weird because it was frosted inside—but that's beside the point. The point is, these reindeer have, like, turbo modes.
And cooldowns. It's like playing a video game, except you can't just spam buttons and hope for the best."

"Okay… so I just calculate who finishes first?"

*Patch:* "Uh, yeah! I mean, duh. But it's not that simple!
Like, did you know Dasher is so fast during turbo that he forgets where the track is? He once flew right into Mrs. Claus's laundry line.
Poor guy had undies on his antlers for a week. Hilarious. But also tragic. Mostly hilarious."

"This feels like a lot of unnecessary information."

*Patch:* "Oh, you think so, huh? Well, you better take Vixen into account.
She's like, steady as a snowflake, but her turbo? Pfft. It's barely a turbo. It's like, 'turbo-lite.'
But hey, consistency wins races sometimes! Or maybe it doesn't. What do I know? I'm just a cookie-eating elf."

"You're very helpful."

*Patch:* "You bet I am! And don't forget, Comet's turbo is great, but his cooldown is forever.
Like, he needs a nap, a hot cocoa, and probably a foot massage before he's ready to zoom again.
Anyway, good luck with the math, genius! I'll just be over here… cheering for Rudolph.
Not because he's the best, but because his nose lights up my midnight snack raids."

Reader: "Please stop talking."

*Patch:*  "Sure thing, boss! But one last thing—if you get this wrong, the reindeer might demand you pull the sleigh instead. Better eat your carrots!"

---

Santa's reindeer are racing to win the governmental contract for Christmas. Each reindeer has a normal speed, and a turbo speed (fuelled by carrots!) Turbos last for a certain amount of time before having to cool down. Every reindeer starts off with a fully charged carrot turbo.

The first line contains \`d\`, the race course length, and \`n\`, the number of reindeer.
\`n\` lines follow, each containing a string with the name of the reindeer, and four integers: the reindeer's normal speed, turbo speed, cooldown and turbo duration, all measured in metres and seconds.

Your task is to find the **fastest three** reindeers, separated by commas.
`;

export default async function Page() {
  const error = await protectQuestion("11");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionElevenMarkdown}</MarkdownRenderer>
      <a
        download="q11.input.txt"
        href={`/api/asset?questionNo=11&assetName=q11.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Reindeer Data
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="11"
          session={session}
        />
      </div>
    </div>
  );
}
