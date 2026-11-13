"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { modalities } from "@/data/modalities";
import { useScrollProgress, reducedMotion } from "@/lib/use-scroll-progress";
import { relatedToModality } from "@/lib/inventory";
import { track } from "@/lib/analytics";
import Media from "../Media";
import AddToSelection from "../AddToSelection";
import Sheet from "./Sheet";
import { StatusBadge } from "../StatusBadge";
import { SPORT_NOTE } from "../ItemCard";

/* Trote: andadura em dois tempos, com os pares diagonais alternando.
   As cartas pares sobem enquanto as ímpares tocam o chão, e vice-versa, no ritmo do scroll.
   Cada passada percorre STRIDE px de deslocamento; na fase de suspensão a carta inclina levemente para a frente. */
const STRIDE = 190, LIFT = 26, TILT = 2.2;
function trot(i: number, x: number, calm: boolean) {
  const base = i % 2 ? 7 : -8; // escalonamento em vh, como duas linhas de patas
  if (calm) return `translateY(${base}vh)`;
  const ph = (x / STRIDE) * Math.PI + (i % 2) * Math.PI;
  const up = Math.max(0, Math.sin(ph)); // só sobe: o apoio no chão é plano
  const y = -up * LIFT;
  const r = Math.cos(ph) * TILT * (up > 0 ? 1 : 0.3);
  return `translateY(calc(${base}vh + ${y.toFixed(1)}px)) rotate(${r.toFixed(2)}deg)`;
}

export default function ModalityDeck() {
  const sec = useRef<HTMLElement>(null);
  const track_ = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const p = useScrollProgress(sec);
  const [open, setOpen] = useState<number | null>(null);
  const [calm, setCalm] = useState(false);
  useEffect(() => setCalm(reducedMotion()), []);
  const [origin, setOrigin] = useState<DOMRect | null>(null);

  useEffect(() => {
    const m = () => setDist(Math.max(0, (track_.current?.scrollWidth ?? 0) - innerWidth));
    m();
    addEventListener("resize", m);
    return () => removeEventListener("resize", m);
  }, []);

  const show = (i: number, el: HTMLElement) => {
    setOrigin(el.getBoundingClientRect());
    setOpen(i);
    track("property_view", { id: `mod-${modalities[i].id}` });
  };
  const close = useCallback(() => setOpen(null), []);
  const m = open !== null ? modalities[open] : null;
  const rel = m ? relatedToModality(m.id) : [];

  return (
    <section ref={sec} className="deck tone-green-deep" style={{ height: `calc(100vh + ${dist}px)` }} aria-labelledby="deck-t">
      <div className="deck-pin">
        <h2 id="deck-t" className="ghost" aria-label="Modalidades">Modalidades</h2>
        <div className="deck-intro" style={{ opacity: Math.max(0, 1 - p * 7) }}>
          <span className="label on">Sete modalidades</span>
          <p>Cada uma com seu público, seu ritmo e sua estética. Abra uma carta para ver o que ela entrega.</p>
        </div>
        <div className="ruler" aria-hidden="true" />
        <div ref={track_} className="deck-track" style={{ transform: `translate3d(${-p * dist}px,0,0)` }}>
          {modalities.map((x, i) => (
            <button
              key={x.id}
              className="mcard"
              style={{ ["--c" as string]: x.supportColor, ["--r" as string]: `${((i * 37) % 7) - 3}deg`, transform: trot(i, p * dist, calm) }}
              onClick={(e) => show(i, e.currentTarget.querySelector(".mcard-frame") as HTMLElement)}
              aria-haspopup="dialog"
            >
              <span className="mcard-n num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="mcard-frame">
                <Media media={x.hero} ratio="port" reveal={false} />
              </span>
              <span className="mcard-name">{x.name}</span>
              <span className="mcard-line">{x.culturalTerritory.slice(0, 3).join(" · ")}</span>
            </button>
          ))}
        </div>
        <div className="deck-progress" aria-hidden="true"><i style={{ transform: `scaleX(${p})` }} /></div>
      </div>

      <Sheet open={open !== null} origin={origin} onClose={close} label={m ? `Modalidade ${m.name}` : "Modalidade"}>
        {m && (
          <article className="mproj" style={{ ["--c" as string]: m.supportColor }}>
            <header className="mproj-head">
              <span className="label on">Modalidade <span className="num">{String(open! + 1).padStart(2, "0")}</span> de {String(modalities.length).padStart(2, "0")}</span>
              <h2 className="mproj-name">{m.name}</h2>
              <p className="statement">{m.manifesto}</p>
              <ul className="includes">{m.culturalTerritory.map((t) => <li key={t}>{t}</li>)}</ul>
            </header>
            <Media media={m.second ?? m.hero} ratio="wide" reveal={false} />
            <div className="mproj-grid">
              <div className="stack">
                <span className="label">Por que marcas entram aqui</span>
                <p className="lead">{m.whyBrands}</p>
              </div>
              <dl className="mproj-dl">
                <div><dt className="label">Experiência</dt><dd>{m.experienceType}</dd></div>
                <div><dt className="label">Conteúdo</dt><dd>{m.contentProfile}</dd></div>
              </dl>
            </div>
            <div className="mproj-block">
              <h3 className="label on">Entregas disponíveis</h3>
              <ol className="deliv">
                {m.formats.map((f, k) => (
                  <li key={f}><span className="num">{String(k + 1).padStart(2, "0")}</span>{f}</li>
                ))}
              </ol>
              <AddToSelection id={`mod-${m.id}`} title={m.name} label={`Somar ${m.name} ao projeto`} />
            </div>
            {rel.length > 0 && (
              <div className="mproj-block">
                <h3 className="label on">Combina com</h3>
                <ul className="rel">
                  {rel.map((r) => (
                    <li key={r.id}>
                      <div>
                        <b>{r.title}</b>
                        <span>{r.summary}</span>
                        {r.requiresSportArea && <small>{SPORT_NOTE}</small>}
                      </div>
                      <StatusBadge status={r.status} />
                      <AddToSelection id={r.id} title={r.title} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="note-sport">Territórios criativos e comerciais, não dados estatísticos.</p>
            <nav className="mproj-nav" aria-label="Outras modalidades">
              <button className="link" onClick={() => setOpen((open! + modalities.length - 1) % modalities.length)}>
                ← {modalities[(open! + modalities.length - 1) % modalities.length].name}
              </button>
              <button className="link" onClick={() => setOpen((open! + 1) % modalities.length)}>
                {modalities[(open! + 1) % modalities.length].name} →
              </button>
            </nav>
          </article>
        )}
      </Sheet>
    </section>
  );
}
