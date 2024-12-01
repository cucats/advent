import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col w-full max-w-xl mt-16 p-4">
      <div>
        <p className="mb-4">
          Problems will be released every day at 12:00 BST. For each day you answer,
          you get a star, and you earn score for each day based on how many people solved
          it before you did.
        </p>

        Brought to you by{" "}
        <Link
          href="https://www.cucats.org"
          className="text-foreground hover:text-highlight"
        >
          [CUCaTS]
        </Link>
        , based on{" "}
        <Link
          href="https://adventofcode.com"
          className="text-foreground hover:text-highlight"
        >
          [Advent of Code]
        </Link>
        !
      </div>
      <p>Please don&apos;t try and break anything :-)</p>
      <p className="mt-4">
        If you have any questions/run into any issues, please contact{" "}
        <span className="font-bold text-foreground">olifog</span> on Discord.
      </p>
    </div>
  );
}
