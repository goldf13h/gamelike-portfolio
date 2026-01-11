import { useEffect, useState } from "react";
import { TEXT, type Language } from "../content/text";

type BootPhase = "intro" | "language";

type BootProps = {
  onEnterSystem: (lang: Language) => void;
};

export default function Boot({ onEnterSystem }: BootProps) {
  const [phase, setPhase] = useState<BootPhase>("intro");
  const [lang, setLang] = useState<Language>("en"); // default for now

  const t = TEXT[lang].boot;

  useEffect(() => {
    if (phase !== "intro") return;

    const timer = setTimeout(() => setPhase("language"), 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  function handleLanguageSelect(code: Language) {
    setLang(code);

    // small delay feels more "system-like"
    setTimeout(() => {
      onEnterSystem(code);
    }, 300);
  }

  return (
    <section id="boot">
      <div className="boot-container">
        <div className="boot-title">{t.title}</div>

        {phase === "intro" && (
          <div className="text boot-text">
            <p>{t.intro.p1}</p>
            {/* preserve newlines in p2 by splitting */}
            {t.intro.p2.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}

        {phase === "language" && (
          <div className="text boot-text">
            <p>{t.language.lead}</p>
            <p>{t.language.question}</p>

            <div className="boot-actions">
              {(Object.keys(t.language.options) as Language[]).map((code) => (
                <button className="btn" key={code} onClick={() => handleLanguageSelect(code)}>
                  {t.language.options[code]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
