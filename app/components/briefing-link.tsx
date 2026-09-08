"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  FINGER_MARKETING_EVENTS,
  trackMarketingEvent,
} from "../lib/marketing-events";

type BriefingLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function BriefingLink({ children, onClick, ...props }: BriefingLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackMarketingEvent(FINGER_MARKETING_EVENTS.briefingHero, {
          placement: "hero",
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
