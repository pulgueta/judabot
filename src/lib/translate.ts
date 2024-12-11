import { getRandomValues } from "node:crypto";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { translatePrompt } from "@/constants/prompt";
// import { NODE_ENV } from "@/env";
import { captureEvent } from "./posthog";

const openaiClient = openai("gpt-4o-mini");

interface TranslateResponse {
  id: string;
  text: string;
}

export const translate = async <const Message extends string>(
  fromLangMessage: Message,
  // twitchUser: string,
): Promise<TranslateResponse | undefined> => {
  const { signal } = new AbortController();

  const distinctId = getRandomValues(new Uint32Array(1))[0].toString(16);

  try {
    const { text } = await generateText({
      model: openaiClient,
      abortSignal: signal,
      system: translatePrompt(fromLangMessage),
      prompt: `Translate the following text to Spanish: ${fromLangMessage}`,
    });

    captureEvent({
      event: "translateMessage",
      id: distinctId,
    });

    return { id: distinctId, text } as const;
  } catch (error) {
    if (error instanceof Error) {
      captureEvent({
        event: "error",
        id: distinctId,
        error: error.message,
      });
    }
  }
};
