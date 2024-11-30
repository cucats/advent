"use client";

import { useDateTime } from "@/components/datetime-context";

export const QuestionTimer = ({ releaseDateTime }: { releaseDateTime: Date }) => {
  const { currentDateTime } = useDateTime();

  const timeRemaining = releaseDateTime.getTime() - currentDateTime.getTime();

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  if (timeRemaining < 0) {
    return <p className="text-lg text-zinc-500">released!</p>;
  }

  if (hours > 48) {
    return <p className="text-lg text-zinc-500">--:--:--</p>;
  }

  return (
    <p className="text-lg text-zinc-500">
      {String(hours).padStart(2, '0')}:
      {String(minutes).padStart(2, '0')}:
      {String(seconds).padStart(2, '0')}
    </p>
  );
};
