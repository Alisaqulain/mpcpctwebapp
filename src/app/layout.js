"use client";

import "./globals.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Poppins } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Add all routes where you want to hide Header and Footer
  const hideLayout = pathname?.startsWith("/exam") || pathname?.startsWith("/tips/") || pathname?.startsWith("/keyboard") || pathname?.startsWith("/hindi-keyboard") || pathname?.startsWith("/typing");

  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased ${poppins.className}`}
      >
        <SessionProvider>
          {!hideLayout && <Header />}
          <main>{children}</main>
          {!hideLayout && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
