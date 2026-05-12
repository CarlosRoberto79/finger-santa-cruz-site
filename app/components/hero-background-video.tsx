"use client";

import { useEffect, useState } from "react";

const DESKTOP_VIDEO_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

type NavigatorConnection = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NavigatorConnection;
};

function canLoadDecorativeVideo() {
  const connection = (navigator as NavigatorWithConnection).connection;
  const effectiveType = connection?.effectiveType;

  return (
    !connection?.saveData &&
    effectiveType !== "slow-2g" &&
    effectiveType !== "2g"
  );
}

export function HeroBackgroundVideo({
  poster,
  src,
}: {
  poster: string;
  src: string;
}) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_VIDEO_QUERY);

    function updateVideoLoading() {
      setShouldLoadVideo(mediaQuery.matches && canLoadDecorativeVideo());
    }

    updateVideoLoading();
    mediaQuery.addEventListener("change", updateVideoLoading);

    return () => {
      mediaQuery.removeEventListener("change", updateVideoLoading);
    };
  }, []);

  if (!shouldLoadVideo) {
    return null;
  }

  return (
    <video
      aria-hidden="true"
      className="absolute inset-0 h-full w-full scale-[1.02] object-cover opacity-90"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
