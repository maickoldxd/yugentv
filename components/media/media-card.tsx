import type { MediaEntry, MediaLayout } from "@/lib/types";

import { Card } from "@heroui/react";
import Link from "next/link";
import { getMediaHref } from "@/lib/mock-data";

interface MediaCardProps {
  entry: MediaEntry;
  layout: MediaLayout;
}

export function MediaCard({ entry, layout }: MediaCardProps) {
  const href = getMediaHref(entry);
  const isHorizontal = layout === "horizontal";

  return (
    <article className="group relative">
      <Link href={href} className="block">
        <Card
          className={[
            "relative overflow-hidden rounded-[28px] bg-[#0f141d] shadow-[0_24px_60px_-34px_rgba(0,0,0,0.8)] transition duration-500",
            isHorizontal ? "aspect-[16/9]" : "aspect-[2/3] min-h-[260px]",
          ].join(" ")}
          variant="secondary"
        >
          <div
            className="absolute inset-0 scale-100 transition duration-700 group-hover:scale-[1.04]"
            style={{ background: entry.palette.poster }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.04)_0%,rgba(5,7,12,0.18)_56%,rgba(5,7,12,0.84)_100%)]" />

          <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2 sm:left-4 sm:top-4">
            <span className="font-sabandija rounded-full bg-black/35 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-white/82 backdrop-blur-sm">
              {entry.kind}
            </span>
            <span
              className="font-sabandija rounded-full px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-black"
              style={{ backgroundColor: entry.palette.accent }}
            >
              {entry.badge}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <div className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-[20px] bg-black/36 px-3 py-2 backdrop-blur-sm sm:px-4 sm:py-3">
              <span className="font-sabandija text-sm uppercase tracking-[0.16em] text-white sm:text-base">
                {entry.year}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
              <span className="font-sabandija text-sm uppercase tracking-[0.16em] text-white/88 sm:text-base">
                {entry.country}
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </article>
  );
}
