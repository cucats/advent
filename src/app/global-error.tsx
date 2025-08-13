"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    // global-error must include html and body tags
    <html>
      <body className="w-screen min-h-screen flex flex-col items-center bg-background text-zinc-300 pt-24">
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>
          {">"}Try again{"<"}
        </button>
      </body>
    </html>
  );
}
