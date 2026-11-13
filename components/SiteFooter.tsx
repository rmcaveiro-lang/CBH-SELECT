import Link from "next/link";
import { territories } from "@/data/territories";

export default function SiteFooter() {
  return (
    <footer className="site-footer tone-night">
      <div className="wrap">
        <div className="top">
          <div className="stack" style={{ gap: 14 }}>
            <span className="label on">CBH Select</span>
            <p className="body" style={{ maxWidth: "34ch" }}>
              O ecossistema comercial da Confederação Brasileira de Hipismo.
            </p>
          </div>
          <nav aria-label="Territórios">
            <span className="label">Territórios</span>
            {territories.map((t) => (
              <Link key={t.id} href={t.href}>{t.name}</Link>
            ))}
          </nav>
          <nav aria-label="Propriedades">
            <span className="label">Propriedades</span>
            <Link href="/casa-cbh">Casa CBH</Link>
            <Link href="/premio-hipismo-brasil">Prêmio Hipismo Brasil</Link>
            <Link href="/events/circuito-senior-top">Circuito Senior Top</Link>
          </nav>
          <nav aria-label="Parceria">
            <span className="label">Projeto</span>
            <Link href="/selection">Seu projeto</Link>
            <Link href="/explore">Explorar tudo</Link>
          </nav>
        </div>
        <div className="bottom">
          <span>Confederação Brasileira de Hipismo</span>
          <span>Experiências esportivas sujeitas a regras técnicas, segurança e bem-estar animal.</span>
        </div>
      </div>
    </footer>
  );
}
