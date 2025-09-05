"use client";

import "./globals.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Poppins } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import { GeistMono } from "geist/font/mono";
import { usePathname } from "next/navigation";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Add all routes where you want to hide Header and Footer
  const hideLayout = pathname?.startsWith("/exam") || pathname?.startsWith("/tips/") || pathname?.startsWith("/keyboard") || pathname?.startsWith("/hindi-keyboard") || pathname?.startsWith("/typing");

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#290c52" />
        <meta name="description" content="Practice CPCT, RSCIT, and CCC exams with bilingual support, results, and admin controls." />
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased ${poppins.className}`}
      >
        {!hideLayout && <Header />}
        <main>{children}</main>
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
