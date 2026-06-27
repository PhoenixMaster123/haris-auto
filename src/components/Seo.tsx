import { useEffect } from "react";
import type { Lang, PageId } from "../types";
import { useI18n } from "../hooks/useI18n";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK_URL,
  GEO,
  OPENING_HOURS,
  PHONE_TEL,
} from "../data";

const OG_LOCALE: Record<Lang, string> = {
  bg: "bg_BG",
  en: "en_US",
  ro: "ro_RO",
  de: "de_DE",
};

const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Create or update a <meta> tag keyed by name= or property=. */
function setMeta(key: "name" | "property", id: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${id}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, id);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Create or update a <link rel="..."> tag. */
function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Create or update the LocalBusiness JSON-LD block. */
function setJsonLd(data: object) {
  let el = document.getElementById("ld-business") as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "ld-business";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Keeps the document head in sync with the active page and language:
 * title, description, canonical, Open Graph / Twitter cards and a
 * LocalBusiness structured-data block (with live opening hours).
 * Renders nothing.
 */
export function Seo({ page }: { page: PageId }) {
  const { lang, t } = useI18n();

  useEffect(() => {
    const isHome = page === "home";
    const title = isHome
      ? `${t.seo.siteName} — ${t.seo.tagline}`
      : `${t.nav[page]} — ${t.seo.siteName}`;

    const descByPage: Record<PageId, string> = {
      home: t.hero.sub,
      services: t.services.sub,
      gallery: t.gallery.sub,
      pricing: t.pricing.sub,
      about: t.about.p1,
      contact: t.contact.sub,
    };
    const description = descByPage[page];

    const base = import.meta.env.BASE_URL; // always ends with "/"
    const origin = window.location.origin;
    const url = `${origin}${window.location.pathname}`;
    const image = `${origin}${base}media/car-done.jpg`;

    document.title = title;
    document.documentElement.lang = lang;

    setMeta("name", "description", description);
    setLink("canonical", url);

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", t.seo.siteName);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:locale", OG_LOCALE[lang]);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    setJsonLd({
      "@context": "https://schema.org",
      "@type": ["AutoWash", "AutoRepair"],
      "@id": `${origin}${base}#business`,
      name: t.seo.siteName,
      description: t.seo.tagline,
      url: `${origin}${base}`,
      telephone: PHONE_TEL,
      email: EMAIL,
      image,
      priceRange: "€€",
      currenciesAccepted: "EUR, BGN",
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.locality,
        postalCode: ADDRESS.postalCode,
        addressCountry: ADDRESS.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: GEO.lat,
        longitude: GEO.lng,
      },
      areaServed: ADDRESS.locality,
      sameAs: [FACEBOOK_URL],
      openingHoursSpecification: OPENING_HOURS.map((h, i) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SCHEMA_DAYS[i],
        opens: `${pad(h.open)}:00`,
        closes: `${pad(h.close)}:00`,
      })),
    });
  }, [page, lang, t]);

  return null;
}
