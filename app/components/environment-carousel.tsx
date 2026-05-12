import Image from "next/image";
import { EnvironmentCarouselControls } from "./environment-carousel-controls";

export type EnvironmentItem = {
  title: string;
  label: string;
  image: string;
  alt: string;
};

const carouselId = "ambientes-carousel";
const regionId = "ambientes-carousel-region";

export function EnvironmentCarousel({ items }: { items: EnvironmentItem[] }) {
  return (
    <div className="relative mt-12 sm:mt-14" id={regionId}>
      <EnvironmentCarouselControls
        carouselId={carouselId}
        itemCount={items.length}
        regionId={regionId}
      />

      <div
        id={carouselId}
        aria-label="Galeria de ambientes planejados Finger"
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:gap-5 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <article
            className="group min-w-[88%] snap-start sm:min-w-[48%] lg:min-w-[31.75%]"
            key={item.title}
          >
            <div
              className={`relative aspect-[4/5] overflow-hidden bg-[#D8D1C6] ${
                index % 3 === 1 ? "lg:mt-14" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 84vw"
                className="object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,36,34,0)_35%,rgba(37,36,34,0.7)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FFFCF2] sm:p-8">
                <p className="text-[0.62rem] font-bold uppercase tracking-normal text-[#C44E2A]">
                  {item.label}
                </p>
                <h3 className="mt-4 font-display text-2xl font-light leading-tight sm:text-3xl">
                  {item.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
