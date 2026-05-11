import type { AnchorHTMLAttributes, ReactNode } from "react";

export const FINGER_SANTA_CRUZ_WHATSAPP = "5551999718164";
export const FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY = "+55 51 99971-8164";
export const FINGER_SANTA_CRUZ_ADDRESS =
  "Rua Tenente Coronel Brito, 141 loja 5, Santa Cruz do Sul - RS, CEP 96810-202";
export const FINGER_SANTA_CRUZ_HOURS =
  "Seg - Sex: 08:30-12:00 | 13:30-18:00";

export const FINGER_SANTA_CRUZ_SOCIALS = {
  instagram: "https://www.instagram.com/fingersantacruzdosul",
  facebook: "https://www.facebook.com/fingersantacruzdosul",
  pinterest: "https://www.pinterest.com/fingersantacruzdosul",
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Finger Santa Cruz do Sul. Gostaria de conversar sobre um ambiente personalizado com a Finger.";

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
