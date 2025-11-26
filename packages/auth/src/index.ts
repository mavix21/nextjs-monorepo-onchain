import type { BetterAuthOptions, BetterAuthPlugin } from "better-auth";
import { betterAuth } from "better-auth";

export function initAuth<
  TExtraPlugins extends BetterAuthPlugin[],
  TDatabase extends
    BetterAuthOptions["database"] = BetterAuthOptions["database"],
>(options: {
  baseUrl: string;
  secret: string | undefined;
  optionsOnly: boolean;
  database: TDatabase;

  extraPlugins?: TExtraPlugins;
}) {
  const config = {
    baseURL: options.baseUrl,
    database: options.database,
    secret: options.secret,
    plugins: [...(options.extraPlugins ?? [])],
    trustedOrigins: ["expo://"],
    logger: {
      disabled: options.optionsOnly,
    },
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
