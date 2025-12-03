"use client";

import { Settings } from "lucide-react";

import { Button } from "@myapp/ui/components/button";
import { Page } from "@myapp/ui/components/page/index";

import { useSheetPage } from "@/shared/hooks/use-sheet-page";
import { ProfileContent } from "@/shared/ui/profile-content";

/**
 * Hard navigation route for /profile.
 */
export default function ProfileSheetDirect() {
  const sheetPage = useSheetPage("/");

  return (
    <Page.Root defaultPresented={true}>
      <Page.Portal>
        <Page.View
          onTravelStatusChange={sheetPage.onTravelStatusChange}
          onDismissAutoFocus={{ focus: false }}
        >
          <Page.Backdrop />
          <Page.Content>
            <Page.Header
              title="Profile"
              subtitle="Your Farcaster account"
              backButton={{ mode: "dismiss" }}
              action={
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="size-5" />
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
