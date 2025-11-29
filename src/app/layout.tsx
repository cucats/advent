import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";

export const metadata: Metadata = {
  title: "CUCaTS Codevent Calendar 2025",
  description: "CUCaTS Codevent Calendar 2025",
};

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <TRPCProvider>
        <body className={ubuntuMono.className}>{children}</body>
      </TRPCProvider>
    </html>
  );
}
