import type { Metadata } from "next";
import BusinessNavbar from "@/components/BusinessNavbar";
import BusinessFooter from "@/components/BusinessFooter";
import BusinessClient from "./BusinessClient";

export const metadata: Metadata = {
  title: "Skyrol Business — Boost your digital marketing in Bali",
  description:
    "Digital & marketing services for Bali businesses. CRM, social media, strategy, websites, and access to the Skyrol network.",
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
