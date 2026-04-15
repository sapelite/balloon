import { redirect } from "next/navigation";
import { getAudienceCookie } from "@/lib/session";
import AudienceChooser from "@/components/AudienceChooser";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Partners from "@/components/Partners";
import Competitors from "@/components/Competitors";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SocialProof from "@/components/SocialProof";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import TrustStrip from "@/components/TrustStrip";

export default async function Home() {
  const audience = await getAudienceCookie();

  if (audience === "entrepreneur") {
    redirect("/business");
  }

  if (audience === "investor") {
    redirect("/investors");
  }

  if (!audience) {
    return <AudienceChooser />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <HowItWorks />
        <Pricing />
        <Competitors />
        <Partners />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <SocialProof />
      <MobileStickyCTA />
    </>
  );
}
