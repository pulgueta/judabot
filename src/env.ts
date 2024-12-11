import { object, string, enum as zodEnum } from "zod";

const envSchema = object({
  NODE_ENV: zodEnum(["development", "production"]).default("development"),
  OPENAI_API_KEY: string().min(4).startsWith("sk-proj-"),
  TWITCH_OAUTH_TOKEN: string().min(4),
  POSTHOG_API_KEY: string().min(4).startsWith("phc_"),
});

const vars = envSchema.safeParse(process.env);

if (!vars.success) {
  console.error(vars.error.flatten().fieldErrors);
  process.exit(1);
}

export const { NODE_ENV, OPENAI_API_KEY, TWITCH_OAUTH_TOKEN, POSTHOG_API_KEY } = vars.data;
