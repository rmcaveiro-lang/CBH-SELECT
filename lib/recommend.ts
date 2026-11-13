import { inventory } from "./inventory";
import type { BuilderState } from "./selection-store";
import type { InventoryItem } from "@/data/types";

/* Liga as respostas do configurador ao inventário. Regra simples e legível:
   território escolhido pesa mais, objetivo em comum soma, escala em comum desempata. */
const territoryMatch: Record<string, (i: InventoryItem) => boolean> = {
  modalidades: (i) => i.territory === "sport" || i.modalities.length > 0,
  "casa-cbh": (i) => i.id === "casa-cbh" || i.id === "exp-casa-cbh",
  "premio-hipismo-brasil": (i) => i.id === "premio-hipismo-brasil",
  "circuito-senior-top": (i) => i.id === "circuito-senior-top",
  eventos: (i) => i.territory === "signature-events",
  conteudo: (i) => i.territory === "media-content",
  impacto: (i) => i.territory === "impact",
};

export function recommend(b: BuilderState, limit = 6) {
  return inventory
    .map((i) => {
      let score = 0;
      if (b.territories.some((t) => territoryMatch[t]?.(i))) score += 5;
      score += i.goals.filter((g) => b.goals.includes(g)).length * 2;
      if (b.scale && i.scale.includes(b.scale as never)) score += 1;
      score += i.audiences.filter((a) => b.audiences.includes(a)).length * 0.5;
      return { i, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.i);
}
