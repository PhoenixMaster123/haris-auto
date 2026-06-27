import type { Lang } from "../types";

/** Shape of all translatable UI chrome (everything that isn't service data). */
export interface Strings {
  brandSub: string;
  nav: {
    home: string;
    services: string;
    gallery: string;
    pricing: string;
    about: string;
    contact: string;
    book: string;
  };
  hero: {
    kicker: string;
    titleA: string;
    titleB: string;
    sub: string;
    cta1: string;
    cta2: string;
    scroll: string;
  };
  why: {
    kicker: string;
    title: string;
    sub: string;
    items: { title: string; desc: string }[];
  };
  stats: { n: string; l: string }[];
  featured: { kicker: string; title: string; sub: string; all: string };
  ba: {
    kicker: string;
    title: string;
    sub: string;
    before: string;
    after: string;
    hint: string;
  };
  testi: { kicker: string; title: string };
  brands: { title: string };
  galp: { kicker: string; title: string; sub: string; view: string };
  cta: { title: string; sub: string; btn: string; call: string };
  mapTitle: string;
  services: {
    title: string;
    sub: string;
    learn: string;
    from: string;
    dur: string;
  };
  gallery: {
    title: string;
    sub: string;
    filters: Record<
      "all" | "ba" | "detail" | "interior" | "exterior" | "workshop" | "carpets",
      string
    >;
  };
  pricing: {
    title: string;
    sub: string;
    popular: string;
    choose: string;
    from: string;
    note: string;
  };
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    missionT: string;
    missionTxt: string;
    valuesT: string;
    values: { t: string; d: string }[];
    teamT: string;
    team: { name: string; role: string }[];
    certsT: string;
    certs: string[];
  };
  contact: {
    title: string;
    sub: string;
    fName: string;
    fPhone: string;
    fEmail: string;
    fService: string;
    fServicePh: string;
    fMessage: string;
    send: string;
    success: string;
    infoT: string;
    addressL: string;
    address: string;
    phoneL: string;
    phone: string;
    emailL: string;
    email: string;
    hoursL: string;
    hours: string[];
    socialT: string;
    emergencyT: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: {
    desc: string;
    links: string;
    servicesL: string;
    contactL: string;
    hoursL: string;
    hours: string[];
    rights: string;
    privacy: string;
    terms: string;
    nl: string;
    nlph: string;
    nlbtn: string;
  };
}

export type Dictionary = Record<Lang, Strings>;
