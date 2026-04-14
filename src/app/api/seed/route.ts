import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Require a secret header matching env in any non-dev environment.
  // In dev (localhost) we allow open access for DX.
  const expected = process.env.SEED_SECRET;
  const provided = req.headers.get("x-seed-secret");
  const isProdLike = process.env.NODE_ENV === "production";
  if (isProdLike) {
    if (!expected) {
      return NextResponse.json({ error: "Seeding disabled (no SEED_SECRET)" }, { status: 403 });
    }
    if (!provided || provided !== expected) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  try {
    // Clean existing data
    await db.review.deleteMany();
    await db.booking.deleteMany();
    await db.service.deleteMany();
    await db.partner.deleteMany();
    await db.guide.deleteMany();
    await db.user.deleteMany();
    await db.waitlist.deleteMany();

    // ─── Demo User ────────────────────────────────────────
    const user = await db.user.create({
      data: {
        email: "demo@balloon.app",
        name: "Alex Traveler",
        provider: "google",
        referralCode: "BALLOON-ALEX",
      },
    });

    // ─── Partners ─────────────────────────────────────────
    const partners = [];

    partners.push(await db.partner.create({
      data: {
        name: "Bali Ride Co.", slug: "bali-ride-co", category: "scooter",
        description: "Premium scooter rental with free delivery to your villa. All bikes include insurance, helmets, and 24/7 roadside assistance.",
        longDesc: "Bali Ride Co. is the island's most trusted scooter rental service, operating since 2019. We deliver directly to your accommodation in Canggu, Seminyak, and Ubud within 2 hours of booking. Every scooter comes with comprehensive insurance, two premium helmets, a phone mount, and a rain poncho.",
        image: "/partners/scooter-1.jpg",
        gallery: JSON.stringify(["/partners/scooter-1a.jpg", "/partners/scooter-1b.jpg"]),
        rating: 4.8, reviewCount: 342,
        location: "Jl. Batu Bolong No. 42, Canggu", area: "canggu", priceRange: "$$",
        features: JSON.stringify(["Free delivery", "Insurance included", "24/7 support", "Premium helmets", "Phone mount"]),
        phone: "+62 812-3456-7890", isVerified: true, isFeatured: true,
        discount: "Free full tank with Balloon",
        services: { create: [
          { name: "Honda Scoopy 110cc", description: "Perfect for short rides. Automatic, easy to handle.", price: 5, unit: "per_day", image: "/services/scoopy.jpg" },
          { name: "Yamaha NMAX 155cc", description: "Powerful for long distances. ABS brakes, USB charger.", price: 8, unit: "per_day", image: "/services/nmax.jpg" },
          { name: "Honda PCX 160cc", description: "Premium touring. Keyless ignition, traction control.", price: 12, unit: "per_day", image: "/services/pcx.jpg" },
        ]},
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "Island Wheels", slug: "island-wheels", category: "scooter",
        description: "Budget-friendly scooter rentals across South Bali. Weekly and monthly discounts.",
        image: "/partners/scooter-2.jpg", rating: 4.5, reviewCount: 189,
        location: "Jl. Kayu Aya No. 15, Seminyak", area: "seminyak", priceRange: "$",
        features: JSON.stringify(["Budget friendly", "Monthly discounts", "Multiple pickup points"]),
        phone: "+62 813-5555-1234", isVerified: true, discount: "-15% on weekly rentals via Balloon",
        services: { create: [
          { name: "Honda Beat 110cc", description: "Most affordable. Great for daily commutes.", price: 3.5, unit: "per_day" },
          { name: "Honda Vario 125cc", description: "Mid-range with good performance.", price: 6, unit: "per_day" },
        ]},
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "Tropical Haven Villas", slug: "tropical-haven-villas", category: "villa",
        description: "Luxury private pool villas in Canggu. 5-star hospitality by local team.",
        longDesc: "45+ premium villas across Canggu and Pererenan. Private pool, full kitchen, high-speed WiFi, daily housekeeping.",
        image: "/partners/villa-1.jpg",
        gallery: JSON.stringify(["/partners/villa-1a.jpg", "/partners/villa-1b.jpg"]),
        rating: 4.9, reviewCount: 567,
        location: "Various locations, Canggu", area: "canggu", priceRange: "$$$",
        features: JSON.stringify(["Private pool", "Daily housekeeping", "High-speed WiFi", "Full kitchen", "Concierge"]),
        isVerified: true, isFeatured: true, discount: "Free airport transfer with 7+ night booking",
        services: { create: [
          { name: "1BR Pool Villa", description: "Cozy villa with private pool, perfect for couples.", price: 65, unit: "per_day" },
          { name: "2BR Family Villa", description: "Spacious 2BR, pool, and garden.", price: 110, unit: "per_day" },
          { name: "4BR Luxury Compound", description: "Premium compound with staff, chef on request.", price: 250, unit: "per_day" },
        ]},
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "Ubud Jungle Retreats", slug: "ubud-jungle-retreats", category: "villa",
        description: "Eco-luxury bamboo villas in Ubud's rice terraces. Yoga, meditation, nature.",
        image: "/partners/villa-2.jpg", rating: 4.7, reviewCount: 234,
        location: "Jl. Suweta, Ubud", area: "ubud", priceRange: "$$",
        features: JSON.stringify(["Rice terrace views", "Yoga shala", "Organic breakfast", "Eco-friendly"]),
        isVerified: true, discount: "Complimentary yoga class with Balloon booking",
        services: { create: [
          { name: "Bamboo Bungalow", description: "Eco bungalow with jungle views.", price: 45, unit: "per_day" },
          { name: "Rice Terrace Suite", description: "Premium suite overlooking rice paddies.", price: 85, unit: "per_day" },
        ]},
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "Warung Sunset", slug: "warung-sunset", category: "restaurant",
        description: "Beachfront Indonesian cuisine with the best sunset views in Canggu.",
        image: "/partners/restaurant-1.jpg", rating: 4.6, reviewCount: 891,
        location: "Echo Beach, Canggu", area: "canggu", priceRange: "$$",
        features: JSON.stringify(["Beachfront", "Sunset views", "Live music", "Fresh seafood"]),
        isVerified: true, isFeatured: true, discount: "Free welcome drink with Bali Pass",
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "Nasi Campur House", slug: "nasi-campur-house", category: "restaurant",
        description: "Authentic Balinese street food elevated. Three-generation family recipes.",
        image: "/partners/restaurant-2.jpg", rating: 4.8, reviewCount: 456,
        location: "Jl. Hanoman No. 28, Ubud", area: "ubud", priceRange: "$",
        features: JSON.stringify(["Authentic Balinese", "Family recipes", "Vegan options"]),
        isVerified: true, discount: "10% off total bill with Bali Pass",
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "Coral Beach Club", slug: "coral-beach-club", category: "beach_club",
        description: "Premium beach club in Seminyak. Infinity pool, DJ sets, Mediterranean cuisine.",
        image: "/partners/beach-1.jpg", rating: 4.4, reviewCount: 1203,
        location: "Jl. Petitenget, Seminyak", area: "seminyak", priceRange: "$$$",
        features: JSON.stringify(["Infinity pool", "DJ sets", "VIP cabanas", "Cocktail lounge"]),
        isVerified: true, isFeatured: true, discount: "Queue skip + 1 free cocktail with Bali Pass",
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "Zen Garden Spa", slug: "zen-garden-spa", category: "spa",
        description: "Traditional Balinese massage and wellness in serene jungle setting.",
        image: "/partners/spa-1.jpg", rating: 4.9, reviewCount: 678,
        location: "Monkey Forest Road, Ubud", area: "ubud", priceRange: "$$",
        features: JSON.stringify(["Balinese massage", "Flower bath", "Couples treatment"]),
        isVerified: true, discount: "Free flower bath upgrade with Bali Pass",
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "Bali Private Drivers", slug: "bali-private-drivers", category: "transport",
        description: "Licensed English-speaking drivers for airport transfers and day trips.",
        longDesc: "Fleet of 30+ vehicles. Fixed-price airport transfers, full-day charters, inter-city transport.",
        image: "/partners/transport-1.jpg", rating: 4.7, reviewCount: 445,
        location: "Ngurah Rai International Airport", area: "kuta", priceRange: "$$",
        features: JSON.stringify(["Airport transfers", "Day trips", "English speaking", "Fixed pricing", "Child seats"]),
        isVerified: true, isFeatured: true, discount: "Included in Arrival Essentials package",
        services: { create: [
          { name: "Airport Transfer (one-way)", description: "Private car from Ngurah Rai.", price: 18, unit: "per_trip" },
          { name: "Airport Transfer (return)", description: "Round-trip airport transfer.", price: 32, unit: "per_trip" },
          { name: "Full Day Charter (10h)", description: "Private car and driver.", price: 55, unit: "per_day" },
        ]},
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "BaliConnect eSIM", slug: "baliconnect-esim", category: "telecom",
        description: "Instant eSIM activation with Telkomsel network. 4G/5G across Indonesia.",
        longDesc: "Partners with Telkomsel for instant eSIM. Scan QR code before boarding, data activates on landing.",
        image: "/partners/esim-1.jpg", rating: 4.6, reviewCount: 289,
        location: "Digital — delivered via QR code", area: "canggu", priceRange: "$",
        features: JSON.stringify(["Instant activation", "Telkomsel network", "4G/5G", "Hotspot tethering"]),
        isVerified: true, isFeatured: true, discount: "Included in Arrival Essentials package",
        services: { create: [
          { name: "7-Day Plan (10GB)", description: "Short trip. 10GB + 30 min calls.", price: 9, unit: "one_time" },
          { name: "14-Day Plan (25GB)", description: "Most popular. 25GB + unlimited calls.", price: 15, unit: "one_time" },
          { name: "30-Day Plan (50GB)", description: "Nomads. 50GB + unlimited calls + SMS.", price: 25, unit: "one_time" },
        ]},
      },
    }));

    partners.push(await db.partner.create({
      data: {
        name: "SafetyWing Nomad", slug: "safetywing-nomad", category: "insurance",
        description: "Travel medical insurance for nomads. Hospitals, emergencies, trip interruption.",
        image: "/partners/insurance-1.jpg", rating: 4.5, reviewCount: 178,
        location: "Digital — instant policy", area: "canggu", priceRange: "$",
        features: JSON.stringify(["Medical coverage", "Emergency evacuation", "COVID coverage"]),
        isVerified: true, discount: "First month free via Balloon referral",
        services: { create: [
          { name: "Nomad Insurance", description: "Medical + travel coverage. Monthly.", price: 42, unit: "per_month", currency: "USD" },
        ]},
      },
    }));

    // ─── Reviews ──────────────────────────────────────────
    const reviewData = [
      { partnerId: partners[0].id, rating: 5, comment: "NMAX was perfect. Delivered in 1 hour!" },
      { partnerId: partners[0].id, rating: 5, comment: "3 weeks, zero issues. Flat tire? Replacement in 30 min." },
      { partnerId: partners[0].id, rating: 4, comment: "Great scooters. Phone mount was loose but replaced next day." },
      { partnerId: partners[2].id, rating: 5, comment: "Villa was paradise. Private pool, daily cleaning, chef." },
      { partnerId: partners[2].id, rating: 5, comment: "2BR villa. WiFi fast for remote work. Perfect location." },
      { partnerId: partners[4].id, rating: 5, comment: "Best sunset dinner in Bali. Grilled prawns incredible." },
      { partnerId: partners[6].id, rating: 4, comment: "Beautiful pool. Bali Pass queue skip was a lifesaver." },
      { partnerId: partners[7].id, rating: 5, comment: "Best massage ever. Flower bath was magical." },
      { partnerId: partners[8].id, rating: 5, comment: "Driver waiting with cold towel and water. Fixed price." },
      { partnerId: partners[9].id, rating: 4, comment: "eSIM worked instantly on landing. Good speeds." },
    ];
    for (const r of reviewData) {
      await db.review.create({ data: { ...r, userId: user.id } });
    }

    // ─── Guides ───────────────────────────────────────────
    await db.guide.createMany({
      data: [
        { title: "Visa on Arrival: Complete 2026 Guide", slug: "visa-on-arrival-bali-2026", category: "visa", icon: "FileText", excerpt: "Everything about getting your VoA at Ngurah Rai. Updated for 2026.", order: 1, content: "# Visa on Arrival — Bali 2026\n\n## Who Needs a VoA?\nCitizens of 90+ countries.\n\n## Cost\n| Type | Cost | Duration |\n|------|------|----------|\n| Single Entry VoA | IDR 500,000 (~$31) | 30 days |\n| B211A e-Visa | IDR 1,500,000 (~$93) | 60 days |\n\n## Steps\n1. Check passport (6+ months valid)\n2. Book return flight\n3. Apply e-VoA online\n4. Pay at VoA counter\n5. Immigration + customs\n\n## Tips\n- Pay in IDR for better rates\n- e-VoA queue is faster\n- Don't overstay: IDR 1M/day fine" },
        { title: "Bali Tourist Tax: What You Need to Know", slug: "bali-tourist-tax-2026", category: "tax", icon: "Receipt", excerpt: "The IDR 150,000 tourist tax is mandatory. Pay before you arrive.", order: 2, content: "# Bali Tourist Tax 2026\n\n## Amount\nIDR 150,000 (~$9.50) per visit.\n\n## Pay Online\n1. Visit lovebali.baliprov.go.id\n2. Fill details\n3. Pay by card\n4. Save QR code\n\n## Tips\n- Pay 24h before departure\n- Screenshot QR code\n- Tax is per entry" },
        { title: "Emergency Contacts & Hospital Guide", slug: "emergency-contacts-bali", category: "emergency", icon: "Phone", excerpt: "All emergency numbers: hospitals, police, embassies.", order: 3, content: "# Emergency Contacts\n\n## Numbers\n| Service | Number |\n|---------|--------|\n| Emergency | 112 |\n| Police | 110 |\n| Ambulance | 118 |\n| Tourist Police | +62 361 224 111 |\n\n## Best Hospital\nBIMC Kuta — +62 361 761 263 — 24/7, English" },
        { title: "IDR Currency Guide & Converter", slug: "currency-converter-idr", category: "currency", icon: "DollarSign", excerpt: "Understand Rupiah, avoid scams, know real costs.", order: 4, content: "# Indonesian Rupiah\n\n## Rates (2026)\n| Currency | ~IDR |\n|----------|------|\n| 1 USD | 15,800 |\n| 1 EUR | 17,200 |\n| 1 GBP | 20,000 |\n\n## Real Costs\n| Item | ~USD |\n|------|------|\n| Nasi Goreng | $1.60 |\n| Restaurant | $5-10 |\n| Beer | $1.60-5 |\n| Massage (1h) | $6-13 |\n\n## Best Exchange\n1. ATM (Mandiri/BCA)\n2. Wise/Revolut\n3. Authorized changers only" },
        { title: "Basic Bahasa Indonesia Lexicon", slug: "bahasa-lexicon", category: "lexicon", icon: "BookOpen", excerpt: "30 essential words to navigate Bali like a local.", order: 5, content: "# Bahasa Indonesia\n\n## Greetings\n| English | Bahasa |\n|---------|--------|\n| Hello | Halo |\n| Thank you | Terima kasih |\n| Sorry | Maaf |\n| Yes/No | Ya/Tidak |\n\n## Essential\n| English | Bahasa |\n|---------|--------|\n| How much? | Berapa? |\n| Too expensive | Terlalu mahal |\n| Help! | Tolong! |\n| Delicious! | Enak! |" },
        { title: "Top 10 First-Timer Tips for Bali", slug: "first-timer-tips-bali", category: "tips", icon: "Lightbulb", excerpt: "Avoid rookie mistakes. Temple etiquette to traffic survival.", order: 6, content: "# 10 First-Timer Tips\n\n1. **Traffic is chaos** — hire a driver for long trips\n2. **Temple etiquette** — sarong + sash required\n3. **Don't step on offerings** (canang sari)\n4. **Don't drink tap water**\n5. **Negotiate at markets** — start at 30%\n6. **Monkeys aren't friends** — remove sunglasses\n7. **Explore beyond tourist zones** — Sidemen, Munduk\n8. **WiFi is good** — 15-50 Mbps in cafes\n9. **SPF 50 + mosquito spray**\n10. **Respect the culture** — Nyepi shuts island 24h" },
      ],
    });

    // ─── Demo Bookings ────────────────────────────────────
    const scooterService = await db.service.findFirst({ where: { name: "Yamaha NMAX 155cc" } });
    const transferService = await db.service.findFirst({ where: { name: "Airport Transfer (one-way)" } });
    const esimService = await db.service.findFirst({ where: { name: "14-Day Plan (25GB)" } });

    if (scooterService && transferService && esimService) {
      await db.booking.createMany({
        data: [
          { userId: user.id, partnerId: partners[0].id, serviceId: scooterService.id, status: "confirmed", startDate: new Date("2026-05-15"), endDate: new Date("2026-05-29"), totalPrice: 112, address: "Villa Tropicana, Jl. Batu Bolong No. 88, Canggu", qrCode: "BLN-SCT-2026-0001" },
          { userId: user.id, partnerId: partners[8].id, serviceId: transferService.id, status: "confirmed", startDate: new Date("2026-05-15"), totalPrice: 18, notes: "Flight GA-714 arriving 14:30", qrCode: "BLN-VTC-2026-0001" },
          { userId: user.id, partnerId: partners[9].id, serviceId: esimService.id, status: "active", startDate: new Date("2026-05-15"), endDate: new Date("2026-05-29"), totalPrice: 15, qrCode: "BLN-SIM-2026-0001" },
        ],
      });
    }

    // ─── Waitlist ─────────────────────────────────────────
    await db.waitlist.createMany({
      data: [
        { email: "sarah@example.com", source: "hero" },
        { email: "marc@example.com", source: "cta" },
        { email: "yuki@example.com", source: "guide" },
        { email: "james@example.com", source: "partner" },
      ],
    });

    return NextResponse.json({
      success: true,
      message: `Seeded: 1 user, ${partners.length} partners, 6 guides, 10 reviews, 3 bookings, 4 waitlist`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
