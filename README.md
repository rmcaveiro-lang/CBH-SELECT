# CBH SELECT

O ecossistema comercial da Confederação Brasileira de Hipismo. Next.js com exportação estática, publicado no GitHub Pages.

## Rodar

```
npm install
npm run dev        # http://localhost:3000
npm run build      # valida o inventário e gera /out
```

## Publicar

1. Suba este repositório no GitHub (sugestão: `CBH-SELECT`).
2. Em **Settings › Pages**, em *Source*, escolha **GitHub Actions**.
3. Cada push na `main` publica em `https://<usuario>.github.io/<repositorio>/`.

Quando o subdomínio existir, crie `public/CNAME` com o domínio e troque `NEXT_PUBLIC_BASE_PATH` no workflow por vazio.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Número do WhatsApp comercial | `lib/config.ts` (`whatsapp`) |
| Propriedades (Casa CBH, Prêmio, Senior Top) | `data/properties.ts` |
| Modalidades e cores de apoio | `data/modalities.ts` |
| Experiências e programação de hospitality | `data/experiences.ts` |
| Conteúdo, merch, impacto e regras fiscais | `data/catalog.ts` |
| Números institucionais | `data/facts.ts` (só aparecem com `verified: true`) |
| Opções do configurador | `data/options.ts` |
| Paleta e tipografia | `app/globals.css` |

## Fotos e vídeos

Todo item tem um campo `hero` com `brief` (o que a foto precisa mostrar). Enquanto não há arquivo, o site exibe uma marcação com esse texto. Para aplicar:

1. Coloque o arquivo em `public/media/` (JPG/WebP até 2400 px; vídeo MP4 H.264 abaixo de 3 MB).
2. No item, preencha `src: "/media/arquivo.jpg"` (e `video` quando houver).
3. Ajuste `focus` (ex.: `"50% 30%"`) para que o recorte nunca corte a cabeça dos atletas.
4. Imagem gerada ou montada recebe `conceptual: true` e ganha o selo "Composição conceitual".

## Fontes

Hanken Grotesk (apoio) vem do pacote `@fontsource-variable/hanken-grotesk`. A Sans Beam (principal) é comercial: quando os WOFF2 com licença web chegarem, copie para `public/fonts/` e descomente o bloco `@font-face` no topo de `app/globals.css`.

## Pendências antes de publicar

- Número do WhatsApp comercial.
- Fotos e vídeos reais.
- Versão positiva do logo (lettering escuro) em SVG.
- Validação com a CBH da lista de modalidades, dos números marcados como não verificados e das regras da Lei de Incentivo (`incentiveRules`).
