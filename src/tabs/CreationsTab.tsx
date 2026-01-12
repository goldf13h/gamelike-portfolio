import { useEffect, useMemo, useState } from "react";
import creation01 from "../assets/creation_img01.png";
// import shot2 from "../assets/creations/shot2.png";
// import shot3 from "../assets/creations/shot3.png";

type Creation = {
  id: string;
  publishedLabel: string; // "PUBLISHED 3 MONTHS AGO"
  name: string;           // "THE PROJECT NAME"
  type: string;           // "REACT WEBSITE"
  description: string;
  cover: {
    src: string;
    alt: string;
  };
  liveUrl?: string;       // if missing, hide VIEW LIVE button
};

function clampIndex(i: number, len: number) {
  // proper wrap-around for negatives
  return ((i % len) + len) % len;
}

export default function CreationsTab() {
  const creations: Creation[] = useMemo(
    () => [
      {
        id: "c-1",
        publishedLabel: "PUBLISHED 3 MONTHS AGO",
        name: "THE PROJECT NAME",
        type: "REACT WEBSITE",
        description:
          "Build this website. Implement a full React website with multiple routers, UI elements and tricky styling. Make it all work great!",
        cover: {
          src: creation01,
          alt: "Project 01 screenshot",
        },
        liveUrl: "https://example.com",
      },
      {
        id: "c-2",
        publishedLabel: "PUBLISHED 6 MONTHS AGO",
        name: "HOME CRUSH",
        type: "LANDING PAGE",
        description:
          "A focused landing page experiment with responsive layout, smooth transitions, and a strict design system.",
        cover: {
          src: creation01,
          alt: "Project 02 screenshot",
        },
        liveUrl: "https://example.com",
      },
      {
        id: "c-3",
        publishedLabel: "PUBLISHED 1 YEAR AGO",
        name: "PROVIDING BUSINESSES",
        type: "CLIENT WEBSITE",
        description:
          "Client-facing website build featuring content sections, performance tuning, and componentized UI blocks.",
        cover: {
          src: creation01,
          alt: "Project 03 screenshot",
        },
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  const len = creations.length;
  const current = creations[index];
  const left = creations[clampIndex(index - 1, len)];
  const right = creations[clampIndex(index + 1, len)];

  function prev() {
    setIndex((i) => clampIndex(i - 1, len));
  }
  function next() {
    setIndex((i) => clampIndex(i + 1, len));
  }

  // keyboard arrows + Esc (optional)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);

  return (
    <section className="creations">
      <header className="creations__header">
        <h2 className="creations__title">CREATIONS</h2>
      </header>

      {/* Stage (3 cards) */}
      <div className="creations__stage" aria-label="Creations carousel">
        <button
          type="button"
          className="creations__arrow creations__arrow--left"
          onClick={prev}
          aria-label="Previous project"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="creations__cards" style={{ perspective: 1200 }}>
          {/* LEFT (angled) */}
          <CreationCard
            variant="side"
            entry={left}
            onSelect={prev}
            style={{
              transform: "translateX(-120%) rotateY(55deg) scale(0.9)",
              opacity: 0.55,
            }}
          />

          {/* CENTER (active) */}
          <CreationCard
            variant="active"
            entry={current}
            style={{
              transform: "translateX(0) rotateY(0deg) scale(1)",
              opacity: 1,
            }}
          />

          {/* RIGHT (angled) */}
          <CreationCard
            variant="side"
            entry={right}
            onSelect={next}
            style={{
              transform: "translateX(120%) rotateY(-55deg) scale(0.9)",
              opacity: 0.55,
            }}
          />
        </div>

        <button
          type="button"
          className="creations__arrow creations__arrow--right"
          onClick={next}
          aria-label="Next project"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      {/* Info block (below center card) */}
      <div className="creations__info">
        <div className="creations__nameRow">
          <p className="creations__name">{current.name}</p>
          <span className="creations__dots" aria-hidden="true" />
        </div>

        <p className="creations__type">{current.type}</p>
        <p className="creations__desc muted">{current.description}</p>

        <div className="creations__progress">
          <div className="creations__progressBar" aria-hidden="true" />
          <p className="creations__progressText">
            {index + 1}/{len}
          </p>
        </div>
      </div>
    </section>
  );
}

function CreationCard(props: {
  entry: Creation;
  variant: "active" | "side";
  onSelect?: () => void;
  style?: React.CSSProperties;
}) {
  const { entry, variant, onSelect, style } = props;

  return (
    <article
      className={`creation-card ${variant === "active" ? "is-active" : "is-side"}`}
      style={{
        position: "absolute",
        inset: 0,
        margin: "0 auto",
        width: "min(520px, 82vw)",
        maxWidth: 520,
        transformStyle: "preserve-3d",
        transition: "transform 350ms ease, opacity 350ms ease",
        ...style,
      }}
      aria-label={`${entry.name}`}
    >
      {/* If you want the side cards clickable, keep this button. */}
      {onSelect ? (
        <button
          type="button"
          className="creation-card__hit"
          onClick={onSelect}
          aria-label={`Go to ${entry.name}`}
          style={{
            position: "absolute",
            inset: 0,
            background: "transparent",
            border: 0,
            cursor: "pointer",
          }}
        />
      ) : null}

      <div className="creation-card__frame">
        <p className="creation-card__published">{entry.publishedLabel}</p>

        <div className="creation-card__media">
          <img src={entry.cover.src} alt={entry.cover.alt} />
        </div>

        {/* VIEW LIVE only if applicable */}
        {entry.liveUrl ? (
          <a
            className="creation-card__viewlive"
            href={entry.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            VIEW LIVE
          </a>
        ) : null}
      </div>
    </article>
  );
}
