import type { Lang } from "../types";

export interface LangMeta {
  code: Lang;
  /** short label shown in the trigger, e.g. "BG" */
  short: string;
  /** full endonym shown in the dropdown list */
  label: string;
  /** whether translations are complete and selectable */
  ready: boolean;
}

/** Single source of truth for the language switcher. */
export const LANGS: LangMeta[] = [
  { code: "bg", short: "BG", label: "Български", ready: true },
  { code: "en", short: "EN", label: "English", ready: true },
  { code: "ro", short: "RO", label: "Română", ready: true },
  { code: "de", short: "DE", label: "Deutsch", ready: true },
];

export const DEFAULT_LANG: Lang = "bg";

export function langMeta(code: Lang): LangMeta {
  return LANGS.find((l) => l.code === code) ?? LANGS[0];
}
