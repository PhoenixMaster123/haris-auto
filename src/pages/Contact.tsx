import { useState } from "react";
import type { ContactForm } from "../types";
import { useI18n, useLocalized } from "../hooks/useI18n";
import { useReveal } from "../hooks/useReveal";
import { PageBanner } from "../components/PageBanner";
import { MapEmbed } from "../components/Shared";
import { Icon } from "../components/Icon";
import { services, PHONE_TEL } from "../data";
import styles from "./Contact.module.css";

const EMPTY: ContactForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

export function Contact() {
  const { t } = useI18n();
  const L = useLocalized();
  const ref = useReveal<HTMLDivElement>();
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [sent, setSent] = useState(false);

  const set = (k: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const info = [
    { icon: "location_on", label: t.contact.addressL, value: t.contact.address },
    {
      icon: "call",
      label: t.contact.phoneL,
      value: t.contact.phone,
      href: `tel:${PHONE_TEL}`,
    },
    {
      icon: "mail",
      label: t.contact.emailL,
      value: t.contact.email,
      href: `mailto:${t.contact.email}`,
    },
  ];

  return (
    <div ref={ref}>
      <PageBanner
        eyebrow={t.nav.contact}
        title={t.contact.title}
        sub={t.contact.sub}
      />

      <div className={`wrap ${styles.body}`}>
        <div className={styles.grid}>
          {/* FORM */}
          <div className={`${styles.formCard} reveal`}>
            {sent ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <Icon name="check" size={40} />
                </div>
                <p>{t.contact.success}</p>
                <button
                  className="btn btn--ghost-ink"
                  onClick={() => {
                    setForm(EMPTY);
                    setSent(false);
                  }}
                >
                  <Icon name="refresh" size={18} />
                  {t.contact.send}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className={styles.form}>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>{t.contact.fName}</span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder={t.contact.fName}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>{t.contact.fPhone}</span>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder={t.contact.fPhone}
                    />
                  </label>
                </div>
                <label className={styles.field}>
                  <span>{t.contact.fEmail}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder={t.contact.fEmail}
                  />
                </label>
                <label className={styles.field}>
                  <span>{t.contact.fService}</span>
                  <select value={form.service} onChange={set("service")}>
                    <option value="">{t.contact.fServicePh}</option>
                    {services.map((s) => (
                      <option key={L(s.name)} value={L(s.name)}>
                        {L(s.name)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>{t.contact.fMessage}</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder={t.contact.fMessage}
                  />
                </label>
                <button type="submit" className="btn btn--sun" style={{ width: "100%" }}>
                  <Icon name="send" size={19} />
                  {t.contact.send}
                </button>
              </form>
            )}
          </div>

          {/* INFO */}
          <aside className={`${styles.info} reveal`}>
            <h3 className={styles.infoTitle}>{t.contact.infoT}</h3>
            <ul className={styles.infoList}>
              {info.map((it) => (
                <li key={it.label}>
                  <span className={styles.infoIcon}>
                    <Icon name={it.icon} size={20} />
                  </span>
                  <div>
                    <span className={styles.infoLabel}>{it.label}</span>
                    {it.href ? (
                      <a href={it.href} className={styles.infoValue}>
                        {it.value}
                      </a>
                    ) : (
                      <span className={styles.infoValue}>{it.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.hours}>
              <span className={styles.infoLabel}>
                <Icon name="schedule" size={18} />
                {t.contact.hoursL}
              </span>
              <ul>
                {t.contact.hours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            <a
              href={`tel:${PHONE_TEL}`}
              className={styles.emergency}
            >
              <Icon name="emergency" size={22} fill />
              <div>
                <strong>{t.contact.emergencyT}</strong>
                <span>{t.contact.phone}</span>
              </div>
            </a>
          </aside>
        </div>

        <div className={styles.mapBlock}>
          <MapEmbed title={t.mapTitle} />
        </div>
      </div>
    </div>
  );
}
