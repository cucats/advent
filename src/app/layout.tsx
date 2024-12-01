import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";

export const metadata: Metadata = {
  title: "CUCaTS Advent of Code 2024",
  description: "CUCaTS Advent of Code 2024",
};

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <TRPCProvider>
        <body className={robotoMono.className}>{children}</body>
      </TRPCProvider>
    </html>
  );
}
