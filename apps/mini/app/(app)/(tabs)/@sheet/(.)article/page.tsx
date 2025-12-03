"use client";

import { LongSheet } from "@myapp/ui/components/long-sheet/index";

import { useSheetRoute } from "@/shared/hooks/use-sheet-route";
import { ArticleContent } from "@/shared/ui/article-content";
import { SheetDismissButton } from "@/shared/ui/sheet-dismiss-button";

export default function ArticleSheetIntercepted() {
  const sheetRoute = useSheetRoute();

  return (
    <LongSheet.Root
      presented={sheetRoute.presented}
      onPresentedChange={sheetRoute.onPresentedChange}
    >
      <LongSheet.Portal>
        <LongSheet.View
          onTravelStatusChange={sheetRoute.onTravelStatusChange}
          onDismissAutoFocus={{ focus: false }}
        >
          <LongSheet.Backdrop />
          <LongSheet.Content>
            <ArticleContent dismissButton={<SheetDismissButton />} />
          </LongSheet.Content>
        </LongSheet.View>
      </LongSheet.Portal>
    </LongSheet.Root>
  );
}
