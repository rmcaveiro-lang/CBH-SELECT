import type { Metadata } from "next";
import Link from "next/link";
import ModalityExplorer from "@/components/ModalityExplorer";
import Media from "@/components/Media";
import AddToSelection from "@/components/AddToSelection";
import { StatusBadge } from "@/components/StatusBadge";
import { propertyById } from "@/data/properties";
import { territoryById } from "@/data/territories";

export const metadata: Metadata = { title: "Modalidades", description: "Sete modalidades, circuitos e uma temporada inteira como território de marca." };

export default function SportPage() {
  const t = territoryById("sport")!;
  const st = propertyById("circuito-senior-top")!;
  return (
    <div className="page-in">
      <section className="sec tone-green">
        <div className="wrap pagehead">
          <span className="label on">01 · Esporte</span>
          <h1 className="display">{t.title}</h1>
          <div className="pagehead-copy">
            <p className="lead">{t.line}</p>
            <p className="body">
              Cada modalidade tem seu público, seu ritmo e sua estética. Escolha a que fala a língua da sua marca, ou
              entre em várias ao mesmo tempo.
            </p>
          </div>
        </div>
      </section>

      <section className="sec-tight tone-paper">
        <div className="wrap">
          <div className="split" style={{ marginBottom: "clamp(32px,4vw,56px)" }}>
            <h2 className="h2" data-rv>As modalidades.</h2>
            <p className="lead" data-rv>Não apenas como técnica: como território cultural, de marca e de conteúdo.</p>
          </div>
          <ModalityExplorer />
        </div>
      </section>

      <section className="sec tone-night">
        <div className="wrap split rev">
          <Media media={st.hero} ratio="land" className="poly" />
          <div className="stack">
            <div className="meta-row"><span className="label">{st.kicker}</span><StatusBadge status={st.status} /></div>
            <h2 className="h2" data-rv>{st.title}</h2>
            <p className="statement" style={{ fontSize: "clamp(24px,2.4vw,36px)" }} data-rv>{st.signature}</p>
            <p className="body" data-rv>{st.summary}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <AddToSelection id={st.id} title={st.title} />
              <Link className="link" href={st.href!}>Ver propriedade →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-tight tone-stone">
        <div className="wrap split">
          <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,48px)" }}>Circuitos das demais modalidades.</h2>
          <p className="lead">
            Adestramento, Hipismo Completo, Enduro e as demais modalidades terão seus circuitos apresentados aqui como
            propriedades próprias. Enquanto isso, eles podem ser incluídos em qualquer proposta.
          </p>
        </div>
      </section>
    </div>
  );
}
