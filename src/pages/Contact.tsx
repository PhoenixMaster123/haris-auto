import { useState } from "react";
import type { ContactForm } from "../types";
import { useI18n, useLocalized } from "../hooks/useI18n";
import { useReveal } from "../hooks/useReveal";
import { PageBanner } from "../components/PageBanner";
import { MapEmbed } from "../components/Shared";
import { Icon } from "../components/Icon";
import { BrandIcon } from "../components/BrandIcon";
import {
  services,
  EMAIL,
  PHONE_TEL,
  VIBER_URL,
  WHATSAPP_URL,
  whatsappUrl,
} from "../data";
import styles from "./Contact.module.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

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
  // The site is static (GitHub Pages) — nothing can be emailed from here.
  // Instead the form composes the enquiry; the visitor fires it through
  // the channel they already use. "ready" shows that send panel.
  const [stage, setStage] = useState<"form" | "ready">("form");
  const [copied, setCopied] = useState(false);

  const set = (k: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCopied(false);
    setStage("ready");
  };

  const msg = [
    `${t.contact.msgHead}:`,
    `${t.contact.fName}: ${form.name}`,
    `${t.contact.fPhone}: ${form.phone}`,
    form.email && `${t.contact.emailL}: ${form.email}`,
    form.service && `${t.contact.msgService}: ${form.service}`,
    form.message && `\n${form.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const copyMsg = async () => {
    try {
      await navigator.clipboard.writeText(msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable — the preview text stays selectable */
    }
  };

  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    t.contact.msgHead,
  )}&body=${encodeURIComponent(msg)}`;

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
            {stage === "ready" ? (
              <div className={styles.ready}>
                <div className={styles.successIcon}>
                  <Icon name="send" size={36} />
                </div>
                <h3 className={styles.readyTitle}>{t.contact.ready}</h3>
                <p className={styles.readySub}>{t.contact.readySub}</p>

                <div className={styles.msgBox}>
                  <pre className={styles.msgText}>{msg}</pre>
                  <button className={styles.copyBtn} onClick={copyMsg}>
                    {copied ? t.contact.copied : t.contact.copyMsg}
                  </button>
                </div>

                <div className={styles.channels}>
                  <a
                    className="btn btn--sun"
                    href={VIBER_URL}
                    onClick={() => {
                      void copyMsg();
                    }}
                  >
                    <BrandIcon name="viber" size={19} />
                    Viber
                  </a>
                  <a
                    className="btn btn--ink"
                    href={whatsappUrl(msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BrandIcon name="whatsapp" size={19} />
                    WhatsApp
                  </a>
                  <a className="btn btn--ghost-ink" href={mailHref}>
                    <Icon name="mail" size={19} />
                    {t.contact.emailL}
                  </a>
                  <a className="btn btn--ghost-ink" href={`tel:${PHONE_TEL}`}>
                    <Icon name="call" size={19} />
                    {t.nav.call}
                  </a>
                </div>

                <p className={styles.channelHint}>
                  <Icon name="info" size={17} />
                  {t.contact.viberHint}
                </p>

                <button
                  className={styles.backBtn}
                  onClick={() => setStage("form")}
                >
                  <Icon name="arrow_back" size={18} />
                  {t.contact.edit}
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

            <div className={styles.chat}>
              <span className={styles.infoLabel}>
                <Icon name="chat" size={18} />
                {t.contact.chatT}
              </span>
              <div className={styles.chatRow}>
                <a className={styles.chatLink} href={VIBER_URL}>
                  <BrandIcon name="viber" size={17} />
                  Viber
                </a>
                <a
                  className={styles.chatLink}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BrandIcon name="whatsapp" size={17} />
                  WhatsApp
                </a>
              </div>
            </div>

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
          <div className={styles.mapGrid}>
            <MapEmbed title={t.mapTitle} />
            <figure className={`${styles.building} reveal`}>
              <img
                src={asset("/media/carpet-bus2.jpg")}
                alt={t.contact.buildingNote}
                loading="lazy"
              />
              <figcaption>
                <Icon name="location_on" size={17} fill />
                {t.contact.buildingNote}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
