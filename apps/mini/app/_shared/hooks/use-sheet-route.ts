import type { TravelStatus } from "@silk-hq/components";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

interface UseSheetRouteOptions {
  route: string;
  fallbackRoute?: string;
}

export function useSheetRoute(options: UseSheetRouteOptions) {
  const { route, fallbackRoute } = options;
  const router = useRouter();
  const pathname = usePathname();

  const presented = pathname === route;

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

  const onPresentedChange = useCallback(
    (value: boolean) => {
      if (!value) {
        navigateBack();
      }
    },
    [navigateBack],
  );

  return {
    presented,
    onPresentedChange,
    onTravelStatusChange,
  };
}
