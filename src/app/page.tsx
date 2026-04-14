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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
    </>
  );
}
