import { useState } from "react";
import type { PageId } from "../types";
import { useI18n } from "../hooks/useI18n";
import { Icon } from "./Icon";
import styles from "./PromoBanner.module.css";

const KEY = "promo-dismissed-v1";

/** Dismissible promo strip above the header. The whole bar books an
 *  appointment; the × hides it (remembered in localStorage). */
export function PromoBanner({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { t } = useI18n();
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* noop */
    }
  };

  return (
    <div
      className={styles.bar}
      role="button"
      tabIndex={0}
      onClick={() => onNavigate("contact")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onNavigate("contact");
      }}
    >
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.tag} aria-hidden="true">
          <Icon name="local_shipping" size={16} />
        </span>
        <span className={styles.text}>{t.promo}</span>
        <span className={styles.cta}>
          {t.nav.book}
          <Icon name="arrow_forward" size={16} />
        </span>
        <button
          className={styles.close}
          aria-label="Dismiss"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </div>
  );
}
