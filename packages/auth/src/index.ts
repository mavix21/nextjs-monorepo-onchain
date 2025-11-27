import type { BetterAuthOptions, BetterAuthPlugin } from "better-auth";
import type { Address, Hex } from "viem";
import { betterAuth } from "better-auth";
import { siwf } from "better-auth-siwf";
import { generateRandomString } from "better-auth/crypto";
import { nextCookies } from "better-auth/next-js";
import { siwe } from "better-auth/plugins";
import { createPublicClient, http, verifyMessage } from "viem";
import { mainnet } from "viem/chains";

interface InitAuthOptions<
  TExtraPlugins extends BetterAuthPlugin[],
  TDatabase extends BetterAuthOptions["database"],
> {
  baseUrl: string;
  secret: string | undefined;
  optionsOnly?: boolean;
  database: TDatabase;
  extraPlugins?: TExtraPlugins;
  trustedOrigins?: string[];
  ensLookup?: boolean;
}

function getHostname(url?: string): string {
  if (!url) return "localhost";
  try {
    return new URL(url).hostname;
  } catch {
    return "localhost";
  }
}

async function lookupEns(address: Address) {
  try {
    const client = createPublicClient({ chain: mainnet, transport: http() });
    const name = await client.getEnsName({ address });
    const avatar = name ? await client.getEnsAvatar({ name }) : null;
    return { name: name ?? address, avatar: avatar ?? "" };
  } catch {
    return { name: address, avatar: "" };
  }
}

// eslint-disable-next-line no-restricted-properties
const hostname = getHostname(process.env.SITE_URL);

export function initAuth<
  TExtraPlugins extends BetterAuthPlugin[],
  TDatabase extends BetterAuthOptions["database"],
>(options: InitAuthOptions<TExtraPlugins, TDatabase>) {
  const config = {
    baseURL: options.baseUrl,
    database: options.database,
    secret: options.secret,
    plugins: [
      siwf({ hostname, allowUserToLink: false }),
      siwe({
        domain: hostname,
        getNonce: () => Promise.resolve(generateRandomString(32)),
        verifyMessage: async ({ message, signature, address }) => {
          try {
            return await verifyMessage({
              address: address as Address,
              message,
              signature: signature as Hex,
            });
          } catch (e) {
            console.error("Error verifying SIWE message:", e);
            return false;
          }
        },
        ensLookup: options.ensLookup
          ? ({ walletAddress }) => lookupEns(walletAddress as Address)
          : undefined,
      }),
      nextCookies(),
      ...(options.extraPlugins ?? []),
    ],
    trustedOrigins: ["expo://", ...(options.trustedOrigins ?? [])],
    logger: { disabled: options.optionsOnly },
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
