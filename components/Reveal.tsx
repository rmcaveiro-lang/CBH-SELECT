"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Revelações no scroll. Sem JS, tudo nasce visível.
 *  Um MutationObserver pega também o conteúdo que entra depois (filtros, Suspense). */
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-rv]").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    const seen = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll<HTMLElement>("[data-rv]:not(.in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.dataset.rv === "stagger")
          Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(Math.min(i, 12))));
        io.observe(el);
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    if (path.startsWith("/explore")) track("ecosystem_open");
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [path]);
  return null;
}
