import type { Tab } from "./types";

export const TAB_META: Record<Tab, { label: string; description: string }> = {
  beginning: { label: "Beginning", description: "System overview and introduction sequence" },
  logs: { label: "Logs", description: "Development history and activity records" },
  achievements: { label: "Achievements", description: "Milestones unlocked through professional progress" },
  creations: { label: "Creations", description: "Selected works, experiments, and shipped products" },
  games: { label: "Games", description: "Interactive challenges and mini-game modules" },
};

export const TABS: Tab[] = ["beginning", "logs", "achievements", "creations", "games"];

export function isTab(x: string): x is Tab {
  return (TABS as string[]).includes(x);
}
