import { getSeriesBySlug, getSimilarEntries } from "@/lib/mock-data";

import { SeriesView } from "@/components/series/series-view";
import { notFound } from "next/navigation";

interface SeriesPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  const similar = getSimilarEntries(series.similarSlugs);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10">
      <SeriesView series={series} similar={similar} />
    </div>
  );
}
