import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionFiveMarkdown = String.raw`
--- Day 5: Christmas Ornament Quality Control ---

You've spent the last night staring at the (gingerbread) ceiling, reassessing your life in terms of PJ and AJ; Pre-Jollyscript and Post-Jollyscript.
It is, in fact, the only language optimised for festive efficiency. Your life will never be the same. Perhaps you can put it on your CV?

It isn't long before Patch comes barging in again -- in his festiveness he trips, falls, during the fall trips again, and somehow inverts the original falling operation. *You have seen JollyScript now. Nothing can phase you.*

"Great job yesterday -- I was really pulling my ears over that microservice!" Patch beams.

"Now, if you don't mind, for your next task! We at the North Pole (famously) believe in objective morality. Naughty, Nice, all things can be boiled down to a binary! No exceptions!"

He proceeds to somehow pull a bauble larger than his head out of his pocket. *But you have seen JollyScript now. Nothing can phase you.*

"The same goes for our Christmas ornaments, we need to send only the Nicest to our retail partners.
Of course the only way to assess these ornaments' Niceness is to compare them to each other -- and what better way than a trial by combat?"

"Santa's getting a little antsy about wastage though, something something 'microplastics' 'sustainability' 'our continent is literally melting' yadda yadda. Can you assess
how many ornaments are getting trashed in our quality control process?"

---

As per tradition, the Ornament Quality Control department positions ornaments in a line, and shoots them in a random direction towards each other -- either left or right. Each ornament
has a direction and a Niceness, and **all move at the same speed**. When two ornaments collide, they abide by the following rules:

- If the ornaments have the **same** Niceness, they **both explode and disappear**.
- If the ornaments have **different** Niceness, the **Nicest one survives**, and the other one **explodes and disappears**.
- If two ornaments are travelling in the **same** direction, they **will never collide**.

You will be given a list of integers representing the ornaments. The absolute value of the integer represents the Niceness of the ornament, and the sign represents the direction it's been shot in.

For example, if the input ornaments list is \`[20,7,-8]\`:

- The ornaments with Niceness 20 and 7 are shot to the right, while the ornament with Niceness 8 is shot to the left.
- The ornaments with Niceness 7 and 8 will collide first, and since 8 is Nicer than 7, the 8 will survive and the 7 will explode.
- The ornament with Niceness 20 will then collide with the ornament with Niceness 8, and since 20 is Nicer than 8, the 20 will survive and the 8 will explode.
- The final array will be \`[20]\`, and the amount of ornaments destroyed is \`2\`.

The input file will be formatted as follows:

- The first line is the number of quality control runs, \`N\`.
- Each quality control run is formatted as follows:
  - The first line is the number of ornaments, \`n\`.
  - The second line is the list of integers representing the ornaments, separated by spaces.

$N = 200$

$2 \leq n \leq 1000$

$-1000 \leq \text{ornament} \leq 1000$

$\text{ornament} \neq 0$

You need to calculate how many ornaments are destroyed in each quality control run: the answer is the total number of destroyed ornaments across all quality control runs.
`;

export default async function Page() {
  const error = await protectQuestion("5");
  const session = await getCurrentSession();
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
      <MarkdownRenderer>{QuestionFiveMarkdown}</MarkdownRenderer>
      <a
        download="q5.input.txt"
        href={`/api/asset?questionNo=5&assetName=q5.input.txt`}
        className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
      >
        Download Quality Control Runs
      </a>
      <div className="flex flex-col mt-16">
        <TextAnswer
          removeWhitespace
          ignoreCase
          questionNo="5"
          session={session}
        />
      </div>
    </div>
  );
}
