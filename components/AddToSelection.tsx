"use client";
import { useSelection } from "@/lib/selection-store";
import { useHydrated } from "@/lib/use-hydrated";

export default function AddToSelection({ id, title, label = "Somar ao projeto" }: { id: string; title: string; label?: string }) {
  const hydrated = useHydrated();
  const on = useSelection((s) => s.items.includes(id));
  const toggle = useSelection((s) => s.toggle);
  const pressed = hydrated && on;
  return (
    <button
      type="button"
      className="addsel"
      aria-pressed={pressed}
      aria-label={pressed ? `Retirar ${title} do projeto` : `Somar ${title} ao projeto`}
      onClick={() => toggle(id)}
    >
      <span className="pl" aria-hidden="true" />
      {pressed ? "No projeto" : label}
    </button>
  );
}
