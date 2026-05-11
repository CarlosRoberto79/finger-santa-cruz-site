"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type EnvironmentItem = {
  title: string;
  label: string;
  image: string;
  alt: string;
};

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {direction === "previous" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function EnvironmentCarousel({ items }: { items: EnvironmentItem[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  const scroll = useCallback((direction: "previous" | "next") => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const scrollAmount = carousel.clientWidth * 0.82;
    const isAtStart = carousel.scrollLeft <= 4;
    const isAtEnd =
      carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 6;

    if (direction === "next" && isAtEnd) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction === "previous" && isAtStart) {
      carousel.scrollTo({
        left: carousel.scrollWidth - carousel.clientWidth,
        behavior: "smooth",
      });
      return;
    }

    carousel.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const autoplay = window.setInterval(() => {
      if (!isPausedRef.current) {
        scroll("next");
      }
    }, 4500);

    return () => window.clearInterval(autoplay);
  }, [items.length, scroll]);

  return (
    <div
      className="relative mt-12 sm:mt-14"
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      onFocus={() => {
        isPausedRef.current = true;
      }}
      onBlur={() => {
        isPausedRef.current = false;
      }}
      onPointerDown={() => {
        isPausedRef.current = true;
      }}
      onPointerUp={() => {
        isPausedRef.current = false;
      }}
    >
      <div className="mb-6 flex items-end justify-between gap-5 sm:mb-7">
        <p className="max-w-md text-[0.62rem] font-bold uppercase leading-5 tracking-normal text-[#403D39]/52">
          Explore composições para diferentes formas de viver e trabalhar.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            aria-label="Ambiente anterior"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#403D39]/18 text-[#403D39] transition duration-300 hover:border-[#C44E2A] hover:bg-[#C44E2A] hover:text-white"
            type="button"
            onClick={() => scroll("previous")}
          >
            <ArrowIcon direction="previous" />
          </button>
          <button
            aria-label="Próximo ambiente"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#403D39]/18 text-[#403D39] transition duration-300 hover:border-[#C44E2A] hover:bg-[#C44E2A] hover:text-white"
            type="button"
            onClick={() => scroll("next")}
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
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
