import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const crsidFromEmail = (email: string): string | undefined => {
    if (!email.includes("@")) {
        return undefined;
    }

    return email.split("@")[0];
};

export const dateToQuestionNo = (date: string): string => {
    return parseInt(date.split("-")[2]).toString();
};

export const questionNoToDate = (questionNo: string): string => {
    return `2024-12-${questionNo.padStart(2, "0")}`;
};

export const getCurrentDate = () => {
    if (process.env.NODE_ENV === "development") {
        return new Date("2024-12-26T12:00:00");
    }

    return new Date();
};
