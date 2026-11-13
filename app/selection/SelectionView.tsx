"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSelection } from "@/lib/selection-store";
import { useHydrated } from "@/lib/use-hydrated";
import { itemsByIds } from "@/lib/inventory";
import { decodeSelection, shareUrl } from "@/lib/selection-url";
import { submitLead } from "@/lib/submit-lead";
import { track } from "@/lib/analytics";
import { goals, audiences, builderTerritories, scales, platforms, labelOf } from "@/data/options";
import { territoryById } from "@/data/territories";
import Media from "@/components/Media";
import { StatusBadge } from "@/components/StatusBadge";

export default function SelectionView() {
  const hydrated = useHydrated();
  const sp = useSearchParams();
  const store = useSelection();
  const shared = useMemo(() => decodeSelection(sp.toString()), [sp]);
  const viewingShared = Boolean(shared && (shared.items.length || shared.builder.goals.length));
  const items = viewingShared ? shared!.items : store.items;
  const b = viewingShared ? shared!.builder : store.builder;
  const list = hydrated ? itemsByIds(items) : [];
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", company: b.brand || "", role: "", email: "", phone: "", message: "" });

  if (!hydrated) return <div className="tone-paper" style={{ minHeight: "80vh" }} />;

  const link = shareUrl(items, b);
  const rows: [string, string][] = [
    ["Objetivo", b.goals.map((g) => labelOf(goals, g)).join(" · ")],
    ["Audiência", b.audiences.map((a) => labelOf(audiences, a)).join(" · ")],
    ["Territórios", b.territories.map((t) => labelOf(builderTerritories, t)).join(" · ")],
    ["Escala", b.scale ? labelOf(scales, b.scale) : ""],
    ["Plataformas", b.platforms.map((p) => labelOf(platforms, p)).join(" · ")],
  ];
  const filled = rows.filter(([, v]) => v);
  const brand = (form.company || b.brand || "Sua marca").trim();

  const copy = async () => {
    try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* sem permissão */ }
    track("share_selection", { items: items.length });
  };
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      ...form,
      ids: items,
      link,
      summary: [
        ...filled.map(([k, v]) => `${k}: ${v}`),
        ...(list.length ? ["Propriedades: " + list.map((i) => i.title).join(", ")] : []),
      ],
    });
  };
  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="page-in">
      <section className="sec tone-night">
        <div className="wrap">
          <span className="label">Seu projeto{viewingShared ? " · compartilhado" : ""}</span>
          <h1 className="display result-title">{brand} <span aria-hidden="true">×</span><span className="sr-only">e</span> CBH</h1>
          {filled.length > 0 ? (
            <dl className="result">{filled.map(([k, v]) => <div key={k}><dt className="label">{k}</dt><dd>{v}</dd></div>)}</dl>
          ) : (
            <p className="lead" style={{ color: "var(--muted)" }}>
              Ainda sem objetivos definidos. <Link href="/select" style={{ color: "var(--fg)" }}>Responda as cinco perguntas</Link> para completar a seleção.
            </p>
          )}
          {viewingShared && (
            <div className="hero-ctas" style={{ marginTop: 32 }}>
              <button className="btn small" onClick={() => store.replaceAll(shared!.items, shared!.builder)}>Usar este projeto</button>
            </div>
          )}
        </div>
      </section>

      <section className="sec-tight tone-paper">
        <div className="wrap split top">
          <div className="stack">
            <div className="meta-row">
              <h2 className="h2" style={{ fontSize: "clamp(26px,3vw,42px)" }}>No projeto.</h2>
              <span className="label num">{String(list.length).padStart(2, "0")}</span>
            </div>
            {list.length ? (
              <ul className="sel-list">
                {list.map((i) => (
                  <li key={i.id}>
                    <Media media={i.hero} ratio="sq" reveal={false} />
                    <div>
                      <span className="label">{territoryById(i.territory)?.name}</span>
                      <b>{i.href ? <Link href={i.href}>{i.title}</Link> : i.title}</b>
                    </div>
                    <StatusBadge status={i.status} />
                    {!viewingShared && <button className="x" onClick={() => store.remove(i.id)} aria-label={`Remover ${i.title}`}>Remover</button>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="body">Nada no projeto ainda. <Link href="/">Abra uma carta</Link> e use “Somar ao projeto”.</p>
            )}
            <div className="share">
              <span className="label">Link do projeto</span>
              <div className="share-row">
                <input readOnly value={link} aria-label="Link compartilhável do projeto" onFocus={(e) => e.target.select()} />
                <button className="btn small" onClick={copy}>{copied ? "Copiado" : "Copiar link"}</button>
              </div>
              <p className="label" aria-live="polite" style={{ minHeight: 16 }}>{copied ? "Link copiado para a área de transferência" : ""}</p>
            </div>
          </div>

          <form className="lead-form tone-white" onSubmit={send}>
            <h2 className="h3">Solicitar proposta</h2>
            <p className="body" style={{ fontSize: 15 }}>
              Ao enviar, abrimos o WhatsApp comercial da CBH com o seu projeto e o link já na mensagem.
            </p>
            <label className="field"><span className="label">Nome *</span><input required value={form.name} onChange={upd("name")} autoComplete="name" /></label>
            <label className="field"><span className="label">Empresa *</span><input required value={form.company} onChange={upd("company")} autoComplete="organization" /></label>
            <label className="field"><span className="label">Cargo</span><input value={form.role} onChange={upd("role")} autoComplete="organization-title" /></label>
            <div className="two">
              <label className="field"><span className="label">E-mail</span><input type="email" value={form.email} onChange={upd("email")} autoComplete="email" /></label>
              <label className="field"><span className="label">Telefone</span><input type="tel" value={form.phone} onChange={upd("phone")} autoComplete="tel" /></label>
            </div>
            <label className="field"><span className="label">Mensagem</span><textarea value={form.message} onChange={upd("message")} /></label>
            <button className="btn" type="submit">Enviar pelo WhatsApp <i /></button>
          </form>
        </div>
      </section>
    </div>
  );
}
