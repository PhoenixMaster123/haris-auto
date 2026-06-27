import type { PageId } from "../types";
import { useI18n } from "../hooks/useI18n";
import { PHONE_TEL } from "../data";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { OpenStatus } from "./OpenStatus";
import styles from "./Footer.module.css";

interface Props {
  onNavigate: (p: PageId) => void;
}

const SOCIALS = [
  { icon: "public", label: "Facebook", href: "#" },
  { icon: "photo_camera", label: "Instagram", href: "#" },
  { icon: "chat", label: "Viber", href: "#" },
];

export function Footer({ onNavigate }: Props) {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const quick: PageId[] = ["home", "services", "gallery", "pricing", "about", "contact"];

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.brandCol}>
          <button className={styles.brandBtn} onClick={() => onNavigate("home")}>
            <Logo />
            <span className={styles.brandName}>ХАРИС</span>
          </button>
          <p className={styles.desc}>{t.footer.desc}</p>
          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className={styles.social}>
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t.footer.links}</h4>
          <ul className={styles.list}>
            {quick.map((p) => (
              <li key={p}>
                <button onClick={() => onNavigate(p)}>{t.nav[p]}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t.footer.contactL}</h4>
          <ul className={styles.list}>
            <li className={styles.contactItem}>
              <Icon name="call" size={18} />
              <a href={`tel:${PHONE_TEL}`}>{t.contact.phone}</a>
            </li>
            <li className={styles.contactItem}>
              <Icon name="mail" size={18} />
              <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
            </li>
            <li className={styles.contactItem}>
              <Icon name="location_on" size={18} />
              <span>{t.contact.address}</span>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t.footer.hoursL}</h4>
          <div className={styles.statusRow}>
            <OpenStatus />
          </div>
          <ul className={styles.list}>
            {t.footer.hours.map((h) => (
              <li key={h} className={styles.hours}>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`wrap ${styles.bottomInner}`}>
          <span>
            © {year} Автокомплекс Харис. {t.footer.rights}
          </span>
          <div className={styles.legal}>
            <button>{t.footer.privacy}</button>
            <span className={styles.dot}>•</span>
            <button>{t.footer.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
