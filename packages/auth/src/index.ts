import type { BetterAuthOptions, BetterAuthPlugin } from "better-auth";
import { betterAuth } from "better-auth";

export function initAuth<TExtraPlugins extends BetterAuthPlugin[]>(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;

  extraPlugins?: TExtraPlugins;
}) {
  const config = {
    baseURL: options.baseUrl,
    secret: options.secret,
    plugins: [...(options.extraPlugins ?? [])],
    trustedOrigins: ["expo://"],
    onAPIError: {
      onError(error, ctx) {
        console.error("BETTER AUTH API ERROR:", { error, ctx });
      },
    },
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
