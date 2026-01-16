import { useEffect, useMemo, useState } from "react";
import { Collapsible } from "../hooks/Collapsible";
import imageSample01 from "../assets/project_detail_sample.png"

import { RootPortal } from "../hooks/RootPortal";
import type { ImagePreviewEntry } from "../app/types";
import { ImagePreviewModal } from "../hooks/ImagePreviewModal";

type LogCard = {
  title: string;
  body: string;
  collapsible?: boolean;
}

type LogEntry = {
  id: string;
  title: string;
  date: string;
  location: string;
  status: string;
  cards: LogCard[];
  images?: ImagePreviewEntry["images"];
  url?: string;
}

function clampText(text: string, maxChars: number): { text: string; clamped: boolean } {
  if ( text.length <= maxChars ) return { text, clamped: false };
  return { text: text.slice(0, maxChars).trimEnd() + "...", clamped: true };
}

export default function LogsTab(props: { onModalChange?: (open: boolean) => void }) {
  const { onModalChange } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(id);
  }, []);

  const logs: LogEntry[] = useMemo(
    () => [
      {
        id: "log-current",
        title: "LOG ENTRY: PROJECT DEVELOPMENT UPDATE",
        date: "2007.04.25",
        location: "Research Facility, Planet X-17",
        status: "In Development",
        cards: [
          {
            title: "Project update",
            body:
              "The development team has been working tirelessly on the latest iteration of the project. Significant progress has been made in the areas of neural interface integration, machine learning algorithms, and quantum computing.",
            collapsible: true,
          },
          {
            title: "Challenges",
            body:
              "The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions, and unanticipated compatibility issues. The primary blocker appears to be a concurrency fault triggered under heavy load, which cascades into memory corruption across two dependent subsystems. Additionally, a vendor firmware update introduced timing drift that must be compensated for in software.",
            collapsible: true,
          },
          {
            title: "NEXT STEPS",
            body:
              "Stabilize the interface layer, isolate fault domains, add crash telemetry, and run compatibility tests across the full hardware matrix. Begin staging the next milestone build for internal review and prepare a public-facing summary suitable for non-technical stakeholders.",
            collapsible: true,
          },
          {
            title: "Outlook",
            body:
              "Despite the challenges encountered, the team remains optimistic about the potential of the project. The development of advanced neural interfaces and machine learning algorithms suggests multiple promising applications, but the current priority is reliability and repeatable performance under real-world conditions.",
            collapsible: true,
          },
        ],
        // images optional; if removed or empty => button not shown
        images: [
          { src: imageSample01, alt: "Lab photo" },
          { src: imageSample01, alt: "Lab photo 2" },
        ],
        url: "www.google.com",
      },
      {
        id: "log-1",
        title: "LOG ENTRY: PROJECT DEVELOPMENT UPDATE",
        date: "2007.03.14",
        location: "Research Facility, Planet X-17",
        status: "In Development",
        cards: [
          {
            title: "Project update",
            body:
              "Prototypes are operational in controlled environments. Integration tests indicate improved signal fidelity, but long-run stability remains unverified.",
            collapsible: true,
          },
          {
            title: "Challenges",
            body:
              "Intermittent disconnects still occur at peak throughput. A suspected cause is a race condition in the transport abstraction. Reproducing the failure consistently is difficult, slowing root cause analysis.",
            collapsible: true,
          },
          {
            title: "NEXT STEPS",
            body:
              "Add structured logging around transport state transitions, increase test coverage for edge cases, and validate failover behavior under simulated packet loss.",
            collapsible: true,
          },
          {
            title: "Notes",
            body:
              "A small cross-functional group will document assumptions and define “done” criteria for stability, performance, and usability.",
            collapsible: true,
          },
        ],
        images: [
          // Example: if you add images here, preview button appears
        ],
      },
      {
        id: "log-2",
        title: "LOG ENTRY: NEW PROJECT STARTED",
        date: "2007.01.02",
        location: "Research Facility, Planet X-17",
        status: "In Development",
        cards: [
          {
            title: "Project update",
            body:
              "Project initialization complete. Requirements gathered and initial architecture drafted. Team roles assigned and milestones defined.",
            collapsible: true,
          },
          {
            title: "Challenges",
            body:
              "Unclear constraints around the target runtime environment and limited access to test hardware. Coordination across teams is still ramping up.",
            collapsible: true,
          },
          {
            title: "NEXT STEPS",
            body:
              "Finalize scope, lock the first milestone, set up CI, and establish a single source of truth for design decisions.",
            collapsible: true,
          },
          {
            title: "Notes",
            body:
              "Maintain a change log from day one. Keep the public narrative separate from internal technical detail.",
            collapsible: true,
          },
        ],
      },
    ],
    []
  );

  const [openOlderLogIds, setOpenOlderLogIds] = useState<Set<string>>(() => new Set());

  function toggleOlderLog(id: string) {
    setOpenOlderLogIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    })
  }

  const [expandedCards, setExpandedCards] = useState<Set<string>>(() => new Set());

  function toggleCard(logId: string, cardIndex: number) {
    const key = `${logId}:${cardIndex}`;
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const [preview, setPreview] = useState<{ logId: string } | null>(null);

  function openPreview(logId: string) {
    setPreview({ logId });
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

  const currentLog = logs[0];
  const olderLogs = logs.slice(1);

  return (
    <section id="logs">
      {loading ? (
        <div className="log-loader notice" aria-live="polite" aria-busy="true">
          <p>Initializing log interface</p>
          <div className="loadingbar" role="progressbar" aria-label="Loading logs">
            <span className="fill" />
          </div>
          <p className="muted">Establishing data link…</p>
        </div>
      ) : (
        <>
        <p className="notice">Data log dump initialized.</p>

        <div className="logs-container">
          <div className="current-log log is-active">
            <LogHeader entry={currentLog} />
            <dl className="details">
              {currentLog.cards.map((card, idx) => (
                <LogCardView
                  key={idx}
                  logId={currentLog.id}
                  idx={idx}
                  card={card}
                  expanded={expandedCards.has(`${currentLog.id}:${idx}`)}
                  onToggle={() => toggleCard(currentLog.id, idx)}
                />
              ))}
            </dl>
            {currentLog.images && currentLog.images.length > 0 ? (
              <button className="btn-preview" type="button" onClick={() => openPreview(currentLog.id)}>
                Preview visual records <span className="icon icon-img"></span>
              </button>
            ) : null}
          </div>

          <div className="older-logs">
            <p>Older Logs:</p>
            <div className="logs-container">
              {olderLogs.map((entry) => {
                const isOpen = openOlderLogIds.has(entry.id);
                const contentId = `${entry.id}-content`;
                return (
                  <div key={entry.id} className={`log ${isOpen ? "is-open" : ""}`}>
                    <header>
                      <button
                        type="button"
                        className="log-header"
                        onClick={() => toggleOlderLog(entry.id)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                      >
                        <span className="header-text">{entry.title}</span>
                        <span className="date">DATE: {entry.date}</span>
                      </button>
                    </header>

                    <Collapsible open={isOpen} id={contentId}>
                      <p>
                        LOCATION: <span className="muted">{entry.location}</span>
                      </p>
                      <p>
                        PROJECT STATUS: <span className="muted">{entry.status}</span>
                      </p>

                      <dl className="details">
                        {entry.cards.map((card, idx) => (
                          <LogCardView
                            key={idx}
                            logId={entry.id}
                            idx={idx}
                            card={card}
                            expanded={expandedCards.has(`${entry.id}:${idx}`)}
                            onToggle={() => toggleCard(entry.id, idx)}
                          />
                        ))}
                      </dl>

                      {entry.images && entry.images.length > 0 ? (
                        <button type="button" onClick={() => openPreview(entry.id)}>
                          Preview visual records <span className="icon icon-img"></span>
                        </button>
                      ) : null}
                    </Collapsible>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal overlay for image preview */}
        {preview ? (
          <RootPortal>
            <ImagePreviewModal
              entry={logs.find((l) => l.id === preview.logId)!}
              onClose={closePreview}
            />
          </RootPortal>
        ) : null}
        </>
      )}
    </section>
  )
}


function LogHeader({ entry }: { entry: { title: string; date: string; location: string; status: string }}) {
  return (
    <header>
      <h2 className="log-header">
        <span className="header-text">{entry.title}</span>
        <span className="date">DATE: {entry.date}</span>
      </h2>
      <p>
        LOCATION:
        <span className="muted">{entry.location}</span>
      </p>
      <p>
        PROJECT STATUS:
        <span className="muted">{entry.status}</span>
      </p>
    </header>
  );
}

function LogCardView(props: {
  logId: string;
  idx: number;
  card: { title: string; body: string; collapsible?: boolean };
  expanded: boolean;
  onToggle: () => void;
}) {
  const { card, expanded, onToggle } = props;
  const shouldClamp = Boolean(card.collapsible);
  const clamp = clampText(card.body, 140);
  const showToggle = shouldClamp && (clamp.clamped || expanded);
  const bodyText = !shouldClamp ? card.body : expanded ? card.body : clamp.text;
  return (
    <div className="card">
      <dt>{card.title}</dt>
      <dd className="muted">{bodyText}</dd>

      {showToggle ? (
        <button className="btn-expand" type="button" onClick={onToggle} aria-expanded={expanded}>
          {expanded ? "− Collapse" : "+ Expand"}
        </button>
      ) : null}
    </div>
  )
}