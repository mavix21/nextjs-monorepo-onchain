"use client";

import { LongSheet } from "@myapp/ui/components/long-sheet/index";

import { useSheetPage } from "@/shared/hooks/use-sheet-page";
import { SettingsContent } from "@/shared/ui/settings-content";
import { SheetDismissButton } from "@/shared/ui/sheet-dismiss-button";

/**
 * Hard navigation route for /settings.
 * Uses defaultPresented to animate in, navigates to "/" on dismiss.
 */
export default function SettingsSheetDirect() {
  const sheetPage = useSheetPage("/");

  return (
    <LongSheet.Root defaultPresented={true}>
      <LongSheet.Portal>
        <LongSheet.View
          onTravelStatusChange={sheetPage.onTravelStatusChange}
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
