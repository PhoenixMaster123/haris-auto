import { useEffect, useRef, useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { LANGS, langMeta } from "../i18n";
import { Icon } from "./Icon";
import styles from "./LanguageMenu.module.css";
import type { Lang } from "../types";

interface Props {
  /** style variant: light sits on the white nav, dark sits in the mobile sheet */
  variant?: "light" | "dark";
}

export function LanguageMenu({ variant = "light" }: Props) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = langMeta(lang);

  // close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (code: Lang, ready: boolean) => {
    if (!ready) return;
    setLang(code);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${variant === "dark" ? styles.dark : ""}`}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="language" size={19} />
        <span className={styles.code}>{current.short}</span>
        <Icon
          name="expand_more"
          size={18}
          className={`${styles.chev} ${open ? styles.chevOpen : ""}`}
        />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label="Language">
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={`${styles.item} ${active ? styles.active : ""} ${
                    l.ready ? "" : styles.disabled
                  }`}
                  onClick={() => pick(l.code, l.ready)}
                  disabled={!l.ready}
                >
                  <span className={styles.itemCode}>{l.short}</span>
                  <span className={styles.itemLabel}>{l.label}</span>
                  {active && (
                    <Icon name="check" size={18} className={styles.check} />
                  )}
                  {!l.ready && <span className={styles.soon}>soon</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
