import { useEffect } from "react";
import type { PageId } from "../types";
import { useI18n } from "../hooks/useI18n";
import { PHONE_TEL, VIBER_URL } from "../data";
import { Icon } from "./Icon";
import { BrandIcon } from "./BrandIcon";
import styles from "./MobileActionBar.module.css";

/**
 * Thumb-reach bar for phones: call, Viber, book. Most visitors arrive
 * on a phone from Google/Facebook — these are the three actions they
 * came for. Hidden on the contact page, where all of them already live
 * (and where it would sit on top of the form above the keyboard).
 */
export function MobileActionBar({
  page,
  onNavigate,
}: {
  page: PageId;
  onNavigate: (p: PageId) => void;
}) {
  const { t } = useI18n();
  const visible = page !== "contact";

  // Lets global.css pad the page bottom only while the bar is shown.
  useEffect(() => {
    if (visible) document.body.dataset.actionBar = "1";
    else delete document.body.dataset.actionBar;
    return () => {
      delete document.body.dataset.actionBar;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <nav className={styles.bar} aria-label={t.contact.infoT}>
      <a className={styles.act} href={`tel:${PHONE_TEL}`}>
        <Icon name="call" size={19} fill />
        {t.nav.call}
      </a>
      <a className={styles.act} href={VIBER_URL}>
        <BrandIcon name="viber" size={18} />
        Viber
      </a>
      <button className={styles.book} onClick={() => onNavigate("contact")}>
        <Icon name="event" size={19} />
        {t.nav.book}
      </button>
    </nav>
  );
}
