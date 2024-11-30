"use client";

import { useDateTime } from "@/components/datetime-context";

export const QuestionTimer = ({
  releaseDateTime,
}: {
  releaseDateTime: Date;
}) => {
  const { currentDateTime } = useDateTime();

  const timeRemaining = releaseDateTime.getTime() - currentDateTime.getTime();

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  if (timeRemaining < 0) {
    return <p className="text-lg text-zinc-500">released!</p>;
  }

  if (hours > 48) {
    return (
      <time
        dateTime={releaseDateTime.toISOString()}
        className="text-lg text-zinc-500"
      >
        --:--:--
      </time>
    );
  }

  return (
    <time
      dateTime={releaseDateTime.toISOString()}
      className="text-lg text-zinc-500"
    >
      {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </time>
  );
};
