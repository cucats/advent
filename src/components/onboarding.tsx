"use client";

import { trpc } from "@/trpc/client";
import Link from "next/link";
import { SessionValidationResult } from "@/lib/session";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Onboarding = ({
  user,
}: {
  user: SessionValidationResult["user"];
}) => {
  const nicknameMutation = trpc.setNickname.useMutation();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nickname = formData.get("nickname") as string;
    nicknameMutation.mutate(
      { nickname },
      {
        onError: (error) => {
          setError(error.message);
        },
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center pt-16 space-y-4 bg-background text-zinc-300">
      <h1 className="text-foreground text-lg">
        Welcome to CUCaTS December Daily Puzzles 2025!
      </h1>
      <p>Would you like to choose a nickname to show on the leaderboard?</p>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex flex-col w-48 relative">
          <input
            type="text"
            name="nickname"
            maxLength={32}
            minLength={1}
            className="border-[1px] w-48 border-zinc-300 bg-black text-highlight px-2 py-1 text-sm"
          />
          {error && (
            <div className="text-red-500 absolute text-sm top-20 w-96">
              Please choose a nickname between 1 and 32 characters.
            </div>
          )}
        </div>
        <button type="submit" className="text-foreground hover:text-highlight">
          Set nickname
        </button>
      </form>
      <Link href="/" className="text-zinc-400">
        I&apos;m fine with <span>{user?.crsid}</span>
      </Link>
    </div>
  );
};
