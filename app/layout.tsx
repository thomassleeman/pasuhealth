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
  metadataBase: new URL('https://pasuhealth.com'),
  title: {
    default: 'PASU Health - Workplace Mental Health Training & Consultancy',
    template: '%s | PASU Health'
  },
  description: 'Expert workplace mental health training courses and consultancy services. Prevent burnout, improve team wellbeing, and create healthier work cultures with evidence-based strategies.',
  authors: [{ name: 'PASU Health' }],
  creator: 'PASU Health',
  publisher: 'PASU Health',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://pasuhealth.com',
    siteName: 'PASU Health',
    title: 'PASU Health - Workplace Mental Health Training & Consultancy',
    description: 'Expert workplace mental health training courses and consultancy services. Prevent burnout, improve team wellbeing, and create healthier work cultures with evidence-based strategies.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PASU Health - Workplace Mental Health Training & Consultancy'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PASU Health - Workplace Mental Health Training & Consultancy',
    description: 'Expert workplace mental health training courses and consultancy services. Prevent burnout, improve team wellbeing, and create healthier work cultures with evidence-based strategies.',
    images: ['/og-image.png']
  },
  keywords: [
    'workplace mental health',
    'mental health training',
    'burnout prevention',
    'employee wellbeing',
    'workplace wellness',
    'mental health consultancy',
    'stress management',
    'workplace culture'
  ],
  category: 'Business',
  classification: 'Workplace Mental Health Services'
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
