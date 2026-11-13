import type { Metadata } from "next";
import Media from "@/components/Media";
import ExperienceCatalog from "@/components/ExperienceCatalog";
import { hospitalityDay } from "@/data/experiences";
import { SPORT_NOTE } from "@/components/ItemCard";

export const metadata: Metadata = { title: "Experiências", description: "Proximidade, bastidores, atletas e hospitality: um dia inteiro dentro do esporte." };

const INSIDER = ["Hospitalidade", "Acesso", "Bastidores", "Conteúdo", "Atletas", "Gastronomia", "Concierge"];

export default function ExperiencesPage() {
  return (
    <div className="page-in">
      <section className="tone-green-deep exp-hero">
        <div className="wrap exp-hero-in">
          <span className="label on">03 · Experiências</span>
          <h1 className="display">Chegue mais perto.</h1>
          <div className="split" style={{ alignItems: "start" }}>
            <p className="statement" style={{ fontSize: "clamp(26px,3vw,46px)" }}>
              O objetivo não é vender ingressos. <b>É oferecer proximidade.</b>
            </p>
            <p className="lead">
              Bastidores, atletas, cavalos e o ritmo de um dia de competição, vividos por dentro. Cada experiência
              pode ser usada para receber clientes, aproximar parceiros ou criar conteúdo.
            </p>
          </div>
        </div>
        <Media
          ratio="wide"
          className="exp-hero-media"
          media={{ alt: "Convidados próximos à pista", brief: "Convidados à beira da pista durante o aquecimento, plano aberto ao fim da tarde", focus: "50% 40%" }}
        />
      </section>

      <section className="sec tone-paper">
        <div className="wrap">
          <div className="split" style={{ marginBottom: "clamp(36px,4vw,64px)" }}>
            <div className="stack">
              <span className="label">Hospitalidade</span>
              <h2 className="h2" data-rv>Um dia dentro do esporte.</h2>
            </div>
            <p className="lead" data-rv>
              Não um lounge com comida. Um dia inteiro desenhado em torno da competição, do primeiro café ao pôr do sol.
            </p>
          </div>
          <ol className="day" data-rv="stagger">
            {hospitalityDay.map((s) => (
              <li key={s.time}>
                <span className="t num">{s.time}</span>
                <b>{s.name}</b>
                <p>{s.line}</p>
              </li>
            ))}
          </ol>
          <p className="label" style={{ marginTop: 24 }}>Programação conceitual. Cada evento terá a sua.</p>
        </div>
      </section>

      <section className="sec tone-night">
        <div className="wrap split">
          <div className="stack">
            <span className="label">Conceito proprietário</span>
            <h2 className="display" style={{ fontSize: "clamp(44px,6vw,96px)" }} data-rv>CBH Insider</h2>
            <p className="statement" style={{ fontSize: "clamp(24px,2.4vw,36px)" }} data-rv>
              O que acontece além da pista.
            </p>
          </div>
          <div className="stack">
            <p className="lead" data-rv>
              Um programa para clientes, C-level, parceiros e convidados especiais, que reúne em um só pacote tudo o que
              acontece além da pista.
            </p>
            <ul className="includes" data-rv>{INSIDER.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="body" data-rv>Pode ser contratado por evento ou pela temporada.</p>
          </div>
        </div>
      </section>

      <section className="sec tone-white">
        <div className="wrap">
          <div className="split" style={{ marginBottom: "clamp(32px,4vw,56px)" }}>
            <h2 className="h2" data-rv>Catálogo de experiências.</h2>
            <p className="body" data-rv>{SPORT_NOTE.replace("Sujeita", "Experiências em área esportiva são sujeitas")}</p>
          </div>
          <ExperienceCatalog />
        </div>
      </section>
    </div>
  );
}
