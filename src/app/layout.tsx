import React from "react";

import type { Metadata } from "next";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

import HeaderNav from "@/components/HeaderNav";
import "./globals.css";

const open_sans = Open_Sans({
  variable: "--font-open_sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Country Info",
  description: "Country information app using SOAP API integration",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${open_sans.variable} ${open_sans.variable} antialiased overflow-x-auto`}
    >
    <div className="min-w-5xl">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 py-4">
          <Link
            href="/"
            className="font-semibold tracking-tight text-indigo-900 hover:text-indigo-950"
          >
            Country Info
          </Link>

          <HeaderNav/>
        </div>
      </header>

      {children}
    </div>
    </body>
    </html>
  );
}