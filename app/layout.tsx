import type { Metadata } from "next";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SelectionDrawer from "@/components/SelectionDrawer";
import MobileSelectionBar from "@/components/MobileSelectionBar";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "CBH SELECT · O ecossistema do hipismo brasileiro", template: "%s · CBH SELECT" },
  description: "Não escolha uma cota. Escolha o seu lugar dentro do hipismo brasileiro.",
  openGraph: {
    title: "CBH SELECT",
    description: "O ecossistema comercial da Confederação Brasileira de Hipismo.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="sr-only" href="#conteudo">Ir para o conteúdo</a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <SelectionDrawer />
        <MobileSelectionBar />
        <Reveal />
      </body>
    </html>
  );
}
