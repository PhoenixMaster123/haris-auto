import { useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { PHONE_TEL } from "../data";
import { Icon } from "./Icon";
import styles from "./Shared.module.css";

/** Google Maps embed pointing at the exact business address. */
export function MapEmbed({ title }: { title: string }) {
  // Exact pin: ул. „Мария Луиза“ 2, 7012 Русе (no API key required).
  const src =
    "https://www.google.com/maps?q=" +
    encodeURIComponent('ул. "Мария Луиза" 2, 7012 Русе, България') +
    "&output=embed&z=17";
  return (
    <div className={styles.mapWrap}>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={styles.map}
      />
    </div>
  );
}

/** Full-width dark call-to-action band. */
export function CtaBand({ onBook }: { onBook: () => void }) {
  const { t } = useI18n();
  return (
    <section className={styles.cta}>
      <div className={`wrap ${styles.ctaInner} reveal`}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaText}>
          <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
          <p className={styles.ctaSub}>{t.cta.sub}</p>
        </div>
        <div className={styles.ctaBtns}>
          <button className="btn btn--acc" onClick={onBook}>
            <Icon name="event" size={20} />
            {t.cta.btn}
          </button>
          <a className="btn btn--ghost" href={`tel:${PHONE_TEL}`}>
            <Icon name="call" size={20} />
            {t.cta.call}
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Side-profile car illustration used by the before/after slider.
 * `clean` paints a glossy, sparkling car; otherwise it is dull and grimy.
 */
function CarScene({ clean }: { clean: boolean }) {
  const k = clean ? "a" : "b";
  const glass = clean ? "#c4eef4" : "#717c7e";
  const tyre = clean ? "#15171a" : "#202019";
  const rim = clean ? "#d7dde2" : "#8d8f86";
  return (
    <svg
      className={styles.baCar}
      viewBox="0 0 440 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`body-${k}`} x1="0" y1="0" x2="0" y2="1">
          {clean ? (
            <>
              <stop offset="0" stopColor="#3bd9e8" />
              <stop offset="0.55" stopColor="#15b4c6" />
              <stop offset="1" stopColor="#0a7689" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#8b8d85" />
              <stop offset="1" stopColor="#5a5c55" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="220" cy="216" rx="186" ry="13" fill="rgba(0,0,0,.4)" />

      {/* wheel arches (dark openings behind the wheels) */}
      <circle cx="120" cy="192" r="35" fill="rgba(0,0,0,.55)" />
      <circle cx="330" cy="192" r="35" fill="rgba(0,0,0,.55)" />

      {/* body */}
      <path
        d="M36 170 C36 150 54 146 80 142 L122 118 C132 110 144 106 158 106 L284 106
           C302 106 318 114 330 128 L350 148 C374 150 404 154 404 174 L404 182
           C404 190 398 194 390 194 L50 194 C42 194 36 188 36 180 Z"
        fill={`url(#body-${k})`}
      />

      {/* windows + pillar */}
      <path
        d="M150 128 L170 106 C172 104 175 103 178 103 L260 103 C270 103 278 107 284 114 L296 128 Z"
        fill={glass}
      />
      <line x1="224" y1="103" x2="224" y2="128" stroke={`url(#body-${k})`} strokeWidth="6" />

      {/* door seam + handle */}
      <line x1="224" y1="134" x2="224" y2="186" stroke="rgba(0,0,0,.18)" strokeWidth="3" />
      <rect x="244" y="150" width="20" height="6" rx="3" fill="rgba(0,0,0,.22)" />

      {/* headlight (front, right) */}
      <path d="M404 158 L386 156 L388 168 L404 170 Z" fill={clean ? "#fff7d6" : "#b9b59a"} />

      {clean ? (
        <>
          {/* glossy highlight streak */}
          <path
            d="M96 150 L150 124 L196 124 L120 162 Z"
            fill="rgba(255,255,255,.35)"
          />
          {/* sparkles */}
          <path d="M300 66 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#fff" />
          <path d="M132 84 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill="#fff" />
          <path d="M366 116 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" fill="#fff" />
        </>
      ) : (
        <>
          {/* grime splatter */}
          <ellipse cx="110" cy="150" rx="22" ry="13" fill="#5b4a30" opacity=".5" />
          <ellipse cx="180" cy="168" rx="16" ry="10" fill="#4f4128" opacity=".5" />
          <ellipse cx="300" cy="150" rx="20" ry="12" fill="#574828" opacity=".45" />
          <ellipse cx="250" cy="178" rx="26" ry="9" fill="#3f3a2a" opacity=".5" />
          <ellipse cx="350" cy="170" rx="14" ry="9" fill="#574828" opacity=".4" />
          <ellipse cx="70" cy="172" rx="14" ry="8" fill="#4a3f26" opacity=".45" />
        </>
      )}

      {/* wheels */}
      {[120, 330].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="192" r="30" fill={tyre} />
          <circle cx={cx} cy="192" r="15" fill={rim} />
          <circle cx={cx} cy="192" r="5" fill={clean ? "#9aa3aa" : "#62645c"} />
        </g>
      ))}
    </svg>
  );
}

/** Draggable before/after comparison showing a dirty vs. freshly washed car. */
export function BeforeAfter() {
  const { t } = useI18n();
  const [pos, setPos] = useState(50);

  return (
    <div className={styles.baWrap}>
      <div className={styles.ba}>
        {/* AFTER (full, underneath): clean, glossy car */}
        <div
          className={styles.baLayer}
          style={{
            background:
              "radial-gradient(120% 120% at 70% 18%, rgba(20,184,198,.30), transparent 60%), linear-gradient(135deg,#0b0c0f,#163039 70%,#0891b2)",
          }}
        >
          <CarScene clean />
          <span className={`${styles.baTag} ${styles.baTagAfter}`}>
            {t.ba.after}
          </span>
        </div>
        {/* BEFORE (clipped, on top): dull, grimy car */}
        <div
          className={styles.baLayer}
          style={{
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
            background: "linear-gradient(135deg,#41433f,#2b2c28 60%,#1a1b18)",
            filter: "saturate(.8) brightness(.92)",
          }}
        >
          <CarScene clean={false} />
          <span className={`${styles.baTag} ${styles.baTagBefore}`}>
            {t.ba.before}
          </span>
        </div>

        {/* handle line */}
        <div className={styles.baLine} style={{ left: `${pos}%` }}>
          <span className={styles.baKnob}>
            <Icon name="drag_indicator" size={20} />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className={styles.baRange}
          aria-label={t.ba.hint}
        />
      </div>
    </div>
  );
}
