"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaEntry, MediaLayout } from "@/lib/types";
import { useEffect, useState } from "react";

import { Button } from "@heroui/react";
import { MediaCard } from "@/components/media/media-card";
import { getCardSizeClass } from "@/lib/mock-data";
import useEmblaCarousel from "embla-carousel-react";

interface MediaRailProps {
  title: string;
  description: string;
  layout: MediaLayout;
  items: MediaEntry[];
}

export function MediaRail({
  title,
  description,
  layout,
  items,
}: MediaRailProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const syncState = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    syncState();
    emblaApi.on("select", syncState);
    emblaApi.on("reInit", syncState);

    return () => {
      emblaApi.off("select", syncState);
      emblaApi.off("reInit", syncState);
    };
  }, [emblaApi]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-white/58 sm:text-base">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label={`Scroll ${title} backward`}
            isDisabled={!canScrollPrev}
            isIconOnly
            onPress={() => emblaApi?.scrollPrev()}
            variant="secondary"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            aria-label={`Scroll ${title} forward`}
            isDisabled={!canScrollNext}
            isIconOnly
            onPress={() => emblaApi?.scrollNext()}
            variant="secondary"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {items.map((entry) => (
            <div
              key={entry.slug}
              className={`${getCardSizeClass(layout)} min-w-0 pl-4`}
            >
              <MediaCard entry={entry} layout={layout} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
