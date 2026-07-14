import { useState } from "react";
import type { PageId, GalleryCategory } from "../types";
import { useI18n, useLocalized } from "../hooks/useI18n";
import { useReveal } from "../hooks/useReveal";
import { PageBanner } from "../components/PageBanner";
import { CtaBand } from "../components/Shared";
import { gallery } from "../data";
import styles from "./Gallery.module.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

type Filter = "all" | GalleryCategory;
/* only categories that actually have items get a button */
const FILTERS: Filter[] = ["all", "ba", "exterior", "workshop", "carpets"];

export function Gallery({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { t } = useI18n();
  const L = useLocalized();
  const ref = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<Filter>("all");

  const items =
    filter === "all" ? gallery : gallery.filter((g) => g.cat === filter);

  return (
    <div ref={ref}>
      <PageBanner
        eyebrow={t.galp.kicker}
        title={t.gallery.title}
        sub={t.gallery.sub}
      />

      <div className={`wrap ${styles.body}`}>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.filter} ${
                filter === f ? styles.filterOn : ""
              }`}
              onClick={() => setFilter(f)}
            >
              {t.gallery.filters[f]}
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <p className={styles.empty}>{t.gallery.empty}</p>
        )}

        <div className={styles.masonry} key={filter}>
          {items.map((g, i) => (
            <figure
              key={`${filter}-${i}`}
              className={`${styles.tile} ${g.tall ? styles.tall : ""}`}
              style={{ background: g.grad, animationDelay: `${i * 0.04}s` }}
            >
              {g.img && (
                <img
                  className={styles.photo}
                  src={asset(g.img)}
                  alt={L(g.label)}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              {g.video && (
                <video
                  className={styles.video}
                  src={asset(g.video)}
                  poster={g.poster ? asset(g.poster) : undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
              <div className={styles.overlay} />
              <figcaption className={styles.caption}>
                <span className={styles.catTag}>
                  {t.gallery.filters[g.cat as Filter]}
                </span>
                <span className={styles.label}>{L(g.label)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <CtaBand onBook={() => onNavigate("contact")} />
    </div>
  );
}
