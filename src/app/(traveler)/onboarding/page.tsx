import { getAudienceCookie, getCurrentUser } from "@/lib/session";
import OnboardingClient from "./OnboardingClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Personalize your experience",
  description: "A few quick questions so we can tailor Skyrol to you.",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage() {
  const [audience, user] = await Promise.all([
    getAudienceCookie(),
    getCurrentUser(),
  ]);

  return (
    <OnboardingClient
      initialAudience={audience ?? "traveler"}
      userEmail={user?.email ?? null}
    />
  );
}
