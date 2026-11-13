"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { modalities } from "@/data/modalities";
import Media from "./Media";

export default function ModalityExplorer() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = modalities[i];
  const go = (n: number) => {
    const k = (n + modalities.length) % modalities.length;
    setI(k);
    tabs.current[k]?.focus();
  };
  return (
    <div className="modx">
      <div className="modtabs" role="tablist" aria-label="Modalidades" aria-orientation="vertical">
        {modalities.map((x, n) => (
          <button
            key={x.id}
            ref={(el) => { tabs.current[n] = el; }}
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={n === i}
            aria-controls={`panel-${x.id}`}
            tabIndex={n === i ? 0 : -1}
            onClick={() => setI(n)}
            onKeyDown={(e) => {
              if (["ArrowDown", "ArrowRight"].includes(e.key)) { e.preventDefault(); go(n + 1); }
              if (["ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); go(n - 1); }
            }}
          >
            <span className="dot" style={{ background: x.supportColor }} aria-hidden="true" />
            {x.name}
            <span className="label num">{String(n + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <div className="modpanel" role="tabpanel" id={`panel-${m.id}`} aria-labelledby={`tab-${m.id}`} key={m.id}>
        <span className="modrule" style={{ background: m.supportColor }} aria-hidden="true" />
        <Media media={m.hero} ratio="wide" reveal={false} />
        <div className="modbody">
          <div className="stack" style={{ gap: 16 }}>
            <span className="label">Território cultural</span>
            <ul className="includes">{m.culturalTerritory.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="statement" style={{ fontSize: "clamp(24px,2.4vw,36px)" }}>{m.manifesto}</p>
          </div>
          <dl className="moddl">
            <div><dt className="label">Por que marcas entram aqui</dt><dd>{m.whyBrands}</dd></div>
            <div><dt className="label">Tipo de experiência</dt><dd>{m.experienceType}</dd></div>
            <div><dt className="label">Perfil de conteúdo</dt><dd>{m.contentProfile}</dd></div>
            <div><dt className="label">Principais formatos</dt><dd>{m.formats.join(" · ")}</dd></div>
          </dl>
          <p className="note-sport">Territórios criativos e comerciais, não dados estatísticos.</p>
          <div><Link className="btn" href={`/explore?m=${m.id}`}>Explorar oportunidades <i /></Link></div>
        </div>
      </div>
    </div>
  );
}
