import { surpriseMePrompts } from "~/constants";

export function getRandomPrompt(prompt: string): string {
  const promptIndex = Math.floor(Math.random() * surpriseMePrompts.length - 1);

  const randomPrompt = surpriseMePrompts[promptIndex];

  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }

  return randomPrompt;
}
