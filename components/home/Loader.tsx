"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/config";

/** Abertura: o símbolo da CBH e a contagem até 100. Só na primeira visita da sessão. */
export default function Loader() {
  const [n, setN] = useState(0);
  const [state, setState] = useState<"on" | "out" | "off">("on");
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("cbh-intro") === "1"; sessionStorage.setItem("cbh-intro", "1"); } catch {}
    if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches) { setState("off"); return; }
    const t0 = performance.now(), dur = 1300;
    let raf = requestAnimationFrame(function tick(t) {
      const k = Math.min(1, (t - t0) / dur);
      setN(Math.round(100 * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
      else { setState("out"); setTimeout(() => setState("off"), 900); }
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  if (state === "off") return null;
  return (
    <div className={`loader${state === "out" ? " out" : ""}`} aria-hidden="true">
      <div className="loader-mark" style={{ ["--k" as string]: n / 100 }}>
        <img src={asset("/brand/cbh-logo-dark-bg.png")} alt="" width={120} height={103} />
      </div>
      <span className="loader-n num">{n}%</span>
    </div>
  );
}
