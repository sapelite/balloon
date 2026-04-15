import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners — Handpicked Bali businesses",
  description:
    "Discover vetted Bali partners: scooter rentals, villas, restaurants, beach clubs, spas, transport, and more.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Skyrol Partners — Handpicked Bali businesses",
    description:
      "Vetted scooter rentals, villas, restaurants, beach clubs, spas, and more across Bali.",
    url: "/partners",
    type: "website",
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
