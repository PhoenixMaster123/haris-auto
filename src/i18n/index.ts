import type { Dictionary } from "./strings";
import { bg } from "./bg";
import { en } from "./en";
import { ro } from "./ro";
import { de } from "./de";

/** All four languages are fully translated and selectable. */
export const dict: Dictionary = {
  bg,
  en,
  ro,
  de,
};

export { LANGS, DEFAULT_LANG, langMeta } from "./langs";
export type { Strings, Dictionary } from "./strings";
