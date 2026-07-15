import type { PageId } from "../types";
import { useI18n } from "../hooks/useI18n";
import { PHONE_TEL, FACEBOOK_URL, VIBER_URL, WHATSAPP_URL } from "../data";
import { Icon } from "./Icon";
import { BrandIcon, type BrandName } from "./BrandIcon";
import { OpenStatus } from "./OpenStatus";
import styles from "./Footer.module.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

interface Props {
  onNavigate: (p: PageId) => void;
}

const SOCIALS: { icon?: string; brand?: BrandName; label: string; href: string }[] = [
  { icon: "public", label: "Facebook", href: FACEBOOK_URL },
  { brand: "viber", label: "Viber", href: VIBER_URL },
  { brand: "whatsapp", label: "WhatsApp", href: WHATSAPP_URL },
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
            <img
              src={asset("/logo/haris-lockup.png")}
              alt="Автокомплекс Харис"
              className={styles.brandImg}
            />
          </button>
          <p className={styles.desc}>{t.footer.desc}</p>
          <div className={styles.socials}>
            {SOCIALS.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  className={styles.social}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {s.brand ? (
                    <BrandIcon name={s.brand} size={19} />
                  ) : (
                    <Icon name={s.icon!} size={20} />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>{t.footer.links}</h3>
          <ul className={styles.list}>
            {quick.map((p) => (
              <li key={p}>
                <button onClick={() => onNavigate(p)}>{t.nav[p]}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>{t.footer.contactL}</h3>
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
          <h3 className={styles.colTitle}>{t.footer.hoursL}</h3>
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
        </div>
      </div>
    </footer>
  );
}
