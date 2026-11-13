"use client";
import { useCallback, useState } from "react";
import { products } from "@/data/products";
import { territoryById } from "@/data/territories";
import { track } from "@/lib/analytics";
import { asset } from "@/lib/config";
import Sheet from "./Sheet";
import PropertyDetail from "./PropertyDetail";

/** Índice tipográfico dos produtos de marca. A foto acende em tela cheia atrás do nome ativo. */
export default function ProductIndex() {
  const [hover, setHover] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const n = products.length;
  const pr = open !== null ? products[open] : null;
  return (
    <section className="pindex tone-night" aria-labelledby="pi-t">
      <div className="pindex-bg" aria-hidden="true">
        {products.map((x, i) => (
          <div key={x.id} className={`pindex-img${i === hover ? " on" : ""}`}>
            {x.hero.src ? <img src={asset(x.hero.src)} alt="" style={{ objectPosition: x.hero.focus }} /> : null}
          </div>
        ))}
        <div className="pindex-shade" />
      </div>
      <div className="wrap pindex-in">
        <header className="pindex-head">
          <span className="label on">Produtos de marca</span>
          <h2 id="pi-t" className="cond-title">Outras formas de entrar.</h2>
          <p className="lead">Uniforme, transmissões, redes e ativações. Plataformas que somam a qualquer modalidade ou propriedade do projeto.</p>
        </header>
        <ol className="pindex-list">
          {products.map((x, i) => (
            <li key={x.id}>
              <button
                aria-haspopup="dialog"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={(e) => { setOrigin(e.currentTarget.getBoundingClientRect()); setOpen(i); track("property_view", { id: x.id }); }}
                className={i === hover ? "on" : ""}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <b>{x.title}</b>
                <em>{territoryById(x.territory)?.name} · {x.category}</em>
                <i aria-hidden="true">Ver entregas</i>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <Sheet open={open !== null} origin={origin} onClose={close} label={pr ? pr.title : "Produto"} tone="tone-paper">
        {pr && (
          <PropertyDetail
            pr={pr}
            prev={products[(open! + n - 1) % n].title}
            next={products[(open! + 1) % n].title}
            onPrev={() => setOpen((open! + n - 1) % n)}
            onNext={() => setOpen((open! + 1) % n)}
          />
        )}
      </Sheet>
    </section>
  );
}
