import type { Property } from "@/data/types";
import Media from "../Media";
import AddToSelection from "../AddToSelection";
import { StatusBadge } from "../StatusBadge";
import { SPORT_NOTE } from "../ItemCard";

/** Conteúdo da tela aberta de uma propriedade ou produto: cotas e entregas. */
export default function PropertyDetail({ pr, prev, next, onPrev, onNext }: {
  pr: Property; prev: string; next: string; onPrev: () => void; onNext: () => void;
}) {
  return (
    <article className="pproj">
      <header className="mproj-head">
        <span className="label">{pr.kicker}{pr.location ? ` · ${pr.location}` : ""}</span>
        <h2 className="mproj-name">{pr.title}</h2>
        <p className="statement">{pr.signature}</p>
        <div className="meta-row" style={{ justifyContent: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <StatusBadge status={pr.status} />
          <AddToSelection id={pr.id} title={pr.title} label="Somar ao projeto" />
        </div>
      </header>
      <Media media={pr.hero} ratio="wide" reveal={false} />
      <p className="lead">{pr.summary}</p>
      {pr.requiresSportArea && <p className="note-sport">{SPORT_NOTE}</p>}
      <div className="mproj-block">
        <h3 className="label on">Entregas</h3>
        <ol className="deliv cols">
          {pr.components.map((c, k) => (
            <li key={c.name}>
              <span className="num">{String(k + 1).padStart(2, "0")}</span>
              <div><b>{c.name}</b><small>{c.line}</small></div>
            </li>
          ))}
        </ol>
      </div>
      {pr.cases && pr.cases.length > 0 && (
        <div className="mproj-block">
          <h3 className="label on">Já realizado</h3>
          <ul className="rel">
            {pr.cases.map((c) => (
              <li key={c.format}>
                <div><b>{c.format}{c.brandApproved && c.brand ? ` · ${c.brand}` : ""}</b>{c.where && <span>{c.where}</span>}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {pr.moments && (
        <div className="mproj-block">
          <h3 className="label on">A noite, momento a momento</h3>
          <ol className="deliv">
            {pr.moments.map((mo, k) => (
              <li key={mo.name}><span className="num">{String(k + 1).padStart(2, "0")}</span><div><b>{mo.name}</b><small>{mo.line}</small></div></li>
            ))}
          </ol>
        </div>
      )}
      <nav className="mproj-nav" aria-label="Navegar">
        <button className="link" onClick={onPrev}>← {prev}</button>
        <button className="link" onClick={onNext}>{next} →</button>
      </nav>
    </article>
  );
}
