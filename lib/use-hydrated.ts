"use client";
import { useEffect, useState } from "react";
/** Evita divergência entre o HTML estático e o estado salvo no navegador. */
export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
