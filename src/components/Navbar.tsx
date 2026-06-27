import { useState } from "react";
import type { PageId } from "../types";
import { useI18n } from "../hooks/useI18n";
import { Icon } from "./Icon";
import { LanguageMenu } from "./LanguageMenu";
import { ThemeToggle } from "./ThemeToggle";
import { OpenStatus } from "./OpenStatus";
import { Logo } from "./Logo";
import styles from "./Navbar.module.css";

interface Props {
  page: PageId;
  onNavigate: (p: PageId) => void;
}

const NAV: PageId[] = [
  "home",
  "services",
  "gallery",
  "pricing",
  "about",
  "contact",
];

export function Navbar({ page, onNavigate }: Props) {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (p: PageId) => {
    onNavigate(p);
    setMobileOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.bar}>
          <button className={styles.brandBtn} onClick={() => go("home")}>
            <Logo />
            <span className={styles.brandText}>
              <span className={styles.brandName}>ХАРИС</span>
              <span className={styles.brandSub}>{t.brandSub}</span>
            </span>
          </button>

          <nav className={styles.nav}>
            {NAV.map((p) => (
              <button
                key={p}
                className={`${styles.navLink} ${
                  page === p ? styles.navActive : ""
                }`}
                onClick={() => go(p)}
              >
                {t.nav[p]}
              </button>
            ))}
          </nav>

          <div className={styles.right}>
            <div className={styles.toolsDesk}>
              <OpenStatus compact />
              <ThemeToggle />
              <LanguageMenu />
            </div>
            <button className={`btn btn--acc ${styles.book}`} onClick={() => go("contact")}>
              <Icon name="event" size={19} />
              {t.nav.book}
            </button>
            <button
              className={styles.burger}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className={styles.sheet}>
          <div className={styles.sheetTop}>
            <span className={styles.brandName} style={{ color: "#fff" }}>
              ХАРИС
            </span>
            <button
              className={styles.sheetClose}
              aria-label="Close"
              onClick={() => setMobileOpen(false)}
            >
              <Icon name="close" />
            </button>
          </div>
          <div className={styles.sheetBody}>
            {NAV.map((p) => (
              <button
                key={p}
                className={styles.sheetLink}
                onClick={() => go(p)}
              >
                {t.nav[p]}
                <Icon name="arrow_outward" size={22} />
              </button>
            ))}
            <div className={styles.sheetStatus}>
              <OpenStatus />
            </div>
            <div className={styles.sheetLang}>
              <ThemeToggle variant="dark" />
              <LanguageMenu variant="dark" />
            </div>
            <button
              className="btn btn--acc"
              style={{ marginTop: 8, width: "100%", padding: "16px" }}
              onClick={() => go("contact")}
            >
              <Icon name="event" size={20} />
              {t.nav.book}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
