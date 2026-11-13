/* Configuração do site. Preencher antes de publicar. */
export const site = {
  name: "CBH SELECT",
  url: "https://rmcaveiro-lang.github.io/CBH-SELECT",
  /** Número do WhatsApp comercial, só dígitos com DDI. PENDENTE: definir com a CBH. */
  whatsapp: "",
  locale: "pt-BR" as const,
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** Prefixa arquivos de /public com o basePath do GitHub Pages. */
export const asset = (p: string) => `${basePath}${p}`;
