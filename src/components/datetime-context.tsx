"use client";

import { getCurrentDate } from "@/lib/utils";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const DateTimeContext = createContext<{
  currentDateTime: Date;
  setCurrentDateTime: (date: Date) => void;
}>({
  currentDateTime: new Date(),
  setCurrentDateTime: () => {},
});

export const DateTimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <DateTimeContext.Provider value={{ currentDateTime, setCurrentDateTime }}>{children}</DateTimeContext.Provider>;
};

export const useDateTime = () => {
  return useContext(DateTimeContext);
};
