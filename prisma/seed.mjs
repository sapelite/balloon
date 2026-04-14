// Seed script using dynamic import to handle Prisma v7 ESM client
import "dotenv/config";
import path from "path";
async function main() {
  const { PrismaClient } = await import("../src/generated/prisma/client.ts");
  const { PrismaLibSql } = await import("@prisma/adapter-libsql");
  const raw = process.env.DATABASE_URL;
  let url;
  if (raw?.startsWith("file:")) {
    const p = raw.slice(5);
    url = path.isAbsolute(p) ? raw : `file:${path.join(process.cwd(), p.replace(/^\.\//, ""))}`;
  } else if (raw) {
    url = raw;
  } else {
    url = `file:${path.join(process.cwd(), "dev.db")}`;
  }
  const authToken = process.env.DATABASE_AUTH_TOKEN;
  const adapter = new PrismaLibSql(authToken ? { url, authToken } : { url });
  const prisma = new PrismaClient({ adapter });

  try {
    // Clean existing data
    await prisma.clientBriefing.deleteMany();
    await prisma.clientContent.deleteMany();
    await prisma.clientInsight.deleteMany();
    await prisma.clientMetric.deleteMany();
    await prisma.businessClient.deleteMany();
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.service.deleteMany();
    await prisma.partner.deleteMany();
    await prisma.guide.deleteMany();
    await prisma.user.deleteMany();
    await prisma.waitlist.deleteMany();

    // ─── Demo User ────────────────────────────────────────
    const user = await prisma.user.create({
      data: {
        email: "demo@skyrol.app",
        name: "Alex Traveler",
        provider: "google",
        referralCode: "SKYROL-ALEX",
      },
    });

    // ─── Partners ─────────────────────────────────────────
    const partners = [];

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Bali Ride Co.",
          slug: "bali-ride-co",
          category: "scooter",
          description: "Premium scooter rental with free delivery to your villa. All bikes include insurance, helmets, and 24/7 roadside assistance.",
          longDesc: "Bali Ride Co. is the island's most trusted scooter rental service, operating since 2019. We deliver directly to your accommodation in Canggu, Seminyak, and Ubud within 2 hours of booking. Every scooter comes with comprehensive insurance, two premium helmets, a phone mount, and a rain poncho. Our 24/7 WhatsApp support means you're never stranded.",
          image: "/partners/scooter-1.jpg",
          gallery: JSON.stringify(["/partners/scooter-1a.jpg", "/partners/scooter-1b.jpg"]),
          rating: 4.8,
          reviewCount: 342,
          location: "Jl. Batu Bolong No. 42, Canggu",
          area: "canggu",
          priceRange: "$$",
          features: JSON.stringify(["Free delivery", "Insurance included", "24/7 support", "Premium helmets", "Phone mount"]),
          phone: "+62 812-3456-7890",
          isVerified: true,
          isFeatured: true,
          discount: "Free full tank with Skyrol",
          services: {
            create: [
              { name: "Honda Scoopy 110cc", description: "Perfect for short rides around town. Automatic, easy to handle.", price: 5, unit: "per_day", image: "/services/scoopy.jpg" },
              { name: "Yamaha NMAX 155cc", description: "Powerful and comfortable for long distances. ABS brakes, USB charger.", price: 8, unit: "per_day", image: "/services/nmax.jpg" },
              { name: "Honda PCX 160cc", description: "Premium touring scooter. Keyless ignition, traction control.", price: 12, unit: "per_day", image: "/services/pcx.jpg" },
            ],
          },
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Island Wheels",
          slug: "island-wheels",
          category: "scooter",
          description: "Budget-friendly scooter rentals across South Bali. Weekly and monthly discounts available.",
          image: "/partners/scooter-2.jpg",
          rating: 4.5,
          reviewCount: 189,
          location: "Jl. Kayu Aya No. 15, Seminyak",
          area: "seminyak",
          priceRange: "$",
          features: JSON.stringify(["Budget friendly", "Monthly discounts", "Multiple pickup points"]),
          phone: "+62 813-5555-1234",
          isVerified: true,
          discount: "-15% on weekly rentals via Skyrol",
          services: {
            create: [
              { name: "Honda Beat 110cc", description: "Most affordable option. Great for daily commutes.", price: 3.5, unit: "per_day" },
              { name: "Honda Vario 125cc", description: "Mid-range scooter with good performance.", price: 6, unit: "per_day" },
            ],
          },
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Tropical Haven Villas",
          slug: "tropical-haven-villas",
          category: "villa",
          description: "Luxury private pool villas in the heart of Canggu. Managed by a local team with 5-star hospitality.",
          longDesc: "Tropical Haven manages 45+ premium villas across Canggu and Pererenan. Each property features a private pool, full kitchen, high-speed WiFi, and daily housekeeping.",
          image: "/partners/villa-1.jpg",
          gallery: JSON.stringify(["/partners/villa-1a.jpg", "/partners/villa-1b.jpg"]),
          rating: 4.9,
          reviewCount: 567,
          location: "Various locations, Canggu",
          area: "canggu",
          priceRange: "$$$",
          features: JSON.stringify(["Private pool", "Daily housekeeping", "High-speed WiFi", "Full kitchen", "Concierge"]),
          isVerified: true,
          isFeatured: true,
          discount: "Free airport transfer with 7+ night booking",
          services: {
            create: [
              { name: "1BR Pool Villa", description: "Cozy villa with private pool, perfect for couples.", price: 65, unit: "per_day" },
              { name: "2BR Family Villa", description: "Spacious villa with 2 bedrooms, pool, and garden.", price: 110, unit: "per_day" },
              { name: "4BR Luxury Compound", description: "Premium compound with staff, chef available.", price: 250, unit: "per_day" },
            ],
          },
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Ubud Jungle Retreats",
          slug: "ubud-jungle-retreats",
          category: "villa",
          description: "Eco-luxury bamboo villas nestled in Ubud's rice terraces. Yoga, meditation, and nature.",
          image: "/partners/villa-2.jpg",
          rating: 4.7,
          reviewCount: 234,
          location: "Jl. Suweta, Ubud",
          area: "ubud",
          priceRange: "$$",
          features: JSON.stringify(["Rice terrace views", "Yoga shala", "Organic breakfast", "Eco-friendly"]),
          isVerified: true,
          discount: "Complimentary yoga class with Skyrol booking",
          services: {
            create: [
              { name: "Bamboo Bungalow", description: "Eco bungalow with jungle views.", price: 45, unit: "per_day" },
              { name: "Rice Terrace Suite", description: "Premium suite overlooking rice paddies.", price: 85, unit: "per_day" },
            ],
          },
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Warung Sunset",
          slug: "warung-sunset",
          category: "restaurant",
          description: "Beachfront Indonesian cuisine with the best sunset views in Canggu.",
          image: "/partners/restaurant-1.jpg",
          rating: 4.6,
          reviewCount: 891,
          location: "Echo Beach, Canggu",
          area: "canggu",
          priceRange: "$$",
          features: JSON.stringify(["Beachfront", "Sunset views", "Live music", "Fresh seafood"]),
          isVerified: true,
          isFeatured: true,
          discount: "Free welcome drink with Bali Pass",
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Nasi Campur House",
          slug: "nasi-campur-house",
          category: "restaurant",
          description: "Authentic Balinese street food elevated. Family recipes, three generations.",
          image: "/partners/restaurant-2.jpg",
          rating: 4.8,
          reviewCount: 456,
          location: "Jl. Hanoman No. 28, Ubud",
          area: "ubud",
          priceRange: "$",
          features: JSON.stringify(["Authentic Balinese", "Family recipes", "Vegan options"]),
          isVerified: true,
          discount: "10% off total bill with Bali Pass",
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Coral Beach Club",
          slug: "coral-beach-club",
          category: "beach_club",
          description: "Premium beach club in Seminyak with infinity pool, DJ sets, and Mediterranean cuisine.",
          image: "/partners/beach-1.jpg",
          rating: 4.4,
          reviewCount: 1203,
          location: "Jl. Petitenget, Seminyak",
          area: "seminyak",
          priceRange: "$$$",
          features: JSON.stringify(["Infinity pool", "DJ sets", "VIP cabanas", "Cocktail lounge"]),
          isVerified: true,
          isFeatured: true,
          discount: "Queue skip + 1 free cocktail with Bali Pass",
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Zen Garden Spa",
          slug: "zen-garden-spa",
          category: "spa",
          description: "Traditional Balinese massage and wellness in a serene jungle setting.",
          image: "/partners/spa-1.jpg",
          rating: 4.9,
          reviewCount: 678,
          location: "Monkey Forest Road, Ubud",
          area: "ubud",
          priceRange: "$$",
          features: JSON.stringify(["Balinese massage", "Flower bath", "Couples treatment"]),
          isVerified: true,
          discount: "Free flower bath upgrade with Bali Pass",
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "Bali Private Drivers",
          slug: "bali-private-drivers",
          category: "transport",
          description: "Licensed English-speaking drivers for airport transfers and day trips.",
          longDesc: "Fleet of 30+ vehicles from sedans to luxury SUVs. Fixed-price airport transfers, full-day charters, and inter-city transport.",
          image: "/partners/transport-1.jpg",
          rating: 4.7,
          reviewCount: 445,
          location: "Ngurah Rai International Airport",
          area: "kuta",
          priceRange: "$$",
          features: JSON.stringify(["Airport transfers", "Day trips", "English speaking", "Fixed pricing", "Child seats"]),
          isVerified: true,
          isFeatured: true,
          discount: "Included in Arrival Essentials package",
          services: {
            create: [
              { name: "Airport Transfer (one-way)", description: "Private car from Ngurah Rai to your accommodation.", price: 18, unit: "per_trip" },
              { name: "Airport Transfer (return)", description: "Round-trip airport transfer.", price: 32, unit: "per_trip" },
              { name: "Full Day Charter (10h)", description: "Private car and driver for exploration.", price: 55, unit: "per_day" },
            ],
          },
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "BaliConnect eSIM",
          slug: "baliconnect-esim",
          category: "telecom",
          description: "Instant eSIM activation with Telkomsel network. 4G/5G data across Indonesia.",
          longDesc: "BaliConnect partners with Telkomsel for instant eSIM activation. Scan QR code before boarding, data activates on landing.",
          image: "/partners/esim-1.jpg",
          rating: 4.6,
          reviewCount: 289,
          location: "Digital — delivered via QR code",
          area: "canggu",
          priceRange: "$",
          features: JSON.stringify(["Instant activation", "Telkomsel network", "4G/5G", "Hotspot tethering"]),
          isVerified: true,
          isFeatured: true,
          discount: "Included in Arrival Essentials package",
          services: {
            create: [
              { name: "7-Day Plan (10GB)", description: "Short trip. 10GB 4G data + 30 min calls.", price: 9, unit: "one_time" },
              { name: "14-Day Plan (25GB)", description: "Most popular. 25GB 4G/5G + unlimited calls.", price: 15, unit: "one_time" },
              { name: "30-Day Plan (50GB)", description: "Nomads. 50GB data + unlimited calls + SMS.", price: 25, unit: "one_time" },
            ],
          },
        },
      })
    );

    partners.push(
      await prisma.partner.create({
        data: {
          name: "SafetyWing Nomad",
          slug: "safetywing-nomad",
          category: "insurance",
          description: "Travel medical insurance for nomads. Hospitals, emergencies, trip interruption.",
          image: "/partners/insurance-1.jpg",
          rating: 4.5,
          reviewCount: 178,
          location: "Digital — instant policy",
          area: "canggu",
          priceRange: "$",
          features: JSON.stringify(["Medical coverage", "Emergency evacuation", "COVID coverage"]),
          isVerified: true,
          discount: "First month free via Skyrol referral",
          services: {
            create: [
              { name: "Nomad Insurance", description: "Medical + travel coverage. Billed monthly.", price: 42, unit: "per_month", currency: "USD" },
            ],
          },
        },
      })
    );

    // ─── Reviews ──────────────────────────────────────────
    const reviewData = [
      { partnerId: partners[0].id, rating: 5, comment: "The NMAX was in perfect condition. Delivered to my villa within 1 hour!" },
      { partnerId: partners[0].id, rating: 5, comment: "Used for 3 weeks. Zero issues. Flat tire? Replacement in 30 min." },
      { partnerId: partners[0].id, rating: 4, comment: "Great scooters. Phone mount was loose but they replaced it next day." },
      { partnerId: partners[2].id, rating: 5, comment: "Villa was paradise. Private pool, daily cleaning, chef for one evening." },
      { partnerId: partners[2].id, rating: 5, comment: "2 weeks in 2BR villa. WiFi fast enough for remote work. Perfect." },
      { partnerId: partners[4].id, rating: 5, comment: "Best sunset dinner in Bali. Grilled prawns were incredible." },
      { partnerId: partners[6].id, rating: 4, comment: "Beautiful pool, great vibes. VIP cabana and Bali Pass queue skip were lifesavers." },
      { partnerId: partners[7].id, rating: 5, comment: "Best Balinese massage ever. 90 min of bliss. Flower bath was magical." },
      { partnerId: partners[8].id, rating: 5, comment: "Driver waiting at airport with cold towel and water. Fixed price, no haggling." },
      { partnerId: partners[9].id, rating: 4, comment: "eSIM worked instantly on landing. Good speeds in Canggu and Ubud." },
    ];

    for (const r of reviewData) {
      await prisma.review.create({ data: { ...r, userId: user.id } });
    }

    // ─── Guides ───────────────────────────────────────────
    await prisma.guide.createMany({
      data: [
        {
          title: "Visa on Arrival: Complete 2026 Guide",
          slug: "visa-on-arrival-bali-2026",
          category: "visa",
          icon: "FileText",
          excerpt: "Everything about getting your VoA at Ngurah Rai. Updated for 2026.",
          order: 1,
          content: "# Visa on Arrival — Bali 2026\n\n## TL;DR\n\n- **Most travelers**: pay **IDR 500,000** (~$31) for a 30-day VoA\n- **Staying longer?** Apply for a B211A online — 60 days, extendable\n- **Apply online before you fly** — the e-VoA queue is 3× faster\n\n## Do You Even Need One?\n\nCitizens of **90+ countries** qualify for Visa on Arrival, including:\n\n- **Europe**: all EU/EEA, UK, Switzerland\n- **Americas**: USA, Canada, Brazil, Mexico\n- **Asia-Pacific**: Australia, New Zealand, Japan, South Korea\n\nIf your country isn't on that list, you'll need a B211A visitor visa. Check **molina.imigrasi.go.id** — it tells you in 10 seconds.\n\n## What It Costs\n\n| Option | Price | Valid for | Extendable? |\n|--------|-------|-----------|-------------|\n| Single Entry VoA | **IDR 500,000** (~$31) | 30 days | Yes, once (+30 days) |\n| B211A (e-Visa) | **IDR 1,500,000** (~$93) | 60 days | Yes, up to 180 days |\n\n## Before You Fly\n\n1. Check your passport — it must be valid for **6+ months** past arrival\n2. Have a **return or onward flight** booked (they check)\n3. Apply for e-VoA online at **molina.imigrasi.go.id** — takes 10 minutes\n4. Save the approval PDF to your phone (offline)\n\n## At the Airport\n\n1. Follow the **VoA** signs after disembarking\n2. If you didn't do e-VoA: pay at the counter (IDR, USD, or card)\n3. Immigration desk — show passport + VoA receipt + return ticket\n4. Collect luggage, clear customs, you're in\n\n## Pro Tips\n\n- **Always pay in IDR**. USD at the counter uses a bad exchange rate\n- The **e-VoA queue** at Ngurah Rai is dramatically shorter than walk-up\n- **Don't overstay**. The fine is **IDR 1,000,000 per day** and you'll be detained if it's more than 60 days\n- Extending is easy: apply online 10 days before your VoA expires\n",
        },
        {
          title: "Bali Tourist Tax: What You Need to Know",
          slug: "bali-tourist-tax-2026",
          category: "tax",
          icon: "Receipt",
          excerpt: "The IDR 150,000 tourist tax is mandatory. Here's how to pay before you arrive.",
          order: 2,
          content: "# Bali Tourist Tax — 2026\n\n## TL;DR\n\n- **IDR 150,000** (~$9.50) per entry\n- **Pay online** at lovebali.baliprov.go.id — 2 minutes\n- **Screenshot the QR code** before you fly\n\n## What Is It?\n\nSince February 2024, every international visitor pays a small levy that funds cultural preservation, waste management, and beach cleanup.\n\nIt's **IDR 150,000** (~$9.50) — roughly the price of a nice nasi goreng. You pay it **every time you enter** Bali, not once per year.\n\n## The Easy Way (Before You Fly)\n\n1. Go to **lovebali.baliprov.go.id**\n2. Enter your passport + travel dates\n3. Pay with any international card or e-wallet\n4. Save the **QR code** to your phone — this is your proof\n\nTotal time: about 2 minutes.\n\n## The Slow Way (At the Airport)\n\n- Counters are just after immigration, before baggage\n- Cash (IDR, USD) or card\n- Peak arrival hours: expect 15–30 min queues\n\n## Common Questions\n\n**Do kids pay?** Yes — same rate, any age.\n\n**What if I leave and come back?** Pay again. It's per entry.\n\n**Do I need to show the QR anywhere else?** Technically yes, at select attractions. In practice, rarely. Keep the screenshot anyway.\n\n## Pro Tips\n\n- Pay online **24h before departure** — the confirmation email can take a few hours\n- **Screenshot** the QR code. Airport WiFi is unreliable\n- The official site is **lovebali.baliprov.go.id** — ignore any other URL asking you to pay\n",
        },
        {
          title: "Emergency Contacts & Hospital Guide",
          slug: "emergency-contacts-bali",
          category: "emergency",
          icon: "Phone",
          excerpt: "All emergency numbers: hospitals, police, embassies, and what to do.",
          order: 3,
          content: "# Emergencies in Bali — Who to Call, Where to Go\n\n## TL;DR\n\n- **General emergency: 112** (works from any phone, any SIM)\n- **Best tourist hospital: BIMC Kuta** — English-speaking, 24/7\n- **Tourist Police: +62 361 224 111** — report theft, lost passport\n\n## Emergency Numbers\n\n| Service | Number |\n|---------|--------|\n| General Emergency | **112** |\n| Police | 110 |\n| Ambulance | 118 / 119 |\n| Tourist Police | +62 361 224 111 |\n| Fire | 113 |\n\nSave **112** before landing. It works without a SIM card and reaches all services.\n\n## Hospitals Worth Going To\n\n### BIMC Hospital Kuta — The tourist default\n\n- Jl. Bypass Ngurah Rai No. 100X, Kuta\n- **+62 361 761 263**\n- 24/7, English-speaking staff, international insurance accepted\n- Go here first if you're unsure\n\n### Siloam Hospital Denpasar — Bigger, more specialties\n\n- Jl. Sunset Road No. 818, Denpasar\n- **+62 361 779 900**\n- Cardiac, neuro, surgery — well-equipped\n\n### Ubud? Use BIMC Nusa Dua or Siloam — there's no major tourist hospital in Ubud itself.\n\n## What To Do — Medical\n\n1. Call **112** or take a **Grab** to BIMC Kuta\n2. Call your **insurance emergency line** before paying anything big\n3. Keep your **passport + insurance card** together and accessible\n4. Save receipts, reports, and prescriptions — insurance needs them\n\n## What To Do — Theft or Lost Passport\n\n1. Call **Tourist Police** (+62 361 224 111) — they speak English\n2. Go to the nearest station to **file a police report** (you need it for insurance + your embassy)\n3. Contact your **embassy in Jakarta** if your passport is stolen — emergency replacement takes 2–5 days\n4. **Block your cards** via your bank's app immediately\n\n## Scooter Accident?\n\n- Don't move someone with a head or neck injury — wait for ambulance\n- Take photos of both scooters and the scene\n- Exchange info; call your insurance\n- Most tourists go straight to **BIMC Kuta** — they deal with scooter injuries daily\n\n## Pro Tips\n\n- Write down your **insurance emergency line + policy number** and keep it offline in your wallet\n- Skyrol users have 24/7 concierge — message us first, we coordinate the rest\n- **Dengue fever** symptoms = high fever + body aches + rash. Go to hospital, don't wait it out\n",
        },
        {
          title: "IDR Currency Guide & Converter",
          slug: "currency-converter-idr",
          category: "currency",
          icon: "DollarSign",
          excerpt: "Understand Rupiah, avoid money changer scams, know the real costs.",
          order: 4,
          content: "# Rupiah 101 — Money in Bali Without Getting Scammed\n\n## TL;DR\n\n- **Chop three zeros** off IDR to roughly get USD cents. 50,000 IDR ≈ $3\n- **Use ATMs** (Bank Mandiri, BCA, BNI) for the best rate\n- **Avoid street money changers** with rates that seem too good — they're the scam\n\n## Quick Mental Math\n\nDivide by roughly **16,000** to get USD:\n\n| Currency | ≈ IDR |\n|----------|-------|\n| 1 USD | 15,800 |\n| 1 EUR | 17,200 |\n| 1 GBP | 20,000 |\n| 1 AUD | 10,400 |\n\n**Shortcut**: drop three zeros, divide by 16. 80,000 IDR → 80 → 80 ÷ 16 = **$5**.\n\n## What Things Actually Cost\n\n| Item | IDR | ≈ USD |\n|------|-----|-------|\n| Nasi goreng at a warung | 25,000 | $1.60 |\n| Mid-range restaurant meal | 80–150k | $5–10 |\n| Western restaurant | 150–300k | $10–20 |\n| Local beer (at a shop) | 25,000 | $1.60 |\n| Beer at a beach club | 70–120k | $4–8 |\n| Grab ride (15 min) | 15–25k | $1–1.60 |\n| 1-hour Balinese massage | 100–200k | $6–13 |\n| Scooter rental (per day) | 50–100k | $3–6 |\n| Villa (mid-range, per night) | 700k–1.5M | $45–95 |\n\n## Where to Get Cash\n\n**1. ATMs at major banks** (best option)\n\n- Mandiri, BCA, BNI, CIMB\n- Look for ATMs **inside banks** — safer, no skimmers\n- Max withdrawal is usually 2.5M–3M IDR per transaction\n- Your home bank will charge ~$3–5; worth it for the rate\n\n**2. Wise or Revolut card**\n\n- Near-interbank rate, low fees\n- Works at all major ATMs\n- The best option for digital nomads\n\n**3. Authorized money changers**\n\n- Look for the **\"Authorized Money Changer\"** logo\n- PT Central Kuta is the most trusted chain\n- Count your cash **in front of them** before leaving\n\n## Scams to Know\n\n- **Quick-count trick** — they deal slowly then fast at the end to hide missing notes\n- **\"No commission\" shops** hide the fee in a worse rate\n- **Sticky-counter trick** — rubber mat palms one note per stack\n- **Rates 10% above market** are always a scam\n\n## Tipping\n\n- Restaurants: often a 10% service charge is already on the bill\n- If no service charge: **5–10%** is generous and appreciated\n- Scooter/villa delivery: **20–50k** tip\n- Spa: **10–20%** for good service\n",
        },
        {
          title: "Basic Bahasa Indonesia Lexicon",
          slug: "bahasa-lexicon",
          category: "lexicon",
          icon: "BookOpen",
          excerpt: "30 essential words and phrases to navigate Bali like a local.",
          order: 5,
          content: "# Bahasa Indonesia — 30 Phrases That Open Doors\n\n## TL;DR\n\n- **Terima kasih** = thank you. Use it constantly. Balinese light up when tourists say it\n- **Bisa kurang?** = \"Can you lower the price?\" — your golden bargaining phrase\n- **Enak!** = \"Delicious!\" — say it at every warung and you'll make a friend\n\n## Greetings\n\n| English | Bahasa | Say it like |\n|---------|--------|-------------|\n| Hello | Halo | HA-lo |\n| Good morning | Selamat pagi | s'LA-mat PA-gee |\n| Good afternoon | Selamat siang | s'LA-mat see-ANG |\n| Good evening | Selamat malam | s'LA-mat MA-lam |\n| Thank you | Terima kasih | t'REE-ma KA-see |\n| You're welcome | Sama sama | SA-ma SA-ma |\n| Sorry / Excuse me | Maaf | MA-af |\n| Yes / No | Ya / Tidak | ya / TEE-da |\n| Please | Tolong | TO-long |\n\n## Getting Around\n\n| English | Bahasa |\n|---------|--------|\n| How much? | Berapa? |\n| Too expensive | Terlalu mahal |\n| Can you lower it? | Bisa kurang? |\n| Where is...? | Di mana...? |\n| Left / Right | Kiri / Kanan |\n| Straight | Lurus |\n| Stop here | Berhenti di sini |\n| I don't understand | Saya tidak mengerti |\n| Help! | Tolong! |\n\n## At a Restaurant\n\n| English | Bahasa |\n|---------|--------|\n| The menu please | Minta menu |\n| The bill please | Minta bon |\n| Water | Air |\n| Rice | Nasi |\n| Chicken / Fish | Ayam / Ikan |\n| Vegetables | Sayur |\n| Spicy | Pedas |\n| Not spicy | Tidak pedas |\n| Delicious! | Enak! |\n\n## Numbers\n\n| # | Bahasa |\n|---|--------|\n| 1 | satu |\n| 2 | dua |\n| 5 | lima |\n| 10 | sepuluh |\n| 100 | seratus |\n| 1,000 | seribu |\n| 10,000 | sepuluh ribu |\n| 100,000 | seratus ribu |\n\n## Three Phrases That Punch Above Their Weight\n\n1. **Terima kasih banyak** — \"Thank you so much.\" Works magic at warungs, temples, anywhere\n2. **Bisa kurang?** — Markets expect it. Not using it = paying tourist tax\n3. **Tidak apa apa** — \"No worries / it's fine.\" The Balinese version of \"all good\"\n",
        },
        {
          title: "Top 10 First-Timer Tips for Bali",
          slug: "first-timer-tips-bali",
          category: "tips",
          icon: "Lightbulb",
          excerpt: "Avoid rookie mistakes. Temple etiquette to traffic survival.",
          order: 6,
          content: "# 10 Things First-Timers Always Wish They Knew\n\n## TL;DR\n\n- **Don't rent a scooter if you've never ridden one.** Hire a driver\n- **Never step on canang sari** — the flower offerings on sidewalks\n- **Bring a sarong** or buy one at the first temple — you'll reuse it everywhere\n\n## 1. Traffic Is Organized Chaos\n\nThere are rules, just not the ones you know. Scooters weave, cars honk to say \"I'm here,\" and intersections are a negotiation.\n\n- **Never your first time riding** — rent in your home country, not here\n- **Hire a private driver** for trips over 30 minutes. It's ~$40–55 for a full day\n- **Avoid school hours**: 7–8am and 1–2pm are bumper-to-bumper\n- **Always wear a helmet** — police checks target tourists and fines add up fast\n\n## 2. Temple Etiquette Isn't Optional\n\nTemples are active places of worship, not tourist sites.\n\n- **Sarong + sash** required. Most temples rent them for 20k IDR\n- **Shoulders and knees covered**\n- **Don't stand higher than a shrine** or a priest\n- **Menstruating?** By tradition, women don't enter the inner sanctum. Signs will say so\n\n## 3. The Flower Offerings Are Sacred\n\nThose little palm-leaf baskets with flowers, rice, and incense on every doorstep? They're **canang sari** — daily offerings to the spirits.\n\n**Never step on them.** Walk around. Even if it's on the sidewalk and you're in a hurry.\n\n## 4. Don't Drink Tap Water\n\n- **Use bottled water** for drinking and **brushing teeth**\n- Ice in restaurants is usually fine (it's factory-made)\n- Salads and cut fruit at street stalls: higher risk\n- **Bali belly** is real. Pack Imodium and rehydration salts\n\n## 5. Bargain at Markets, Not in Shops\n\n- **Markets + beachfront**: start at **30%** of asking, settle around 50–60%\n- **Shops with price tags**: the price is the price\n- **Smile while you bargain.** Aggression kills the deal\n- The magic phrase: **\"Bisa kurang?\"** (can you lower it?)\n\n## 6. Monkeys Are Thieves, Not Pets\n\nAt Ubud Monkey Forest or Uluwatu:\n\n- **Remove sunglasses, hats, earrings** before entering\n- **Don't carry food or plastic bags** — they're a magnet\n- **Don't fight** if one grabs your stuff. Staff will trade a banana for it\n- **Don't make eye contact** with the big males\n\n## 7. The Best Bali Is Outside the Main Zones\n\nCanggu, Seminyak, Ubud are great, but they're crowded. Rent a scooter or hire a driver and explore:\n\n- **Sidemen** — rice terraces without the tour buses\n- **Munduk** — waterfalls and coffee plantations\n- **Amed** — black-sand beaches and snorkeling\n- **Nusa Penida** — cliffs like a postcard, 45 min by ferry\n\n## 8. WiFi Is Good, But Bring an eSIM\n\n- Most cafes and villas: **15–50 Mbps**\n- Power cuts happen — eSIM = instant backup\n- **Telkomsel** has the best coverage across the island\n\n## 9. The Sun and the Mosquitos Are Both Trying to Kill You\n\n- **SPF 50 minimum.** The equatorial sun burns faster than you think\n- **Mosquito repellent** at dusk and dawn\n- **Dengue fever is real** (and on the rise). No vaccine, just prevention\n\n## 10. When in Doubt, Smile\n\nBalinese culture values calm and warmth. Frustration gets you nothing; a smile and patience get you everything.\n\n- **Nyepi** (Day of Silence, March) = the entire island shuts down for 24h. No flights, no beach, no WiFi in some places. Plan around it\n- If something goes wrong: **smile, breathe, ask gently.** It works\n\n## Bonus: What to Pack\n\n- Sarong (or buy one for $3 at your first temple)\n- Reef-safe sunscreen\n- Waterproof phone pouch\n- Small backpack for day trips\n- Imodium + rehydration salts\n- Cash in small bills (50k, 20k) for warungs and tips\n",
        },
      ],
    });

    // ─── Demo Bookings ────────────────────────────────────
    const scooterService = await prisma.service.findFirst({ where: { name: "Yamaha NMAX 155cc" } });
    const transferService = await prisma.service.findFirst({ where: { name: "Airport Transfer (one-way)" } });
    const esimService = await prisma.service.findFirst({ where: { name: "14-Day Plan (25GB)" } });

    if (scooterService && transferService && esimService) {
      await prisma.booking.createMany({
        data: [
          { userId: user.id, partnerId: partners[0].id, serviceId: scooterService.id, status: "confirmed", startDate: new Date("2026-05-15"), endDate: new Date("2026-05-29"), totalPrice: 112, address: "Villa Tropicana, Jl. Batu Bolong No. 88, Canggu", qrCode: "BLN-SCT-2026-0001" },
          { userId: user.id, partnerId: partners[8].id, serviceId: transferService.id, status: "confirmed", startDate: new Date("2026-05-15"), totalPrice: 18, notes: "Flight GA-714 arriving 14:30", qrCode: "BLN-VTC-2026-0001" },
          { userId: user.id, partnerId: partners[9].id, serviceId: esimService.id, status: "active", startDate: new Date("2026-05-15"), endDate: new Date("2026-05-29"), totalPrice: 15, qrCode: "BLN-SIM-2026-0001" },
        ],
      });
    }

    // ─── Waitlist ─────────────────────────────────────────
    await prisma.waitlist.createMany({
      data: [
        { email: "sarah@example.com", source: "hero" },
        { email: "marc@example.com", source: "cta" },
        { email: "yuki@example.com", source: "guide" },
        { email: "james@example.com", source: "partner" },
      ],
    });

    // ─── Business Client (demo for /business/dashboard) ───
    const bizUser = await prisma.user.create({
      data: {
        email: "villa@sunsetcanggu.com",
        name: "Made Wirawan",
        provider: "email",
      },
    });

    const client = await prisma.businessClient.create({
      data: {
        userId: bizUser.id,
        businessName: "Sunset Villa Canggu",
        industry: "villa",
        plan: "growth",
        instagramHandle: "@sunsetvillacanggu",
        tiktokHandle: "@sunsetvillabali",
        websiteUrl: "https://sunsetvillacanggu.com",
      },
    });

    await prisma.clientBriefing.create({
      data: {
        clientId: client.id,
        summary: "Strong week — Reels are carrying reach.",
        body: "Instagram reach +42% vs last week, driven by 2 Reels breaking 100k views. TikTok posting cadence slipped (1 post vs 3 planned). Website conversion stable at 3.4%. Two new direct bookings came from @wanderbali reshare.",
        nextAction: "Post the 2 backlog TikToks today. Reply to the 14 new comments on Reel #sunsetsession.",
        healthScore: 78,
        forDate: new Date(),
      },
    });

    const WEEKS = ["W1", "W2", "W3", "W4"];
    const metricRows = [
      { platform: "instagram", metricKey: "views", values: [420000, 510000, 680000, 940000] },
      { platform: "instagram", metricKey: "followers", values: [18200, 19400, 21100, 24300] },
      { platform: "instagram", metricKey: "engagement", values: [5.1, 5.8, 6.4, 7.2] },
      { platform: "instagram", metricKey: "reach", values: [280000, 340000, 460000, 620000] },
      { platform: "tiktok", metricKey: "views", values: [180000, 240000, 310000, 420000] },
      { platform: "tiktok", metricKey: "followers", values: [4200, 5100, 6400, 7800] },
      { platform: "tiktok", metricKey: "engagement", values: [4.2, 5.0, 5.8, 6.1] },
      { platform: "website", metricKey: "visitors", values: [2100, 2450, 2890, 3420] },
      { platform: "website", metricKey: "conversion", values: [2.5, 2.9, 3.1, 3.4] },
      { platform: "website", metricKey: "bookings", values: [11, 14, 17, 23] },
    ];

    for (const row of metricRows) {
      for (let i = 0; i < row.values.length; i++) {
        const current = row.values[i];
        const prev = i > 0 ? row.values[i - 1] : null;
        const delta = prev ? ((current - prev) / prev) * 100 : null;
        await prisma.clientMetric.create({
          data: {
            clientId: client.id,
            platform: row.platform,
            metricKey: row.metricKey,
            value: current,
            delta,
            periodLabel: WEEKS[i],
            recordedAt: new Date(Date.now() - (3 - i) * 7 * 24 * 60 * 60 * 1000),
          },
        });
      }
    }

    await prisma.clientInsight.createMany({
      data: [
        { clientId: client.id, title: "Shift to 70% Reels", body: "Your Reels average 3.1x the reach of static posts. Reallocate 2 of this week's 3 carousels to Reels.", priority: "high", category: "content", status: "open" },
        { clientId: client.id, title: "TikTok cadence dropped", body: "Posted 1x last week vs 3x planned. Momentum cools fast on TikTok — batch-record 5 clips this weekend.", priority: "high", category: "ops", status: "open" },
        { clientId: client.id, title: "Reply to @wanderbali collab DM", body: "They reshared you organically and have 68k followers. Warm lead — reply today with a barter proposal (2-night stay for a content piece).", priority: "high", category: "growth", status: "open" },
        { clientId: client.id, title: "Add booking CTA to IG bio", body: "Your bio link goes to homepage. Replace with /book — conversion tests show +18% bookings when CTA is direct.", priority: "normal", category: "conversion", status: "open" },
        { clientId: client.id, title: "Sunset Reel format is winning", body: "All 3 top posts this month share the golden-hour drone intro. Double down — you have 8 untapped sunset clips in the drive.", priority: "normal", category: "content", status: "open" },
      ],
    });

    await prisma.clientContent.createMany({
      data: [
        { clientId: client.id, platform: "instagram", caption: "Sunset session from the rooftop", views: 184000, likes: 12400, comments: 284, shares: 1820, publishedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000) },
        { clientId: client.id, platform: "instagram", caption: "Morning yoga by the pool", views: 96000, likes: 7100, comments: 142, shares: 510, publishedAt: new Date(Date.now() - 10 * 24 * 3600 * 1000) },
        { clientId: client.id, platform: "tiktok", caption: "POV: waking up in Canggu", views: 312000, likes: 24800, comments: 890, shares: 4200, publishedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000) },
        { clientId: client.id, platform: "tiktok", caption: "Villa tour in 30 seconds", views: 148000, likes: 11200, comments: 412, shares: 1650, publishedAt: new Date(Date.now() - 8 * 24 * 3600 * 1000) },
        { clientId: client.id, platform: "instagram", caption: "Rice terrace picnic for two", views: 54000, likes: 3800, comments: 89, shares: 240, publishedAt: new Date(Date.now() - 14 * 24 * 3600 * 1000) },
      ],
    });

    console.log("Seed completed!");
    console.log(`Created: 2 users, ${partners.length} partners, 6 guides, 10 reviews, 3 bookings, 4 waitlist, 1 business client`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
