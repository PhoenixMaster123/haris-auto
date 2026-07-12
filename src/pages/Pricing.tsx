import { useState } from "react";
import type { PageId, Lang } from "../types";
import { useI18n, useLocalized } from "../hooks/useI18n";
import { useReveal } from "../hooks/useReveal";
import { PageBanner } from "../components/PageBanner";
import { Price } from "../components/Cards";
import { Icon } from "../components/Icon";
import { pricing } from "../data";
import styles from "./Pricing.module.css";

export function Pricing({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { t } = useI18n();
  const L = useLocalized();
  const ref = useReveal<HTMLDivElement>();
  const [faq, setFaq] = useState(-1);

  return (
    <div ref={ref}>
      <PageBanner
        eyebrow={t.nav.pricing}
        title={t.pricing.title}
        sub={t.pricing.sub}
      />

      <div className={`wrap ${styles.body}`}>
        <div className={styles.grid}>
          {pricing.map((p) => (
            <article
              key={L(p.name)}
              className={`${styles.card} ${p.popular ? styles.popular : ""} reveal`}
            >
              {p.popular && (
                <span className={styles.badge}>
                  <Icon name="star" size={15} fill />
                  {t.pricing.popular}
                </span>
              )}
              <h3 className={styles.planName}>{L(p.name)}</h3>
              <div className={styles.priceRow}>
                <span className={styles.from}>{t.pricing.from}</span>
                <Price
                  amount={p.price}
                  size={48}
                  color={p.popular ? "#fff" : "var(--t-1)"}
                />
              </div>
              <ul className={styles.features}>
                {p.features.map((f: Record<Lang, string>) => (
                  <li key={L(f)}>
                    <Icon name="check_circle" size={19} fill />
                    {L(f)}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${p.popular ? "btn--sun" : "btn--ink"} ${styles.choose}`}
                onClick={() => onNavigate("contact")}
              >
                {t.pricing.choose}
              </button>
            </article>
          ))}
        </div>

        <p className={styles.note}>
          <Icon name="info" size={18} />
          {t.pricing.note}
        </p>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <h2 className={styles.faqTitle}>{t.faq.title}</h2>
          <div className={styles.faqList}>
            {t.faq.items.map((item, i) => {
              const open = faq === i;
              return (
                <div
                  key={item.q}
                  className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}
                >
                  <button
                    className={styles.faqQ}
                    onClick={() => setFaq(open ? -1 : i)}
                    aria-expanded={open}
                  >
                    {item.q}
                    <Icon name={open ? "remove" : "add"} size={22} />
                  </button>
                  <div className={styles.faqA} style={{ maxHeight: open ? 200 : 0 }}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
