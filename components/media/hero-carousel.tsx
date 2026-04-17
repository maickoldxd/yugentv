"use client";

import { Button, Card } from "@heroui/react";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import {
  getFirstPlayableHref,
  getHeroDestination,
  getMediaBySlug,
} from "@/lib/mock-data";
import { useEffect, useState } from "react";

import type { HeroSlide } from "@/lib/types";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const intervalId = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <section className="space-y-5">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => {
            const entry = getMediaBySlug(slide.contentSlug);

            if (!entry) {
              return null;
            }

            return (
              <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                <div
                  className="relative min-h-105 overflow-hidden rounded-[36px] bg-[#111722] px-5 py-7 sm:min-h-120 sm:px-8 lg:px-10 lg:py-10"
                  style={{ background: entry.palette.banner }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,6,12,0.32)_0%,rgba(4,6,12,0.54)_54%,rgba(4,6,12,0.82)_100%)]" />
                  <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
                    <div className="flex max-w-2xl flex-col justify-between gap-12">
                      <div className="space-y-5">
                        <span className="inline-flex w-fit rounded-full bg-white/8 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/70 backdrop-blur-sm">
                          {slide.eyebrow}
                        </span>
                        <div className="space-y-4">
                          <h1 className="font-display max-w-3xl text-5xl font-semibold leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            {slide.title}
                          </h1>
                          <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                            {slide.blurb}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-white/58">
                          {entry.genres.map((genre) => (
                            <span
                              key={genre}
                              className="rounded-full bg-black/20 px-3 py-1.5"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={getHeroDestination(slide.contentSlug)}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-white/90"
                        >
                          <Play className="size-4 fill-current" />
                          {slide.ctaLabel}
                        </Link>
                        <Link
                          href={getFirstPlayableHref(entry)}
                          className="inline-flex items-center gap-2 rounded-full bg-white/6 px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-white/10"
                        >
                          <Plus className="size-4" />
                          {slide.secondaryLabel}
                        </Link>
                      </div>
                    </div>

                    <div className="relative hidden xl:block">
                      <div
                        className="absolute inset-x-10 inset-y-16 rounded-full opacity-40 blur-3xl"
                        style={{ background: entry.palette.glow }}
                      />
                      <Card
                        className="relative rounded-[32px] bg-black/20 p-5"
                        variant="secondary"
                      >
                        <div
                          className="aspect-3/4 overflow-hidden rounded-[24px]"
                          style={{ background: entry.palette.poster }}
                        >
                          <div className="flex h-full items-end bg-[linear-gradient(180deg,rgba(5,7,12,0.02)_0%,rgba(5,7,12,0.82)_100%)] p-5">
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-2">
                                <span className="font-sabandija rounded-full bg-black/35 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-white/82">
                                  {entry.kind}
                                </span>
                                <span
                                  className="font-sabandija rounded-full px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-black"
                                  style={{
                                    backgroundColor: entry.palette.accent,
                                  }}
                                >
                                  {entry.badge}
                                </span>
                              </div>
                              <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[18px] bg-black/30 px-3 py-2">
                                <span className="font-sabandija text-sm uppercase tracking-[0.16em] text-white">
                                  {entry.year}
                                </span>
                                <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
                                <span className="font-sabandija text-sm uppercase tracking-[0.16em] text-white/88">
                                  {entry.country}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              aria-label={`Go to slide ${index + 1}`}
              className={[
                "h-1.5 rounded-full transition",
                index === selectedIndex
                  ? "w-12 bg-white"
                  : "w-6 bg-white/20 hover:bg-white/35",
              ].join(" ")}
              onClick={() => emblaApi?.scrollTo(index)}
              type="button"
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label="Previous hero slide"
            isIconOnly
            onPress={() => emblaApi?.scrollPrev()}
            variant="secondary"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            aria-label="Next hero slide"
            isIconOnly
            onPress={() => emblaApi?.scrollNext()}
            variant="secondary"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
