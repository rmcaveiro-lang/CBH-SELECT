import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreClient from "./ExploreClient";

export const metadata: Metadata = {
  title: "Explore",
  description: "Todo o ecossistema comercial do hipismo brasileiro, filtrado pelo que a sua marca quer construir.",
};

export default function ExplorePage() {
  return (
    <div className="page-in">
      <section className="sec-tight tone-paper">
        <div className="wrap pagehead">
          <span className="label">Explore opportunities</span>
          <h1 className="display">Todo o ecossistema.</h1>
          <p className="lead pagehead-copy">
            Propriedades, experiências, conteúdo, produtos e projetos de impacto em um só lugar. Filtre pelo que a sua
            marca quer construir e some ao projeto o que fizer sentido.
          </p>
        </div>
      </section>
      <Suspense>
        <ExploreClient />
      </Suspense>
    </div>
  );
}
