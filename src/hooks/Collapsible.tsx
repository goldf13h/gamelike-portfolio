import { useLayoutEffect, useRef, useState } from "react";

export function Collapsible(props: {
  open: boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { open, id, children, className } = props;
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => setH(el.scrollHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div
      id={id}
      className={`collapsible ${open ? "is-open" : ""} ${className ?? ""}`}
      style={{ ["--h" as string]: `${h}px` }}
      aria-hidden={!open}
    >
      <div ref={innerRef} className="collapsible-container">
        {children}
      </div>
    </div>
  );
}
