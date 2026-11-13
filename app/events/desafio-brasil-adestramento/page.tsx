import type { Metadata } from "next";
import PropertyView from "@/components/PropertyView";
import { propertyById } from "@/data/properties";

const p = propertyById("desafio-brasil-adestramento")!;
export const metadata: Metadata = { title: p.title, description: p.summary };

export default function Page() {
  return <PropertyView p={p} />;
}
