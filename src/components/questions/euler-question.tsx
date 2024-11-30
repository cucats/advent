import { Question } from "@/lib/types";
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import { MarkdownRenderer } from "./markdown-renderer";


export const EulerQuestion = ({ question }: { question: Question }) => {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl w-full">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <MarkdownRenderer>{question.question}</MarkdownRenderer>
    </div>
  )
}
