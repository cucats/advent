import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col w-full max-w-xl mt-16">
      <div>
        Brought to you by
        {' '}
        <Link href="https://www.cucats.org" className="text-foreground hover:text-highlight">[CUCaTS]</Link>!
      </div>
      <p>Please don&apos;t try and break the infra :-)</p>
    </div>
  );
}
