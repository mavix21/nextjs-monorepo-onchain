"use client";

import Link from "next/link";
import { Scroll } from "@silk-hq/components";
import { X } from "lucide-react";

import { Button } from "@myapp/ui/components/button";

import { ArticleContent } from "@/shared/ui/article-content";

/**
 * This is the actual /article page.
 *
 * This page is shown when:
 * - User directly navigates to /article (e.g., types URL, refresh, or shares link)
 * - User lands on this page without going through the intercepting route
 *
 * The intercepting route @sheet/(.)article will catch soft navigations (Link clicks)
 * and show this content as a sheet instead.
 */
export default function ArticlePage() {
  return (
    <div className="bg-background relative z-1 h-svh">
      <Scroll.Root asChild>
        <Scroll.View className="min-h-full">
          <Scroll.Content asChild>
            <ArticleContent
              dismissButton={
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 z-1 rounded-full"
                  asChild
                >
                  <Link href="/">
                    <X className="text-muted-foreground size-6" />
                    <span className="sr-only">Dismiss</span>
                  </Link>
                </Button>
              }
            />
          </Scroll.Content>
        </Scroll.View>
      </Scroll.Root>
    </div>
  );
}
