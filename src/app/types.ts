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

export type TechKey = "React" | "TypeScript" | "Vite";

export type Technology = {
  key: TechKey;
  alt: string;
  src: string;
};

export type CreationEntry = {
  id: string;
  publishedLabel: string;
  projectName: string;
  type: string;
  description: string;
  cover: { src: string; alt: string };
  liveUrl?: string;

  brief: string;
  technologies: Technology[];

  longHtml: string;
  demo?: ImagePreviewEntry;
};