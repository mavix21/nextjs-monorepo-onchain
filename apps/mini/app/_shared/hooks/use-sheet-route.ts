import type { TravelStatus } from "@silk-hq/components";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook for route-based sheets (intercepting routes pattern).
 * Handles animated dismissal before navigation.
 */
export function useSheetRoute() {
  const router = useRouter();
  const [presented, setPresented] = useState(true);
  const hasNavigated = useRef(false);

  const onTravelStatusChange = useCallback(
    (status: TravelStatus) => {
      if (status === "idleOutside" && !hasNavigated.current) {
        hasNavigated.current = true;
        router.back();
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
