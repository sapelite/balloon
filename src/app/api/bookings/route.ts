import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import { readJson, str, isoDate, oneOf, ValidationError } from "@/lib/validate";
import { sameOriginOrThrow } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

const SCOOTER_SERVICE = {
  scoopy: "Honda Scoopy 110cc",
  nmax: "Yamaha NMAX 155cc",
  pcx: "Honda PCX 160cc",
} as const;

export async function POST(req: NextRequest) {
  try {
    sameOriginOrThrow(req);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  try {
    const body = await readJson(req);
    const scooterId = oneOf(body.scooterId, "scooterId", ["scoopy", "nmax", "pcx"] as const);
    const startDate = isoDate(body.startDate, "startDate");
    const endDate = isoDate(body.endDate, "endDate");
    const address = str(body.address, "address", { optional: true, max: 200 });

    if (endDate <= startDate) {
      throw new ValidationError("endDate must be after startDate");
    }
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
    if (days < 1 || days > 365) {
      throw new ValidationError("Booking must be between 1 and 365 days");
    }
    // Don't allow bookings starting in the past (allow a 1-day grace)
    if (startDate.getTime() < Date.now() - 86400000) {
      throw new ValidationError("startDate cannot be in the past");
    }

    const service = await db.service.findFirst({
      where: { name: SCOOTER_SERVICE[scooterId] },
      include: { partner: true },
    });
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    const booking = await db.booking.create({
      data: {
        userId,
        partnerId: service.partnerId,
        serviceId: service.id,
        status: "confirmed",
        startDate,
        endDate,
        totalPrice: service.price * days,
        address: address || null,
      },
    });

    return NextResponse.json({ booking });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    console.error("booking error", e);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
