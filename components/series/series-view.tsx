"use client";

import { ArrowRight, Play, Sparkles, Users } from "lucide-react";
import { Button, Card, Modal } from "@heroui/react";
import type { MediaEntry, Series } from "@/lib/types";
import {
  getEpisodeCount,
  getEpisodeHref,
  getSeriesSeason,
  getSeriesSummary,
} from "@/lib/mock-data";
import { useState, useTransition } from "react";

import Link from "next/link";
import { MediaRail } from "@/components/media/media-rail";
import { SeasonListbox } from "@/components/series/season-listbox";

interface SeriesViewProps {
  series: Series;
  similar: MediaEntry[];
}

export function SeriesView({ series, similar }: SeriesViewProps) {
  const [selectedSeasonId, setSelectedSeasonId] = useState(
    series.seasons[0].id,
  );
  const [showSynopsis, setShowSynopsis] = useState(false);
  const [showCast, setShowCast] = useState(false);
  const [, startTransition] = useTransition();
  const selectedSeason = getSeriesSeason(series, selectedSeasonId);
  const firstEpisode = selectedSeason.episodes[0];

  return (
    <div className="space-y-14 pb-16">
      <section className="grid gap-8 xl:grid-cols-[330px_minmax(0,1fr)] xl:items-start">
        <div className="relative">
          <div
            className="absolute inset-x-8 top-16 h-48 rounded-full opacity-35 blur-3xl"
            style={{ background: series.palette.glow }}
          />
          <div
            className="relative aspect-3/4 overflow-hidden rounded-[34px]"
            style={{ background: series.palette.poster }}
          >
            <div className="flex h-full items-end bg-[linear-gradient(180deg,rgba(5,7,12,0.06)_0%,rgba(5,7,12,0.86)_100%)] p-6">
              <div>
                <span className="text-[0.68rem] uppercase tracking-[0.3em] text-white/45">
                  {series.badge}
                </span>
                <p className="mt-2 font-display text-4xl text-white">
                  {series.posterLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-white/8 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/65">
              {series.language} series
            </span>
            <div className="space-y-3">
              <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {series.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/68">
                {series.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-white/58">
              <span className="rounded-full bg-white/3 px-3 py-1.5">
                {getSeriesSummary(series)}
              </span>
              <span className="rounded-full bg-white/3 px-3 py-1.5">
                {series.genres.join(" · ")}
              </span>
              <span className="rounded-full bg-white/3 px-3 py-1.5">
                {getEpisodeCount(series)} episodes total
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={getEpisodeHref(series, firstEpisode)}
              className="inline-flex items-center gap-2 rounded-full bg-white  px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-white/90"
            >
              <Play className="size-4 fill-current" />
              Start Watching
            </Link>
            <Button
              onPress={() => setShowSynopsis((open) => !open)}
              variant="secondary"
            >
              <Sparkles className="size-4" />
              {showSynopsis ? "Hide Synopsis" : "Show Synopsis"}
            </Button>
            <Button onPress={() => setShowCast(true)} variant="secondary">
              <Users className="size-4" />
              See Casting
            </Button>
          </div>

          {showSynopsis ? (
            <Card
              className="rounded-[28px] bg-white/3 p-6 text-sm leading-7 text-white/68"
              variant="secondary"
            >
              {series.synopsis}
            </Card>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <SeasonListbox
          activeSeasonId={selectedSeasonId}
          onChange={(seasonId) => {
            startTransition(() => setSelectedSeasonId(seasonId));
          }}
          seasons={series.seasons}
        />

        <div className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/45">
                {selectedSeason.name}
              </span>
              <h2 className="font-display text-3xl text-white">Episode list</h2>
            </div>
            <p className="text-sm text-white/52">
              Tight thumbnails, fast entry, and a side-season selector for the
              final production version.
            </p>
          </div>

          <div className="grid gap-4">
            {selectedSeason.episodes.map((episode) => (
              <Card
                key={episode.slug}
                className="rounded-[28px] bg-white/3 transition hover:bg-white/5"
                variant="secondary"
              >
                <Link
                  href={getEpisodeHref(series, episode)}
                  className="group grid gap-4 p-3 sm:grid-cols-[240px_minmax(0,1fr)]"
                >
                  <div
                    className="aspect-video overflow-hidden rounded-[22px]"
                    style={{ background: episode.still }}
                  >
                    <div className="flex h-full items-end bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(5,7,12,0.8)_100%)] p-4">
                      <span className="rounded-full bg-black/35 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white/75 backdrop-blur-sm">
                        Episode {episode.number}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-4 p-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <span>{episode.duration}</span>
                        <span className="h-1 w-1 rounded-full bg-white/25" />
                        <span>{series.language}</span>
                      </div>
                      <h3 className="font-display text-2xl text-white transition group-hover:text-white/92">
                        {episode.title}
                      </h3>
                      <p className="max-w-3xl text-sm leading-7 text-white/62">
                        {episode.summary}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/55 transition group-hover:text-white">
                      Watch episode
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <MediaRail
        description="Use this rail for similar titles, cross-format recommendations, or editorial programming blocks."
        items={similar}
        layout="horizontal"
        title="Similar series and films"
      />

      <Modal isOpen={showCast} onOpenChange={setShowCast}>
        <Modal.Backdrop className="bg-[rgba(3,6,10,0.82)] backdrop-blur-sm">
          <Modal.Container size="lg">
            <Modal.Dialog className="bg-[#0b1018] text-white">
              <Modal.Header>
                <div>
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/45">
                    Casting
                  </span>
                  <h2 className="mt-2 font-display text-3xl text-white">
                    {series.title}
                  </h2>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="grid gap-3 sm:grid-cols-2">
                  {series.cast.map((member) => (
                    <Card
                      key={member.name}
                      className="rounded-[24px] bg-white/3 p-4"
                      variant="secondary"
                    >
                      <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-white/45">
                        Cast
                      </span>
                      <p className="mt-3 font-display text-2xl text-white">
                        {member.name}
                      </p>
                      <p className="mt-1 text-sm text-white/58">
                        {member.role}
                      </p>
                    </Card>
                  ))}
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
