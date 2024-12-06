import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "@/lib/session";
import { raven } from "@/lib/auth";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";
import { GoogleTokens } from "@/lib/Raven";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { crsidFromEmail } from "@/lib/utils";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: GoogleTokens;
  try {
    tokens = await raven.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    // Invalid code or client credentials
    console.error(e);
    return new Response(null, {
      status: 400,
    });
  }
  const claims = decodeIdToken(tokens.idToken) as {
    sub: string;
    email: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    email_verified: boolean;
    hd: string;
  };

  const googleUserId = claims.sub;
  const crsid = crsidFromEmail(claims.email);

  if (crsid === undefined) {
    return new Response(null, {
      status: 400,
    });
  }

  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.googleId, googleUserId),
  });

  if (existingUser !== undefined) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const [user] = await db
    .insert(usersTable)
    .values({
      googleId: googleUserId,
      crsid: crsid,
    })
    .returning();

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/onboarding",
    },
  });
}
