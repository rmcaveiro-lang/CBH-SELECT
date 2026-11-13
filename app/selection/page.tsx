import type { Metadata } from "next";
import { Suspense } from "react";
import SelectionView from "./SelectionView";

export const metadata: Metadata = { title: "Seu projeto", description: "O resumo da sua parceria com a CBH, pronto para compartilhar." };

export default function Page() {
  return (
    <Suspense>
      <SelectionView />
    </Suspense>
  );
}
