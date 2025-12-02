"use client";

import { Plus } from "lucide-react";

import { Button } from "@myapp/ui/components/button";
import { cn } from "@myapp/ui/lib/utils";

interface MainNavButtonProps {
  className?: string;
}

export function MainNavButton({ className }: MainNavButtonProps) {
  return (
    <Button
      size="icon"
      className={cn(
        "bg-primary hover:bg-primary/90 shadow-primary/25 right-6 bottom-28 z-40 size-14 rounded-full shadow-xl transition-all duration-200 hover:scale-105 active:scale-95",
        className,
      )}
      onClick={() => {
        console.log("Main nav button clicked");
      }}
    >
      <Plus className="text-primary-foreground size-5" />
      <span className="sr-only">Main Navigation</span>
    </Button>
  );
}
