import type { AnchorHTMLAttributes, ReactNode } from "react";
import { FINGER_SANTA_CRUZ_WHATSAPP } from "../lib/site-config";

export {
  FINGER_SANTA_CRUZ_ADDRESS,
  FINGER_SANTA_CRUZ_HOURS,
  FINGER_SANTA_CRUZ_SOCIALS,
  FINGER_SANTA_CRUZ_WHATSAPP,
  FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY,
} from "../lib/site-config";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Finger Santa Cruz do Sul. Quero fazer um ambiente personalizado com vocês.\n\nGostaria de iniciar meu atendimento com a Geísa Raupp.";

export function buildWhatsappHref(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${FINGER_SANTA_CRUZ_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  message?: string;
};

export function WhatsAppLink({
  children,
  className,
  message,
  ...props
}: WhatsAppLinkProps) {
  return (
    <a
      className={className}
      href={buildWhatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
