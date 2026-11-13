import Link from "next/link";
import Media from "@/components/Media";
import AddToSelection from "@/components/AddToSelection";
import Loader from "@/components/home/Loader";
import ModalityChapters from "@/components/home/ModalityChapters";
import ManifestoScroll from "@/components/home/ManifestoScroll";
import PropertyStage from "@/components/home/PropertyStage";
import ProductIndex from "@/components/home/ProductIndex";
import { experiences } from "@/data/experiences";
import { factById } from "@/data/facts";
import { SPORT_NOTE } from "@/components/ItemCard";

export default function Home() {
  const since = factById("fundacao");
  const exp = experiences.filter((e) => e.featured).slice(0, 4);
  return (
    <div className="home">
      <Loader />

      {/* ABERTURA */}
      <section className="hero2 tone-paper">
        <span className="ghost ghost-light" aria-hidden="true">Select</span>
        <aside className="hero-note left">
          <p>A Casa CBH, o Prêmio Hipismo Brasil e sete modalidades em uma única plataforma comercial.</p>
        </aside>
        <div className="hero2-center">
          <span className="label">Confederação Brasileira de Hipismo{since ? ` · desde ${since.value}` : ""}</span>
          <h1 className="hero2-title">
            <span>O ecossistema</span>
            <span>do hipismo</span>
            <span>brasileiro.</span>
          </h1>
          <p className="hero2-sub">Não escolha uma cota. Escolha o seu lugar dentro do hipismo brasileiro.</p>
        </div>
        <aside className="hero-note right">
          <p>Monte o seu projeto carta por carta: modalidades, propriedades e experiências se somam em uma única parceria.</p>
          <span className="scrollcue" aria-hidden="true">Role para começar</span>
        </aside>
      </section>

      <div className="tear" aria-hidden="true" />
      <ModalityChapters />
      <ManifestoScroll />
      <PropertyStage />
      <ProductIndex />

      {/* EXPERIÊNCIAS */}
      <section className="sec tone-green">
        <div className="wrap">
          <div className="split" style={{ marginBottom: "clamp(32px,4vw,56px)" }}>
            <div className="stack">
              <span className="label on">Experiências</span>
              <h2 className="cond-title" data-rv>Chegue mais perto.</h2>
            </div>
            <p className="lead" data-rv>
              Bastidores, atletas e um dia inteiro dentro do esporte. Proximidade que se soma a qualquer modalidade ou
              propriedade do seu projeto.
            </p>
          </div>
          <div className="expgrid" data-rv="stagger">
            {exp.map((e) => (
              <article key={e.id} className="expcard">
                <Media media={e.hero} ratio="port" />
                <h3>{e.title}</h3>
                <p>{e.summary}</p>
                {e.requiresSportArea && <p className="note-sport">{SPORT_NOTE}</p>}
                <AddToSelection id={e.id} title={e.title} />
              </article>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link className="link" href="/experiences">Ver todas as experiências →</Link>
          </div>
        </div>
      </section>

      {/* FECHAMENTO */}
      <section className="sec tone-night closing">
        <span className="ghost" aria-hidden="true">Seu lugar</span>
        <div className="wrap stack" style={{ gap: 28, position: "relative" }}>
          <h2 className="cond-title big" data-rv>Agora escolha o seu lugar.</h2>
          <p className="lead" data-rv>Uma parceria começa com uma carta. Pode crescer para um ecossistema inteiro.</p>
          <div className="hero-ctas" data-rv>
            <Link className="btn" href="/selection">Ver meu projeto <i /></Link>
            <Link className="btn ghost" href="/explore">Explorar tudo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
