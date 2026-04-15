import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";

const VALID_PACKS = ["lite", "essentials", "full"] as const;
type Pack = (typeof VALID_PACKS)[number];

export async function generateMetadata({ params }: { params: Promise<{ pack: string }> }) {
  const { pack } = await params;
  const label = pack.charAt(0).toUpperCase() + pack.slice(1);
  return {
    title: `Checkout · ${label}`,
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ pack: string }>;
}) {
  const { pack } = await params;
  if (!VALID_PACKS.includes(pack as Pack)) notFound();
  const user = await getCurrentUser();

  return <CheckoutClient pack={pack as Pack} user={user} />;
}
