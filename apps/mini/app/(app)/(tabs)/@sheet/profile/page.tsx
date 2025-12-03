"use client";

import { X } from "lucide-react";

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
            <ProfileContent
              dismissButton={
                <Page.Trigger action="dismiss" asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute! top-4 right-4 z-1 rounded-full"
                  >
                    <X className="text-muted-foreground size-6" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </Page.Trigger>
              }
            />
          </Page.Content>
        </Page.View>
      </Page.Portal>
    </Page.Root>
  );
}
