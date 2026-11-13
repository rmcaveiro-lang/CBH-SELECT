import type { Metadata } from "next";
import { Suspense } from "react";
import Builder from "./Builder";

export const metadata: Metadata = { title: "Monte sua parceria", description: "Cinco perguntas para montar a sua plataforma dentro do hipismo brasileiro." };

export default function SelectPage() {
  return (
    <Suspense>
      <Builder />
    </Suspense>
  );
}
