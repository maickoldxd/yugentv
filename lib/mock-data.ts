import {
  type Episode,
  type HeroSlide,
  type MediaEntry,
  type MediaLayout,
  type RailSection,
  type Series,
  type WatchContext,
} from "@/lib/types";

const demoVideo = "https://blue-dark-magenta.b-cdn.net/master.m3u8";

export const catalog: MediaEntry[] = [
  {
    slug: "silent-seoul",
    title: "Silent Seoul",
    originTitle: "서울 정적",
    kind: "series",
    year: 2026,
    country: "South Korea",
    language: "Korean",
    genres: ["Noir", "Thriller", "Crime"],
    badge: "Top 10",
    description:
      "A burnt-out audio forensics analyst discovers an underground radio network carrying evidence from crimes that never made the news.",
    synopsis:
      "After a failed corruption trial collapses in front of the nation, Ji-eun returns to Seoul to archive police surveillance audio. Buried in dead frequencies, she uncovers encoded broadcasts that predict violent cover-ups before they happen. Every episode moves between neon-lit alleyways, political pressure, and a small team trying to decide whether exposing the truth is worth the cost.",
    palette: {
      poster: "#1c2738",
      banner: "#121b2a",
      glow: "rgba(249,115,22,0.22)",
      accent: "#fb923c",
    },
    metadataNote: "5 episodes",
    posterLabel: "A city humming with missing evidence",
    wideLabel: "When the city goes silent, the frequencies get louder.",
    cast: [
      { name: "Kim Da-mi", role: "Han Ji-eun" },
      { name: "Yoo Teo", role: "Min-ho" },
      { name: "Bae Doona", role: "Chief Seo" },
      { name: "Lee Jae-wook", role: "Kang Seon" },
    ],
    similarSlugs: ["lotus-detective", "midnight-bento", "jade-heist"],
    seasons: [
      {
        id: "season-1",
        name: "Season 1",
        episodes: [
          {
            slug: "silent-seoul-s1e1",
            number: 1,
            title: "Dead Air",
            duration: "48m",
            summary:
              "Ji-eun hears a broken emergency call replay itself inside an archived police reel.",
            still: "#1d2b40",
          },
          {
            slug: "silent-seoul-s1e2",
            number: 2,
            title: "Blue Frequency",
            duration: "45m",
            summary:
              "A pirate radio DJ identifies the signature hidden in a wave of taxi dispatch noise.",
            still: "#21344b",
          },
          {
            slug: "silent-seoul-s1e3",
            number: 3,
            title: "The Missing Tape",
            duration: "51m",
            summary:
              "An erased interview puts Ji-eun directly in the path of an old political fixer.",
            still: "#253247",
          },
        ],
      },
      {
        id: "season-2",
        name: "Season 2",
        episodes: [
          {
            slug: "silent-seoul-s2e1",
            number: 1,
            title: "Night Court",
            duration: "47m",
            summary:
              "The network returns after the trial, but the broadcasts now name government insiders.",
            still: "#243447",
          },
          {
            slug: "silent-seoul-s2e2",
            number: 2,
            title: "Vanishing Point",
            duration: "49m",
            summary:
              "Ji-eun must choose between protecting a source and exposing the conspiracy map.",
            still: "#1f2f42",
          },
        ],
      },
    ],
  },
  {
    slug: "lotus-detective",
    title: "Lotus Detective",
    originTitle: "蓮探偵",
    kind: "series",
    year: 2025,
    country: "Japan",
    language: "Japanese",
    genres: ["Mystery", "Drama", "Period"],
    badge: "Critics' Pick",
    description:
      "A disgraced Tokyo investigator is sent to Kyoto, where every elegant house hides a debt, a murder, or both.",
    synopsis:
      "Set between preserved tea districts and new-money hotel towers, Lotus Detective follows Akari Hoshino as she takes impossible cases from clients who insist they only need discretion. Each mystery peels back family histories, secret inheritances, and modern crimes dressed in ritual.",
    palette: {
      poster: "#283124",
      banner: "#1b241a",
      glow: "rgba(217,119,6,0.2)",
      accent: "#f59e0b",
    },
    metadataNote: "3 episodes",
    posterLabel: "Grace hides guilt",
    wideLabel: "Kyoto elegance, Tokyo instincts.",
    cast: [
      { name: "Suzu Hirose", role: "Akari Hoshino" },
      { name: "Masaki Okada", role: "Ren Arata" },
      { name: "Nana Mori", role: "Mio" },
    ],
    similarSlugs: ["silent-seoul", "monsoon-letters", "jade-heist"],
    seasons: [
      {
        id: "season-1",
        name: "Season 1",
        episodes: [
          {
            slug: "lotus-detective-s1e1",
            number: 1,
            title: "Paper Lanterns",
            duration: "54m",
            summary:
              "A missing heir leaves behind a map hidden in festival decorations.",
            still: "#263123",
          },
          {
            slug: "lotus-detective-s1e2",
            number: 2,
            title: "Quiet Alley Witness",
            duration: "50m",
            summary:
              "Akari's only witness is a calligrapher who never speaks above a whisper.",
            still: "#2b3326",
          },
          {
            slug: "lotus-detective-s1e3",
            number: 3,
            title: "The Last Teahouse",
            duration: "46m",
            summary:
              "A historic teahouse becomes the scene of a very modern blackmail operation.",
            still: "#34321f",
          },
        ],
      },
    ],
  },
  {
    slug: "monsoon-letters",
    title: "Monsoon Letters",
    originTitle: "มรสุมรัก",
    kind: "series",
    year: 2024,
    country: "Thailand",
    language: "Thai",
    genres: ["Romance", "Drama", "Coming of Age"],
    badge: "New Season",
    description:
      "Two strangers inherit the same riverside guesthouse and discover a decade of unopened letters beneath the floorboards.",
    synopsis:
      "The series moves through Bangkok rainstorms and old Chiang Mai summers as Mira and Nawin reconstruct a love story that was interrupted before it could begin. The letters reshape their own relationship, their careers, and the future of the guesthouse they cannot afford to lose.",
    palette: {
      poster: "#2f2534",
      banner: "#221a2a",
      glow: "rgba(236,72,153,0.2)",
      accent: "#f472b6",
    },
    metadataNote: "2 episodes",
    posterLabel: "Some stories wait for rain",
    wideLabel: "A love story discovered too late, or exactly on time.",
    cast: [
      { name: "Baifern Pimchanok", role: "Mira" },
      { name: "Bright Vachirawit", role: "Nawin" },
      { name: "Thanapob Leeratanakachorn", role: "Phob" },
    ],
    similarSlugs: ["ember-market", "lotus-detective", "silent-seoul"],
    seasons: [
      {
        id: "season-1",
        name: "Season 1",
        episodes: [
          {
            slug: "monsoon-letters-s1e1",
            number: 1,
            title: "Flood Line",
            duration: "44m",
            summary:
              "The first storm opens the cellar and exposes a trunk full of letters.",
            still: "#303147",
          },
          {
            slug: "monsoon-letters-s1e2",
            number: 2,
            title: "Unread Since Summer",
            duration: "42m",
            summary:
              "Mira follows the letters into a local archive and an unresolved family feud.",
            still: "#372b3e",
          },
        ],
      },
    ],
  },
  {
    slug: "midnight-bento",
    title: "Midnight Bento",
    originTitle: "真夜中弁当",
    kind: "movie",
    year: 2026,
    country: "Japan",
    language: "Japanese",
    genres: ["Drama", "Slice of Life", "Food"],
    badge: "Film Premiere",
    description:
      "A Tokyo station chef cooks anonymous midnight lunchboxes for commuters who leave letters instead of payment.",
    synopsis:
      "Over one rain-heavy week, a station kiosk becomes a confessional booth for nurses, students, couriers, and runaways. Each bento order carries a memory, and the chef slowly realizes one customer is trying to tell him something he refused to hear years ago.",
    palette: {
      poster: "#35261d",
      banner: "#281b14",
      glow: "rgba(251,146,60,0.22)",
      accent: "#fb923c",
    },
    metadataNote: "2h 03m",
    posterLabel: "Warm food for cold nights",
    wideLabel: "Every lunchbox holds a confession.",
    cast: [
      { name: "Kento Hayashi", role: "Toru" },
      { name: "Haru Kuroki", role: "Aya" },
      { name: "Sakura Ando", role: "Mika" },
    ],
    similarSlugs: ["ember-market", "lotus-detective", "monsoon-letters"],
    duration: "2h 03m",
  },
  {
    slug: "jade-heist",
    title: "Jade Heist",
    originTitle: "玉の奪還",
    kind: "movie",
    year: 2025,
    country: "Hong Kong",
    language: "Cantonese",
    genres: ["Action", "Heist", "Thriller"],
    badge: "Fan Favorite",
    description:
      "A retired getaway driver is pulled back in for a one-night museum theft during Ghost Festival.",
    synopsis:
      "The job looks simple until the crew realizes the artifact they are stealing is wanted by three separate syndicates. Jade Heist trades glossy cityscapes for cramped stairwells, debt, family loyalty, and a driver trying to survive one last impossible map.",
    palette: {
      poster: "#1c3228",
      banner: "#16261f",
      glow: "rgba(34,197,94,0.18)",
      accent: "#4ade80",
    },
    metadataNote: "1h 54m",
    posterLabel: "One night, three crews, no clean exit",
    wideLabel: "The museum is the easy part.",
    cast: [
      { name: "Tony Leung Ka-fai", role: "Lok" },
      { name: "Louise Wong", role: "Yan" },
      { name: "Terrance Lau", role: "Kit" },
    ],
    similarSlugs: ["silent-seoul", "lotus-detective", "midnight-bento"],
    duration: "1h 54m",
  },
  {
    slug: "ember-market",
    title: "Ember Market",
    originTitle: "பொன் சந்தை",
    kind: "movie",
    year: 2024,
    country: "India",
    language: "Tamil",
    genres: ["Fantasy", "Drama", "Adventure"],
    badge: "Award Winner",
    description:
      "A night market appears only when the city loses power, and every stall trades in memories instead of cash.",
    synopsis:
      "When Chennai's grid fails after a brutal heat wave, a medical courier wanders into a market that should not exist. To save her brother, she must barter away memories she cannot bear to lose. Ember Market pairs mythic imagery with intimate family stakes and a steadily widening sense of wonder.",
    palette: {
      poster: "#37231f",
      banner: "#271814",
      glow: "rgba(245,158,11,0.2)",
      accent: "#f59e0b",
    },
    metadataNote: "2h 09m",
    posterLabel: "Pay with what you remember",
    wideLabel: "At midnight, the city shops for second chances.",
    cast: [
      { name: "Sai Pallavi", role: "Meera" },
      { name: "Kalidas Jayaram", role: "Arun" },
      { name: "Parvathy Thiruvothu", role: "The Broker" },
    ],
    similarSlugs: ["monsoon-letters", "midnight-bento", "silent-seoul"],
    duration: "2h 09m",
  },
];

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-silent-seoul",
    contentSlug: "silent-seoul",
    title: "Silent Seoul",
    eyebrow: "New K-thriller event",
    blurb:
      "Corruption, pirate frequencies, and a city-wide cover-up wired through late-night radio transmissions.",
    ctaLabel: "View Series",
    secondaryLabel: "Play S1:E1",
  },
  {
    id: "hero-ember-market",
    contentSlug: "ember-market",
    title: "Ember Market",
    eyebrow: "Featured Tamil fantasy",
    blurb:
      "A blackout opens a market where memories have cash value and every bargain leaves a scar.",
    ctaLabel: "Watch Film",
    secondaryLabel: "More Like This",
  },
  {
    id: "hero-lotus-detective",
    contentSlug: "lotus-detective",
    title: "Lotus Detective",
    eyebrow: "Japanese mystery spotlight",
    blurb:
      "Kyoto's most elegant neighborhoods become crime scenes for an investigator with nowhere left to go.",
    ctaLabel: "View Series",
    secondaryLabel: "Search Genre",
  },
];

export const homeRails: RailSection[] = [
  {
    id: "tonight-trending",
    title: "Tonight's Trending Drops",
    description:
      "High-intensity picks with bold key art and fast entry points.",
    layout: "vertical",
    slugs: ["silent-seoul", "jade-heist", "lotus-detective", "ember-market"],
  },
  {
    id: "cinema-after-dark",
    title: "Cinema After Dark",
    description:
      "Horizontal rails for longer-form films and premium one-night watches.",
    layout: "horizontal",
    slugs: ["midnight-bento", "jade-heist", "ember-market"],
  },
  {
    id: "slow-burn-series",
    title: "Slow Burn Series",
    description:
      "Character-first storytelling built for multiple-night sessions.",
    layout: "vertical",
    slugs: ["monsoon-letters", "silent-seoul", "lotus-detective"],
  },
  {
    id: "romance-and-recovery",
    title: "Romance and Recovery",
    description:
      "Sweeping stories with quieter rhythms and strong emotional payoffs.",
    layout: "horizontal",
    slugs: ["monsoon-letters", "midnight-bento", "ember-market"],
  },
];

export function getMediaBySlug(slug: string) {
  return catalog.find((entry) => entry.slug === slug) ?? null;
}

export function getSeriesBySlug(slug: string) {
  const entry = getMediaBySlug(slug);

  if (!entry || entry.kind !== "series") {
    return null;
  }

  return entry;
}

export function getRailItems(section: RailSection) {
  return section.slugs
    .map((slug) => getMediaBySlug(slug))
    .filter((entry): entry is MediaEntry => entry !== null);
}

export function getSimilarEntries(slugs: string[]) {
  return slugs
    .map((slug) => getMediaBySlug(slug))
    .filter((entry): entry is MediaEntry => entry !== null);
}

export function getMediaHref(entry: MediaEntry) {
  return entry.kind === "series"
    ? `/series/${entry.slug}`
    : `/watch/${entry.slug}`;
}

export function getHeroDestination(slug: string) {
  const entry = getMediaBySlug(slug);

  if (!entry) {
    return "/";
  }

  return getMediaHref(entry);
}

export function getFirstPlayableHref(entry: MediaEntry) {
  if (entry.kind === "movie") {
    return `/watch/${entry.slug}`;
  }

  return `/watch/${entry.seasons[0].episodes[0].slug}`;
}

export function getEpisodeCount(series: Series) {
  return series.seasons.reduce(
    (total, season) => total + season.episodes.length,
    0,
  );
}

export function getEntryStat(entry: MediaEntry) {
  return entry.kind === "series"
    ? `${getEpisodeCount(entry)} episodes`
    : entry.metadataNote;
}

export function getWatchContextBySlug(slug: string): WatchContext | null {
  const movie = catalog.find(
    (entry): entry is Extract<MediaEntry, { kind: "movie" }> =>
      entry.kind === "movie" && entry.slug === slug,
  );

  if (movie) {
    return {
      entry: {
        slug: movie.slug,
        title: movie.title,
        contentSlug: movie.slug,
        kind: "movie",
        duration: movie.duration,
        description: movie.description,
        videoSrc: demoVideo,
        still: movie.palette.banner,
      },
      media: movie,
      siblings: [],
    };
  }

  for (const entry of catalog) {
    if (entry.kind !== "series") {
      continue;
    }

    for (const season of entry.seasons) {
      const episode = season.episodes.find((item) => item.slug === slug);

      if (episode) {
        return {
          entry: {
            slug: episode.slug,
            title: episode.title,
            contentSlug: entry.slug,
            kind: "episode",
            duration: episode.duration,
            description: episode.summary,
            videoSrc: demoVideo,
            still: episode.still,
            seasonName: season.name,
            episodeNumber: episode.number,
          },
          media: entry,
          series: entry,
          season,
          siblings: season.episodes,
        };
      }
    }
  }

  return null;
}

export function searchCatalog(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return catalog;
  }

  return catalog.filter((entry) => {
    const searchable = [
      entry.title,
      entry.originTitle ?? "",
      entry.country,
      entry.language,
      entry.description,
      ...entry.genres,
      ...entry.cast.map((member) => `${member.name} ${member.role}`),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function getSeriesSeason(series: Series, seasonId: string) {
  return (
    series.seasons.find((season) => season.id === seasonId) ?? series.seasons[0]
  );
}

export function getCardSizeClass(layout: MediaLayout) {
  return layout === "vertical"
    ? "basis-[72%] sm:basis-[44%] lg:basis-[22%]"
    : "basis-[88%] sm:basis-[58%] lg:basis-[34%]";
}

export function getSeasonEpisodes(series: Series, seasonId: string) {
  return getSeriesSeason(series, seasonId).episodes;
}

export function getEpisodeHref(series: Series, episode: Episode) {
  return `/watch/${episode.slug}`;
}

export function getSeriesSummary(series: Series) {
  return `${series.year} · ${series.country} · ${getEpisodeCount(series)} episodes`;
}

export function getWatchPanelTitle(context: WatchContext) {
  return context.entry.kind === "episode"
    ? `${context.season?.name ?? "Season"} lineup`
    : "Next in queue";
}

export function getFallbackWatchList(context: WatchContext) {
  if (context.entry.kind === "episode") {
    return context.siblings;
  }

  return [];
}

export function getHomeRailSummaries() {
  return homeRails.map((section) => ({
    ...section,
    items: getRailItems(section),
  }));
}
