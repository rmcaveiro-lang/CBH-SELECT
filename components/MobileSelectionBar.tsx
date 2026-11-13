"use client";
import { usePathname } from "next/navigation";
import { useSelection } from "@/lib/selection-store";
import { useHydrated } from "@/lib/use-hydrated";

/** Botão redondo fixo: quantos itens já estão no projeto. Abre o resumo lateral. */
export default function MobileSelectionBar() {
  const hydrated = useHydrated();
  const path = usePathname();
  const n = useSelection((s) => s.items.length);
  const setDrawer = useSelection((s) => s.setDrawer);
  const count = hydrated ? n : 0;
  if (path.startsWith("/selection")) return null;
  return (
    <button className={`fab${count ? " has" : ""}`} onClick={() => setDrawer(true)} aria-label={`Seu projeto, ${count} itens`}>
      <span className="fab-n num" key={count}>{String(count).padStart(2, "0")}</span>
      <span className="fab-t">Seu projeto</span>
    </button>
  );
}
