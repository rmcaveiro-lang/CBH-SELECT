"use client";
import { useMemo, useState } from "react";
import { experiences } from "@/data/experiences";
import ItemCard from "./ItemCard";

export default function ExperienceCatalog() {
  const cats = useMemo(() => Array.from(new Set(experiences.map((e) => e.category))), []);
  const [c, setC] = useState("");
  const list = c ? experiences.filter((e) => e.category === c) : experiences;
  return (
    <>
      <div className="chips" role="group" aria-label="Categoria" style={{ marginBottom: 32 }}>
        <button aria-pressed={!c} onClick={() => setC("")}>Todas</button>
        {cats.map((x) => <button key={x} aria-pressed={c === x} onClick={() => setC(x)}>{x}</button>)}
      </div>
      <div className="cards">{list.map((e) => <ItemCard key={e.id} item={e} />)}</div>
    </>
  );
}
