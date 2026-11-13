"use client";
import { useRef } from "react";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { asset } from "@/lib/config";

const LINES = [
  "Uma competição dura alguns minutos.",
  "O ecossistema ao redor dela funciona o ano inteiro.",
  "Existem muitas maneiras de assistir ao hipismo.",
  "E muitas outras de fazer parte dele.",
];
const PHOTOS = [
  { src: "/media/bastidor-time-brasil.jpg", alt: "Atletas do time Brasil nos bastidores", brief: "", focus: "55% 30%", r: -6, x: -30 },
  { src: "/media/bastidor-saudacao.jpg", alt: "Cavaleiro brasileiro saúda o público após a prova", brief: "", focus: "6% 40%", r: 5, x: 30 },
];

/** Manifesto que se acende palavra por palavra com o scroll; fotos entram por cima no fim. */
export default function ManifestoScroll() {
  const sec = useRef<HTMLElement>(null);
  const p = useScrollProgress(sec);
  const words = LINES.flatMap((l, li) => l.split(" ").map((w, wi) => ({ w, li, key: `${li}-${wi}` })));
  const lit = p * 1.35 * words.length;
  return (
    <section ref={sec} className="manif tone-night" aria-label="Manifesto">
      <div className="manif-pin">
        <span className="quote" aria-hidden="true">“ ”</span>
        <p className="manif-text">
          {LINES.map((l, li) => (
            <span key={li} className="manif-line">
              {words.filter((x) => x.li === li).map((x) => {
                const idx = words.indexOf(x);
                const o = Math.min(1, Math.max(0.14, lit - idx + 0.14));
                return <span key={x.key} style={{ opacity: o }}>{x.w} </span>;
              })}
            </span>
          ))}
        </p>
        <div className="manif-bg" aria-hidden="true" style={{ opacity: Math.min(0.32, Math.max(0, (p - 0.55) / 0.35) * 0.32) }}>
          <img src={asset(PHOTOS[1].src!)} alt="" style={{ objectPosition: "20% 40%" }} />
        </div>
      </div>
    </section>
  );
}
