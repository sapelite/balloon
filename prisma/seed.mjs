// Seed script using dynamic import to handle Prisma v7 ESM client
async function main() {
  const { PrismaClient } = await import("../src/generated/prisma/client.ts");
  const prisma = new PrismaClient();

  try {
    // Clean existing data
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
        email: "demo@balloon.app",
        name: "Alex Traveler",
        provider: "google",
        referralCode: "BALLOON-ALEX",
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
          discount: "Free full tank with Balloon",
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
          discount: "-15% on weekly rentals via Balloon",
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
          discount: "Complimentary yoga class with Balloon booking",
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
          discount: "First month free via Balloon referral",
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
          content: "# Visa on Arrival (VoA) — Bali 2026\n\n## Who Needs a VoA?\n\nCitizens of 90+ countries can obtain a Visa on Arrival. This includes:\n- **Europe**: All EU/EEA, UK, Switzerland\n- **Americas**: USA, Canada, Brazil, Mexico\n- **Asia-Pacific**: Australia, NZ, Japan, South Korea\n\n## Cost & Duration\n\n| Type | Cost | Duration |\n|------|------|----------|\n| Single Entry VoA | **IDR 500,000 (~$31)** | 30 days |\n| B211A (e-Visa) | **IDR 1,500,000 (~$93)** | 60 days |\n\n## Step-by-Step\n\n### Before You Fly\n1. Check passport — valid 6+ months\n2. Book return flight\n3. Apply e-VoA online at molina.imigrasi.go.id\n\n### At the Airport\n1. Follow VoA signs\n2. Pay fee (cash IDR/USD or card)\n3. Immigration — present passport + receipt\n4. Customs declaration\n5. Collect baggage\n\n## Pro Tips\n- Pay in IDR to avoid bad exchange rates\n- e-VoA queue is much faster\n- Don't overstay: IDR 1,000,000 per day fine",
        },
        {
          title: "Bali Tourist Tax: What You Need to Know",
          slug: "bali-tourist-tax-2026",
          category: "tax",
          icon: "Receipt",
          excerpt: "The IDR 150,000 tourist tax is mandatory. Here's how to pay before you arrive.",
          order: 2,
          content: "# Bali Tourist Tax — 2026\n\n## What Is It?\nSince Feb 2024, all international visitors pay **IDR 150,000 (~$9.50)** for cultural preservation and infrastructure.\n\n## How to Pay\n\n### Online (Recommended)\n1. Visit lovebali.baliprov.go.id\n2. Fill details and travel dates\n3. Pay via card or e-wallet\n4. Save the QR code\n\n### At the Airport\n- Counters after immigration\n- Cash or cards accepted\n- Expect queues during peak hours\n\n## Pro Tips\n- Pay online 24h before departure\n- Screenshot QR code for poor WiFi\n- Tax is per entry (leave and return = pay again)",
        },
        {
          title: "Emergency Contacts & Hospital Guide",
          slug: "emergency-contacts-bali",
          category: "emergency",
          icon: "Phone",
          excerpt: "All emergency numbers: hospitals, police, embassies, and what to do.",
          order: 3,
          content: "# Emergency Contacts in Bali\n\n## Emergency Numbers\n| Service | Number |\n|---------|--------|\n| General Emergency | **112** |\n| Police | 110 |\n| Ambulance | 118/119 |\n| Tourist Police | +62 361 224 111 |\n\n## Best Hospitals\n\n### BIMC Hospital Kuta\n- Jl. Bypass Ngurah Rai No. 100X\n- +62 361 761 263\n- 24/7, English speaking\n- Best for tourists\n\n### Siloam Hospital Denpasar\n- Jl. Sunset Road No. 818\n- +62 361 779 900\n\n## What To Do\n### Medical Emergency\n1. Call 112 or go to BIMC\n2. Call insurance emergency line\n3. Keep passport accessible\n\n### Theft\n1. Call Tourist Police\n2. File police report\n3. Contact embassy if passport stolen\n4. Block credit cards",
        },
        {
          title: "IDR Currency Guide & Converter",
          slug: "currency-converter-idr",
          category: "currency",
          icon: "DollarSign",
          excerpt: "Understand Rupiah, avoid money changer scams, know the real costs.",
          order: 4,
          content: "# Indonesian Rupiah (IDR)\n\n## Quick Rates (2026)\n| Currency | ~IDR |\n|----------|------|\n| 1 USD | 15,800 |\n| 1 EUR | 17,200 |\n| 1 GBP | 20,000 |\n| 1 AUD | 10,400 |\n\n## Real Costs\n| Item | IDR | ~USD |\n|------|-----|------|\n| Nasi Goreng | 25,000 | $1.60 |\n| Restaurant meal | 80-150k | $5-10 |\n| Beer (shop) | 25,000 | $1.60 |\n| Grab (15 min) | 15-25k | $1-1.60 |\n| Massage (1h) | 100-200k | $6-13 |\n\n## Where to Exchange\n1. ATM (Bank Mandiri/BCA) — best rates\n2. Wise/Revolut card\n3. Authorized money changers only\n\n## Scams to Avoid\n- Quick counting tricks\n- \"No commission\" shops\n- Rates too good to be true",
        },
        {
          title: "Basic Bahasa Indonesia Lexicon",
          slug: "bahasa-lexicon",
          category: "lexicon",
          icon: "BookOpen",
          excerpt: "30 essential words and phrases to navigate Bali like a local.",
          order: 5,
          content: "# Bahasa Indonesia — Essential Lexicon\n\n## Greetings\n| English | Bahasa |\n|---------|--------|\n| Hello | Halo |\n| Good morning | Selamat pagi |\n| Thank you | Terima kasih |\n| Sorry | Maaf |\n| Yes / No | Ya / Tidak |\n| Please | Tolong |\n\n## Essential Phrases\n| English | Bahasa |\n|---------|--------|\n| How much? | Berapa? |\n| Too expensive | Terlalu mahal |\n| Where is...? | Di mana...? |\n| I don't understand | Saya tidak mengerti |\n| Help! | Tolong! |\n| The bill please | Minta bon |\n\n## Food & Drink\n| English | Bahasa |\n|---------|--------|\n| Water | Air |\n| Rice | Nasi |\n| Spicy | Pedas |\n| Not spicy | Tidak pedas |\n| Delicious! | Enak! |\n\n## Pro Tips\n- \"Terima kasih\" earns huge smiles\n- \"Bisa kurang?\" = golden phrase for bargaining",
        },
        {
          title: "Top 10 First-Timer Tips for Bali",
          slug: "first-timer-tips-bali",
          category: "tips",
          icon: "Lightbulb",
          excerpt: "Avoid rookie mistakes. Temple etiquette to traffic survival.",
          order: 6,
          content: "# 10 Things Every First-Timer Should Know\n\n## 1. Traffic Is Chaos\nNo rules you'll recognize. Tips:\n- Rent scooter only if experienced\n- Hire private driver for long distances\n- Avoid school hours (7-8am, 1-2pm)\n\n## 2. Temple Etiquette\n- Wear sarong and sash\n- Remove shoes when asked\n- Don't stand higher than shrine\n\n## 3. Offerings Are Sacred\nNever step on canang sari (flower baskets on sidewalks).\n\n## 4. Don't Drink Tap Water\nUse bottled for everything including brushing teeth.\n\n## 5. Negotiate at Markets\nStart at 30%, work up to 50-60%.\n\n## 6. Monkeys Are Not Friends\n- Remove sunglasses and jewelry\n- Don't show food\n- Don't fight if they grab something\n\n## 7. Explore Beyond Tourist Zones\nSidemen, Munduk, Amed, Nusa Penida.\n\n## 8. WiFi Is Good\n15-50 Mbps in most cafes. Get eSIM as backup.\n\n## 9. Sunscreen + Mosquito Spray\nSPF 50 minimum. Dengue is real.\n\n## 10. Respect the Culture\nNyepi = island shuts down 24h. Smile > complaint.",
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

    console.log("Seed completed!");
    console.log(`Created: 1 user, ${partners.length} partners, 6 guides, 10 reviews, 3 bookings, 4 waitlist`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
