import Link from "next/link";
import type { InventoryItem } from "@/data/types";
import Media from "./Media";
import AddToSelection from "./AddToSelection";
import { PriceLabel, StatusBadge } from "./StatusBadge";
import { territoryById } from "@/data/territories";

export const SPORT_NOTE =
  "Sujeita a regras técnicas, segurança, bem-estar animal e aprovação da organização.";

export default function ItemCard({ item, showTerritory = false }: { item: InventoryItem; showTerritory?: boolean }) {
  const t = territoryById(item.territory);
  return (
    <article className="card">
      <Media media={item.hero} ratio="land" />
      <div className="meta">
        <span className="label">{showTerritory && t ? `${t.index} ${t.name}` : item.category}</span>
        <StatusBadge status={item.status} />
      </div>
      <h3>{item.href ? <Link href={item.href}>{item.title}</Link> : item.title}</h3>
      <p>{item.summary}</p>
      {item.requiresSportArea && <p className="note-sport">{SPORT_NOTE}</p>}
      <div className="foot">
        <AddToSelection id={item.id} title={item.title} />
        <PriceLabel price={item.price} />
      </div>
    </article>
  );
}
