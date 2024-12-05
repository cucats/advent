import { trpc } from "@/trpc/server";
import { Raven } from "./Raven";
import { TRPCError } from "@trpc/server";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://aoc.cucats.org"
    : "http://localhost:3000";

export const raven = new Raven(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  baseURL + "/login/google/callback"
);

export const ADMIN_IDS = ["7", "8"];

export const protectQuestion = async (questionNo: string) => {
  try {
    await trpc.getQuestion({ questionNo });
  } catch (error: unknown) {
    if (error instanceof TRPCError) {
      return error.message;
    }
    return "Something went wrong";
  }
};
