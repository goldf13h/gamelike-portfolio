import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function RootPortal({ children }: { children: ReactNode }) {
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootEl(document.getElementById("root"));
  }, []);

  if (!rootEl) return null;
  return createPortal(children, rootEl);
}
