import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skyrol — Bali in One Click",
  description:
    "Your all-in-one concierge for Bali. eSIM, airport transfer, scooter delivery, and local experiences — all before you land.",
  keywords: [
    "Bali",
    "travel",
    "eSIM",
    "scooter rental",
    "airport transfer",
    "concierge",
    "Skyrol",
  ],
  openGraph: {
    title: "Skyrol — Bali in One Click",
    description:
      "Your all-in-one concierge for Bali. eSIM, airport transfer, scooter delivery, and local experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
