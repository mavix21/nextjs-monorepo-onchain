import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { siwf } from "better-auth-siwf";

import { initAuth } from "@myapp/auth";

import { env } from "@/env";
import { ROOT_URL } from "@/lib/constants";

const baseUrl = ROOT_URL;

export const auth = initAuth({
  baseUrl,
  productionUrl: `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`,
  secret: env.AUTH_SECRET,
  extraPlugins: [
    siwf({
      hostname: new URL(baseUrl).hostname,
    }),
  ],
});

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);
