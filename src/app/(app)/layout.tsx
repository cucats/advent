import { Header } from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-background text-zinc-300">
      <Header />
      {children}
    </div>
  );
}
