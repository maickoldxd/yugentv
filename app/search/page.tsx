import { Card } from "@heroui/react";
import Link from "next/link";
import { MediaCard } from "@/components/media/media-card";
import { Search } from "lucide-react";
import { searchCatalog } from "@/lib/mock-data";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q ?? "";
  const results = searchCatalog(query);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-10">
      <Card
        className="rounded-[32px] bg-white/3 p-6 sm:p-8"
        variant="secondary"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-white/45">
              <Search className="size-4" />
              Search results
            </span>
            <h1 className="font-display text-4xl text-white sm:text-5xl">
              {query ? `Results for "${query}"` : "Browse the full catalog"}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-white/62">
              Search is intentionally simple in this phase: no pagination, no
              infinite scroll, just a fast result grid wired to the same shared
              content system as the browse rails.
            </p>
          </div>
          <div className="rounded-full bg-black/15 px-4 py-3 text-sm text-white/58">
            {results.length} title{results.length === 1 ? "" : "s"}
          </div>
        </div>
      </Card>

      {results.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {results.map((entry) => (
            <MediaCard key={entry.slug} entry={entry} layout="vertical" />
          ))}
        </section>
      ) : (
        <Card
          className="rounded-[32px] bg-white/2 px-6 py-16 text-center"
          variant="transparent"
        >
          <h2 className="font-display text-3xl text-white">
            No titles matched that search.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-white/58">
            Try a country, genre, cast member, or a softer keyword. The current
            mock search checks titles, origin names, genres, countries,
            languages, and cast metadata.
          </p>
          <Link
            href="/search"
            className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-white/90"
          >
            Clear search
          </Link>
        </Card>
      )}
    </div>
  );
}
