import { trpc } from "@/trpc/server";

export default async function Home() {
  const hello = await trpc.hello({ text: "example" });
  return <div>{hello.greeting}</div>;
}
