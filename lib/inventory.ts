import { properties } from "@/data/properties";
import { experiences } from "@/data/experiences";
import { content, merch, impact } from "@/data/catalog";
import { modalities } from "@/data/modalities";
import { products } from "@/data/products";
import type { InventoryItem } from "@/data/types";

/* Cada modalidade também pode ser somada ao projeto como item. */
export const modalityItems: InventoryItem[] = modalities.map((m) => ({
  id: `mod-${m.id}`,
  slug: m.slug,
  title: m.name,
  kicker: "Modalidade",
  territory: "sport",
  category: "Modalidade",
  summary: m.whyBrands,
  hero: m.hero,
  goals: ["awareness", "content", "positioning"],
  audiences: [],
  regions: [],
  modalities: [m.id],
  scale: ["national", "season"],
  status: "available",
  price: { display: "on-request" },
}));

/* Ponto único de leitura do inventário. Um CMS futuro entra aqui. */
export const inventory: InventoryItem[] = [
  ...properties,
  ...products,
  ...modalityItems,
  ...experiences,
  ...content,
  ...merch,
  ...impact,
];

export const itemById = (id: string) => inventory.find((i) => i.id === id);
export const itemsByIds = (ids: string[]) =>
  ids.map(itemById).filter((i): i is InventoryItem => Boolean(i));
export const featured = () => inventory.filter((i) => i.featured);
/** Propriedades e experiências ligadas a uma modalidade, sem a própria modalidade. */
export const relatedToModality = (id: string) =>
  inventory.filter((i) => i.modalities.includes(id) && !i.id.startsWith("mod-") && i.modalities.length < modalities.length);
