import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skyrol for Investors — Curated Bali deal flow",
  description:
    "Curated opportunities across hospitality, F&B, wellness, and real estate. Jurisdiction, paperwork, and hiring handled — backed by operators you can trust.",
  alternates: { canonical: "/investors" },
  openGraph: {
    title: "Skyrol for Investors — Curated Bali deal flow",
    description:
      "Curated Bali opportunities with jurisdiction, paperwork, and operator intros handled end-to-end.",
    url: "/investors",
    type: "website",
  },
};

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
