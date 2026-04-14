import { db } from "@/lib/db";
import { getCurrentUserId, setPackCookie } from "@/lib/session";
import { readJson, email as emailVal, str, isoDate, oneOf, ValidationError } from "@/lib/validate";
import { sameOriginOrThrow } from "@/lib/csrf";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const PACKS = {
  lite: { price: 19, label: "Bali Lite" },
  essentials: { price: 89, label: "Arrival Essentials" },
  full: { price: 199, label: "Full Stay Pass" },
} as const;

const ADDONS = {
  scooter_upgrade: { price: 20, label: "Premium PCX scooter" },
  spa: { price: 29, label: "Welcome spa session (60min)" },
  beach_vip: { price: 19, label: "Beach club VIP queue-skip" },
  insurance: { price: 14, label: "Travel insurance (7 days)" },
} as const;

const SCOOTER_SERVICE = {
  scoopy: "Honda Scoopy 110cc",
  nmax: "Yamaha NMAX 155cc",
  pcx: "Honda PCX 160cc",
} as const;

function signPurchase(pack: string, exp: number): string {
  const secret = process.env.SESSION_SECRET || "dev-insecure-secret-do-not-use-in-prod-000";
  const payload = `${pack}.${exp}`;
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export async function POST(req: NextRequest) {
  try {
    sameOriginOrThrow(req);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await readJson(req);

    const pack = oneOf(body.pack, "pack", ["lite", "essentials", "full"] as const);
    const scooterId = oneOf(body.scooterId ?? "nmax", "scooterId", [
      "scoopy",
      "nmax",
      "pcx",
    ] as const);
    const startDate = isoDate(body.startDate, "startDate");
    const endDate = isoDate(body.endDate, "endDate");
    const address = str(body.address, "address", { max: 200, optional: true });
    const area = oneOf(body.area ?? "canggu", "area", [
      "canggu",
      "seminyak",
      "ubud",
      "kuta",
      "uluwatu",
      "nusa_dua",
    ] as const);

    const rawAddons = Array.isArray(body.addons) ? body.addons : [];
    const addons = rawAddons.filter((a: unknown): a is keyof typeof ADDONS =>
      typeof a === "string" && a in ADDONS
    );

    // For logged-in users, use their email; otherwise require it in body
    const userId = await getCurrentUserId();
    let emailFromBody: string | null = null;
    let nameFromBody: string | null = null;
    if (!userId) {
      emailFromBody = emailVal(body.email);
      nameFromBody = str(body.name, "name", { min: 1, max: 80 }) || null;
    }

    if (endDate <= startDate) throw new ValidationError("endDate must be after startDate");
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
    if (days < 1 || days > 365) throw new ValidationError("Trip must be 1–365 days");
    if (startDate.getTime() < Date.now() - 86400000)
      throw new ValidationError("startDate cannot be in the past");

    const addonTotal = addons.reduce((s, a) => s + ADDONS[a].price, 0);
    const total = PACKS[pack].price + addonTotal;

    // Ensure we have a user (create one if guest)
    let finalUserId = userId;
    if (!finalUserId) {
      const existing = await db.user.findUnique({ where: { email: emailFromBody! } });
      if (existing) {
        finalUserId = existing.id;
      } else {
        const referralCode = `SKYROL-${(nameFromBody || emailFromBody!.split("@")[0])
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 6)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        const user = await db.user.create({
          data: {
            email: emailFromBody!,
            name: nameFromBody,
            provider: "checkout",
            referralCode,
          },
        });
        finalUserId = user.id;
      }
    }

    // Pack includes a scooter for essentials/full — create a real booking
    if (pack === "essentials" || pack === "full") {
      const service = await db.service.findFirst({
        where: { name: SCOOTER_SERVICE[scooterId] },
      });
      if (service) {
        await db.booking.create({
          data: {
            userId: finalUserId,
            partnerId: service.partnerId,
            serviceId: service.id,
            status: "confirmed",
            startDate,
            endDate,
            totalPrice: service.price * days,
            address: address || null,
            notes: `Included in ${PACKS[pack].label} pack`,
          },
        });
      }
    }

    // Persist pack in cookies — drives trip-guide sections and dashboard UI
    await setPackCookie(pack);
    const store = await cookies();
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 365;
    store.set("skyrol_purchased", signPurchase(pack, exp), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({
      ok: true,
      pack,
      total,
      days,
      addons: addons.map((a) => ({ key: a, ...ADDONS[a] })),
      orderRef: `BLN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    console.error("checkout error", e);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
