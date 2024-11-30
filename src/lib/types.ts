
import { z } from "zod";

export const questionTypeSchema = z.enum(["euler", "leetcode", "multiplayer"]);
export type QuestionType = z.infer<typeof questionTypeSchema>;

export const questionSchema = z.object({
  id: z.number(),
  date: z.string(),
  title: z.string(),
  type: questionTypeSchema,
  releaseDateTime: z.date(),
  question: z.string(),
});

export type Question = z.infer<typeof questionSchema>;
