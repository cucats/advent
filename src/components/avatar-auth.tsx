import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/session";

export const AvatarAuth = async () => {
  const { user } = await getCurrentSession();

  return user === null ? (
    <a href="/login/google" className="text-foreground hover:text-highlight">
      [Sign in]
    </a>
  ) : (
    <button onClick={logout} className="text-foreground hover:text-highlight">
      [Sign out {user.crsid}]
    </button>
  );
};

async function logout(): Promise<ActionResult> {
  "use server";
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
