import { Icon } from "./Icon";
import { useI18n, useLocalized } from "../hooks/useI18n";
import type { Service } from "../types";
import { bgnPrice } from "../data";
import styles from "./Cards.module.css";

/** Dual-display price tag for the euro changeover, e.g. €18 · 35,20 лв. */
export function Price({
  amount,
  size = 21,
  color = "var(--t-1)",
}: {
  amount: string;
  size?: number;
  color?: string;
}) {
  return (
    <span className={styles.price} style={{ color }}>
      <span className={styles.euro} style={{ fontSize: size * 0.62 }}>
        €
      </span>
      <span style={{ fontSize: size }}>{amount}</span>
      <span className={styles.bgn} style={{ fontSize: Math.max(12, size * 0.3) }}>
        {bgnPrice(amount)}
      </span>
    </span>
  );
}

/** Section eyebrow + heading + optional sub, centered or left. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  center,
  onDark,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
  onDark?: boolean;
}) {
  return (
    <div
      className={styles.head}
      style={{
        textAlign: center ? "center" : "left",
        alignItems: center ? "center" : "flex-start",
      }}
    >
      <span className={`eyebrow ${onDark ? "on-dark" : ""}`}>{eyebrow}</span>
      <h2
        className="h-sec"
        style={{ color: onDark ? "#fff" : "var(--t-1)" }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className="sub-sec"
          style={{
            color: onDark ? "var(--t-on-dark-2)" : "var(--t-2)",
            marginInline: center ? "auto" : undefined,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/** A single service card used on Home (featured) and Services pages. */
export function ServiceCard({
  service,
  onEnquire,
}: {
  service: Service;
  onEnquire: () => void;
}) {
  const { t } = useI18n();
  const L = useLocalized();

  return (
    <article className={`${styles.card} reveal`}>
      <div className={styles.cardIcon}>
        <Icon name={service.icon} size={26} />
      </div>
      <h3 className={styles.cardTitle}>{L(service.name)}</h3>
      <p className={styles.cardDesc}>{L(service.desc)}</p>

      <div className={styles.cardMeta}>
        <span className={styles.dur}>
          <Icon name="schedule" size={16} />
          {L(service.dur)}
        </span>
        <span className={styles.from}>
          {t.services.from}{" "}
          <Price amount={service.price} size={20} />
        </span>
      </div>

      <button className={styles.cardBtn} onClick={onEnquire}>
        {t.services.learn}
        <Icon name="arrow_forward" size={18} />
      </button>
    </article>
  );
}
