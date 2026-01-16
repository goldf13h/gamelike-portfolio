import creation01 from "../assets/creation_img01.png";
import type { CreationEntry } from "../app/types";
import { TECH_ICON } from "./techIcons";

export const CREATIONS: CreationEntry[] = [
  {
    id: "c-1",
    publishedLabel: "published 2025/12/25",
    projectName: "the project name",
    type: "react website",
    description:
      "Build this website. Implement a full React website with multiple routers, UI elements and tricky styling. Make it all work great!",
    cover: { src: creation01, alt: "Project 01 screenshot" },
    liveUrl: "https://example.com",
    brief: "One sentence explanation for what the project is.",
    technologies: [
      { key: "React", alt: "React", src: TECH_ICON.React },
      { key: "TypeScript", alt: "TypeScript", src: TECH_ICON.TypeScript },
      { key: "Vite", alt: "Vite", src: TECH_ICON.Vite },
    ],
    longHtml: `
      <p>This is a longer description area.</p>
      <p>You can put <strong>HTML</strong> here.</p>
    `,
    demo: {
      title: "the project name",
      url: "https://example.com",
      images: [
        { src: creation01, alt: "Project 01 screenshot" },
        { src: creation01, alt: "Project 01 screenshot" },
      ],
    },
  },
  {
    id: "c-2",
    publishedLabel: "published 2025/12/25",
    projectName: "the project name",
    type: "react website",
    description:
      "Build this website. Implement a full React website with multiple routers, UI elements and tricky styling. Make it all work great!",
    cover: { src: creation01, alt: "Project 01 screenshot" },
    liveUrl: "https://example.com",
    brief: "One sentence explanation for what the project is.",
    technologies: [
      { key: "React", alt: "React", src: TECH_ICON.React },
      { key: "TypeScript", alt: "TypeScript", src: TECH_ICON.TypeScript },
      { key: "Vite", alt: "Vite", src: TECH_ICON.Vite },
    ],
    longHtml: `
      <p>This is a longer description area.</p>
      <p>You can put <strong>HTML</strong> here.</p>
    `,
    demo: {
      title: "the project name",
      url: "https://example.com",
      images: [{ src: creation01, alt: "Project 01 screenshot" }],
    },
  },
  {
    id: "c-3",
    publishedLabel: "published 2025/12/25",
    projectName: "the project name",
    type: "react website",
    description:
      "Build this website. Implement a full React website with multiple routers, UI elements and tricky styling. Make it all work great!",
    cover: { src: creation01, alt: "Project 01 screenshot" },
    liveUrl: "https://example.com",
    brief: "One sentence explanation for what the project is.",
    technologies: [
      { key: "React", alt: "React", src: TECH_ICON.React },
      { key: "TypeScript", alt: "TypeScript", src: TECH_ICON.TypeScript },
      { key: "Vite", alt: "Vite", src: TECH_ICON.Vite },
    ],
    longHtml: `
      <p>This is a longer description area.</p>
      <p>You can put <strong>HTML</strong> here.</p>
    `,
    demo: {
      title: "the project name",
      url: "https://example.com",
      images: [{ src: creation01, alt: "Project 01 screenshot" }],
    },
  },
];
