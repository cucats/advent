
import { Question } from "@/lib/types";
import { MarkdownRenderer } from "./markdown-renderer";


export const LeetcodeQuestion = ({ question }: { question: Question }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <MarkdownRenderer>{question.question}</MarkdownRenderer>
    </div>

  )
}

