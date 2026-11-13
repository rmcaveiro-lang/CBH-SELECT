import type { Price, Status } from "@/data/types";
import { statusLabel } from "@/data/options";

export function StatusBadge({ status }: { status: Status }) {
  const strong = status === "exclusive" || status === "by-invitation";
  return <span className={`badge${strong ? " strong" : ""}`}>{statusLabel[status]}</span>;
}

/** Preço só aparece quando o dado pede (briefing, seção 39). */
export function PriceLabel({ price }: { price: Price }) {
  if (price.display === "hidden") return null;
  if (price.display === "on-request") return <span className="price">On request</span>;
  if (price.display === "custom") return <span className="price">Custom</span>;
  if (price.display === "from" && price.amount)
    return <span className="price">From R$ {price.amount.toLocaleString("pt-BR")}</span>;
  return null;
}
