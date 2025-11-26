import { createClient, GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { siwf } from "better-auth-siwf";

import { initAuth } from "@myapp/auth";

import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";

const siteUrl = process.env.SITE_URL!;

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  opts?: { optionsOnly?: boolean },
) => {
  return initAuth({
    baseUrl: siteUrl,
    database: authComponent.adapter(ctx),
    secret: process.env.BETTER_AUTH_SECRET,
    optionsOnly: opts?.optionsOnly ?? false,
    extraPlugins: [
      convex(),
      siwf({
        hostname: new URL(siteUrl).hostname,
      }),
    ],
  });
};

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
