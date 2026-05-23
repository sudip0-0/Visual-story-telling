import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Signal to System",
  description:
    "A cinematic scroll story — signal, spark, chaos, structure, system, launch.",
  keywords: [
    "cinematic",
    "scroll storytelling",
    "portfolio",
    "creative development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#story"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
        >
          Skip to story
        </a>
        {children}
      </body>
    </html>
  );
}
