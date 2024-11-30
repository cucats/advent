import Link from "next/link"
import { AvatarAuth } from "./avatar-auth"

export const Header = async () => {
  return (
    <div className="w-full flex justify-between items-center p-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Link href="/" className="mr-6">
          <h1 className="text-lg font-bold text-foreground hover:text-highlight text-nowrap">[CUCaTS Advent of Code 2024]</h1>
        </Link>
        <Link href="/about" className="">
          <h2 className="text-lg text-foreground hover:text-highlight text-nowrap">[about]</h2>
        </Link>
        <Link href="/leaderboard" className="">
          <h2 className="text-lg text-foreground hover:text-highlight text-nowrap">[leaderboard]</h2>
        </Link>
        <Link href="/profile" className="">
          <h2 className="text-lg text-foreground hover:text-highlight text-nowrap">[profile]</h2>
        </Link>
      </div>

      <AvatarAuth />
    </div>
  )
}
