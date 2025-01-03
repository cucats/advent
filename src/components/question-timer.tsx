"use client";

import { useDateTime } from "@/components/datetime-context";

export const QuestionTimer = ({
  releaseDateTime,
  skipped,
}: {
  releaseDateTime: Date;
  skipped: boolean;
}) => {
  const { currentDateTime } = useDateTime();

  const timeRemaining = releaseDateTime.getTime() - currentDateTime.getTime();

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  if (skipped) {
    return <p className="text-lg text-zinc-400">skipped</p>;
  }

  if (timeRemaining < 0) {
    return <p className="text-lg text-zinc-400">released!</p>;
  }

  if (hours > 48) {
    return (
      <time
        dateTime={releaseDateTime.toISOString()}
        className="text-lg text-zinc-400"
      >
        --:--:--
      </time>
    );
  }

  return (
    <time
      dateTime={releaseDateTime.toISOString()}
      className="text-lg text-zinc-400"
    >
      {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </time>
  );
};
