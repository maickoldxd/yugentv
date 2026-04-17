export type MediaKind = "movie" | "series";
export type MediaLayout = "vertical" | "horizontal";

export interface CastMember {
  name: string;
  role: string;
}

export interface MediaPalette {
  poster: string;
  banner: string;
  glow: string;
  accent: string;
}

export interface Episode {
  slug: string;
  number: number;
  title: string;
  duration: string;
  summary: string;
  still: string;
}

export interface Season {
  id: string;
  name: string;
  episodes: Episode[];
}

interface MediaBase {
  slug: string;
  title: string;
  originTitle?: string;
  kind: MediaKind;
  year: number;
  country: string;
  language: string;
  genres: string[];
  badge: string;
  description: string;
  synopsis: string;
  palette: MediaPalette;
  metadataNote: string;
  posterLabel: string;
  wideLabel: string;
  cast: CastMember[];
  similarSlugs: string[];
}

export interface Movie extends MediaBase {
  kind: "movie";
  duration: string;
}

export interface Series extends MediaBase {
  kind: "series";
  seasons: Season[];
}

export type MediaEntry = Movie | Series;

export interface HeroSlide {
  id: string;
  contentSlug: string;
  title: string;
  eyebrow: string;
  blurb: string;
  ctaLabel: string;
  secondaryLabel: string;
}

export interface RailSection {
  id: string;
  title: string;
  description: string;
  layout: MediaLayout;
  slugs: string[];
}

export interface WatchEntry {
  slug: string;
  title: string;
  contentSlug: string;
  kind: "movie" | "episode";
  duration: string;
  description: string;
  videoSrc: string;
  still: string;
  seasonName?: string;
  episodeNumber?: number;
}

export interface WatchContext {
  entry: WatchEntry;
  media: MediaEntry;
  series?: Series;
  season?: Season;
  siblings: Episode[];
}
