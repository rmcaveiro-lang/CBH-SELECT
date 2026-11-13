import type { Metadata } from "next";
import PropertyView from "@/components/PropertyView";
import { propertyById } from "@/data/properties";

const p = propertyById("casa-cbh")!;
export const metadata: Metadata = { title: p.title, description: p.summary };

const HUB = [
  { k: "Esporte", l: "Campeonatos, treinos e clínicas" },
  { k: "Experiência", l: "Hospitalidade e jantares privados" },
  { k: "Conteúdo", l: "Estúdio natural do hipismo" },
  { k: "Negócios", l: "Reuniões, convenções, lançamentos" },
  { k: "Comunidade", l: "Federações, clubes e atletas" },
];

export default function Page() {
  return (
    <PropertyView p={p}>
      <section className="sec tone-green">
        <div className="wrap">
          <span className="label on">A casa do hipismo brasileiro</span>
          <div className="hub" data-rv>
            <div className="hub-top"><b>Casa CBH</b></div>
            <div className="hub-line" aria-hidden="true" />
            <ul className="hub-row" data-rv="stagger">
              {HUB.map((h) => <li key={h.k}><b>{h.k}</b><span>{h.l}</span></li>)}
            </ul>
          </div>
          <p className="lead" style={{ marginTop: 40 }}>
            Não somente sede. O flagship físico do ecossistema, onde esporte, experiência, conteúdo, negócio e
            comunidade dividem o mesmo endereço.
          </p>
        </div>
      </section>
    </PropertyView>
  );
}
