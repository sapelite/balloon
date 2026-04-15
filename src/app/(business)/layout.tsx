import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import PageLoader from "@/components/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skyrol.app";
const SITE_NAME = "Skyrol Business";
const DEFAULT_TITLE = "Skyrol Business — The marketing agency for Bali businesses";
const DEFAULT_DESC =
  "Brand, website, content, and paid ads — built for Bali restaurants, villas, spas, and creators. One team, one retainer, island-tested.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Skyrol Business",
  },
  description: DEFAULT_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "Bali marketing agency",
    "Bali social media",
    "Bali web design",
    "Canggu marketing",
    "hotel marketing Bali",
    "restaurant marketing Bali",
    "Skyrol Business",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/business" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/business`,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    locale: "en_US",
    images: [{ url: "/skyrol_logo.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ["/skyrol_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "business",
};

export default function BusinessRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
