"use client";

import { BottomSheet } from "@myapp/ui/components/bottom-sheet/index";

import { useSheetRoute } from "@/shared/hooks/use-sheet-route";
import { SettingsContent } from "@/shared/ui/settings-content";

/**
 * Intercepting route for /settings.
 * Shows settings as a bottom sheet on soft navigation.
 */
export default function SettingsSheetIntercepted() {
  const sheetRoute = useSheetRoute();

  return (
    <BottomSheet.Root
      presented={sheetRoute.presented}
      onPresentedChange={sheetRoute.onPresentedChange}
    >
      <BottomSheet.Portal>
        <BottomSheet.View
          onTravelStatusChange={sheetRoute.onTravelStatusChange}
          onDismissAutoFocus={{ focus: false }}
        >
          <BottomSheet.Backdrop />
          <BottomSheet.Content className="grid">
            <BottomSheet.Handle
              className="mt-2 self-center justify-self-center"
              style={{
                gridArea: "1 / -1",
              }}
            />
            <SettingsContent />
          </BottomSheet.Content>
        </BottomSheet.View>
      </BottomSheet.Portal>
    </BottomSheet.Root>
  );
}
