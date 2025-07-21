import { Onboarding } from "@/components/onboarding";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
    const { user } = await getCurrentSession();

    if (!user) {
        return redirect("/login/google");
    }

    return <Onboarding user={user} />;
}
