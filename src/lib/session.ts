import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";

const COOKIE_NAME = "skyrol_session";
const PACK_COOKIE = "skyrol_pack";
const AUDIENCE_COOKIE = "skyrol_audience";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const AUDIENCE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET must be set (min 16 chars) in production");
    }
    return "dev-insecure-secret-do-not-use-in-prod-000";
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function createToken(userId: string): string {
  const expiresAt = Date.now() + MAX_AGE * 1000;
  const payload = `${userId}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, expiresAtStr, providedSig] = parts;
  const payload = `${userId}.${expiresAtStr}`;
  const expected = sign(payload);

  // timing-safe compare
  const a = Buffer.from(providedSig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const expiresAt = parseInt(expiresAtStr, 10);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  return userId;
}

export async function setSession(userId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getCurrentUserId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getCurrentUser() {
  const userId = await getCurrentUserId();
  if (!userId) return null;
  try {
    return await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        referralCode: true,
      },
    });
  } catch {
    return null;
  }
}

export async function setPackCookie(pack: string) {
  const store = await cookies();
  store.set(PACK_COOKIE, pack, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getPackCookie() {
  const store = await cookies();
  const v = store.get(PACK_COOKIE)?.value;
  return v && ["lite", "essentials", "full"].includes(v) ? v : "essentials";
}

export async function setAudienceCookie(audience: "traveler" | "business") {
  const store = await cookies();
  store.set(AUDIENCE_COOKIE, audience, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: AUDIENCE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getAudienceCookie(): Promise<"traveler" | "business" | null> {
  const store = await cookies();
  const v = store.get(AUDIENCE_COOKIE)?.value;
  return v === "traveler" || v === "business" ? v : null;
}

export async function getPurchasedPack(): Promise<string | null> {
  const store = await cookies();
  const raw = store.get("skyrol_purchased")?.value;
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [pack, expStr, providedSig] = parts;
  const payload = `${pack}.${expStr}`;
  const expected = sign(payload);
  const a = Buffer.from(providedSig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const exp = parseInt(expStr, 10);
  if (!Number.isFinite(exp) || Date.now() > exp) return null;
  if (!["lite", "essentials", "full"].includes(pack)) return null;
  return pack;
}
