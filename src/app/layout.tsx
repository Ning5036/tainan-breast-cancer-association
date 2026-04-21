import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "臺南市乳癌防治學會 | 乳癌防治、篩檢推廣與病友支持",
    template: "%s | 臺南市乳癌防治學會",
  },
  description:
    "臺南市乳癌防治學會致力於乳癌防治教育、學術研究推廣及病友支持。提供乳癌篩檢資訊、衛教知識、醫病共享決策(SDM)及學術活動消息，守護台南地區每一位女性的乳房健康。",
  keywords: [
    "乳癌",
    "乳癌防治",
    "乳癌篩檢",
    "乳房攝影",
    "台南乳癌",
    "臺南市乳癌防治學會",
    "乳癌衛教",
    "乳癌治療",
    "醫病共享決策",
    "SDM",
    "病友支持",
    "乳癌學術研討",
    "術後照護",
    "乳房自我檢查",
  ],
  openGraph: {
    title: "臺南市乳癌防治學會",
    description:
      "以愛與專業守護每一位女性的健康，提供乳癌篩檢、衛教知識、學術研討及病友支持服務。",
    locale: "zh_TW",
    type: "website",
    siteName: "臺南市乳癌防治學會",
    url: "https://tnbcpa.com",
  },
  verification: {
    google: "1IRa0Ozm2HRENukMEuVLYwnAHru8ejzk7_1KPdZnl84",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tnbcpa.com",
  },
};

// JSON-LD structured data for the organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "臺南市乳癌防治學會",
  alternateName: "Tainan Breast Cancer Prevention Association",
  url: "https://tnbcpa.com",
  description:
    "臺南市乳癌防治學會致力於乳癌防治教育、學術研究推廣及病友支持，守護台南地區每一位女性的乳房健康。",
  foundingDate: "2025",
  areaServed: {
    "@type": "City",
    name: "台南市",
  },
  medicalSpecialty: "Oncology",
  keywords: "乳癌,乳癌防治,乳癌篩檢,乳房攝影,台南,衛教,病友支持",
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
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
