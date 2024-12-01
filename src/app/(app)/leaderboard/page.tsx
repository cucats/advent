import { trpc } from "@/trpc/server";

export default async function Page() {
  const leaderboard = await trpc.getLeaderboard();
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm p-4 mb-32 mt-8 text-md">
      {leaderboard.map((user, index) => (
        <div key={user.userId} className="flex gap-4 items-center text-lg">
          <span className="w-10 text-zinc-400">#{index + 1}</span>
          <div className="font-bold">{user.nickname ?? user.crsid}</div>
          <div className="text-right flex-1">{user.score ?? 0}</div>
        </div>
      ))}
    </div>
  );
}
