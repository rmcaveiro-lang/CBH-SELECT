import type { Media as M } from "@/data/types";
import { asset } from "@/lib/config";

type Ratio = "hero" | "wide" | "land" | "port" | "sq" | "fill";

/** Imagem real ou marcação de espaço com a descrição da foto esperada. */
export default function Media({
  media,
  ratio = "land",
  className = "",
  reveal = true,
  kind = "Foto",
  priority = false,
}: {
  media: M;
  ratio?: Ratio;
  className?: string;
  reveal?: boolean;
  kind?: string;
  priority?: boolean;
}) {
  const cls = `media r-${ratio} ${className}`.trim();
  const style = media.focus ? { objectPosition: media.focus } : undefined;
  return (
    <figure className={cls} data-rv={reveal ? "media" : undefined}>
      {media.video ? (
        <video src={asset(media.video)} poster={media.src ? asset(media.src) : undefined} autoPlay muted loop playsInline style={style} aria-label={media.alt} />
      ) : media.src ? (
        <img src={asset(media.src)} alt={media.alt} style={style} loading={priority ? "eager" : "lazy"} />
      ) : (
        <div className="slot" role="img" aria-label={`Espaço reservado: ${media.alt}`}>
          <div className="k">
            <span>{media.video ? "Vídeo" : kind}</span>
            <span>A inserir</span>
          </div>
          <p>{media.brief}</p>
        </div>
      )}
      {media.conceptual && <span className="conceptual">Composição conceitual</span>}
    </figure>
  );
}
