"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { asset } from "@/lib/config";

export const NAV = [
  { href: "/", label: "Início" },
  { href: "/sport", label: "Modalidades" },
  { href: "/events", label: "Propriedades" },
  { href: "/experiences", label: "Experiências" },
  { href: "/explore", label: "Explorar tudo" },
  { href: "/selection", label: "Seu projeto" },
];

export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);
  const here = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  return (
    <>
      <header className="site-header">
        <Link href="/" className="brandmark" aria-label="CBH SELECT, início">
          <img src={asset("/brand/cbh-logo-dark-bg.png")} alt="Confederação Brasileira de Hipismo" width={51} height={44} />
        </Link>
        <Link href="/" className="wordmark">CBH Select</Link>
        <button className={`burger${open ? " x" : ""}`} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <i /><i />
        </button>
      </header>
      <nav id="menu" className={`menu tone-night${open ? " on" : ""}`} aria-label="Principal" inert={!open}>
        <ul>
          {NAV.map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <Link href={l.href} aria-current={here(l.href) ? "page" : undefined}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <p className="label">Confederação Brasileira de Hipismo</p>
      </nav>
    </>
  );
}
