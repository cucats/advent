import Link from "next/link"

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <h1 className="text-2xl font-bold text-foreground hover:text-highlight">[CUCaTS Advent of Code 2024]</h1>
      </Link>
      <div className="flex bg-zinc-400 rounded-full w-12 h-12"></div>
    </div>
  )
}
