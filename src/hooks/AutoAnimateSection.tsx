import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { ReactNode } from "react";

export function AutoAnimateSection(props: {
  children: ReactNode;
  className?: string;
}) {
  const { children, className, as } = props;
  const [parent] = useAutoAnimate();
  const Tag = (as ?? "div") as any;

  return (
    <Tag ref={parent} className={className}>
      {children}
    </Tag>
  );
}
