import type { PageId } from "../types";
import { useI18n } from "../hooks/useI18n";
import { useReveal } from "../hooks/useReveal";
import { PageBanner } from "../components/PageBanner";
import { CtaBand } from "../components/Shared";
import { Icon } from "../components/Icon";
import styles from "./About.module.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function About({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageBanner eyebrow={t.about.kicker} title={t.about.title} />

      <div className={`wrap ${styles.body}`}>
        {/* STORY */}
        <section className={styles.story}>
          <div className={`${styles.storyText} reveal`}>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
          <div className={`${styles.storyMedia} reveal`}>
            <div
              className={styles.storyImg}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(8,30,40,0.15) 0%, rgba(8,30,40,0.72) 100%), url(${asset("/media/car-done.jpg")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className={styles.storyStat}>
                <span className={styles.storyStatN}>20+</span>
                <span className={styles.storyStatL}>{t.stats[0].l}</span>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className={`${styles.mission} reveal`}>
          <Icon name="flag" size={34} className={styles.missionIcon} />
          <h2 className={styles.missionTitle}>{t.about.missionT}</h2>
          <p className={styles.missionTxt}>{t.about.missionTxt}</p>
        </section>

        {/* VALUES */}
        <section className={styles.values}>
          <h2 className={styles.blockTitle}>{t.about.valuesT}</h2>
          <div className={styles.valueGrid}>
            {t.about.values.map((v) => (
              <div key={v.t} className={`${styles.valueCard} reveal`}>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className={styles.team}>
          <h2 className={styles.blockTitle}>{t.about.teamT}</h2>
          <div className={styles.teamGrid}>
            {t.about.team.map((m, i) => (
              <div key={m.name} className={`${styles.teamCard} reveal`}>
                <div
                  className={styles.teamAvatar}
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg,var(--acc),var(--acc-deep))"
                        : "linear-gradient(135deg,var(--ink-3),var(--ink))",
                  }}
                >
                  <Icon name="person" size={42} />
                </div>
                <strong>{m.name}</strong>
                <span>{m.role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CERTS */}
        <section className={`${styles.certs} reveal`}>
          <h2 className={styles.blockTitle}>{t.about.certsT}</h2>
          <div className={styles.certGrid}>
            {t.about.certs.map((c) => (
              <div key={c} className={styles.certItem}>
                <Icon name="verified" size={22} fill />
                {c}
              </div>
            ))}
          </div>
        </section>
      </div>

      <CtaBand onBook={() => onNavigate("contact")} />
    </div>
  );
}
