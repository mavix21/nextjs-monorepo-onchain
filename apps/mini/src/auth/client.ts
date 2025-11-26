import type { SIWFClientType } from "node_modules/better-auth-siwf/dist/types";
import { siwfClient } from "better-auth-siwf/client";
import { createAuthClient } from "better-auth/react";

export const client = createAuthClient({
  plugins: [siwfClient()],
  fetchOptions: {
    credentials: "include",
  },
});

// Type the client to include custom farcaster methods
export const authClient = client as typeof client & SIWFClientType;
