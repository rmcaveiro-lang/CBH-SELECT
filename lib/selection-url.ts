import type { BuilderState } from "./selection-store";
import { basePath, site } from "./config";

/* Seleção serializada na URL: abre igual em qualquer navegador, sem servidor. */
const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function encodeSelection(items: string[], b: BuilderState) {
  const p = new URLSearchParams();
  if (items.length) p.set("i", items.join(","));
  if (b.brand) p.set("b", b.brand);
  if (b.goals.length) p.set("g", b.goals.join(","));
  if (b.audiences.length) p.set("a", b.audiences.join(","));
  if (b.territories.length) p.set("t", b.territories.join(","));
  if (b.scale) p.set("s", b.scale);
  if (b.platforms.length) p.set("p", b.platforms.join(","));
  return p.toString().replace(/%2C/g, ",");
}

export function decodeSelection(search: string): { items: string[]; builder: BuilderState } | null {
  const p = new URLSearchParams(search);
  if (![...p.keys()].length) return null;
  return {
    items: list(p.get("i")),
    builder: {
      brand: p.get("b") || "",
      goals: list(p.get("g")),
      audiences: list(p.get("a")),
      territories: list(p.get("t")),
      scale: p.get("s") || "",
      platforms: list(p.get("p")),
    },
  };
}

export function shareUrl(items: string[], b: BuilderState) {
  const origin = typeof window !== "undefined" ? window.location.origin + basePath : site.url;
  const q = encodeSelection(items, b);
  return `${origin}/selection/${q ? `?${q}` : ""}`;
}
