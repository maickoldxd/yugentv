import { WatchView } from "@/components/watch/watch-view";
import { getWatchContextBySlug } from "@/lib/mock-data";
import { notFound } from "next/navigation";

interface WatchPageProps {
  params: Promise<{ slug: string }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug } = await params;
  const context = getWatchContextBySlug(slug);

  if (!context) {
    notFound();
  }

  return <WatchView context={context} series={context.series ?? null} />;
}
