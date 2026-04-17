"use client";

import { Card, ScrollShadow } from "@heroui/react";

import type { Season } from "@/lib/types";

interface SeasonListboxProps {
  activeSeasonId: string;
  seasons: Season[];
  onChange: (seasonId: string) => void;
}

export function SeasonListbox({
  activeSeasonId,
  seasons,
  onChange,
}: SeasonListboxProps) {
  return (
    <Card className="rounded-[28px] bg-white/3 p-4" variant="secondary">
      <div className="space-y-2">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/45">
          Seasons
        </span>
        <h2 className="font-display text-2xl text-white">Choose a run</h2>
      </div>

      <ScrollShadow className="mt-5 max-h-80 space-y-2 pr-2">
        <div className="space-y-2" role="listbox" aria-label="Season list">
          {seasons.map((season) => {
            const isActive = season.id === activeSeasonId;

            return (
              <button
                key={season.id}
                aria-selected={isActive}
                className={[
                  "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition",
                  isActive
                    ? "bg-white/12 text-white"
                    : "bg-black/10 text-white/68 hover:bg-white/8 hover:text-white",
                ].join(" ")}
                onClick={() => onChange(season.id)}
                role="option"
                type="button"
              >
                <span className="font-medium">{season.name}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/45">
                  {season.episodes.length} eps
                </span>
              </button>
            );
          })}
        </div>
      </ScrollShadow>
    </Card>
  );
}
