import styles from "./PageBanner.module.css";

interface Props {
  eyebrow: string;
  title: string;
  sub?: string;
}

/** Compact dark banner shown at the top of interior pages. */
export function PageBanner({ eyebrow, title, sub }: Props) {
  return (
    <section className={styles.banner}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`wrap ${styles.inner}`}>
        <span className="eyebrow on-dark">{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        {sub && <p className={styles.sub}>{sub}</p>}
      </div>
    </section>
  );
}
