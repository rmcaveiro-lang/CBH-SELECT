"use client";
import { useEffect, useRef, useState } from "react";

/** Tela que abre a partir do card clicado: recorte que cresce do retângulo de origem até a tela cheia. */
export default function Sheet({
  open, origin, onClose, label, children, tone = "tone-green-deep",
}: {
  open: boolean; origin: DOMRect | null; onClose: () => void; label: string; children: React.ReactNode; tone?: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"closed" | "from" | "open" | "closing">("closed");
  const clip = (r: DOMRect | null) =>
    r ? `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)` : "inset(50% 50% 50% 50%)";

  useEffect(() => {
    if (open) {
      setPhase("from");
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
      document.documentElement.style.overflow = "hidden";
      return () => cancelAnimationFrame(id);
    }
    if (phase === "open" || phase === "from") {
      setPhase("closing");
      const t = setTimeout(() => { setPhase("closed"); document.documentElement.style.overflow = ""; }, 650);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (phase !== "open") return;
    el.current?.focus();
    el.current?.scrollTo(0, 0);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [phase, onClose]);

  if (phase === "closed") return null;
  const style = { clipPath: phase === "open" ? "inset(0px 0px 0px 0px)" : clip(origin) };
  return (
    <div
      ref={el}
      className={`sheet ${tone} sheet-${phase}`}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
    >
      <button className="sheet-close" onClick={onClose} aria-label="Fechar">
        <span aria-hidden="true" />Fechar
      </button>
      <div className="sheet-body">{children}</div>
    </div>
  );
}
