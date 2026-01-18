import { useMemo, useState } from "react";
import iconlegendary from "../assets/achievement_icon01.png";
import iconepic01 from "../assets/achievement_icon02.png";
import iconepic02 from "../assets/achievement_icon03.png";
import iconepic03 from "../assets/achievement_icon04.png";

type AchievementStatus = "achieved" | "in_progress" | "todo";
type Rarity = "legendary" | "epic";
type AchievementIcon = {
  src: string;
  alt: string;
  cat: string;
};

type Achievement = {
  id: string;
  title: string;
  rarity: Rarity;
  status: AchievementStatus;
  icon: AchievementIcon;
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
          src: iconlegendary,
          alt: "Legendary achievement emblem",
          cat: "legendary",
        },
        description: "Hit a major public milestone on a shipped project.",
      },
      {
        id: "a-release-site",
        title: "RELEASE PERSONAL WEBSITE",
        rarity: "epic",
        status: "achieved",
        icon: {
          src: iconepic01,
          alt: "Epic achievement emblem-1",
          cat: "epic01",
        },
      },
      {
        id: "a-open-source",
        title: "DEVELOPED MY OPEN SOURCE PLUGIN",
        rarity: "epic",
        status: "achieved",
        icon: {
          src: iconepic02,
          alt: "Epic achievement emblem-2",
          cat: "epic02",
        },
      },
      {
        id: "a-master-markup",
        title: "MASTER OF MARKUP",
        rarity: "epic",
        status: "in_progress",
        icon: {
          src: iconepic02,
          alt: "Epic achievement emblem-2",
          cat: "epic02",
        },
      },
      {
        id: "a-pixel-perfect",
        title: "PIXEL-PERFECT PERFECTIONIST",
        rarity: "epic",
        status: "in_progress",
        icon: {
          src: iconepic02,
          alt: "Epic achievement emblem-2",
          cat: "epic02",
        },
      },
      {
        id: "a-speed-demon",
        title: "“SPEED DEMON”",
        rarity: "epic",
        status: "in_progress",
        icon: {
          src: iconepic02,
          alt: "Epic achievement emblem-2",
          cat: "epic02",
        },
      },
      {
        id: "a-browser-compat",
        title: "“BROWSER COMPATIBILITY”",
        rarity: "epic",
        status: "todo",
        icon: {
          src: iconepic03,
          alt: "Epic achievement emblem-3",
          cat: "epic03",
        },
      },
      {
        id: "a-accessibility",
        title: "ACCESSIBILITY ADVOCATE",
        rarity: "epic",
        status: "todo",
        icon: {
          src: iconepic03,
          alt: "Epic achievement emblem-3",
          cat: "epic03",
        },
      },
      {
        id: "a-another-milestone",
        title: "ANOTHER AWESOME MILESTONE",
        rarity: "epic",
        status: "todo",
        icon: {
          src: iconepic03,
          alt: "Epic achievement emblem-3",
          cat: "epic03",
        },
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
    <section id="achievements">
      <header>
        <h2 className="text-center">Achievements</h2>

        <div className="filter-bar" role="group" aria-label="Achievements filter">
          <span className="muted">Filter:</span>

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
            className={`card ${STATUS_CLASS[a.status]} card-${a.icon.cat}`}
            role="listitem"
          >

            <figure className="rarity">
              <img src={a.icon.src} alt={a.icon.alt} draggable={false}/>
              <figcaption>{a.rarity.toUpperCase()}</figcaption>
            </figure>

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
      <span className="checkmark"></span>
      <span className="label">{label}</span>
    </label>
  );
}