"use client";

import { useSheetPage } from "@/shared/hooks/use-sheet-page";
import { ProfilePageWithSettings } from "@/shared/ui/profile-page-with-settings";

/**
 * Hard navigation route for /profile.
 * Settings is stacked on top using local state.
 */
export default function ProfileSheetDirect() {
  const sheetPage = useSheetPage("/");

  return (
    <ProfilePageWithSettings
      defaultPresented={true}
      onTravelStatusChange={sheetPage.onTravelStatusChange}
    />
  );
}
