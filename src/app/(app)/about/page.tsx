import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col w-full max-w-xl mt-16">
      <div>
        Brought to you by{" "}
        <Link
          href="https://www.cucats.org"
          className="text-foreground hover:text-highlight"
        >
          [CUCaTS]
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
