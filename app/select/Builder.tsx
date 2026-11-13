"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelection } from "@/lib/selection-store";
import { useHydrated } from "@/lib/use-hydrated";
import { goals, audiences, builderTerritories, scales, platforms, labelOf } from "@/data/options";
import type { Option } from "@/data/types";
import { recommend } from "@/lib/recommend";
import { track } from "@/lib/analytics";
import ItemCard from "@/components/ItemCard";

type Key = "goals" | "audiences" | "territories" | "scale" | "platforms";
interface Step { key: Key; n: string; q: string; note?: string; options: Option[]; multi: boolean }

const STEPS: Step[] = [
  { key: "goals", n: "01", q: "O que sua marca quer alcançar?", note: "Escolha quantos quiser.", options: goals, multi: true },
  { key: "audiences", n: "02", q: "Com quem você quer se conectar?", note: "Perfis de público usados como filtro comercial.", options: audiences, multi: true },
  { key: "territories", n: "03", q: "Onde sua marca quer entrar?", options: builderTerritories, multi: true },
  { key: "scale", n: "04", q: "Em que escala?", options: scales, multi: false },
  { key: "platforms", n: "05", q: "Que tipo de presença?", options: platforms, multi: true },
];

export default function Builder() {
  const hydrated = useHydrated();
  const sp = useSearchParams();
  const router = useRouter();
  const { builder, setBuilder, add, items } = useSelection();
  const [step, setStep] = useState(0);
  const head = useRef<HTMLHeadingElement>(null);
  const done = step === STEPS.length;

  useEffect(() => { track("builder_start"); }, []);
  useEffect(() => {
    const t = sp.get("t");
    if (hydrated && t && !builder.territories.includes(t)) setBuilder({ territories: [...builder.territories, t] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);
  useEffect(() => {
    head.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
    if (done) track("builder_complete", { ...builder });
    else track("builder_step", { step: step + 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (!hydrated) return <div className="builder tone-paper" style={{ minHeight: "80vh" }} />;

  if (done) {
    const recs = recommend(builder);
    const brand = builder.brand.trim() || "Sua marca";
    const rows: [string, string[]][] = [
      ["Objetivo", builder.goals.map((g) => labelOf(goals, g))],
      ["Audiência", builder.audiences.map((a) => labelOf(audiences, a))],
      ["Territórios", builder.territories.map((t) => labelOf(builderTerritories, t))],
      ["Escala", builder.scale ? [labelOf(scales, builder.scale)] : []],
      ["Plataformas", builder.platforms.map((p) => labelOf(platforms, p))],
    ];
    return (
      <div className="page-in">
        <section className="sec tone-night">
          <div className="wrap">
            <span className="label">Seu projeto com a CBH</span>
            <h1 ref={head} tabIndex={-1} className="display result-title">
              {brand} <span aria-hidden="true">×</span><span className="sr-only">e</span> CBH
            </h1>
            <dl className="result">
              {rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="label">{k}</dt>
                  <dd>{v.length ? v.join(" · ") : <span style={{ color: "var(--muted)" }}>A definir</span>}</dd>
                </div>
              ))}
            </dl>
            <div className="hero-ctas" style={{ marginTop: 40 }}>
              <button className="btn" onClick={() => router.push("/selection")}>Solicitar proposta <i /></button>
              <button className="btn ghost" onClick={() => setStep(0)}>Revisar respostas</button>
            </div>
          </div>
        </section>
        <section className="sec tone-white">
          <div className="wrap">
            <div className="split" style={{ marginBottom: 40 }}>
              <h2 className="h2">Por onde começar.</h2>
              <div className="stack">
                <p className="lead">Propriedades e experiências que respondem às suas escolhas. Some ao projeto o que fizer sentido.</p>
                {recs.length > 0 && (
                  <div>
                    <button className="btn ghost small" onClick={() => recs.forEach((r) => add(r.id))}>
                      Somar todas ao projeto
                    </button>
                  </div>
                )}
              </div>
            </div>
            {recs.length ? (
              <div className="cards">{recs.map((r) => <ItemCard key={r.id} item={r} showTerritory />)}</div>
            ) : (
              <p className="body">Responda pelo menos um objetivo ou território para ver sugestões.</p>
            )}
            <p className="label" style={{ marginTop: 32 }}>
              <span className="num">{String(items.length).padStart(2, "0")}</span> itens no seu projeto
            </p>
          </div>
        </section>
      </div>
    );
  }

  const s = STEPS[step];
  const value = builder[s.key];
  const isOn = (id: string) => (Array.isArray(value) ? value.includes(id) : value === id);
  const toggle = (id: string) => {
    if (!s.multi) return setBuilder({ [s.key]: value === id ? "" : id } as never);
    const arr = value as string[];
    setBuilder({ [s.key]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id] } as never);
  };
  const answered = Array.isArray(value) ? value.length > 0 : Boolean(value);

  return (
    <div className="builder tone-paper">
      <div className="builder-progress" aria-hidden="true"><i style={{ width: `${(step / STEPS.length) * 100}%` }} /></div>
      <div className="wrap builder-grid">
        <div className="builder-q">
          <span className="label">Monte sua parceria · etapa <span className="num">{s.n}</span> de 05</span>
          <h1 ref={head} tabIndex={-1} className="h2 builder-h">{s.q}</h1>
          {s.note && <p className="body">{s.note}</p>}
          {step === 0 && (
            <label className="field">
              <span className="label">Nome da marca (opcional)</span>
              <input value={builder.brand} onChange={(e) => setBuilder({ brand: e.target.value })} placeholder="Marca X" />
            </label>
          )}
        </div>
        <div className={`opts${s.options.length > 9 ? " dense" : ""}`} role="group" aria-label={s.q}>
          {s.options.map((o) => (
            <button key={o.id} className="opt" aria-pressed={isOn(o.id)} onClick={() => toggle(o.id)}>
              <span className="tick" aria-hidden="true" />
              <b>{o.label}</b>
              {o.hint && <span>{o.hint}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="builder-bar">
        <div className="wrap">
          {step > 0 ? (
            <button className="btn ghost" onClick={() => setStep(step - 1)}>Voltar</button>
          ) : (
            <Link className="btn ghost" href="/explore">Explorar antes</Link>
          )}
          <button className="btn" onClick={() => setStep(step + 1)}>
            {answered ? (step === STEPS.length - 1 ? "Ver meu projeto" : "Continuar") : "Pular"} <i />
          </button>
        </div>
      </div>
    </div>
  );
}
