// ============================================================
//  Core domain types for Автокомплекс Харис
// ============================================================

/** Languages the site is built to support.
 *  bg + en are live; ro + de are scaffolded for later. */
export type Lang = "bg" | "en" | "ro" | "de";

export type PageId =
  | "home"
  | "services"
  | "gallery"
  | "pricing"
  | "about"
  | "contact";

/** A single bookable service. Prices are in EUR. */
export interface Service {
  /** Material Symbols icon name */
  icon: string;
  /** index into the category list */
  cat: number;
  /** localized display name, keyed by lang */
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
  /** localized duration label e.g. "20–30 мин" */
  dur: Record<Lang, string>;
  /** starting price, euros, as a plain number string e.g. "15" */
  price: string;
}

export interface PricingPlan {
  name: Record<Lang, string>;
  price: string;
  popular: boolean;
  features: Record<Lang, string>[];
}

export interface Testimonial {
  name: string;
  role: Record<Lang, string>;
  text: Record<Lang, string>;
}

export type GalleryCategory =
  | "ba"
  | "detail"
  | "interior"
  | "exterior"
  | "workshop"
  | "carpets";

export interface GalleryItem {
  cat: GalleryCategory;
  tall: boolean;
  label: Record<Lang, string>;
  /** CSS gradient used as a tasteful stock-style fill (and as a fallback
   *  behind a photo while it loads or if the file is missing) */
  grad: string;
  /** optional photo source (relative to /public) */
  img?: string;
  /** optional video source (relative to /public) */
  video?: string;
  poster?: string;
}

/** Contact form shape */
export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}
