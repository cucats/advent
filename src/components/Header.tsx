import Link from "next/link"
import { AvatarAuth } from "./avatar-auth"

export const Header = () => {
  return (
    <div className="w-full flex justify-between items-center p-4">
      <Link href="/">
        <h1 className="text-2xl font-bold text-foreground hover:text-highlight">[CUCaTS Advent of Code 2024]</h1>
      </Link>
      <AvatarAuth />
    </div>
  )
}
