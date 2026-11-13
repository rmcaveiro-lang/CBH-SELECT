"use client";
import { useCallback, useRef, useState } from "react";
import { modalities } from "@/data/modalities";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { relatedToModality } from "@/lib/inventory";
import { track } from "@/lib/analytics";
import { asset } from "@/lib/config";
import Media from "../Media";
import AddToSelection from "../AddToSelection";
import Sheet from "./Sheet";
import { StatusBadge } from "../StatusBadge";
import { SPORT_NOTE } from "../ItemCard";

/* Capítulos em tela cheia: uma modalidade por tela.
   Com o scroll, a próxima entra por uma máscara de baixo para cima e a foto assenta devagar. */
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function ModalityChapters() {
  const sec = useRef<HTMLElement>(null);
  const p = useScrollProgress(sec);
  const n = modalities.length;
  const pos = p * (n - 1); // 0 .. n-1
  const active = Math.min(n - 1, Math.round(pos));
  const [open, setOpen] = useState<number | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const m = open !== null ? modalities[open] : null;
  const rel = m ? relatedToModality(m.id) : [];

  const jump = (i: number) => {
    const el = sec.current; if (!el) return;
    const top = el.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + (i / (n - 1)) * (el.offsetHeight - innerHeight), behavior: "smooth" });
  };

  return (
    <section ref={sec} className="chapters" style={{ height: `${n * 100}vh` }} aria-labelledby="ch-t">
      <div className="chapters-pin">
        <h2 id="ch-t" className="sr-only">Modalidades</h2>
        {modalities.map((x, i) => {
          const k = i === 0 ? 1 : clamp(pos - (i - 1)); // 0 escondida, 1 inteira
          const ease = 1 - Math.pow(1 - k, 3);
          const settle = clamp(pos - i + 1); // assentamento da foto
          return (
            <div
              key={x.id}
              className="chap"
              style={{ clipPath: `inset(${(1 - ease) * 100}% 0 0 0)`, zIndex: i + 1, ["--c" as string]: x.supportColor }}
              aria-hidden={i !== active}
            >
              {x.hero.src ? (
                <img
                  className="chap-img"
                  src={asset(x.hero.src)}
                  alt={x.hero.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  style={{ objectPosition: x.hero.focus, transform: `scale(${1.14 - 0.14 * settle})` }}
                />
              ) : (
                <div className="chap-empty">
                  <span className="label">Foto a inserir · {x.hero.brief}</span>
                </div>
              )}
              <div className="chap-shade" />
            </div>
          );
        })}

        <div className="chap-copy" aria-live="polite">
          {modalities.map((x, i) => (
            <div key={x.id} className={`chap-text${i === active ? " on" : ""}`} hidden={i !== active}>
              <span className="chap-count num">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              <h3 className="chap-name">{x.name}</h3>
              <p className="chap-line">{x.manifesto}</p>
              <p className="chap-terr">{x.culturalTerritory.join(" · ")}</p>
            </div>
          ))}
          <button
            className="chap-open"
            aria-haspopup="dialog"
            onClick={(e) => { setOrigin(e.currentTarget.getBoundingClientRect()); setOpen(active); track("property_view", { id: `mod-${modalities[active].id}` }); }}
          >
            Abrir projeto <i />
          </button>
        </div>

        <nav className="chap-index" aria-label="Modalidades">
          {modalities.map((x, i) => (
            <button key={x.id} aria-current={i === active ? "true" : undefined} onClick={() => jump(i)}>
              <span>{x.name}</span><i />
            </button>
          ))}
        </nav>
        {modalities.some((x) => x.hero.credit) && modalities[active].hero.credit && (
          <span className="chap-credit">Foto: {modalities[active].hero.credit}</span>
        )}
      </div>

      <Sheet open={open !== null} origin={origin} onClose={close} label={m ? `Modalidade ${m.name}` : "Modalidade"}>
        {m && (
          <article className="mproj" style={{ ["--c" as string]: m.supportColor }}>
            <header className="mproj-head">
              <span className="label on">Modalidade <span className="num">{String(open! + 1).padStart(2, "0")}</span> de {String(n).padStart(2, "0")}</span>
              <h2 className="mproj-name">{m.name}</h2>
              <p className="statement">{m.manifesto}</p>
            </header>
            <Media media={m.second ?? m.hero} ratio="wide" reveal={false} />
            <div className="mproj-grid">
              <div className="stack">
                <span className="label">Por que marcas entram aqui</span>
                <p className="lead">{m.whyBrands}</p>
              </div>
              <dl className="mproj-dl">
                <div><dt className="label">Território</dt><dd>{m.culturalTerritory.join(" · ")}</dd></div>
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
              <button className="link" onClick={() => setOpen((open! + n - 1) % n)}>← {modalities[(open! + n - 1) % n].name}</button>
              <button className="link" onClick={() => setOpen((open! + 1) % n)}>{modalities[(open! + 1) % n].name} →</button>
            </nav>
          </article>
        )}
      </Sheet>
    </section>
  );
}
