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

export const dateToQuestionNo = (date: string): string => {
  return parseInt(date.split("-")[2]).toString();
};

export const questionNoToDate = (questionNo: string): string => {
  return `2024-12-${questionNo.padStart(2, '0')}`;
};

export const getCurrentDate = () => {
  // return new Date();
  return new Date("2024-12-04T12:00:00");
}
