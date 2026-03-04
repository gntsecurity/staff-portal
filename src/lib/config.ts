import { z } from "zod";

const schema = z.object({
  PORTAL_NAME: z.string().default("GNT Staff Portal"),
  NINJAONE_BASE_URL: z.string().default("https://app.ninjarmm.com"),
  NINJAONE_TOKEN_PATH: z.string().default("/oauth/token"),
  NINJAONE_SCOPE: z.string().default("monitoring management"),
  DEV_USER_EMAIL: z.string().optional().default("")
});

function readEnv() {
  const raw = {
    PORTAL_NAME: process.env.PORTAL_NAME,
    NINJAONE_BASE_URL: process.env.NINJAONE_BASE_URL,
    NINJAONE_TOKEN_PATH: process.env.NINJAONE_TOKEN_PATH,
    NINJAONE_SCOPE: process.env.NINJAONE_SCOPE,
    DEV_USER_EMAIL: process.env.DEV_USER_EMAIL
  };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

let cached: ReturnType<typeof readEnv> | null = null;

export function env() {
  if (!cached) cached = readEnv();
  return cached;
}

export function getPublicConfig() {
  const e = env();
  return {
    portalName: e.PORTAL_NAME,
    ninjaOneBaseUrl: e.NINJAONE_BASE_URL
  };
}
