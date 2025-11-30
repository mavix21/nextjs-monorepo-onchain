"use client";

import { SignInWithBaseButton } from "@base-org/account-ui/react";
import { useTheme } from "next-themes";

export function SignInWithBase() {
  const { resolvedTheme } = useTheme();

  return (
    <SignInWithBaseButton
      align="center"
      variant="solid"
      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
