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
        <meta name="description" content="Practice CPCT, RSCIT, and CCC exams with bilingual support, real-time results, and comprehensive learning materials. Free trial available!" />
        <meta name="keywords" content="CPCT exam, RSCIT exam, CCC exam, computer proficiency, Hindi English, online exam, practice test, government exam" />
        <meta name="author" content="MPCPCT Web App" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"} />
        <meta property="og:title" content="MPCPCT - CPCT, RSCIT, CCC Exam Practice Platform" />
        <meta property="og:description" content="Practice CPCT, RSCIT, and CCC exams with bilingual support, real-time results, and comprehensive learning materials." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/og-image.jpg`} />
        <meta property="og:site_name" content="MPCPCT Web App" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"} />
        <meta property="twitter:title" content="MPCPCT - CPCT, RSCIT, CCC Exam Practice Platform" />
        <meta property="twitter:description" content="Practice CPCT, RSCIT, and CCC exams with bilingual support, real-time results, and comprehensive learning materials." />
        <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/og-image.jpg`} />
        
        {/* Additional SEO */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"} />
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/en`} />
        <link rel="alternate" hrefLang="hi" href={`${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/hi`} />
        
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
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
