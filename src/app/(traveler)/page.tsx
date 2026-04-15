import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, Clock, Shield, Star, MessageCircle, Plane, MapPin,
  Utensils, Sparkles, Waves, Trees, Mountain,
} from "lucide-react";
import { getAudienceCookie } from "@/lib/session";
import { whatsappHref } from "@/lib/handoff";
import AudienceChooser from "@/components/AudienceChooser";
import Navbar from "@/components/Navbar";
import PackagePicker from "@/components/PackagePicker";
import Footer from "@/components/Footer";

const INCLUDED = [
  { icon: Plane, title: "Airport pickup", desc: "English-speaking driver waiting, sign in hand." },
  { icon: MapPin, title: "Stays vetted in person", desc: "We stayed there. No lottery, no photoshop." },
  { icon: Utensils, title: "Tables at the good spots", desc: "Booked before you land — even on weekends." },
  { icon: MessageCircle, title: "WhatsApp 24/7", desc: "Real humans. Replies in under 2 minutes." },
];

const STEPS = [
  { n: "01", title: "Pick your shape", desc: "Area, length, how hands-on. 10 seconds, three taps." },
  { n: "02", title: "We reply in minutes", desc: "Concierge on WhatsApp with an exact plan and a price." },
  { n: "03", title: "Land. Go.", desc: "Driver's there. Stay's ready. Tables are locked. Enjoy." },
];

const AREAS = [
  { icon: Waves, name: "Canggu", tag: "Surf town energy", copy: "Beach clubs, sunset bars, dawn longboards. Young, loud, fun." },
  { icon: Mountain, name: "Uluwatu", tag: "Cliffs & big nights", copy: "Clifftop pools, world-class waves, the best dinners on the island." },
  { icon: Trees, name: "Ubud", tag: "Jungle & wellness", copy: "Rice fields, yoga at 6am, temples, long lunches. Reset mode." },
];

const TESTIMONIALS = [
  { name: "Chloé M.", trip: "Canggu · 12 days", quote: "Landed, driver was there, villa was ready, every restaurant already booked. I literally did nothing." },
  { name: "Daniel K.", trip: "Uluwatu · 9 days", quote: "They got us into places we'd been trying to book for weeks. The concierge answered at 2am. Wild." },
  { name: "Sofia R.", trip: "Ubud + Canggu · 3 weeks", quote: "Half-jungle, half-surf, zero planning. Best trip I've taken since 2019." },
];

const FAQS = [
  { q: "How does pricing work?", a: "One flat per-person price covers stays, drivers, eSIM, bookings, and concierge. Flights, meals, and activities you pay yourself at the venue." },
  { q: "Do I need an account?", a: "No. Pick your shape, we message you on WhatsApp, you pay a deposit, done." },
  { q: "What if I want to change the plan?", a: "Message the concierge. Anytime. Plans are editable until you check out." },
  { q: "Refund policy?", a: "Full refund if we can't match your ask. 48h cancellation before arrival, minus a small deposit fee." },
  { q: "Can you handle couples / groups / solo?", a: "Yes. We've handled honeymooners, 12-person bachelor parties, and solo digital nomads. Same WhatsApp, same price structure." },
  { q: "Are you an agency or a tech product?", a: "Both. A Bali team you DM on WhatsApp, backed by our own booking and itinerary tools." },
];

export default async function Home() {
  const audience = await getAudienceCookie();
  if (audience === "entrepreneur") redirect("/business");
  if (!audience) return <AudienceChooser />;

  const waHref = whatsappHref("Hi Skyrol — I'd like to plan a Bali trip.");

  return (
    <>
      <Navbar />
      <main className="pt-14">
        {/* HERO + PICKER */}
        <section className="relative overflow-hidden pt-10 lg:pt-14 pb-14 lg:pb-18">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[36rem] h-[36rem] rounded-full bg-coral/10 blur-3xl" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[32rem] h-[32rem] rounded-full bg-gold/10 blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-coral uppercase tracking-[0.15em] mb-4">
                <Sparkles className="w-3 h-3" /> Bali in 10 seconds
              </span>
              <h1 className="text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold tracking-[-0.03em] leading-[1.03] mb-5">
                The Bali trip you meant to plan.{" "}
                <span className="bg-linear-to-r from-coral via-gold to-coral-dark bg-clip-text text-transparent">
                  Done in three taps.
                </span>
              </h1>
              <p className="text-[1.05rem] text-foreground/60 leading-relaxed font-[350] max-w-lg mb-6">
                Hand-picked stays in Canggu, Uluwatu and Ubud. English-speaking drivers. Tables at
                the restaurants you actually want. One price. We reply on WhatsApp.
              </p>
              <ul className="grid grid-cols-3 gap-3 mb-7 max-w-md">
                <Stat icon={<Clock className="w-3.5 h-3.5" />} label="Reply time" value="< 2 min" />
                <Stat icon={<Star className="w-3.5 h-3.5" />} label="Rating" value="4.9 · 800+" />
                <Stat icon={<Shield className="w-3.5 h-3.5" />} label="Refund" value="Guaranteed" />
              </ul>
              <div className="flex flex-wrap gap-2.5">
                <a href="#picker" className="group inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-[1.02] transition-all">
                  Build your trip
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-foreground/10 hover:bg-foreground/[0.04] text-foreground font-semibold text-sm transition-colors">
                  <MessageCircle className="w-4 h-4 text-coral" /> Chat on WhatsApp
                </a>
              </div>
            </div>
            <div id="picker" className="scroll-mt-20">
              <PackagePicker />
            </div>
          </div>
        </section>

        {/* INCLUDED */}
        <section className="py-14 lg:py-18 bg-sand/40">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <SectionHead eyebrow="What's included" title="Everything handled. One price." sub="No hidden fees, no surprise upsells, no five-freelancer juggling act." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
              {INCLUDED.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl border border-foreground/[0.06] p-5">
                  <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center mb-3">
                    <f.icon className="w-4.5 h-4.5 text-coral" />
                  </div>
                  <h3 className="font-bold text-[0.95rem] mb-1">{f.title}</h3>
                  <p className="text-[0.85rem] text-foreground/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-14 lg:py-18">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <SectionHead eyebrow="How it works" title="Three steps. That's it." sub="No accounts, no forms, no 40-field questionnaire. Just tell us what you want." />
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              {STEPS.map((s) => (
                <div key={s.n} className="bg-white rounded-2xl border border-foreground/[0.06] p-6 relative">
                  <span className="text-[2.5rem] font-bold tracking-tight text-coral/20 leading-none">{s.n}</span>
                  <h3 className="font-bold text-[1.05rem] mt-2 mb-1.5">{s.title}</h3>
                  <p className="text-[0.88rem] text-foreground/60 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AREAS */}
        <section className="py-14 lg:py-18 bg-foreground text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <SectionHead dark eyebrow="Where we operate" title="Three bases. Pick one, or mix." sub="We only book what we've stayed at. No stock-photo lottery." />
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              {AREAS.map((a) => (
                <div key={a.name} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] transition-colors">
                  <a.icon className="w-6 h-6 text-coral mb-3" />
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-coral mb-1">{a.tag}</p>
                  <h3 className="text-xl font-bold mb-2">{a.name}</h3>
                  <p className="text-[0.88rem] text-white/60 leading-relaxed">{a.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-14 lg:py-18">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <SectionHead eyebrow="What travelers say" title="Real trips. Real words." />
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="bg-sand/50 rounded-2xl p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-coral text-coral" />
                    ))}
                  </div>
                  <blockquote className="text-[0.93rem] leading-relaxed text-foreground/80 font-medium mb-4">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="text-[0.8rem] text-foreground/50">
                    <span className="font-semibold text-foreground/75">{t.name}</span> · {t.trip}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 lg:py-18 bg-sand/40">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <SectionHead eyebrow="Answers" title="Questions we get daily." />
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mt-10">
              {FAQS.map((f) => (
                <details key={f.q} className="group bg-white rounded-xl border border-foreground/[0.06] p-4 open:shadow-sm">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[0.95rem]">
                    {f.q}
                    <span className="text-coral text-xl leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 text-[0.88rem] text-foreground/60 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-14 lg:py-18">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="relative overflow-hidden bg-foreground text-white rounded-[2rem] p-10 lg:p-14 text-center">
              <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-coral/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative">
                <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-tight mb-3">
                  Ready when you are.
                </h2>
                <p className="text-white/60 max-w-lg mx-auto mb-6 leading-relaxed">
                  Three taps to a price. Minutes to a plan. Days to Bali.
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <Link href="#picker" className="group px-5 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/30 hover:shadow-coral/50 hover:scale-[1.02] transition-all flex items-center gap-1.5">
                    Build my trip
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" /> WhatsApp us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="max-w-2xl">
      <span className={`inline-block text-[0.7rem] font-semibold uppercase tracking-[0.15em] mb-3 ${dark ? "text-coral" : "text-coral"}`}>
        {eyebrow}
      </span>
      <h2 className={`text-[1.75rem] lg:text-[2.25rem] font-bold tracking-[-0.02em] leading-tight ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {sub && (
        <p className={`mt-3 text-[0.98rem] leading-relaxed ${dark ? "text-white/60" : "text-foreground/60"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex flex-col gap-0.5">
      <span className="inline-flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-foreground/45">
        {icon} {label}
      </span>
      <span className="font-bold text-sm">{value}</span>
    </li>
  );
}
