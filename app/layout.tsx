import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const red_Hat_Display = Red_Hat_Display({
  // weight: "400",
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
      <body
        className={`${red_Hat_Display.className} antialiased selection:bg-emerald-700/25`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
