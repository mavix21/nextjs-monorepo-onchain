import type { TravelStatus } from "@silk-hq/components";
import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook for hard navigation sheet pages.
 * Sheet animates in on mount (defaultPresented), navigates to fallback on dismiss.
 */
export function useSheetPage(fallbackRoute = "/") {
  const router = useRouter();
  const hasNavigated = useRef(false);

  const onTravelStatusChange = useCallback(
    (status: TravelStatus) => {
      if (status === "idleOutside" && !hasNavigated.current) {
        hasNavigated.current = true;
        router.push(fallbackRoute);
      }
    },
    [router, fallbackRoute],
  );

  return {
    onTravelStatusChange,
  };
}
