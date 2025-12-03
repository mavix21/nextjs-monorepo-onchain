"use client";

import { X } from "lucide-react";

import { Button } from "@myapp/ui/components/button";
import { Page } from "@myapp/ui/components/page/index";

import { useSheetRoute } from "@/shared/hooks/use-sheet-route";
import { ProfileContent } from "@/shared/ui/profile-content";

/**
 * Intercepting route for /profile (soft navigation).
 */
export default function ProfileSheetIntercepted() {
  const sheetRoute = useSheetRoute();

  return (
    <Page.Root
      presented={sheetRoute.presented}
      onPresentedChange={sheetRoute.onPresentedChange}
    >
      <Page.Portal>
        <Page.View
          onTravelStatusChange={sheetRoute.onTravelStatusChange}
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
