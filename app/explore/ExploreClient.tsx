"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { inventory } from "@/lib/inventory";
import { territories } from "@/data/territories";
import { goals, statusLabel } from "@/data/options";
import { modalities } from "@/data/modalities";
import type { Status } from "@/data/types";

type F = { t: string; g: string; m: string; s: string };
const ALL = "";

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { id: string; label: string }[] }) {
  return (
    <label className="fsel">
      <span className="label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value={ALL}>Todos</option>
        {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>
    </label>
  );
}

export default function ExploreClient() {
  const sp = useSearchParams();
  const [f, setF] = useState<F>({ t: sp.get("t") || ALL, g: ALL, m: sp.get("m") || ALL, s: ALL });
  useEffect(() => setF((x) => ({ ...x, t: sp.get("t") || ALL, m: sp.get("m") || ALL })), [sp]);

  const list = useMemo(
    () =>
      inventory.filter(
        (i) =>
          (!f.t || i.territory === f.t) &&
          (!f.g || i.goals.includes(f.g as never)) &&
          (!f.m || i.modalities.includes(f.m)) &&
          (!f.s || i.status === f.s),
      ),
    [f],
  );
  const set = (k: keyof F) => (v: string) => setF({ ...f, [k]: v });
  const active = Object.values(f).some(Boolean);

  return (
    <section className="sec-tight tone-white" style={{ paddingTop: 0 }}>
      <div className="filterbar">
        <div className="wrap">
          <div className="chips" role="group" aria-label="Território">
            <button aria-pressed={!f.t} onClick={() => set("t")(ALL)}>Tudo</button>
            {territories.map((t) => (
              <button key={t.id} aria-pressed={f.t === t.id} onClick={() => set("t")(t.id)}>
                <span className="num">{t.index}</span> {t.name}
              </button>
            ))}
          </div>
          <div className="fsels">
            <Select label="Objetivo" value={f.g} onChange={set("g")} options={goals} />
            <Select label="Modalidade" value={f.m} onChange={set("m")} options={modalities.map((m) => ({ id: m.id, label: m.name }))} />
            <Select label="Disponibilidade" value={f.s} onChange={set("s")} options={(Object.keys(statusLabel) as Status[]).map((s) => ({ id: s, label: statusLabel[s] }))} />
            <p className="label num" aria-live="polite">{String(list.length).padStart(2, "0")} resultados</p>
            {active && <button className="x" onClick={() => setF({ t: ALL, g: ALL, m: ALL, s: ALL })}>Limpar filtros</button>}
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingTop: "clamp(36px,4vw,56px)" }}>
        {list.length ? (
          <div className="cards">
            {list.map((i) => <ItemCard key={i.id} item={i} showTerritory={!f.t} />)}
          </div>
        ) : (
          <p className="lead" style={{ color: "var(--muted)" }}>Nenhum item com essa combinação. Tente remover um filtro.</p>
        )}
      </div>
    </section>
  );
}
