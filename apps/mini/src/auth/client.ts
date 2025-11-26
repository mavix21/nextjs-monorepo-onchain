import type { SIWFClientType } from "node_modules/better-auth-siwf/dist/types";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { siwfClient } from "better-auth-siwf/client";
import { createAuthClient } from "better-auth/react";

export const client = createAuthClient({
  plugins: [siwfClient(), convexClient()],
  fetchOptions: {
    credentials: "include",
  },
});

// Type the client to include custom farcaster methods
export const authClient = client as typeof client & SIWFClientType;
