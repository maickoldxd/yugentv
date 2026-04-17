import "@vidstack/react/player/styles/base.css";
import "./globals.css";

import { Manrope, Space_Grotesk } from "next/font/google";

import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import localFont from "next/font/local";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const sabandijaFont = localFont({
  src: "../public/fonts/sabandija.woff2",
  variable: "--font-sabandija-source",
});

export const metadata: Metadata = {
  title: {
    default: "YugenTV",
    template: "%s | YugenTV",
  },
  description:
    "Dark streaming frontend foundation for Asian movies and series, built with Next.js, HeroUI, and mock editorial content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${sabandijaFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
