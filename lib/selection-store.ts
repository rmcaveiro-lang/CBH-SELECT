"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { track } from "./analytics";

export interface BuilderState {
  brand: string;
  goals: string[];
  audiences: string[];
  territories: string[];
  scale: string;
  platforms: string[];
}

export const emptyBuilder: BuilderState = {
  brand: "",
  goals: [],
  audiences: [],
  territories: [],
  scale: "",
  platforms: [],
};

interface SelectionState {
  items: string[];
  builder: BuilderState;
  drawerOpen: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  setBuilder: (patch: Partial<BuilderState>) => void;
  replaceAll: (items: string[], builder: BuilderState) => void;
  clear: () => void;
  setDrawer: (open: boolean) => void;
}

export const useSelection = create<SelectionState>()(
  persist(
    (set, get) => ({
      items: [],
      builder: emptyBuilder,
      drawerOpen: false,
      add: (id) => {
        if (get().items.includes(id)) return;
        set({ items: [...get().items, id] });
        track("property_add_selection", { id });
      },
      remove: (id) => {
        set({ items: get().items.filter((i) => i !== id) });
        track("selection_remove", { id });
      },
      toggle: (id) => (get().items.includes(id) ? get().remove(id) : get().add(id)),
      has: (id) => get().items.includes(id),
      setBuilder: (patch) => set({ builder: { ...get().builder, ...patch } }),
      replaceAll: (items, builder) => set({ items, builder }),
      clear: () => set({ items: [], builder: emptyBuilder }),
      setDrawer: (open) => set({ drawerOpen: open }),
    }),
    {
      name: "cbh-select",
      partialize: (s) => ({ items: s.items, builder: s.builder }),
    },
  ),
);
