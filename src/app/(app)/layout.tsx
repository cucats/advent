import { Header } from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-background text-zinc-300">
      <Header />
      <div className="text-center text-zinc-100 bg-foreground p-4 rounded-lg border-2 border-highlight my-2">
        Sorry, CompSci deadline management hit and we need another 45 mins - come back for D4 in a bit!
      </div>
      {children}
    </div>
  );
}
