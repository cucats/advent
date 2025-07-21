import { MarkdownRenderer } from "@/components/questions/markdown-renderer";
import { TextAnswer } from "@/components/questions/text-answer";
import { protectQuestion } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";

const QuestionSixMarkdown = String.raw`
--- Day 6: A Villain Rises... ---

All is merry in Santa's Village, the standard mass-produced Elf Advent Calendar had a big chocolate today and the mood is **electric**. That is, until reports start flying
in by MerryMail from Santa's outposts across the world that they've been receiving strange messages from a mysterious sender.

They seem to be very small cut-up fragments of a larger postcard. A note, sent directly to Santa himself, reads:

> Dear Santa,
>
> You've grown complacent. Grown sloppy. Sat watching the snowflakes, sipping your cocoa, you are BLIND to the world around you.
> It's time to wake up. And I HATE Christmas music.
>
> I've descended on a city with a name you'd recognise, and I'm bringing eternal frost and a bitter cold with me!
>
> Good luck finding me -- I've cut up my postcard into hundreds of pieces!
>
> Cold regards,
> The Grinch.

This note is widely regarded to be a total vibe killer. The elves are terrified, and look to you for help...

---

There are **256** fragments of the postcard, that need to be stitched together in a 16x16 grid to reconstruct the original image.

Once you've stitched together the image, you can get the answer by performing the following:

\`\`\`
pngtopnm image.png > image.pnm
md5sum image.pnm
\`\`\`

The answer will be the outputted hex bytes.

*Hint 1: the sample code is a good starting point.*
*Hint 2: \`chunk_964560701.png\` is the bottom-right chunk of the final image.*
*Hint 3: don't overcomplicate this, edge comparison is easier than you think!*
`;

export default async function Page() {
    const error = await protectQuestion("6");
    const session = await getCurrentSession();
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col gap-8 w-full max-w-3xl items-center p-4 mb-32 mt-8">
            <MarkdownRenderer>{QuestionSixMarkdown}</MarkdownRenderer>
            <a
                download="q6.input.zip"
                href={`/api/asset?questionNo=6&assetName=q6.input.zip`}
                className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
            >
                Download Postcard Fragments
            </a>
            <a
                href={`/api/asset?questionNo=6&assetName=q6.sample.py`}
                download="q6.sample.py"
                className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-900"
            >
                Download Sample Code
            </a>
            <div className="flex flex-col mt-16">
                <TextAnswer
                    removeWhitespace
                    ignoreCase
                    questionNo="6"
                    session={session}
                />
            </div>
        </div>
    );
}
