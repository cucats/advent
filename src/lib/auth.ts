
import { Raven } from "./Raven";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://aoc.cucats.org"
    : "http://localhost:3000";

export const raven = new Raven(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  baseURL + "/login/google/callback"
);
