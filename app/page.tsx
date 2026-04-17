import { getHomeRailSummaries, heroSlides } from "@/lib/mock-data";

import { HeroCarousel } from "@/components/media/hero-carousel";
import { MediaRail } from "@/components/media/media-rail";

export default function Home() {
  const rails = getHomeRailSummaries();

  return (
    <div className="mx-auto w-full max-w-360 space-y-14 px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-10">
      <HeroCarousel slides={heroSlides} />

      {rails.map((section) => (
        <MediaRail
          key={section.id}
          description={section.description}
          items={section.items}
          layout={section.layout}
          title={section.title}
        />
      ))}
    </div>
  );
}
