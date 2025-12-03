"use client";

import { LongSheet } from "@myapp/ui/components/long-sheet/index";

import { useSheetPage } from "@/shared/hooks/use-sheet-page";
import { ArticleContent } from "@/shared/ui/article-content";
import { SheetDismissButton } from "@/shared/ui/sheet-dismiss-button";

/**
 * Hard navigation route for /article.
 * Uses defaultPresented to animate in, navigates to "/" on dismiss.
 */
export default function ArticleSheetDirect() {
  const sheetPage = useSheetPage("/");

  return (
    <LongSheet.Root defaultPresented={true}>
      <LongSheet.Portal>
        <LongSheet.View
          onTravelStatusChange={sheetPage.onTravelStatusChange}
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
