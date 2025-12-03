"use client";

import { LongSheet } from "@myapp/ui/components/long-sheet/index";

import { useSheetRoute } from "@/shared/hooks/use-sheet-route";
import { ArticleContent } from "@/shared/ui/article-content";
import { SheetDismissButton } from "@/shared/ui/sheet-dismiss-button";

/**
 * Intercepting route for /article (soft navigation).
 */
export default function ArticleSheetIntercepted() {
  const { presented, onPresentedChange, onTravelStatusChange } =
    useSheetRoute();

  return (
    <LongSheet.Root presented={presented} onPresentedChange={onPresentedChange}>
      <LongSheet.Portal>
        <LongSheet.View
          onTravelStatusChange={onTravelStatusChange}
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
