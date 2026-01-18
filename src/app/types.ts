export type Scene = "boot" | "home" | "side";
export type SidePage = "hire" | "contact" | "credit";
export type Tab = "beginning" | "logs" | "achievements" | "creations" | "games";
export type BackgroundMode = "none" | "side" | "modal";

export type PreviewImage = {
  src: string;
  alt: string;
};

export type ImagePreviewEntry = {
  title: string;
  images?: PreviewImage[];
  url?: string;
};

import type { TechKey } from "../content/techIcons";

export type CreationEntry = {
  id: string;
  publishedLabel: string;
  projectName: string;
  type: string;
  description: string;
  cover: { src: string; alt: string };
  liveUrl?: string;

  brief: string;
  technologies: TechKey[];
  techDetails: Partial<Record<TechKey, string>>;
  longHtml: string;
  demo?: ImagePreviewEntry;
};