import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const crsidFromEmail = (email: string): string | undefined => {
  if (!email.includes("@")) {
    return undefined;
  }

  if (!email.endsWith("@cam.ac.uk")) {
    return undefined;
  }

  return email.split("@")[0];
};
