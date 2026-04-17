import type { Series, WatchContext } from "@/lib/types";
import {
  getEpisodeHref,
  getMediaHref,
  getWatchPanelTitle,
} from "@/lib/mock-data";

import { VidstackPlayer } from "@/components/watch/vidstack-player";

interface WatchViewProps {
  context: WatchContext;
  series: Series | null;
}

export function WatchView({ context, series }: WatchViewProps) {
  const playerTitle =
    context.entry.kind === "episode"
      ? `${context.media.title}: ${context.entry.title}`
      : context.media.title;
  const playerSubtitle =
    context.entry.kind === "episode" && context.entry.seasonName
      ? `${context.entry.seasonName} • Episode ${context.entry.episodeNumber}`
      : `${context.media.year} • ${context.media.country}`;
  const activeEpisodeIndex = context.siblings.findIndex(
    (episode) => episode.slug === context.entry.slug,
  );
  const nextEpisode =
    context.entry.kind === "episode" &&
    series &&
    activeEpisodeIndex >= 0 &&
    activeEpisodeIndex < context.siblings.length - 1
      ? context.siblings[activeEpisodeIndex + 1]
      : null;
  const episodeOptions =
    context.entry.kind === "episode" && series
      ? context.siblings.map((episode) => ({
          duration: episode.duration,
          href: getEpisodeHref(series, episode),
          isActive: episode.slug === context.entry.slug,
          label: `Episode ${episode.number}`,
          still: episode.still,
          title: episode.title,
        }))
      : [];

  return (
    <div
      data-watch-page
      className="relative min-h-dvh w-full overflow-hidden bg-black"
    >
      <div className="w-full bg-black">
        <VidstackPlayer
          accent={context.media.palette.accent}
          backHref={
            context.media.kind === "series" ? getMediaHref(context.media) : "/"
          }
          backLabel={
            context.media.kind === "series"
              ? `Back to ${context.media.title}`
              : "Back home"
          }
          episodes={episodeOptions}
          episodesLabel={getWatchPanelTitle(context)}
          nextEpisode={
            nextEpisode && series
              ? {
                  href: getEpisodeHref(series, nextEpisode),
                  label: `Next: ${nextEpisode.title}`,
                }
              : null
          }
          src={context.entry.videoSrc}
          subtitle={playerSubtitle}
          title={playerTitle}
        />
      </div>
    </div>
  );
}
