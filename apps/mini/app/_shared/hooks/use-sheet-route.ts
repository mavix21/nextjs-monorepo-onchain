import type { TravelStatus } from "@silk-hq/components";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Hook for route-based sheets (intercepting routes pattern).
 *
 * The key insight: pathname updates even when the component is cached by Next.js.
 * We derive `presented` directly from whether we're on "/" or not.
 */
export function useSheetRoute() {
  const router = useRouter();
  const pathname = usePathname();

  // The sheet should be presented when we're NOT on the home route
  const presented = pathname !== "/";

  const onTravelStatusChange = useCallback(
    (status: TravelStatus) => {
      if (status === "idleOutside") {
        router.replace("/");
      }
    },
    [router],
  );

  const handlePresentedChange = useCallback((_value: boolean) => {
    // No-op: presented state is derived from pathname
  }, []);

  return {
    presented,
    onPresentedChange: handlePresentedChange,
    onTravelStatusChange,
  };
}
