"use client";

import { logout } from "@/lib/logout";
import {
  SessionValidationResult,
} from "@/lib/session";
import { useState } from "react";


export const AvatarAuth = ({
  user,
}: {
  user: SessionValidationResult["user"];
}) => {
  const [loading, setLoading] = useState(false);

  return user === null ? (
    <a
      href="/login/google"
      className="text-foreground hover:text-highlight"
      onClick={() => setLoading(true)}
    >
      {loading ? "[Signing in...]" : "[Sign in]"}
    </a>
  ) : (
    <button
      onClick={() => {
        logout();
      }}
      className="text-lg text-foreground hover:text-highlight"
    >
      [Sign out {user.nickname ?? user.crsid}]
    </button>
  );
};

