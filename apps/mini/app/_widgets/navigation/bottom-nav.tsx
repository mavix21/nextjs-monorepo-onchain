"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Search, Users, Wallet } from "lucide-react";

import { Button } from "@myapp/ui/components/button";
import { cn } from "@myapp/ui/lib/utils";

import { PrimaryActionButton } from "./primary-action-button";

const navItems = [
  { id: "home", icon: Calendar, label: "Home", href: "/" as const },
  {
    id: "discover",
    icon: Search,
    label: "Discover",
    href: "/discover" as const,
  },
  {
    id: "community",
    icon: Users,
    label: "Community",
    href: "/community" as const,
  },
  {
    id: "collection",
    icon: Wallet,
    label: "Collection",
    href: "/collection" as const,
  },
];

interface NavItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

function NavItem({ id, icon: Icon, label, href, isActive }: NavItemProps) {
  return (
    <Button
      key={id}
      variant="ghost"
      size="sm"
      asChild
      className={cn(
        "flex h-auto min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-2 transition-all duration-200",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-transparent",
      )}
    >
      <Link href={href}>
        <Icon
          className={cn(
            "h-6 w-6 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground",
          )}
        />
        <span
          className={cn(
            "text-[10px] font-medium transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
      </Link>
    </Button>
  );
}

function isActiveRoute(href: string, pathname: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="border-border/40 pb-safe fixed right-0 bottom-0 left-0 z-0 border-t backdrop-blur-xl">
      <div className="relative px-2 py-2">
        <div className="flex items-center justify-between">
          {/* Left items */}
          <div className="flex flex-1 items-center justify-around">
            {navItems.slice(0, 2).map((item) => (
              <NavItem
                key={item.id}
                {...item}
                isActive={isActiveRoute(item.href, pathname)}
              />
            ))}
          </div>

          {/* Spacer for FAB */}
          <div className="w-20 shrink-0" />

          {/* Right items */}
          <div className="flex flex-1 items-center justify-around">
            {navItems.slice(2, 4).map((item) => (
              <NavItem
                key={item.id}
                {...item}
                isActive={isActiveRoute(item.href, pathname)}
              />
            ))}
          </div>
        </div>

        {/* Centered FAB - positioned at center with negative margin to lift it up */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <PrimaryActionButton
            href="/article"
            className="border-border/40 border-t shadow-2xl ring-6"
          />
        </div>
      </div>
    </nav>
  );
}
