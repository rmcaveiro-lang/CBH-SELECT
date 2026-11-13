"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSelection } from "@/lib/selection-store";
import { useHydrated } from "@/lib/use-hydrated";
import { itemsByIds } from "@/lib/inventory";
import { territoryById } from "@/data/territories";
import Media from "./Media";

export default function SelectionDrawer() {
  const hydrated = useHydrated();
  const { items, drawerOpen, setDrawer, remove } = useSelection();
  const panel = useRef<HTMLDivElement>(null);
  const list = hydrated ? itemsByIds(items) : [];

  useEffect(() => {
    if (!drawerOpen) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [drawerOpen, setDrawer]);

  return (
    <>
      <div className={`scrim${drawerOpen ? " on" : ""}`} onClick={() => setDrawer(false)} aria-hidden="true" />
      <div
        ref={panel}
        className={`drawer tone-paper${drawerOpen ? " on" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Seu projeto"
        tabIndex={-1}
        hidden={!hydrated}
        inert={!drawerOpen}
      >
        <header>
          <span className="label on">
            Seu projeto · <span className="num">{String(list.length).padStart(2, "0")}</span>
          </span>
          <button className="x" onClick={() => setDrawer(false)}>Fechar</button>
        </header>
        {list.length === 0 ? (
          <p className="empty">
            Seu projeto ainda está vazio. Abra uma modalidade, uma propriedade ou uma experiência e use “Somar ao projeto”.
          </p>
        ) : (
          <ul>
            {list.map((i) => (
              <li key={i.id}>
                <Media media={i.hero} ratio="sq" reveal={false} />
                <div>
                  <span className="label">{territoryById(i.territory)?.name}</span>
                  <b>{i.title}</b>
                </div>
                <button className="x" onClick={() => remove(i.id)} aria-label={`Remover ${i.title}`}>Remover</button>
              </li>
            ))}
          </ul>
        )}
        <footer>
          <Link className="btn" href="/selection" onClick={() => setDrawer(false)}>
            Ver projeto completo <i />
          </Link>
          <Link className="btn ghost" href="/explore" onClick={() => setDrawer(false)}>
            Explorar tudo
          </Link>
        </footer>
      </div>
    </>
  );
}
