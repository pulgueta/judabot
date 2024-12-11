import { Client } from "tmi.js";

import { TWITCH_OAUTH_TOKEN } from "@/env";

export const tmi = new Client({
  identity: {
    username: "JudaBot",
    password: TWITCH_OAUTH_TOKEN,
  },
  channels: ["Judamoca_"],
});
