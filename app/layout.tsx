import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

import { Red_Hat_Display } from "next/font/google";
import VideoFooter from "@/components/VideoFooter";
import "./globals.css";
import Nav from "@/components/Nav";

const red_Hat_Display = Red_Hat_Display({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PASU Health",
  description:
    "Wellbeing provider for businesses and organisations offering expert-led learning and workplace wellness platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5TRMLKZQ" />
      <body
        className={`${red_Hat_Display.className} antialiased selection:bg-emerald-700/25`}
      >
        <Nav />
        {children}
        <VideoFooter />
      </body>
    </html>
  );
}
