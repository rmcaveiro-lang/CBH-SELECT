/** Exportação estática para o GitHub Pages.
 *  NEXT_PUBLIC_BASE_PATH = "/CBH-SELECT" no deploy; vazio em desenvolvimento. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default {
  output: "export",
  basePath,
  assetPrefix: process.env.NEXT_ASSET_PREFIX || basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
