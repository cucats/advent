import { Header } from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-background text-zinc-300">
      <Header />
      {children}
    </div>
  );
}
