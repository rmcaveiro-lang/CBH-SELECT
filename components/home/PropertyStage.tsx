"use client";
import { useCallback, useRef, useState } from "react";
import { properties } from "@/data/properties";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { track } from "@/lib/analytics";
import Media from "../Media";
import Sheet from "./Sheet";
import PropertyDetail from "./PropertyDetail";
import { StatusBadge } from "../StatusBadge";

/** Uma propriedade por vez, trocando com o scroll; "Ver entregas" abre o projeto completo. */
export default function PropertyStage() {
  const sec = useRef<HTMLElement>(null);
  const p = useScrollProgress(sec);
  const n = properties.length;
  const active = Math.min(n - 1, Math.floor(p * n));
  const [open, setOpen] = useState<number | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const all = properties.flatMap((x) => x.components.map((c) => c.name));
  const pr = open !== null ? properties[open] : null;

  const jump = (i: number) => {
    const el = sec.current; if (!el) return;
    const top = el.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + ((i + 0.5) / n) * (el.offsetHeight - innerHeight), behavior: "smooth" });
  };

  return (
    <section ref={sec} className="stage tone-night" style={{ height: `${n * 100 + 60}vh` }} aria-labelledby="stage-t">
      <div className="stage-pin">
        <h2 id="stage-t" className="ghost" aria-label="Cotas e entregas">Propriedades</h2>
        <div className="stage-index" role="tablist" aria-label="Propriedades">
          {properties.map((x, i) => (
            <button key={x.id} role="tab" aria-selected={i === active} aria-label={x.title} onClick={() => jump(i)}><i /></button>
          ))}
        </div>
        <div className="stage-copy" aria-live="polite">
          {properties.map((x, i) => (
            <div key={x.id} className={`stage-item${i === active ? " on" : ""}`} hidden={i !== active}>
              <span className="label">{x.kicker}</span>
              <h3>{x.title}</h3>
              <p>{x.summary}</p>
              <div className="meta-row" style={{ justifyContent: "flex-start", gap: 10 }}>
                <StatusBadge status={x.status} />
                <span className="label num">{x.components.length} entregas</span>
              </div>
            </div>
          ))}
        </div>
        <div className="stage-visual" aria-hidden="true">
          {properties.map((x, i) => (
            <div key={x.id} className={`stage-full${i === active ? " on" : ""}`}>
              <Media media={x.hero} ratio="fill" reveal={false} />
            </div>
          ))}
          <div className="stage-shade" />
        </div>
        <div className="stage-cta">
          <button
            className="btn"
            onClick={(e) => { setOrigin(e.currentTarget.getBoundingClientRect()); setOpen(active); track("property_view", { id: properties[active].id }); }}
            aria-haspopup="dialog"
          >
            Ver entregas <i />
          </button>
        </div>
        <div className="marquee" aria-hidden="true">
          <div>{[...all, ...all].map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
      </div>

      <Sheet open={open !== null} origin={origin} onClose={close} label={pr ? pr.title : "Propriedade"} tone="tone-paper">
        {pr && (
          <PropertyDetail
            pr={pr}
            prev={properties[(open! + n - 1) % n].title}
            next={properties[(open! + 1) % n].title}
            onPrev={() => setOpen((open! + n - 1) % n)}
            onNext={() => setOpen((open! + 1) % n)}
          />
        )}
      </Sheet>
    </section>
  );
}
