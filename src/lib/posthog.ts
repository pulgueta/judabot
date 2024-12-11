import { getRandomValues, randomUUID } from "node:crypto";

import { PostHog } from "posthog-node";

import type { posthogEvents } from "@/constants/posthog";
import { NODE_ENV, POSTHOG_API_KEY } from "@/env";

const posthog = new PostHog(POSTHOG_API_KEY, {
  host: "https://us.i.posthog.com",
  captureMode: "json",
  disabled: NODE_ENV === "development",
  flushInterval: 1000,
});

interface CaptureEvent {
  event: keyof typeof posthogEvents;
  id: string;
  error?: string;
}

export const captureEvent = ({ event, id, error }: CaptureEvent): void => {
  if (error) {
    const errorId = getRandomValues(new Uint32Array(1))[0].toString();

    posthog.capture({
      event,
      distinctId: id,
      uuid: randomUUID(),
      properties: { id: errorId, error },
    });
  }

  posthog.capture({ event, distinctId: id, uuid: randomUUID() });
};
