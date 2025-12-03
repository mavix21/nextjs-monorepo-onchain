import type { TravelStatus } from "@silk-hq/components";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook for route-based sheets (intercepting routes pattern).
 * Handles animated dismissal before navigation.
 */
export function useSheetRoute() {
  const router = useRouter();
  // Initialize presented to true - the sheet is always presented on mount
  const [presented, setPresented] = useState(true);
  // useRef with initializer ensures fresh state on each mount
  const hasNavigated = useRef(false);

  const onTravelStatusChange = useCallback(
    (status: TravelStatus) => {
      if (status === "idleOutside" && !hasNavigated.current) {
        hasNavigated.current = true;
        // Use replace instead of back to ensure we go to a clean "/" state
        // and clear any stale parallel route cache from previous hard navigations.
        router.replace("/");
      }
    },
    [router],
  );

  return {
    presented,
    onPresentedChange: setPresented,
    onTravelStatusChange,
  };
}
