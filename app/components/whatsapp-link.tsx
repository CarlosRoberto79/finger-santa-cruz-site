"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  FINGER_MARKETING_EVENTS,
  trackMarketingEvent,
} from "../lib/marketing-events";
import { TINTIM_CLIENT_ID, TINTIM_LINKS } from "../lib/site-config";
export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Finger Santa Cruz do Sul. Quero fazer um ambiente personalizado com vocês.\n\nGostaria de iniciar meu atendimento com a Geísa Raupp.";

export function buildWhatsappHref(
  message = DEFAULT_WHATSAPP_MESSAGE,
  linkCode: string = TINTIM_LINKS.site,
) {
  return `https://tintim.link/whatsapp/${TINTIM_CLIENT_ID}/${linkCode}?text=${encodeURIComponent(message)}`;
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
