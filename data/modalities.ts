import type { Modality } from "./types";

/* As 7 modalidades do CBH SELECT, com as cores de apoio do branding book da CBH (2025).
   Atrelagem e Rédeas ficaram fora do projeto por decisão de nov/2026.
   Territórios culturais e de marca são leituras criativas e comerciais,
   não dados estatísticos (briefing, seção 13).
   VALIDAR NOMENCLATURA E LISTA VIGENTE COM A CBH ANTES DE PUBLICAR. */

export const modalities: Modality[] = [
  {
    id: "salto",
    slug: "salto",
    name: "Salto",
    supportColor: "#38676D",
    manifesto: "Cada percurso é decidido em décimos de segundo e em um único toque na vara.",
    culturalTerritory: ["Performance", "Velocidade", "Prestígio", "Grand Prix", "Entretenimento"],
    whyBrands:
      "É a porta de entrada do grande público no hipismo: provas curtas, leitura imediata e um Grand Prix como clímax de cada evento.",
    experienceType: "Arquibancada, hospitality de pista e cerimônia de premiação",
    contentProfile: "Ritmo, tensão e resultado: ideal para formatos curtos e transmissão",
    formats: ["Naming de prova", "Grand Prix apresentado por", "Obstáculo assinatura", "Premiação"],
    hero: {
      src: "/media/salto-rodrigo-pessoa-frontal.jpg",
      alt: "Rodrigo Pessoa saltando um obstáculo no Mundial de Aachen",
      brief: "Cavalo e cavaleiro no topo do salto",
      focus: "69% 30%",
      credit: "L. Cruas · Aachen 2026",
    },
    second: { src: "/media/salto-rodrigo-pessoa-lateral.jpg", alt: "Rodrigo Pessoa em salto, vista lateral, arquibancada cheia ao fundo", brief: "", focus: "39% 35%", credit: "L. Cruas · Aachen 2026" },
  },
  {
    id: "adestramento",
    slug: "adestramento",
    name: "Adestramento",
    supportColor: "#73917D",
    manifesto: "Precisão absoluta, nota a nota, diante dos juízes.",
    culturalTerritory: ["Precisão", "Elegância", "Técnica", "Design", "Controle"],
    whyBrands:
      "Fala a língua das marcas que vendem engenharia, acabamento e controle. Cada movimento é uma demonstração de técnica.",
    experienceType: "Acompanhamento com especialista e leitura comentada das notas",
    contentProfile: "Estética, detalhe e bastidor do treino",
    formats: ["Campeonato apresentado por", "Série de conteúdo sobre precisão", "Hospitalidade técnica"],
    hero: {
      src: "/media/adestramento-nuno-almeida.jpg",
      alt: "Nuno Almeida em prova de adestramento no Mundial de Aachen",
      brief: "Conjunto de adestramento em movimento",
      focus: "29% 40%",
      credit: "L. Cruas · Aachen 2026",
    },
    second: { src: "/media/adestramento-nuno-almeida-2.jpg", alt: "Nuno Almeida em passage diante dos fotógrafos", brief: "", focus: "72% 35%", credit: "L. Cruas · Aachen 2026" },
  },
  {
    id: "hipismo-completo",
    slug: "hipismo-completo",
    name: "Hipismo Completo",
    supportColor: "#3E5249",
    manifesto: "Três provas, um mesmo conjunto: adestramento, cross-country e salto.",
    culturalTerritory: ["Versatilidade", "Coragem", "Natureza", "Resistência"],
    whyBrands:
      "A modalidade mais completa do esporte. Traduz versatilidade e confiança em qualquer terreno.",
    experienceType: "Percurso de cross-country acompanhado ao ar livre",
    contentProfile: "Aventura, paisagem e narrativa em três atos",
    formats: ["Obstáculo de cross assinatura", "Série em três episódios", "Experiência de percurso"],
    hero: {
      src: "/media/completo-carlos-parro.jpg",
      alt: "Carlos Parro atravessando a água no cross-country do Mundial de Aachen",
      brief: "Conjunto no cross-country",
      focus: "56% 35%",
      credit: "L. Cruas · Aachen 2026",
    },
    second: { src: "/media/completo-marcio-jorge.jpg", alt: "Marcio Jorge saindo do obstáculo de água no cross-country", brief: "", focus: "57% 35%", credit: "L. Cruas · Aachen 2026" },
  },
  {
    id: "paraequestre",
    slug: "paraequestre",
    name: "Paraequestre",
    supportColor: "#7C6BA0",
    manifesto: "O hipismo paralímpico, onde técnica e autonomia andam juntas.",
    culturalTerritory: ["Tecnologia", "Inclusão", "Excelência", "Superação"],
    whyBrands:
      "Território natural para marcas de mobilidade, tecnologia e saúde, com legado de longo prazo e conexão direta com ESG.",
    experienceType: "Convivência com atletas e equipe técnica",
    contentProfile: "Histórias de atletas, preparação e tecnologia assistiva",
    formats: ["Programa apresentado por", "Documentário", "Projeto incentivado"],
    hero: {
      alt: "Atleta paraequestre em prova",
      brief: "Atleta paraequestre em prova de adestramento, retrato de concentração",
      focus: "50% 30%",
    },
  },
  {
    id: "enduro",
    slug: "enduro",
    name: "Enduro",
    supportColor: "#B77351",
    manifesto: "Longas distâncias, gestão de ritmo e o cuidado com o cavalo a cada quilômetro.",
    culturalTerritory: ["Resistência", "Natureza", "Território", "Longa distância"],
    whyBrands:
      "Conecta marcas ao interior do país, ao agro e à estrada. Cada prova atravessa um território.",
    experienceType: "Ponto de apoio e acompanhamento de etapa no campo",
    contentProfile: "Paisagem, estrada e bastidor veterinário",
    formats: ["Etapa apresentada por", "Ponto de apoio de marca", "Série de estrada"],
    hero: {
      alt: "Conjunto de enduro em trilha",
      brief: "Conjunto de enduro em trilha de terra ao amanhecer, plano aberto",
      focus: "50% 40%",
    },
  },
  {
    id: "volteio",
    slug: "volteio",
    name: "Volteio",
    supportColor: "#D6A943",
    manifesto: "Ginástica sobre o cavalo em movimento, em equipe.",
    culturalTerritory: ["Equipe", "Leveza", "Juventude", "Família"],
    whyBrands:
      "Reúne equipes jovens e famílias na arquibancada. Um território de trabalho em grupo e confiança.",
    experienceType: "Apresentação aberta e convivência com equipes",
    contentProfile: "Movimento, plasticidade e trabalho em equipe",
    formats: ["Equipe apresentada por", "Conteúdo de bastidor", "Ações com categorias de base"],
    hero: {
      src: "/media/volteio-manuela-chade.jpg",
      alt: "Manuela Chade em figura de volteio sobre o cavalo em movimento",
      brief: "Volteador em figura sobre o cavalo",
      focus: "63% 35%",
      credit: "L. Cruas · Aachen 2026",
    },
    second: { src: "/media/volteio-manu-chade-pista.jpg", alt: "Volteadora e guia entrando na pista com o cavalo", brief: "", focus: "25% 40%", credit: "L. Cruas · Aachen 2026" },
  },


  {
    id: "tambor",
    slug: "tambor",
    name: "Tambor",
    supportColor: "#CE5F2E",
    manifesto: "Velocidade pura em torno de três tambores.",
    culturalTerritory: ["Velocidade", "Adrenalina", "Agro", "Juventude"],
    whyBrands:
      "Prova rápida e de leitura imediata, com forte presença no interior e entre jovens atletas.",
    experienceType: "Arena com público próximo e premiação no ato",
    contentProfile: "Velocidade, cronômetro e formatos curtos",
    formats: ["Prova apresentada por", "Cronômetro oficial", "Conteúdo curto para redes"],
    hero: {
      alt: "Conjunto contornando o tambor",
      brief: "Conjunto contornando o tambor em alta velocidade, ângulo baixo",
      focus: "50% 40%",
    },
  },
];

export const modalityById = (id: string) => modalities.find((m) => m.id === id);
