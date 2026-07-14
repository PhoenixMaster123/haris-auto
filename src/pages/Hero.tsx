import type { PageId } from "../types";
import { useI18n } from "../hooks/useI18n";
import { Icon } from "../components/Icon";
import styles from "./Hero.module.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function Hero({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { t } = useI18n();

  return (
    <section className={styles.hero}>
      <div className={styles.shafts} aria-hidden="true" />
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.kicker}>
            <span className={styles.dot} />
            {t.hero.kicker}
          </span>
          <h1 className={styles.title}>
            <span className={styles.titleA}>{t.hero.titleA}</span>
            <span className={styles.titleB}>{t.hero.titleB}</span>
          </h1>
          <p className={styles.sub}>{t.hero.sub}</p>
          <div className={styles.actions}>
            <button className="btn btn--sun" onClick={() => onNavigate("contact")}>
              <Icon name="event" size={20} />
              {t.hero.cta1}
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => onNavigate("services")}
            >
              {t.hero.cta2}
              <Icon name="arrow_forward" size={20} />
            </button>
          </div>

          <div className={styles.stripRow}>
            {t.stats.slice(0, 3).map((s) => (
              <div key={s.l} className={styles.stat}>
                <span className={styles.statN}>{s.n}</span>
                <span className={styles.statL}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* signature: live carpet-wash video panel */}
        <div className={styles.media}>
          <div className={styles.videoCard}>
            <video
              className={styles.video}
              src={asset("/media/carpet.mp4")}
              poster={asset("/media/carpet-poster.jpg")}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className={styles.videoOverlay} />
            <div className={styles.videoBadge}>
              <span className={styles.liveDot} />
              {t.gallery.filters.carpets}
            </div>
            <div className={styles.videoCaption}>
              <Icon name="dry_cleaning" size={22} />
              <div>
                <strong>{t.stats[3].n}</strong>
                <span>{t.stats[3].l}</span>
              </div>
            </div>
          </div>
          <div className={styles.floatChip} style={{ animationDelay: "0s" }}>
            <Icon name="workspace_premium" size={20} />
            {t.why.items[0].title}
          </div>
          {/* Sunday hours are rare for auto services — worth a sun badge */}
          <div className={`${styles.floatChip} ${styles.chipSun}`} style={{ animationDelay: "1.4s" }}>
            <Icon name="sunny" size={19} fill />
            {t.hero.sunday}
          </div>
        </div>
      </div>

      <button
        className={styles.scroll}
        onClick={() =>
          document
            .getElementById("why")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      >
        {t.hero.scroll}
        <Icon name="south" size={18} />
      </button>
    </section>
  );
}
