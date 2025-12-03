import type { TravelStatus } from "@silk-hq/components";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface UseSheetRouteOptions {
  route: string;
  fallbackRoute?: string;
  stackableRoutes?: string[];
}

export function useSheetRoute(options: UseSheetRouteOptions) {
  const { route, fallbackRoute, stackableRoutes = [] } = options;
  const router = useRouter();
  const pathname = usePathname();

  const isActiveRoute = pathname === route;
  const hasStackedSheet = stackableRoutes.some((r) => pathname === r);

  // Track if user requested dismiss (back button, swipe, etc)
  const [userDismissed, setUserDismissed] = useState(false);

  // If route is no longer active/stacked, reset the dismissed flag
  // This handles the case where user navigates away then comes back
  const shouldBePresented = isActiveRoute || hasStackedSheet;
  if (!shouldBePresented && userDismissed) {
    setUserDismissed(false);
  }

  // Sheet is presented when route is active/stacked AND user hasn't dismissed
  const presented = shouldBePresented && !userDismissed;

  const navigateBack = useCallback(() => {
    if (fallbackRoute) {
      router.replace(fallbackRoute);
    } else {
      router.back();
    }
  }, [router, fallbackRoute]);

  const onTravelStatusChange = useCallback(
    (status: TravelStatus) => {
      if (status === "idleOutside") {
        navigateBack();
      }
    },
    [navigateBack],
  );

  // When user dismisses (back button, swipe, etc), set dismissed state
  // But only if there's no stacked sheet (which means another sheet is opening on top)
  const onPresentedChange = useCallback(
    (value: boolean) => {
      console.log(
        `[useSheetRoute ${route}] onPresentedChange:`,
        value,
        "hasStackedSheet:",
        hasStackedSheet,
      );
      if (!value && !hasStackedSheet) {
        setUserDismissed(true);
      }
    },
    [route, hasStackedSheet],
  );

  return {
    presented,
    onPresentedChange,
    onTravelStatusChange,
  };
}
