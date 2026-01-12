import type { SidePage, Tab } from "../app/types";
import { TAB_META, TABS } from "../app/tabsMeta";

import TopBar from "../components/TopBar/TopBar";
import ProfilePanel from "../components/panels/ProfilePanel";
import QuestPanel from "../components/panels/QuestPanel";

import BeginningTab from "../tabs/BeginningTab";
import LogsTab from "../tabs/LogsTab";
import AchievementsTab from "../tabs/AchievementsTab";
import CreationsTab from "../tabs/CreationsTab";
import GamesTab from "../tabs/GamesTab";

export default function HomeScene(props: {
  tab: Tab;
  onTabChange: (t: Tab) => void;
  onOpenSide: (page: SidePage) => void;
  backgroundMode?: "none" | "side" | "modal";
  onModalChange?: (open: boolean) => void;
}) {
  const { tab, onTabChange, onOpenSide, backgroundMode = "none", onModalChange, } = props;

  const bgClass =
    backgroundMode === "side"
      ? "is-background"
      : backgroundMode === "modal"
      ? "is-modal-background"
      : "";

  const handleModalChange = (open: boolean) => {
    onModalChange?.(open);
  };

  return (
    <div id="main-visual" className={bgClass}>
      <TopBar  onOpenSide={onOpenSide} />

      <ProfilePanel onOpenSide={onOpenSide} />
      <QuestPanel />

      <main className="stage layer-frame">
        <span className="layer layer1"></span>
        <span className="layer layer2"></span>
        <span className="layer layer3"></span>
        <span className="layer layer4"></span>
        {tab === "beginning" && <BeginningTab />}
        {tab === "logs" && <LogsTab onModalChange={handleModalChange} />}
        {tab === "achievements" && <AchievementsTab />}
        {tab === "creations" && <CreationsTab />}
        {tab === "games" && <GamesTab />}
      </main>

      <nav className="tabs">
        {TABS.map((t) => {
          const meta = TAB_META[t];

          return (
            <button
              key={t}
              className={`tab ${tab === t ? "is-active" : ""}`}
              onClick={() => onTabChange(t)}
              type="button"
            >
              <p className="badge">{meta.label}</p>
              <p className="description">{meta.description}</p>
            </button>
          );
        })}
      </nav>
    </div>
  );
}