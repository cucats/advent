"use client";

import { trpc } from "@/trpc/client";
import { useParams } from "next/navigation";

// this page should always throw an error, either the question doesn't exist or
// the question's ui hasn't been implemented yet
export default function Page() {
  const params = useParams();

  if (typeof params.questionNo !== "string") {
    throw new Error("Question not found.");
  }

  // try and trigger an errpr
  trpc.getQuestion.useSuspenseQuery({ questionNo: params.questionNo });

  throw new Error("Question not implemented.");
}
