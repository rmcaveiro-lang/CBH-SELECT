import type { Metadata } from "next";
import Link from "next/link";
import Media from "@/components/Media";
import AddToSelection from "@/components/AddToSelection";
import { StatusBadge } from "@/components/StatusBadge";
import { properties } from "@/data/properties";
import { territoryById } from "@/data/territories";

export const metadata: Metadata = { title: "Propriedades", description: "Prêmio Hipismo Brasil, Casa CBH, circuitos e as grandes finais do hipismo brasileiro." };

export default function EventsPage() {
  const t = territoryById("signature-events")!;
  return (
    <div className="page-in">
      <section className="sec tone-night">
        <div className="wrap pagehead">
          <span className="label on">02 · Grandes eventos</span>
          <h1 className="display">{t.title}</h1>
          <div className="pagehead-copy"><p className="lead">{t.line}</p></div>
        </div>
      </section>
      {properties.map((p, i) => (
        <section key={p.id} className={`sec-tight ${i % 2 ? "tone-stone" : "tone-paper"}`}>
          <div className={`wrap split ${i % 2 ? "rev" : ""}`} style={{ alignItems: "center" }}>
            <div style={{ order: i % 2 ? 2 : 1 }}><Media media={p.hero} ratio="land" /></div>
            <div className="stack" style={{ order: i % 2 ? 1 : 2 }}>
              <div className="meta-row"><span className="label">{p.kicker}</span><StatusBadge status={p.status} /></div>
              <h2 className="h2" data-rv>{p.title}</h2>
              <p className="lead" data-rv>{p.signature}</p>
              <p className="body" data-rv>{p.summary}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <AddToSelection id={p.id} title={p.title} />
                <Link className="link" href={p.href!}>Ver propriedade →</Link>
              </div>
            </div>
          </div>
        </section>
      ))}
      <section className="sec-tight tone-green">
        <div className="wrap split">
          <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,48px)" }}>Calendário completo em breve.</h2>
          <p className="lead">Grand Prix, campeonatos brasileiros, internacionais, base, amadores e masters entram neste catálogo com filtros por modalidade, região e período.</p>
        </div>
      </section>
    </div>
  );
}
