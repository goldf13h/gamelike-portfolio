
import { useEffect, useMemo, useState } from "react";
import type { SidePage } from "../../app/types";
import { formatHHMMSS, nowWithOffset } from "./time";

export default function TopBar(props: { onOpenSide: (page: SidePage) => void }) {
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