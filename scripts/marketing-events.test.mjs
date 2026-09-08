import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), "utf8");
}

test("a Finger publica tags diretas e preserva os eventos de conversão existentes", async () => {
  const layout = await read("app/layout.tsx");
  const events = await read("app/lib/marketing-events.ts");

  assert.doesNotMatch(layout, /GoogleTagManager|GTM-P8FMLBK9/);
  assert.match(layout, /MarketingTags/);
  assert.match(events, /G-YTJS552PX5/);
  assert.match(events, /1245684497369332/);
  for (const eventName of [
    "click_briefing_hero",
    "click_whatsapp_header",
    "click_whatsapp_hero",
    "click_whatsapp_geisa",
    "click_whatsapp_footer",
    "click_whatsapp_mobile_sticky",
  ]) {
    assert.match(events, new RegExp(eventName));
  }
});
