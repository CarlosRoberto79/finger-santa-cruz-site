"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  FINGER_MARKETING_EVENTS,
  trackMarketingEvent,
} from "../lib/marketing-events";
export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Finger Santa Cruz do Sul. Quero fazer um ambiente personalizado com vocês.\n\nGostaria de iniciar meu atendimento com a Geísa Raupp.";

/** Links rastreáveis do Tintim da Finger Santa Cruz do Sul. */
export const TINTIM_LINKS = {
  site: "16b1cb24-27a8-4eec-8594-cc1d74f6eaa2",
  arquitetos: "390ace6e-431d-4638-9cd2-339ce022c4d8",
} as const;

export function buildWhatsappHref(
  message = DEFAULT_WHATSAPP_MESSAGE,
  linkCode: string = TINTIM_LINKS.site,
) {
  return `https://tintim.link/whatsapp/f0917ae2-b8c6-4982-bd89-07a661ad4428/${linkCode}?text=${encodeURIComponent(message)}`;
}

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  message?: string;
  /** Código do link rastreável do Tintim. Por padrão, o link do site. */
  linkCode?: string;
  placement: keyof typeof FINGER_MARKETING_EVENTS;
};

export function WhatsAppLink({
  children,
  className,
  message,
  linkCode,
  placement,
  onClick,
  ...props
}: WhatsAppLinkProps) {
  return (
    <a
      className={className}
      href={buildWhatsappHref(message, linkCode)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackMarketingEvent(FINGER_MARKETING_EVENTS[placement], { placement });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
