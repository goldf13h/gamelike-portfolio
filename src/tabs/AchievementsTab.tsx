import { useMemo, useState } from "react";
import icon01 from "../assets/achievement_icon01.png";

type AchievementStatus = "achieved" | "in_progress" | "todo";
type Rarity = "legendary" | "epic";
type AchievementIcon = {
  src: string;
  alt: string;
};

type Achievement = {
  id: string;
  title: string;
  rarity: Rarity;
  status: AchievementStatus;
  /** optional icon node (svg, img, etc). If omitted, we show a placeholder glyph */
  icon?: AchievementIcon;
  description?: string;
};

const STATUS_CLASS: Record<AchievementStatus, string> = {
  achieved: "is-achieved",
  in_progress: "is-in-progress",
  todo: "is-todo",
};

export default function AchievementsTab() {
  // Sample data (replace with your real ones)
  const achievements: Achievement[] = useMemo(
    () => [
      {
        id: "a-1000-stars",
        title: "1000 STARS ON MY PROJECT",
        rarity: "legendary",
        status: "achieved",
        icon: {
          src: icon01,
          alt: "Legendary achievement emblem",
        },
        description: "Hit a major public milestone on a shipped project.",
      },
      {
        id: "a-release-site",
        title: "RELEASE PERSONAL WEBSITE",
        rarity: "epic",
        status: "achieved",
      },
      {
        id: "a-open-source",
        title: "DEVELOPED MY OPEN SOURCE PLUGIN",
        rarity: "epic",
        status: "achieved",
      },
      {
        id: "a-master-markup",
        title: "MASTER OF MARKUP",
        rarity: "epic",
        status: "in_progress",
      },
      {
        id: "a-pixel-perfect",
        title: "PIXEL-PERFECT PERFECTIONIST",
        rarity: "epic",
        status: "in_progress",
      },
      {
        id: "a-speed-demon",
        title: "“SPEED DEMON”",
        rarity: "epic",
        status: "in_progress",
      },
      {
        id: "a-browser-compat",
        title: "“BROWSER COMPATIBILITY”",
        rarity: "epic",
        status: "todo",
      },
      {
        id: "a-accessibility",
        title: "ACCESSIBILITY ADVOCATE",
        rarity: "epic",
        status: "todo",
      },
      {
        id: "a-another-milestone",
        title: "ANOTHER AWESOME MILESTONE",
        rarity: "epic",
        status: "todo",
      },
    ],
    []
  );

  // Filters (checkboxes like the screenshot)
  const [filter, setFilter] = useState<Record<AchievementStatus, boolean>>({
    achieved: true,
    in_progress: true,
    todo: false,
  });

  const visible = useMemo(() => {
    return achievements.filter((a) => filter[a.status]);
  }, [achievements, filter]);

  return (
    <section className="achievements">
      <header>
        <h2>ACHIEVEMENTS</h2>

        <div className="filter-bar" role="group" aria-label="Achievements filter">
          <span className="label">FILTER:</span>

          <FilterToggle
            label="ACHIEVED"
            checked={filter.achieved}
            onChange={(v) => setFilter((p) => ({ ...p, achieved: v }))}
          />
          <FilterToggle
            label="IN PROGRESS"
            checked={filter.in_progress}
            onChange={(v) => setFilter((p) => ({ ...p, in_progress: v }))}
          />
          <FilterToggle
            label="TODO"
            checked={filter.todo}
            onChange={(v) => setFilter((p) => ({ ...p, todo: v }))}
          />
        </div>
      </header>

      <div className="list" aria-label="Achievement list">
        {visible.map((a) => (
          <div
            key={a.id}
            className={`card ${STATUS_CLASS[a.status]} rarity-${a.rarity}`}
            role="listitem"
          >
          <div className="icon">
            {a.icon ? ( <img src={a.icon.src} alt={a.icon.alt} draggable={false}/>): ""}
          </div>

            <div className={`rarity rarity-${a.rarity}`}>
              <span>{a.rarity.toUpperCase()}</span>
            </div>

            <div className="title">{a.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FilterToggle(props: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  const { label, checked, onChange } = props;

  return (
    <label className="filter">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}