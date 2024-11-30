
import { Onboarding } from "@/components/onboarding";
import { getCurrentSession } from "@/lib/session";

export default async function OnboardingPage() {
  const { user } = await getCurrentSession();

  return <Onboarding user={user} />;
}
