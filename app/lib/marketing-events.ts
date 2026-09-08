export const GA4_MEASUREMENT_ID = "G-YTJS552PX5";
export const META_PIXEL_ID = "1245684497369332";

export const FINGER_MARKETING_EVENTS = {
  briefingHero: "click_briefing_hero",
  whatsappHeader: "click_whatsapp_header",
  whatsappHero: "click_whatsapp_hero",
  whatsappGeisa: "click_whatsapp_geisa",
  whatsappFooter: "click_whatsapp_footer",
  whatsappMobileSticky: "click_whatsapp_mobile_sticky",
  leadSubmitted: "generate_lead",
} as const;

type MarketingParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function createEventId(eventName: string) {
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return `${eventName}-${randomPart}`;
}

export function trackMarketingEvent(
  eventName: string,
  params: MarketingParams = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const eventId = createEventId(eventName);
  const eventParams = { ...params, event_id: eventId };

  window.gtag?.("event", eventName, eventParams);
  window.fbq?.("trackCustom", eventName, params, { eventID: eventId });

  void fetch("/api/meta-conversions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      customData: params,
    }),
    keepalive: true,
  }).catch(() => {
    // O navegador continua rastreando mesmo sem a CAPI configurada.
  });
}
