"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

import { Button } from "@myapp/ui/components/button";
import { Page } from "@myapp/ui/components/page/index";

import { useSheetRoute } from "@/shared/hooks/use-sheet-route";
import { ProfileContent } from "@/shared/ui/profile-content";

/**
 * Intercepting route for /profile (soft navigation).
 */
export default function ProfileSheetIntercepted() {
  const { presented, onPresentedChange, onTravelStatusChange } = useSheetRoute({
    route: "/profile",
    fallbackRoute: "/",
  });

  return (
    <Page.Root presented={presented} onPresentedChange={onPresentedChange}>
      <Page.Portal>
        <Page.View
          onTravelStatusChange={onTravelStatusChange}
          onDismissAutoFocus={{ focus: false }}
        >
          <Page.Backdrop />
          <Page.Content>
            <Page.Header
              title="Profile"
              subtitle="Your Farcaster account"
              backButton={{ mode: "dismiss" }}
              action={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <Link href="/settings">
                    <Settings className="size-5" />
                  </Link>
                </Button>
              }
            />
            <ProfileContent />
          </Page.Content>
        </Page.View>
      </Page.Portal>
    </Page.Root>
  );
}
