import type { GoalId, Option, ScaleId, Status } from "./types";

/* Opções do configurador e rótulos de filtro.
   Audiências são filtros comerciais, não dados demográficos comprovados. */

export const goals: Option<GoalId>[] = [
  { id: "awareness", label: "Visibilidade de marca", hint: "Ser vista e lembrada" },
  { id: "relationship", label: "Relacionamento", hint: "Aproximar clientes e parceiros" },
  { id: "content", label: "Conteúdo", hint: "Ter histórias próprias para contar" },
  { id: "sales", label: "Vendas", hint: "Gerar negócio direto" },
  { id: "hospitality", label: "Hospitalidade", hint: "Receber convidados" },
  { id: "launch", label: "Lançamento", hint: "Apresentar produto ou marca" },
  { id: "esg", label: "ESG / Impacto", hint: "Investir em legado" },
  { id: "positioning", label: "Posicionamento", hint: "Mudar como a marca é percebida" },
  { id: "b2b", label: "B2B", hint: "Abrir conversas de negócio" },
];

export const audiences: Option[] = [
  { id: "C-Level", label: "C-Level" },
  { id: "Clientes", label: "Clientes" },
  { id: "Famílias", label: "Famílias" },
  { id: "Comunidade equestre", label: "Comunidade equestre" },
  { id: "Atletas", label: "Atletas" },
  { id: "Jovens", label: "Jovens" },
  { id: "Agro", label: "Agro" },
  { id: "Luxury consumers", label: "Consumidor de luxo" },
  { id: "Empresários", label: "Empresários" },
  { id: "Trade", label: "Trade" },
  { id: "Concessionários", label: "Concessionários" },
  { id: "Stakeholders", label: "Públicos institucionais" },
];

export const builderTerritories: Option[] = [
  { id: "modalidades", label: "Modalidades", hint: "As 7 modalidades do projeto" },
  { id: "casa-cbh", label: "Casa CBH", hint: "O endereço do hipismo" },
  { id: "premio-hipismo-brasil", label: "Prêmio Hipismo Brasil", hint: "A noite do hipismo brasileiro" },
  { id: "circuito-senior-top", label: "Senior Top", hint: "O circuito nacional de salto" },
  { id: "eventos", label: "Eventos", hint: "Campeonatos e Grand Prix" },
  { id: "conteudo", label: "Conteúdo", hint: "Da arena para a tela" },
  { id: "impacto", label: "Impacto", hint: "Formação, base e paraequestre" },
];

export const scales: Option<ScaleId>[] = [
  { id: "local", label: "Local", hint: "Um evento, uma cidade" },
  { id: "regional", label: "Regional", hint: "Uma praça ou um estado" },
  { id: "national", label: "Nacional", hint: "O país inteiro" },
  { id: "season", label: "Temporada", hint: "O ano esportivo completo" },
  { id: "special-project", label: "Projeto especial", hint: "Algo construído sob medida" },
];

export const platforms: Option[] = [
  { id: "naming", label: "Naming" },
  { id: "hospitality", label: "Hospitalidade" },
  { id: "conteudo", label: "Conteúdo" },
  { id: "product-activation", label: "Ativação de produto" },
  { id: "merch", label: "Produtos oficiais" },
  { id: "licensing", label: "Licenciamento" },
  { id: "athlete-experience", label: "Experiência com atleta" },
  { id: "vip", label: "VIP" },
  { id: "impact", label: "Impacto" },
  { id: "event", label: "Evento" },
  { id: "digital", label: "Digital" },
  { id: "casa-cbh", label: "Casa CBH" },
];

export const statusLabel: Record<Status, string> = {
  available: "Disponível",
  exclusive: "Exclusivo",
  limited: "Limitado",
  season: "Temporada",
  custom: "Sob medida",
  "by-invitation": "Por convite",
};

export const labelOf = (list: Option[], id: string) => list.find((o) => o.id === id)?.label ?? id;
