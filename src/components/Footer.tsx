import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import { mailHref, whatsappHref } from "@/lib/handoff";

const footerLinks = {
  Trip: [
    { label: "How it works", href: "/#how" },
    { label: "Included", href: "/#included" },
    { label: "Areas", href: "/#areas" },
    { label: "FAQ", href: "/#faq" },
  ],
  Skyrol: [
    { label: "For Business", href: "/business" },
    { label: "Partners", href: "/partners" },
    { label: "Free guides", href: "/guides" },
  ],
  Contact: [
    { label: "WhatsApp", href: whatsappHref("Hi Skyrol — question about Bali") },
    { label: "Email", href: mailHref("Hi Skyrol", "traveler") },
    { label: "Privacy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/55">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2">
            <Wordmark className="text-[1.25rem] mb-3" tone="dark" />
            <p className="text-[0.82rem] leading-relaxed max-w-[280px] mb-4">
              Hand-picked stays, English-speaking drivers, and tables worth flying for — in Canggu, Uluwatu and Ubud.
            </p>
            <div className="flex gap-2">
              {["IG", "TK", "X"].map((name) => (
                <a key={name} href="#" className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors flex items-center justify-center text-[0.65rem] font-bold text-white/50 hover:text-white">
                  {name}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/80 font-semibold text-[0.8rem] mb-3 uppercase tracking-[0.1em]">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[0.82rem] hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[0.72rem] text-white/30">&copy; 2026 Skyrol. Built in Bali.</p>
          <Link href="/business" className="text-[0.72rem] text-white/30 hover:text-white/60 transition-colors">
            Run a business here? →
          </Link>
        </div>
      </div>
    </footer>
  );
}
