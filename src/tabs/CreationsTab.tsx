import { useEffect, useState } from "react";
import { RootPortal } from "../hooks/RootPortal";
import { ImagePreviewModal } from "../hooks/ImagePreviewModal";
import { CREATIONS } from "../data/creationsData";

export default function CREATIONSTab(props: {
  onModalChange?: (open: boolean) => void;
}) {
  const { onModalChange } = props;

  const [openCreationIds, setOpenCreationIds] = useState<Set<string>>(
    () => new Set()
  );

  function toggleCreation(id: string) {
    setOpenCreationIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const [preview, setPreview] = useState<{ creationId: string } | null>(null);

  function openPreview(creationId: string) {
    setPreview({ creationId });
    onModalChange?.(true);
  }

  function closePreview() {
    setPreview(null);
    onModalChange?.(false);
  }

  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preview]);

  const previewEntry = preview
    ? CREATIONS.find((c) => c.id === preview.creationId)?.demo
    : null;

  return (
    <>
      <section id="creations">
        <header>
          <h2>Creations</h2>
        </header>

        <div className="creations-container">
          {CREATIONS.map((creation) => {
            const isOpen = openCreationIds.has(creation.id);
            const contentId = `${creation.id}-content`;

            return (
              <div key={creation.id} className={`creation creation-${creation.id} ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="creation-hit"
                  onClick={() => toggleCreation(creation.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  aria-label={`Toggle ${creation.projectName}`}
                />

                {/* COVER */}
                <div className="cover">
                  <figure className="cover-figure layer-frame">
                    <span className="layer layer1"></span>
                    <span className="layer layer2"></span>
                    <span className="layer layer3"></span>
                    <span className="layer layer4"></span>
                    <div className="cover-bg">
                      <img src={creation.cover.src} alt={creation.cover.alt} />
                    </div>
                    <img className="cover-img" src={creation.cover.src} alt={creation.cover.alt} />

                    <span className="published">{creation.publishedLabel}</span>

                    {creation.liveUrl ? (
                      <a
                        href={creation.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-live"
                      >
                        View Live
                      </a>
                    ) : null}
                  </figure>

                  <figcaption>
                    <h3>{creation.projectName}</h3>
                    <span>{creation.type}</span>
                    <p className="muted">{creation.description}</p>
                  </figcaption>
                </div>

                {/* CONTENT */}
                {isOpen ? (
                  <div className="content" id={contentId}>
                    <div className="details">
                      <p className="badge">Details</p>
                      <dl className="kv">
                        <dd>Project name</dd>
                        <dt>{creation.projectName}</dt>
                        <dd>Brief</dd>
                        <dt>{creation.brief}</dt>
                      </dl>
                    </div>

                    <div className="technologies">
                      <p className="badge">Technologies</p>
                      <ul>
                        {creation.technologies.map((t) => (
                          <li key={t.key}>
                            <img src={t.src} alt={t.alt} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="explore">
                      <div>
                        <p>File exploror</p>
                      </div>
                      <div>location: project/{creation.projectName}</div>

                      <div
                        className="longtext"
                        dangerouslySetInnerHTML={{ __html: creation.longHtml }}
                      />
                    </div>

                    <div className="actions">
                      <button
                        type="button"
                        onClick={() => openPreview(creation.id)}
                        disabled={!creation.demo || (creation.demo.images?.length ?? 0) === 0}
                        title={
                          !creation.demo || (creation.demo.images?.length ?? 0) === 0
                            ? "No demo images available"
                            : "Open demo"
                        }
                      >
                        View project demo
                      </button>

                      <button 
                        type="button" 
                        title="Close (Esc)"
                        onClick={() => toggleCreation(creation.id)}
                      >
                        Discard [esc]
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL */}
      {preview && previewEntry ? (
        <RootPortal>
          <ImagePreviewModal entry={previewEntry} onClose={closePreview} />
        </RootPortal>
      ) : null}
    </>
  );
}
