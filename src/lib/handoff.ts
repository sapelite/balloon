const FALLBACK_WA = "6281234567890";
const FALLBACK_EMAIL_TRAVELER = "hello@skyrol.bali";
const FALLBACK_EMAIL_BUSINESS = "business@skyrol.bali";

function sanitizePhone(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

export function conciergePhone(): string {
  const v = process.env.NEXT_PUBLIC_CONCIERGE_WA;
  return v && v.trim() ? sanitizePhone(v) : FALLBACK_WA;
}

export function conciergeEmail(audience: "traveler" | "business" = "traveler"): string {
  const v = process.env.NEXT_PUBLIC_CONCIERGE_EMAIL;
  if (v && v.trim()) return v.trim();
  return audience === "business" ? FALLBACK_EMAIL_BUSINESS : FALLBACK_EMAIL_TRAVELER;
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${conciergePhone()}?text=${encodeURIComponent(message)}`;
}

export function mailHref(
  subject: string,
  audience: "traveler" | "business" = "traveler",
  body?: string
): string {
  const parts = [`subject=${encodeURIComponent(subject)}`];
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${conciergeEmail(audience)}?${parts.join("&")}`;
}
