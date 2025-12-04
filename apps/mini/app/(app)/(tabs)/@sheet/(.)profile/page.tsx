"use client";

import { useSheetRoute } from "@/shared/hooks/use-sheet-route";
import { ProfilePageWithSettings } from "@/shared/ui/profile-page-with-settings";

/**
 * Intercepting route for /profile (soft navigation).
 * Settings is stacked on top using local state.
 */
export default function ProfileSheetIntercepted() {
  const { presented, onPresentedChange, onTravelStatusChange } = useSheetRoute({
    route: "/profile",
    fallbackRoute: "/",
  });

  return (
    <ProfilePageWithSettings
      presented={presented}
      onPresentedChange={onPresentedChange}
      onTravelStatusChange={onTravelStatusChange}
    />
  );
}
