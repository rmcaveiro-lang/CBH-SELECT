/* Contrato do inventário do CBH SELECT.
   Todo conteúdo comercial vive em /data. Componentes recebem ids e leem daqui.
   Trocar por um CMS no futuro significa reescrever apenas /lib/inventory.ts. */

export type TerritoryId =
  | "sport"
  | "signature-events"
  | "experiences"
  | "media-content"
  | "merch-licensing"
  | "impact";

export type Status =
  | "available"
  | "exclusive"
  | "limited"
  | "season"
  | "custom"
  | "by-invitation";

export type GoalId =
  | "awareness"
  | "relationship"
  | "content"
  | "sales"
  | "hospitality"
  | "launch"
  | "esg"
  | "positioning"
  | "b2b";

export type ScaleId = "local" | "regional" | "national" | "season" | "special-project";

/** Uma imagem ou vídeo. Sem `src`, o site mostra uma marcação de espaço com `brief`. */
export interface Media {
  src?: string;
  video?: string;
  alt: string;
  /** O que a foto precisa mostrar. Aparece na marcação enquanto não há arquivo. */
  brief: string;
  /** object-position, para nunca cortar a cabeça de atletas. Ex.: "50% 30%". */
  focus?: string;
  /** Imagem gerada ou montada: o componente aplica o selo "Composição conceitual". */
  conceptual?: boolean;
  credit?: string;
}

/** Regra absoluta (briefing, seção 53): número sem verificação não aparece na tela. */
export interface Fact {
  id: string;
  value: string;
  label: string;
  source: string;
  referenceDate: string; // AAAA-MM
  verified: boolean;
}

/** Preço nunca é exibido por padrão (briefing, seção 39). */
export interface Price {
  display: "hidden" | "on-request" | "custom" | "from";
  amount?: number;
  currency?: "BRL";
}

export interface InventoryItem {
  id: string;
  slug: string;
  title: string;
  kicker?: string;
  territory: TerritoryId;
  category: string;
  summary: string;
  body?: string[];
  hero: Media;
  goals: GoalId[];
  audiences: string[];
  regions: string[];
  modalities: string[];
  scale: ScaleId[];
  status: Status;
  featured?: boolean;
  price: Price;
  /** Ativa o aviso técnico da seção 18 do briefing. */
  requiresSportArea?: boolean;
  /** Rota própria, quando o item tem página. */
  href?: string;
  related?: string[];
}

export interface PropertyComponent {
  name: string;
  line: string;
}

export interface Property extends InventoryItem {
  signature: string;
  components: PropertyComponent[];
  moments?: { time?: string; name: string; line: string }[];
  location?: string;
  facts?: Fact[];
  /** Cases já realizados. Nome de marca só aparece com brandApproved: true. */
  cases?: { format: string; brand?: string; where?: string; brandApproved?: boolean }[];
}

export interface Modality {
  id: string;
  slug: string;
  name: string;
  /** Cor de apoio do branding book. Uso restrito a fio de 2 px e marcador. */
  supportColor: string;
  manifesto: string;
  /** Territórios criativos e comerciais. Não são dados estatísticos. */
  culturalTerritory: string[];
  whyBrands: string;
  experienceType: string;
  contentProfile: string;
  formats: string[];
  hero: Media;
  /** Segunda foto, usada na tela aberta da modalidade. */
  second?: Media;
}

export interface Territory {
  id: TerritoryId;
  index: string;
  name: string;
  title: string;
  line: string;
  includes: string[];
  href: string;
  tone: "paper" | "stone" | "green" | "green-deep" | "night" | "graphite";
  hero: Media;
}

export interface Option<T extends string = string> {
  id: T;
  label: string;
  hint?: string;
}
