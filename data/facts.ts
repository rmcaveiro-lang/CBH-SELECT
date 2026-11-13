import type { Fact } from "./types";

/* Números institucionais. Só aparecem na tela com verified: true.
   Fonte de referência atual: branding book da CBH (rebranding 2025). */

export const facts: Fact[] = [
  {
    id: "fundacao",
    value: "1935",
    label: "Desde",
    source: "Branding book CBH, rebranding 2025",
    referenceDate: "2025-01",
    verified: true,
  },
  {
    id: "modalidades",
    value: "7",
    label: "Modalidades",
    source: "Definição do projeto CBH SELECT",
    referenceDate: "2026-11",
    verified: true,
  },
  {
    id: "eventos-ano",
    value: "60+",
    label: "Eventos nacionais por ano",
    source: "Material ICAUR × CBH",
    referenceDate: "2026-08",
    verified: false,
  },
  {
    id: "atletas",
    value: "5 mil",
    label: "Atletas",
    source: "Material ICAUR × CBH",
    referenceDate: "2026-08",
    verified: false,
  },
  {
    id: "instagram-seguidores",
    value: "60 mil",
    label: "Seguidores no Instagram",
    source: "Relatório de performance @cbhoficial, jan a set 2026",
    referenceDate: "2026-09",
    verified: false,
  },
];

export const publicFacts = () => facts.filter((f) => f.verified);
export const factById = (id: string) => facts.find((f) => f.id === id && f.verified);
