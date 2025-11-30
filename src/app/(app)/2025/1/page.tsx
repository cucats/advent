import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const questionOneMarkdown = String.raw`
## --- Intro: Ode To Our Future ---

As the sleigh bells began their familiar countdown to 25th December, the elves gathered beneath the frosted rafters for an official address from Mr. and Mrs. Claus.

"It is an unusual year," Santa said, voice low. "Not only do the stockings get smaller, the world outside is frayed. There are places where armed conflict has torn daily life into pieces; towns lie emptied, supply chains are strained, and too many families wake beside rubble instead of roofs. There are other places where long, slow poverty has hardened into hunger and illness. And everywhere, human-made disasters - collapsed infrastructure, raging industrial fires, contaminated water, blackouts and broken networks - make recovery harder than it should be."

Mrs. Claus folded her hands. "We can't fix every headline," she admitted, "and we won't take sides in arguments about who's to blame. But we know suffering when we see it, and we know that clever hands and kind minds can still make a difference."

"Wait!" said Jingle, the head elf. "There's bound to be some intelligent life in Cambridge. Let's pay them a visit and see what they can do!"

Santa and the elves steered the sleigh down Trinity Street and found you there, huddled over a steaming cup of Knoops.

"For each problem you solve, we will reward you with **one star**!" said Holly, head of Elven Resources, with a half-smile that didn't hide the urgency in her eyes. "Get **all the stars** before 25th December, and we'll reward you greatly!"

And so, they send you off in a sleigh to the North Pole for your first task.

## --- Day 1: Jolly Street ---

This year, the elves are excited about a new career opportunity: **quantitative trading**! A few renowned firms have opened new offices on the block. Jolly Street, Jingle Securities, and Tana River Trading.

Unfortunately, it didn't take long before something started smelling fishy. John, head of the Securities and Exchange Board of North Pole (SEBNP), noticed that retail investors are consistently losing a lot of money - at least, a lot more than they should.

"Some of these trading firms must have been participating in **insider trading**, and it is our job to try to find out who they are, and prosecute those responsible." says John.

Can you help John comb through a list of trading records, and find the firms that have a track record of winning a lot more than they lose?

---

Trading firms in the North Pole Stock Exchange are currently trading on **Jingle Binary Options (JBO)**. Each JBO is tied to the price of a certain stock and has an expiry of one day. If the price of the stock increases by the next day, the holder of the JBO will get a net profit of +50 for each JBO they purchase. If it decreases, they get a net profit of -50 for each JBO they purchase. If the price stays exactly the same on the next day, they have a net profit of zero.

You are given the time-series prices for each stock on each day, along with the JBO trading records for each trading firm. Your job is to determine companies that have total winnings **more than** 2.5x their total losses.

The input file will be in a special format:
- The first line contains four integers
  - \`M\`, the number of stocks, 
  - \`N\`, the number of trading firms, 
  - \`K\`, the number of days, 
  - and \`P\`, the number of JBO purchases each firm makes.
- The next \`M\` lines contain the stock records. Each line starts with an integer stock id, followed by \`K\` floating point numbers, all spearated by spaces, showing the price of a particular stock on a particular day.
- The next \`N\` lines contain the JBO trading records for each firm. Each line starts with the an integer firm id, and then contains \`P\` sets of data, separated by spaces, each individually in the format \`stock_id,0-indexed_date,volume\`.

The answer should be given in a comma-separated list, sorted in increasing order, of the integer ids of firms that have total winnings **(strictly) more than** 2.5x their total losses.

You should note that the exact prices of stocks do NOT matter for JBOs. Only the 3-ary output of whether the stock price went up, stayed the same, or went down, matters.

Stock prices can be negative. Volume for JBOs must be a positive (non-zero) integer.

---

### Sample Input

\`\`\`
3 2 5 2
1 1.0 0.5 1.0 0.5 1.0
2 1.0 0.9 0.8 0.7 0.6
3 0.0 1.0 10.0 100.0 1000.0
99 3,0,4 1,1,1
101 2,0,1 3,2,100
\`\`\`

### Sample Output
\`\`\`
99,101
\`\`\`

### Explanation

There are three stocks, their Stock IDs are 1, 2 and 3. There are two trading firms, their Firm IDs are 99 and 101.

Firm 99 purchased 4 JBOs for stock 3 starting on day 0. Since the price of stock 3 at day 0 is 0.0, and the price at day 1 is 1.0, Firm 99 gains a net profit of 4 * $50 = $200 in this trade.
Firm 99 also purchased 1 JBO for stock 1 starting on day 1. Since the price of stock 1 at day 1 is 0.5, and it was 1.0 at day 2, Firm 99 gains a net profit of 1 * $50 = $50 in this trade.
Firm 99 wins $250 and loses $0. 250 > 2.5 * 0, hence they are shortlisted for potential of insider trading.

Firm 101 purchased 1 JBO for stock 2 starting on day 0. Since the price for stock 2 drops from 1.0 (day 0) to 0.9 (day 1), Firm 101 loses the trade and gains a net profit of 1 * $-50 = $-50.
Firm 101 purchased 100 JBOs for stock 3 starting on day 2. Since the price for stock 3 raises from 10.0 (day 2) to 100.0 (day 3), Firm 101 wins this trade and gains a net profit of 100 * $50 = $5000.
Firm 101 wins $5000 and loses $50. 5000 > 2.5 * 50, hence they are shortlisted for potential of insider trading.

Therefore the output is the integer IDs of suspected firms (99 and 101), sorted in ascending order, outputted with comma separation.
`;

export default async function Page() {
  const error = await protectQuestion("1");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{questionOneMarkdown}</MarkdownRenderer>
      <a
        download="q1.input.txt"
        href={`/api/asset?questionNo=1&assetName=q1.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Input file
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer removeWhitespace questionNo="1" session={session} />
      </div>
    </div>
  );
}
