import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IPTVNow - Next-Gen 4K Ultra HD Streaming Platform",
  description: "Experience 10,000+ live premium TV channels, live sports, 4K movies & series with zero buffer latency and 99.99% server uptime.",
  keywords: ["IPTV", "Live TV", "4K Streaming", "Sports Live", "TV Subscription", "IPTV Now"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
