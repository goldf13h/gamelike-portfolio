import { useEffect, useMemo, useState } from "react";
import Boot from "../scenes/Boot";
import profilePic from "../assets/profile_pic.png";
import coverImg from "../assets/cover_img.png";
import rewardImg01 from "../assets/reward_img01.png";
import rewardImg02 from "../assets/reward_img02.png";

/**
 * Scenes = top-level modes
 * Tabs = navigation inside the Home scene
 * @returns 
 */
type Scene = "boot" | "home" | "side";
type SidePage = "hire" | "contact" | "credit";
type Tab = "beginning" | "logs" | "achievements" | "creations" | "games";

const TAB_META: Record<
  Tab,
  {
    label: string;
    description: string;
  }
> = {
  beginning: {
    label: "Beginning",
    description: "System overview and introduction sequence",
  },
  logs: {
    label: "Logs",
    description: "Development history and activity records",
  },
  achievements: {
    label: "Achievements",
    description: "Milestones unlocked through professional progress",
  },
  creations: {
    label: "Creations",
    description: "Selected works, experiments, and shipped products",
  },
  games: {
    label: "Games",
    description: "Interactive challenges and mini-game modules",
  },
};

const TABS: Tab[] = ["beginning", "logs", "achievements", "creations", "games"];

function isTab(x: string): x is Tab {
  return (TABS as string[]).includes(x);
}

export default function Deck() {
  // Scenes and Tabs settings
  const [scene, setScene] = useState<Scene>("boot");
  const [sidePage, setSidePage] = useState<SidePage | null>(null);
  const [tab, setTab] = useState<Tab>("beginning");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (isTab(hash)) setTab(hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scene !== "home") return;
    window.location.hash = `${tab}`;
  }, [scene, tab]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (scene === "side") {
          setScene("home");
          setSidePage(null);
        }
        return;
      }

      if (scene === "home") {
        const idx = Number(e.key) - 1;
        if (idx >= 0 && idx < TABS.length) {
          setTab(TABS[idx]);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scene]);

  const actions = useMemo(
    () => ({
      enterSytem: () => setScene("home"),
      openSide: (page: SidePage) => {
        setSidePage(page);
        setScene("side");
      },
      closeSide: () => {
        setScene("home");
        setSidePage(null);
      },

      goTab: (t: Tab) => setTab(t),
    }),
    []
  );

  if (scene === "boot") {
    return (
      <Boot
        onEnterSystem={(lang) => {
          console.log("Selected language:", lang);
          setScene("home");
        }}
      />
    );
  }

  if (scene === "side") {
    return (
      <>
        <HomeScene
          tab={tab}
          onTabChange={actions.goTab}
          onOpenSide={actions.openSide}
          backgroundMode
        />

        {sidePage === "hire" && <HireScene onClose={actions.closeSide} />}
        {sidePage === "contact" && <ContactScene onClose={actions.closeSide} />}
        {sidePage === "credit" && <CreditScene onClose={actions.closeSide} />}
      </>
    );
  }

  return (
    <HomeScene
      tab={tab}
      onTabChange={actions.goTab}
      onOpenSide={actions.openSide}
    />
  );
}
/*-- Scenes --*/
function HomeScene(props: {
  tab: Tab;
  onTabChange: (t: Tab) => void;
  onOpenSide: (page: SidePage) => void;
  backgroundMode?: boolean;
}) {
  const { tab, onTabChange, onOpenSide, backgroundMode } = props;

  return (
    <div id="main-visual" className={`${backgroundMode ? "is-background" : ""}`}>
      <TopBar  onOpenSide={onOpenSide} />

      <ProfilePanel onOpenSide={onOpenSide} />
      <QuestPanel />

      <main className="stage">
        {tab === "beginning" && <BeginningTab />}
        {tab === "logs" && <LogsTab />}
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

function HireScene(props: {onClose: () => void}) {
  const { onClose } = props;

  return (
    <div className="form-scene">
      <section className="open-for-hire">
        <header>
          <h2>Open for hire</h2>
          <p className="muted">I would love to hear about your projects!</p>
        </header>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <div className="fields">
            <div className="field">
              <label htmlFor="name">How should I call you?</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Sending from</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.name@acme.com"
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="message">Transmitted data</label>
              <textarea
                name="message"
                id="message"
                placeholder="Hi, I write to you about ..."
              />
            </div>
          </div>
          <div className="actions">
            <button type="submit">Send message [enter]</button>
            <button type="button" onClick={onClose} title="Close (Esc)">Discard [esc]</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function ContactScene(props: {onClose: () => void}) {
  const { onClose } = props;

  return (
    <div className="form-scene">
      <section className="open-for-hire">
        <header>
          <h2>Connect with me</h2>
          <p className="muted">Wanna chat? Or just share something cool?</p>
        </header>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <div className="fields">
            <div className="field">
              <label htmlFor="name">How should I call you?</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Sending from</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.name@acme.com"
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="message">Transmitted data</label>
              <textarea
                name="message"
                id="message"
                placeholder="Hi, I write to you about ..."
              />
            </div>
          </div>
          <div className="actions">
            <button type="submit">Send message [enter]</button>
            <button type="button" onClick={onClose} title="Close (Esc)">Discard [esc]</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function CreditScene(props: {onClose: () => void}) {
  const { onClose } = props;

  return (
    <div>
      not prepared yet
      <button type="button" onClick={onClose} title="Close (Esc)">Close</button>
    </div>
  );
}
/*-- Scenes end --*/

/*-- Bar and panels --*/

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function formatHHMMSS(date: Date): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(
    date.getSeconds()
  )}`;
}

function nowWithOffset(offsetMs: number): Date {
  return new Date(Date.now() + offsetMs);
}

function TopBar(props: { onOpenSide: (page: SidePage) => void }) {
  const { onOpenSide } = props;
  const level: number = useMemo(() => {
    const year = new Date().getFullYear();
    return year - 2000;
  }, []);

  const [clicks, setClicks] = useState<number>(0);
  const [localTime, setLocalTime] = useState<Date>(() => new Date());

  const [serverOffsetMs] = useState<number>(() => 9 * 60 * 1000);
  const [serverTime, setServerTime] = useState<Date>(() =>
    nowWithOffset(serverOffsetMs)
  );

  useEffect(() => {
    const id: number = window.setInterval(() => {
      setLocalTime(new Date());
      setServerTime(nowWithOffset(serverOffsetMs));
    }, 1000);

    return () => window.clearInterval(id);
  }, [serverOffsetMs]);

  const coinsAwarded: number = useMemo(() => {
    const baseline = 1425;
    return baseline + clicks;
  }, [clicks]);

  return (
    <header id="topbar">
      <section className="stats">
        <div className="stat">
          <span className="stat-value">{level}</span>
          <span className="stat-label">LEVEL</span>
        </div>

        <button
          aria-label="Add"
          type="button"
          onClick={() => setClicks((c) => c + 1)}
        >
          +
        </button>

        <div className="stat">
          <span className="stat-value">
            {coinsAwarded.toLocaleString()}
          </span>
          <span className="stat-label">Coins awarded</span>
        </div>
      </section>

      <section className="metas">
        <button className="meta text" onClick={() => onOpenSide("credit")}>Credits</button>

        <span className="meta">
          <span>Server time:</span> {formatHHMMSS(serverTime)}
        </span>

        <span className="meta">
          <span>Local time:</span> {formatHHMMSS(localTime)}
        </span>
      </section>
    </header>
  );
}

function ProfilePanel(props: { onOpenSide: (page: SidePage) => void }) {
  const { onOpenSide } = props;

  return (
    <aside className="panel panel__profile">
      <section className="profile">
        <figure className="layer-frame avatar" role="img" aria-label="Profile avatar">
          <span className="layer layer1"></span>
          <span className="layer layer2"></span>
          <span className="layer layer3"></span>
          <span className="layer layer4"></span>
          <img src={profilePic} alt="Profile" />
        </figure>

        <dl className="details">
          <div className="kv">
            <dt>Name</dt>
            <dd>Yanlin Yu / Rachel</dd>
          </div>
          <div className="kv">
            <dt>Occupation</dt>
            <dd>Web Developer</dd>
          </div>
          <div className="kv">
            <dt>Availability</dt>
            <dd>
              <button className="badge badge-hire" type="button" onClick={() => onOpenSide("hire")}>
                Open for hire
              </button>
            </dd>
          </div>
          <div className="kv action">
            <dt>Social</dt>
            <dd>
              <button type="button" onClick={() => onOpenSide("contact")}>
                Open connection<span className="icon icon-bluetooth"/>
              </button>
            </dd>
          </div>
        </dl>
      </section>

      <footer className="motto">
        <h3>MOTTO:</h3>
        <p className="muted">Saepe omnis neque numquam recusandae laborantium.</p>
      </footer>
    </aside>
  );
}

function QuestPanel() {
  return (
    <aside className="panel panel__quest">
      <section className="quest">
        <header>
          <h2 className="badge">Active Quest</h2>
          <p className="muted">The react skill-up line</p>
        </header>

        <dl className="details">
          <div className="kv">
            <dt>Quest name</dt>
            <dd>React website</dd>
          </div>
          <div>
            <dt>Goal</dt>
            <dd className="muted">
              Build this website. Implement a full react website with multiple routers, UI elements and tricky styling. Make it all work great!
            </dd>
          </div>
          <div>
            <dt>Rewards</dt>
            <dd>
              <ul className="rewards">
                <li className="reward">
                  <img src={rewardImg01} alt="Reward" />
                  <p className="value">+5</p>
                </li>

                <li className="reward">
                  <img src={rewardImg02} alt="Reward" />
                  <p className="value">+25</p>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      <footer className="settings">
        {/* Later: make these controlled inputs */}
        <label className="toggle btn">
          <span className="description">Sound effect</span>
          <input type="checkbox" defaultChecked />
          <span className="icon"></span>
        </label>
        <label className="toggle btn">
          <span className="description">Music</span>
          <input type="checkbox" />
          <span className="icon"></span>
        </label>
        <button className="toggle" type="button">
          <span>Visual settings</span>
          <span className="icon icon-gear" />
        </button>
      </footer>
    </aside>
  );
}
/*-- Bar and panels end --*/

/*-- Tabs --*/
function BeginningTab() {
  return (
    <section className="cover">
      <figure className="layer-frame">
        <span className="layer layer1"></span>
        <span className="layer layer2"></span>
        <span className="layer layer3"></span>
        <span className="layer layer4"></span>
        <img src={coverImg} alt="Cover image" />
      </figure>
      <div className="tagline">
        <h1>
          Swimming through a vast network of interconnected devices and servers,
          spreading joy and whimsy to users across the globe
        </h1>
        <p className="muted">Artwork generated with midjourney</p>
      </div>
    </section>
  );
}


function LogsTab() {
  return <section>Logs (TODO)</section>;
}
function AchievementsTab() {
  return <section>Achievements (TODO)</section>;
}
function CreationsTab() {
  return <section>Creations (TODO)</section>;
}
function GamesTab() {
  return <section>Games (TODO)</section>;
}

/*-- Tabs end --*/