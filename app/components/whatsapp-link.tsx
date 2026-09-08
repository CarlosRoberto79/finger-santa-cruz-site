"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  FINGER_MARKETING_EVENTS,
  trackMarketingEvent,
} from "../lib/marketing-events";
export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Finger Santa Cruz do Sul. Quero fazer um ambiente personalizado com vocês.\n\nGostaria de iniciar meu atendimento com a Geísa Raupp.";

export function buildWhatsappHref(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://tintim.link/whatsapp/f0917ae2-b8c6-4982-bd89-07a661ad4428/16b1cb24-27a8-4eec-8594-cc1d74f6eaa2?text=${encodeURIComponent(message)}`;
}

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  message?: string;
  placement: keyof typeof FINGER_MARKETING_EVENTS;
};

export function WhatsAppLink({
  children,
  className,
  message,
  placement,
  onClick,
  ...props
}: WhatsAppLinkProps) {
  return (
    <a
      className={className}
      href={buildWhatsappHref(message)}
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
