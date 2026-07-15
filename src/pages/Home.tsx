import type { PageId } from "../types";
import { useI18n, useLocalized } from "../hooks/useI18n";
import { useReveal } from "../hooks/useReveal";
import { Icon } from "../components/Icon";
import { SectionHead, ServiceCard } from "../components/Cards";
import { CtaBand, MapEmbed, BeforeAfter } from "../components/Shared";
import { Hero } from "./Hero";
import {
  services,
  featuredIdx,
  whyIcons,
  testimonials,
  gallery,
  brands,
  GOOGLE_MAPS_URL,
} from "../data";
import { useState } from "react";
import styles from "./Home.module.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function Home({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { t } = useI18n();
  const L = useLocalized();
  const ref = useReveal<HTMLDivElement>();
  const [ti, setTi] = useState(0);

  const featured = featuredIdx.map((i) => services[i]);
  const galPreview = gallery.slice(0, 6);
  const cur = testimonials[ti];

  return (
    <div ref={ref}>
      <Hero onNavigate={onNavigate} />

      {/* WHY */}
      <section
        id="why"
        className={styles.section}
        style={{ scrollMarginTop: "var(--nav-h)" }}
      >
        <div className="wrap">
          <SectionHead
            eyebrow={t.why.kicker}
            title={t.why.title}
            sub={t.why.sub}
          />
          <div className={styles.whyGrid}>
            {t.why.items.map((it, i) => (
              <div key={it.title} className={`${styles.whyCard} reveal`}>
                <div className={styles.whyIcon}>
                  <Icon name={whyIcons[i]} size={26} />
                </div>
                <h3 className={styles.whyTitle}>{it.title}</h3>
                <p className={styles.whyDesc}>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS band */}
      <section className={styles.statsBand}>
        <div className={`wrap ${styles.statsInner}`}>
          {t.stats.map((s) => (
            <div key={s.l} className={`${styles.statBlock} reveal`}>
              <span className={styles.statBig}>{s.n}</span>
              <span className={styles.statLbl}>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className={styles.section}>
        <div className="wrap">
          <div className={styles.headRow}>
            <SectionHead
              eyebrow={t.featured.kicker}
              title={t.featured.title}
              sub={t.featured.sub}
            />
            <button
              className="btn btn--ghost-ink"
              onClick={() => onNavigate("services")}
            >
              {t.featured.all}
              <Icon name="arrow_forward" size={18} />
            </button>
          </div>
          <div className={styles.svcGrid}>
            {featured.map((s) => (
              <ServiceCard
                key={L(s.name)}
                service={s}
                onEnquire={() => onNavigate("contact")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className={styles.baSection}>
        <div className={`wrap ${styles.baGrid}`}>
          <div className={`${styles.baCopy} reveal`}>
            <SectionHead
              eyebrow={t.ba.kicker}
              title={t.ba.title}
              sub={t.ba.sub}
            />
            <div className={styles.baHint}>
              <Icon name="swipe" size={20} />
              {t.ba.hint}
            </div>
          </div>
          <div className="reveal">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testiSection}>
        <div className="wrap">
          <SectionHead
            eyebrow={t.testi.kicker}
            title={t.testi.title}
            center
          />
          <div className={`${styles.testiCard} reveal`}>
            <Icon name="format_quote" size={48} className={styles.quoteMark} />
            <p className={styles.testiText}>{L(cur.text)}</p>
            <div className={styles.testiWho}>
              <div className={styles.testiAvatar}>{cur.name.charAt(0)}</div>
              <div>
                <strong>{cur.name}</strong>
                <span>{L(cur.role)}</span>
              </div>
            </div>
            <div className={styles.testiNav}>
              <button
                onClick={() =>
                  setTi((ti - 1 + testimonials.length) % testimonials.length)
                }
                aria-label="Previous"
              >
                <Icon name="arrow_back" size={20} />
              </button>
              <div className={styles.dots}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === ti ? styles.dotOn : ""}`}
                    onClick={() => setTi(i)}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTi((ti + 1) % testimonials.length)}
                aria-label="Next"
              >
                <Icon name="arrow_forward" size={20} />
              </button>
            </div>
          </div>
          {/* the review source locals actually check */}
          <div className={styles.testiGoogle}>
            <a
              className="btn btn--ghost-ink"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="star" size={18} fill style={{ color: "var(--sun)" }} />
              {t.testi.google}
            </a>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className={styles.brandSection}>
        <div className="wrap">
          <p className={styles.brandTitle}>{t.brands.title}</p>
          <div className={styles.brandRow}>
            {brands.map((b) => (
              <span key={b} className={styles.brand}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className={styles.section}>
        <div className="wrap">
          <div className={styles.headRow}>
            <SectionHead
              eyebrow={t.galp.kicker}
              title={t.galp.title}
              sub={t.galp.sub}
            />
            <button
              className="btn btn--ghost-ink"
              onClick={() => onNavigate("gallery")}
            >
              {t.galp.view}
              <Icon name="arrow_forward" size={18} />
            </button>
          </div>
          <div className={styles.galPreview}>
            {galPreview.map((g, i) => (
              <button
                key={i}
                className={`${styles.galTile} reveal`}
                style={{ background: g.grad }}
                onClick={() => onNavigate("gallery")}
              >
                {g.img && (
                  <img
                    className={styles.galVideo}
                    src={asset(g.img)}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                {g.video && (
                  <video
                    className={styles.galVideo}
                    src={asset(g.video)}
                    poster={g.poster ? asset(g.poster) : undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
                <span className={styles.galOverlay} />
                <span className={styles.galLabel}>{L(g.label)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <CtaBand onBook={() => onNavigate("contact")} />

      {/* MAP */}
      <section className={styles.mapSection}>
        <div className="wrap">
          <SectionHead eyebrow={t.contact.infoT} title={t.mapTitle} />
          <div style={{ marginTop: 28 }}>
            <MapEmbed title={t.mapTitle} />
          </div>
        </div>
      </section>
    </div>
  );
}
