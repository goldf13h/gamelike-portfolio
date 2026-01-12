import { createPortal } from "react-dom";

export default function Portal(props: { children: React.ReactNode }) {
  return createPortal(props.children, document.body);
}