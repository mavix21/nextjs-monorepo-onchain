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
      // Blur the active element when the sheet starts exiting to prevent
      // "Blocked aria-hidden on an element because its descendant retained focus" warning.
      // This happens because aria-hidden is applied to the sheet during the exit animation,
      // but focus may still be on a button inside the sheet.
      if (status === "exiting") {
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLElement) {
          activeElement.blur();
        }
      }

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
