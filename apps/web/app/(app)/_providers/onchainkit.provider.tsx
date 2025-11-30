"use client";

import type { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains";

import "@coinbase/onchainkit/styles.css";

import { env } from "@/env";

export function OnchainKitClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnchainKitProvider
      apiKey={env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      projectId={env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
        },
        wallet: {
          display: "modal",
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
