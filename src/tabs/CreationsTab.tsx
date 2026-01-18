import { useEffect, useState } from "react";
import { RootPortal } from "../hooks/RootPortal";
import { ImagePreviewModal } from "../hooks/ImagePreviewModal";
import { CREATIONS } from "../content/creationsData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { TECH_ICON } from "../content/techIcons";
import type { TechKey } from "../content/techIcons";

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
      const willClose = next.has(id);
      if (willClose) next.delete(id);
      else next.add(id);
      return next;
    });

    setSelectedTechByCreation((prev) => ({ ...prev, [id]: null }));
  }

  const [selectedTechByCreation, setSelectedTechByCreation] = useState<
    Record<string, TechKey | null>
  >({});

  function selectTech(creationId: string, tech: TechKey) {
    setSelectedTechByCreation((prev) => ({
      ...prev,
      [creationId]: prev[creationId] === tech ? null : tech, // click again to unselect
    }));
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
          <h2 className="text-center">Creations</h2>
        </header>

        <div className="creations-container">
          {CREATIONS.map((creation) => {
            const isOpen = openCreationIds.has(creation.id);
            const contentId = `${creation.id}-content`;
            const selectedTech = selectedTechByCreation[creation.id];
            const explorerHtml =
              selectedTech && creation.techDetails?.[selectedTech]
                ? creation.techDetails[selectedTech]!
                : creation.longHtml;

            return (
              <div key={creation.id} className={`creation creation-${creation.id} ${isOpen ? "is-open" : ""}`}>

                {/* COVER */}
                <div className="cover">
                  <button
                    type="button"
                    className="creation-hit"
                    onClick={() => toggleCreation(creation.id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    aria-label={`Toggle ${creation.projectName}`}
                  />
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
                        <dt>Project name</dt>
                        <dd>{creation.projectName}</dd>
                        <dt>Brief</dt>
                        <dd>{creation.brief}</dd>
                      </dl>
                    </div>

                    <div className="technologies">
                      <p className="badge">Technologies</p>
                      <ul>
                        {creation.technologies.map((tech) => {
                          const isSelected = selectedTechByCreation[creation.id] === tech;

                          return (
                            <li key={tech} title={tech} className={isSelected ? "is-selected" : ""}>
                              <button
                                type="button"
                                className="tech-btn"
                                onClick={() => selectTech(creation.id, tech)}
                                aria-pressed={isSelected}
                                aria-label={`Show how ${tech} was used`}
                              >
                                <FontAwesomeIcon icon={TECH_ICON[tech]} aria-hidden="true" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="explore layer-frame">
                      <span className="layer layer1"></span>
                      <span className="layer layer2"></span>
                      <span className="layer layer3"></span>
                      <span className="layer layer4"></span>
                      <div className="explore-title">
                        <button
                          type="button"
                          className="explore-toggle"
                          onClick={() => setSelectedTechByCreation((prev) => ({ ...prev, [creation.id]: null }))}
                          aria-label="Close tech details"
                        >
                          <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <p>File explorer</p>
                      </div>
                      <div className="explore-location muted">location: /project/{creation.projectName.replace(/\s+/g, "-")}{selectedTech ? `/${selectedTech}` : ""}</div>

                      <div
                        className="explore-longtext muted"
                        dangerouslySetInnerHTML={{ __html: explorerHtml }}
                      />
                    </div>

                    <div className="actions">
                      <button
                        type="button"
                        className="primary"
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
                        Back to all projects
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
