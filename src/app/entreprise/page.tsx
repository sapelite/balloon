import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EntrepriseClient from "./EntrepriseClient";

export const metadata: Metadata = {
  title: "Balloon Business — Boost your digital marketing in Bali",
  description:
    "Digital & marketing services for Bali businesses. CRM, social media, strategy, websites, and access to the Balloon network.",
};

export default function EntreprisePage() {
  return (
    <>
      <Navbar />
      <EntrepriseClient />
      <Footer />
    </>
  );
}
