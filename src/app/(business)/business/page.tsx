import type { Metadata } from "next";
import BusinessNavbar from "@/components/BusinessNavbar";
import BusinessFooter from "@/components/BusinessFooter";
import BusinessClient from "./BusinessClient";

export const metadata: Metadata = {
  title: "Skyrol Business — Growth stack for Bali businesses",
  description:
    "The all-in-one growth stack for Bali businesses: social, content, ads, CRM, and website — built for the island economy.",
  alternates: { canonical: "/business" },
  openGraph: {
    title: "Skyrol Business — Growth stack for Bali businesses",
    description:
      "Social, content, ads, CRM, and website — built for the island economy.",
    url: "/business",
    type: "website",
  },
};

export default function BusinessPage() {
  return (
    <>
      <BusinessNavbar />
      <BusinessClient />
      <BusinessFooter />
    </>
  );
}
