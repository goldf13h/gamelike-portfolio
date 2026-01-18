import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faReact,
  faJs,
  faHtml5,
  faCss3Alt,
} from "@fortawesome/free-brands-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";


export type TechKey =
  | "React"
  | "TypeScript"
  | "JavaScript"
  | "HTML"
  | "CSS"
  | "Vite";

export const TECH_ICON: Record<TechKey, IconDefinition> = {
  React: faReact,
  TypeScript: faJs,
  JavaScript: faJs,
  HTML: faHtml5,
  CSS: faCss3Alt,
  Vite: faBolt,
};
