"use server";
import { getCurrentSession } from "./session";
import { invalidateSession } from "./session";
import { deleteSessionTokenCookie } from "./session";

export async function logout(): Promise<ActionResult> {
  const { session } = await getCurrentSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();
  return { error: null };
}

interface ActionResult {
  error: string | null;
}