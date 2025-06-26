"use client";

import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ReduxStoreProvider } from "@/store/provider";
import AuthGuard from "@/components/AuthGuard";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfairDisplay.variable} antialiased`}
      >
        <ReduxStoreProvider>
          <AuthGuard>{children}</AuthGuard>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
