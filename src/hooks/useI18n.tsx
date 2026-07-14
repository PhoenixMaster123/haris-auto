import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Lang } from "../types";
import { dict, DEFAULT_LANG } from "../i18n";
import type { Strings } from "../i18n";

interface I18nValue {
  lang: Lang;
  t: Strings;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

/** Explicitly chosen language survives the visit (like the theme). */
function storedLang(): Lang {
  try {
    const l = localStorage.getItem("lang");
    if (l && l in dict) return l as Lang;
  } catch {
    /* noop */
  }
  return DEFAULT_LANG;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(storedLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    } catch {
      /* noop */
    }
  }, []);

  const value: I18nValue = { lang, t: dict[lang], setLang };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Resolve a localized data field (Record<Lang,string>) for current lang. */
// eslint-disable-next-line react-refresh/only-export-components
export function useLocalized() {
  const { lang } = useI18n();
  return useCallback(
    (field: Record<Lang, string>) => field[lang] ?? field.en,
    [lang],
  );
}
