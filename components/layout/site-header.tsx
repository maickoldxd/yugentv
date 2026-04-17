"use client";

import { Button, Input } from "@heroui/react";
import { Menu, Search, X } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(5,7,12,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="shrink-0">
          <span className="font-sabandija text-2xl  text-white">YugenTV</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/65 hover:bg-white/6 hover:text-white",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form
          action="/search"
          className="relative ml-auto hidden w-full max-w-md items-center md:flex"
          method="GET"
        >
          <Search className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-white/45" />
          <Input
            aria-label="Search catalog"
            className="w-full pl-10"
            fullWidth
            name="q"
            placeholder="Search K-drama, anime, cinema, cast..."
            type="search"
            variant="secondary"
          />
        </form>

        <Button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
          isIconOnly
          onPress={() => setIsMenuOpen((open) => !open)}
          variant="ghost"
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {isMenuOpen ? (
        <div className="px-4 py-4 md:hidden sm:px-6">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4">
            <form action="/search" className="relative" method="GET">
              <Search className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-white/45" />
              <Input
                aria-label="Search catalog"
                className="w-full pl-10"
                fullWidth
                name="q"
                placeholder="Search titles, countries, cast..."
                type="search"
                variant="secondary"
              />
            </form>

            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === link.href
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-white/10 text-white"
                        : "bg-white/3 text-white/70",
                    ].join(" ")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
