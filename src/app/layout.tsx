import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "臺南市乳癌防治學會",
    template: "%s | 臺南市乳癌防治學會",
  },
  description:
    "臺南市乳癌防治學會致力於乳癌防治教育、學術研究推廣及病友支持，守護台南地區每一位女性的健康。",
  keywords: [
    "乳癌",
    "防治",
    "台南",
    "乳癌篩檢",
    "乳房攝影",
    "衛教",
    "學術研討",
    "病友支持",
  ],
  openGraph: {
    title: "臺南市乳癌防治學會",
    description:
      "以愛與專業守護每一位女性的健康，攜手推動乳癌防治，為生命點亮希望之光。",
    locale: "zh_TW",
    type: "website",
    siteName: "臺南市乳癌防治學會",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
