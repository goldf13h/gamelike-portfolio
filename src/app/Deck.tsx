import { useEffect, useMemo, useState } from "react";
import type { Scene, SidePage, Tab } from "../app/types";
import { TABS, isTab } from "../app/tabsMeta";
import Boot from "../scenes/Boot";

import HomeScene from "../scenes/HomeScene";
import HireScene from "../scenes/side/HireScene";
import ContactScene from "../scenes/side/ContactScene";
import CreditScene from "../scenes/side/CreditScene";

export default function Deck() {
  // Scenes and Tabs settings
  const [scene, setScene] = useState<Scene>("boot");
  const [sidePage, setSidePage] = useState<SidePage | null>(null);
  const [tab, setTab] = useState<Tab>("beginning");
  const [backgroundMode, setBackgroundMode] = useState<"none" | "side" | "modal">("none");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (isTab(hash)) setTab(hash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scene !== "home") return;
    window.location.hash = `${tab}`;
  }, [scene, tab]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (scene === "side") {
          setScene("home");
          setSidePage(null);
        }
        return;
      }

      if (scene === "home") {
        const idx = Number(e.key) - 1;
        if (idx >= 0 && idx < TABS.length) {
          setTab(TABS[idx]);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scene]);


  const actions = useMemo(
    () => ({
      enterSytem: () => setScene("home"),
      openSide: (page: SidePage) => {
        setSidePage(page);
        setScene("side");
        setBackgroundMode("side");
      },
      closeSide: () => {
        setScene("home");
        setSidePage(null);
        setBackgroundMode("none");
      },

      goTab: (t: Tab) => setTab(t),
    }),
    []
  );

  if (scene === "boot") {
    return (
      <Boot
        onEnterSystem={(lang) => {
          console.log("Selected language:", lang);
          setScene("home");
        }}
      />
    );
  }

  if (scene === "side") {
    return (
      <>
        <HomeScene
          tab={tab}
          onTabChange={actions.goTab}
          onOpenSide={actions.openSide}
          onModalChange={(open) =>
            setBackgroundMode(open ? "side" : "none")
          }
        />

        {sidePage === "hire" && <HireScene onClose={actions.closeSide} />}
        {sidePage === "contact" && <ContactScene onClose={actions.closeSide} />}
        {sidePage === "credit" && <CreditScene onClose={actions.closeSide} />}
      </>
    );
  }

  return (
    <HomeScene
      tab={tab}
      onTabChange={actions.goTab}
      onOpenSide={actions.openSide}
      backgroundMode={backgroundMode}
      onModalChange={(open) =>
        setBackgroundMode(open ? "modal" : "none")
      }
    />
  );
}