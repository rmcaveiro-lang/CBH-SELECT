import Link from "next/link";
import type { Property } from "@/data/types";
import Media from "./Media";
import AddToSelection from "./AddToSelection";
import ItemCard from "./ItemCard";
import { StatusBadge, PriceLabel } from "./StatusBadge";
import { itemsByIds } from "@/lib/inventory";
import { territoryById } from "@/data/territories";
import { modalityById } from "@/data/modalities";

export default function PropertyView({ p, children }: { p: Property; children?: React.ReactNode }) {
  const t = territoryById(p.territory)!;
  const related = itemsByIds(p.related ?? []);
  const facts = (p.facts ?? []).filter((f) => f.verified);
  return (
    <div className="page-in">
      <section className="tone-night prop-hero">
        <div className="wrap prop-hero-in">
          <span className="label">
            <span className="num">{t.index}</span> · {t.name} · {p.category}
            {p.location ? ` · ${p.location}` : ""}
          </span>
          <h1 className="display">{p.title}</h1>
          <p className="statement" style={{ fontSize: "clamp(26px,3vw,46px)", maxWidth: "20ch" }}>{p.signature}</p>
          <div className="meta-row" style={{ justifyContent: "flex-start", flexWrap: "wrap" }}>
            <StatusBadge status={p.status} />
            <PriceLabel price={p.price} />
            <AddToSelection id={p.id} title={p.title} />
          </div>
        </div>
        <Media media={p.hero} ratio="wide" priority />
      </section>

      <section className="sec tone-paper">
        <div className="wrap split top">
          <div className="stack">
            <span className="label">{p.kicker}</span>
            <p className="lead" data-rv>{p.summary}</p>
          </div>
          <div className="stack">
            {p.body?.map((b) => <p key={b} className="body" data-rv>{b}</p>)}
            {facts.length > 0 && (
              <dl className="facts">
                {facts.map((f) => <div key={f.id}><dt className="label">{f.label}</dt><dd className="num">{f.value}</dd></div>)}
              </dl>
            )}
            {p.modalities.length > 0 && (
              <div className="stack" style={{ gap: 10 }}>
                <span className="label">Modalidades</span>
                <ul className="includes">
                  {p.modalities.map((id) => {
                    const m = modalityById(id);
                    return m ? <li key={id} style={{ borderLeft: `2px solid ${m.supportColor}` }}>{m.name}</li> : null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {children}

      <section className="sec tone-stone">
        <div className="wrap">
          <div className="split" style={{ marginBottom: "clamp(32px,4vw,56px)" }}>
            <div className="stack">
              <span className="label">Como ocupar</span>
              <h2 className="h2" data-rv>Uma propriedade. Muitas entradas.</h2>
            </div>
            <p className="lead" data-rv>
              A propriedade pode ser ocupada inteira ou em partes. Cada componente abaixo pode virar a porta de entrada
              da sua marca.
            </p>
          </div>
          <ol className="comps" data-rv="stagger">
            {p.components.map((c, i) => (
              <li key={c.name}>
                <span className="label num">{String(i + 1).padStart(2, "0")}</span>
                <b>{c.name}</b>
                <p>{c.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sec tone-white">
          <div className="wrap">
            <div className="meta-row" style={{ marginBottom: 32 }}>
              <h2 className="h2" style={{ fontSize: "clamp(26px,3vw,42px)" }}>Combina com.</h2>
              <Link className="link" href="/explore">Todo o ecossistema →</Link>
            </div>
            <div className="cards">{related.map((r) => <ItemCard key={r.id} item={r} showTerritory />)}</div>
          </div>
        </section>
      )}

      <section className="sec-tight tone-night">
        <div className="wrap split">
          <h2 className="h2">Comece por aqui. Cresça para o ecossistema.</h2>
          <div className="hero-ctas">
            <Link className="btn" href={`/select?t=${p.id}`}>Monte sua parceria <i /></Link>
            <AddToSelection id={p.id} title={p.title} />
          </div>
        </div>
      </section>
    </div>
  );
}
