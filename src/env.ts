import { object, string, enum as zodEnum } from "zod";

const envSchema = object({
  NODE_ENV: zodEnum(["development", "production"]).default("development"),
  OPENAI_API_KEY: string().min(4).startsWith("sk-"),
});

const vars = envSchema.safeParse(process.env);

if (!vars.success) {
  console.error(vars.error.flatten().fieldErrors);
  process.exit(1);
}

export const { NODE_ENV, OPENAI_API_KEY } = vars.data;
