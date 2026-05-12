"use client";

import { useCallback, useEffect, useRef } from "react";

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

export function EnvironmentCarouselControls({
  carouselId,
  itemCount,
  regionId,
}: {
  carouselId: string;
  itemCount: number;
  regionId: string;
}) {
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(false);

  const scroll = useCallback(
    (direction: "previous" | "next") => {
      const carousel = document.getElementById(carouselId);

      if (!carousel) {
        return;
      }

      const scrollAmount = carousel.clientWidth * 0.82;
      const isAtStart = carousel.scrollLeft <= 4;
      const isAtEnd =
        carousel.scrollLeft + carousel.clientWidth >=
        carousel.scrollWidth - 6;

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
    },
    [carouselId],
  );

  useEffect(() => {
    const region = document.getElementById(regionId);

    if (!region) {
      return;
    }

    function pause() {
      isPausedRef.current = true;
    }

    function resume() {
      isPausedRef.current = false;
    }

    region.addEventListener("mouseenter", pause);
    region.addEventListener("mouseleave", resume);
    region.addEventListener("focusin", pause);
    region.addEventListener("focusout", resume);
    region.addEventListener("pointerdown", pause);
    region.addEventListener("pointerup", resume);

    return () => {
      region.removeEventListener("mouseenter", pause);
      region.removeEventListener("mouseleave", resume);
      region.removeEventListener("focusin", pause);
      region.removeEventListener("focusout", resume);
      region.removeEventListener("pointerdown", pause);
      region.removeEventListener("pointerup", resume);
    };
  }, [regionId]);

  useEffect(() => {
    const carousel = document.getElementById(carouselId);

    if (!carousel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(carousel);

    return () => observer.disconnect();
  }, [carouselId]);

  useEffect(() => {
    if (itemCount <= 1) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const autoplay = window.setInterval(() => {
      if (isVisibleRef.current && !isPausedRef.current) {
        scroll("next");
      }
    }, 4500);

    return () => window.clearInterval(autoplay);
  }, [itemCount, scroll]);

  return (
    <div className="mb-6 flex items-end justify-between gap-5 sm:mb-7">
      <p className="max-w-md text-[0.62rem] font-bold uppercase leading-5 tracking-normal text-[#403D39]/52">
        Explore composições para diferentes formas de viver e trabalhar.
      </p>
      <div className="flex shrink-0 items-center gap-3">
        <button
          aria-label="Ambiente anterior"
          aria-controls={carouselId}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#403D39]/18 text-[#403D39] transition duration-300 hover:border-[#C44E2A] hover:bg-[#C44E2A] hover:text-white"
          type="button"
          onClick={() => scroll("previous")}
        >
          <ArrowIcon direction="previous" />
        </button>
        <button
          aria-label="Próximo ambiente"
          aria-controls={carouselId}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#403D39]/18 text-[#403D39] transition duration-300 hover:border-[#C44E2A] hover:bg-[#C44E2A] hover:text-white"
          type="button"
          onClick={() => scroll("next")}
        >
          <ArrowIcon direction="next" />
        </button>
      </div>
    </div>
  );
}
