"use client";

import { LongSheet } from "@myapp/ui/components/long-sheet/index";

import { useSheetRoute } from "@/shared/hooks/use-sheet-route";
import { SettingsContent } from "@/shared/ui/settings-content";
import { SheetDismissButton } from "@/shared/ui/sheet-dismiss-button";

/**
 * Intercepting route for /settings.
 * Shows settings as a sheet on soft navigation.
 */
export default function SettingsSheetIntercepted() {
  const sheetRoute = useSheetRoute();

  return (
    <LongSheet.Root
      presented={sheetRoute.presented}
      onPresentedChange={sheetRoute.onPresentedChange}
    >
      <LongSheet.Portal>
        <LongSheet.View
          onTravelStatusChange={sheetRoute.onTravelStatusChange}
          onDismissAutoFocus={{ focus: false }}
        >
          <LongSheet.Backdrop />
          <LongSheet.Content>
            <SettingsContent dismissButton={<SheetDismissButton />} />
          </LongSheet.Content>
        </LongSheet.View>
      </LongSheet.Portal>
    </LongSheet.Root>
  );
}
