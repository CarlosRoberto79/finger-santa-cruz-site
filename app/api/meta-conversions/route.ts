import { META_PIXEL_ID } from "../../lib/marketing-events";

const META_GRAPH_VERSION = "v24.0";

type ConversionPayload = {
  eventName?: unknown;
  eventId?: unknown;
  eventSourceUrl?: unknown;
  customData?: unknown;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

  if (!accessToken) {
    return Response.json({ ok: true, sent: false, reason: "not_configured" });
  }

  let payload: ConversionPayload;

  try {
    payload = (await request.json()) as ConversionPayload;
  } catch {
    return Response.json({ message: "Dados inválidos." }, { status: 400 });
  }

  const eventName = readString(payload.eventName);
  const eventId = readString(payload.eventId);
  const eventSourceUrl = readString(payload.eventSourceUrl);

  if (!eventName || !eventId || !eventSourceUrl) {
    return Response.json({ message: "Evento incompleto." }, { status: 400 });
  }

  const response = await fetch(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            event_source_url: eventSourceUrl,
            action_source: "website",
            user_data: {},
            custom_data:
              payload.customData && typeof payload.customData === "object"
                ? payload.customData
                : undefined,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    console.error("Meta Conversions API failed:", await response.text());
    return Response.json(
      { message: "Não foi possível enviar o evento." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, sent: true });
}
