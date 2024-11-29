import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";

export const metadata: Metadata = {
  title: "CUCaTS Advent of Code 2024",
  description: "CUCaTS Advent of Code 2024",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TRPCProvider>
        <body className={inter.className}>{children}</body>
      </TRPCProvider>
    </html>
  );
}
