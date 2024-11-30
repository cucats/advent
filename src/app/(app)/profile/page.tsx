import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user} = await getCurrentSession();

  if (!user) {
    return redirect("/login/google");
  }

  return redirect(`/profile/${user.id}`);
}
