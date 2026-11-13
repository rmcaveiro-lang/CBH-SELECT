import type { Metadata } from "next";
import PropertyView from "@/components/PropertyView";
import Media from "@/components/Media";
import { propertyById } from "@/data/properties";

const p = propertyById("premio-hipismo-brasil")!;
export const metadata: Metadata = { title: p.title, description: p.summary };

export default function Page() {
  return (
    <PropertyView p={p}>
      <section className="sec tone-night">
        <div className="wrap">
          <div className="split" style={{ marginBottom: "clamp(32px,4vw,56px)" }}>
            <h2 className="display" style={{ fontSize: "clamp(40px,6vw,96px)" }} data-rv>A noite do hipismo brasileiro.</h2>
            <p className="lead" data-rv>Da chegada ao after party, cada momento da noite pode ter uma marca.</p>
          </div>
          <ol className="night" data-rv="stagger">
            {p.moments!.map((m, i) => (
              <li key={m.name}>
                <Media media={{ alt: m.name, brief: `Situação: ${m.line}` }} ratio="port" reveal={false} />
                <span className="label num">{String(i + 1).padStart(2, "0")}</span>
                <b>{m.name}</b>
                <p>{m.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PropertyView>
  );
}
