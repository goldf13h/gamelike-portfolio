export type Language = "en" | "zh" | "ja" | "da";

export const TEXT: Record<
  Language,
  {
    boot: {
      title: string;
      intro: {
        p1: string;
        p2: string;
      };
      language: {
        lead: string;
        question: string;
        options: Record<Language, string>;
      };
    };
  }
> = {
  en: {
    boot: {
      title: "HI!",
      intro: {
        p1: "Welcome to my personal system.",
        p2:
          "This interface is designed to feel like a game / sci-fi UI.\n" +
          "You will find achievements and quests that reflect my professional progress.",
      },
      language: {
        lead: "Before we proceed…",
        question: "Which language do you prefer?",
        options: {
          en: "English",
          zh: "中文",
          ja: "日本語",
          da: "Dansk",
        },
      },
    },
  },

  // You can leave these as placeholders for now.
  zh: {
    boot: {
      title: "HI!",
      intro: { p1: "（TODO）", p2: "（TODO）" },
      language: {
        lead: "（TODO）",
        question: "（TODO）",
        options: { en: "English", zh: "中文", ja: "日本語", da: "Dansk" },
      },
    },
  },
  ja: {
    boot: {
      title: "HI!",
      intro: { p1: "（TODO）", p2: "（TODO）" },
      language: {
        lead: "（TODO）",
        question: "（TODO）",
        options: { en: "English", zh: "中文", ja: "日本語", da: "Dansk" },
      },
    },
  },
  da: {
    boot: {
      title: "HI!",
      intro: { p1: "（TODO）", p2: "（TODO）" },
      language: {
        lead: "（TODO）",
        question: "（TODO）",
        options: { en: "English", zh: "中文", ja: "日本語", da: "Dansk" },
      },
    },
  },
};
