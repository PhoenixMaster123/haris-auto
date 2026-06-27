import type { PageId } from "../types";
import { useI18n, useLocalized } from "../hooks/useI18n";
import { useReveal } from "../hooks/useReveal";
import { PageBanner } from "../components/PageBanner";
import { ServiceCard } from "../components/Cards";
import { CtaBand } from "../components/Shared";
import { services, categories } from "../data";
import styles from "./Services.module.css";

export function Services({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { t } = useI18n();
  const L = useLocalized();
  const ref = useReveal<HTMLDivElement>();

  // group services by category, keeping only non-empty groups
  const groups = categories
    .map((cat, ci) => ({
      name: L(cat),
      items: services.filter((s) => s.cat === ci),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div ref={ref}>
      <PageBanner
        eyebrow={t.nav.services}
        title={t.services.title}
        sub={t.services.sub}
      />

      <div className={`wrap ${styles.body}`}>
        {groups.map((g) => (
          <section key={g.name} className={styles.group}>
            <div className={styles.groupHead}>
              <h2 className={styles.groupTitle}>{g.name}</h2>
              <span className={styles.groupLine} />
              <span className={styles.groupCount}>
                {g.items.length.toString().padStart(2, "0")}
              </span>
            </div>
            <div className={styles.grid}>
              {g.items.map((s) => (
                <ServiceCard
                  key={L(s.name)}
                  service={s}
                  onEnquire={() => onNavigate("contact")}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <CtaBand onBook={() => onNavigate("contact")} />
    </div>
  );
}
