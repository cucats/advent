import Link from "next/link";
import { AvatarAuth } from "./avatar-auth";
import { getCurrentSession } from "@/lib/session";

export const Header = async () => {
  const { user } = await getCurrentSession();
  return (
    <div className="w-full flex justify-between items-center p-4 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        <Link href="/" className="mr-8">
          <h1 className="text-lg font-bold text-foreground hover:text-highlight text-nowrap">
            CUCaTS December Daily Puzzles 2025
          </h1>
        </Link>
        <Link href="/about" className="">
          <h2 className="text-lg text-foreground hover:text-highlight text-nowrap">
            [About]
          </h2>
        </Link>
        <Link href="/leaderboard" className="">
          <h2 className="text-lg text-foreground hover:text-highlight text-nowrap">
            [Leaderboard]
          </h2>
        </Link>
        <Link href="/onboarding" className="">
          <h2 className="text-lg text-foreground hover:text-highlight text-nowrap">
            [Onboarding]
          </h2>
        </Link>
      </div>

      <AvatarAuth user={user} />
    </div>
  );
};
