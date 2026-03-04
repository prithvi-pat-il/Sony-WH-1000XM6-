import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sony WH-1000XM6",
  description: "Silence, perfected. Hear only what matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-background text-foreground bg-[#050505] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
