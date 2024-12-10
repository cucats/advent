import { Header } from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-background text-zinc-300">
      <Header />
      <div className="m-2 max-w-md text-sm text-zinc-100 flex justify-center items-center w-full h-10 bg-orange-700 rounded-xl border-2 border-orange-500">
        Day 10 is delayed 30 mins!
      </div>
      {children}
    </div>
  );
}
