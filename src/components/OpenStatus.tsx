import { useEffect, useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { getOpenStatus } from "../data";
import styles from "./OpenStatus.module.css";

/**
 * Live "Open now / Closed" badge. Recomputes every minute so it flips
 * exactly on the opening/closing time. `compact` drops the time detail
 * for tight spots (e.g. the header).
 */
export function OpenStatus({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const [status, setStatus] = useState(getOpenStatus);

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const label = status.open ? t.status.open : t.status.closed;
  const detail = status.open
    ? `${t.status.until} ${status.time}`
    : `${t.status.opens} ${status.time}`;

  return (
    <span
      className={`${styles.badge} ${status.open ? styles.open : styles.closed}`}
      title={`${label} · ${detail}`}
    >
      <span className={styles.dot} />
      <span className={styles.label}>{label}</span>
      {!compact && status.time && (
        <span className={styles.detail}>· {detail}</span>
      )}
    </span>
  );
}
