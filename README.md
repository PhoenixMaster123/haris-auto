# Автокомплекс Харис — Website

A premium, multi-page marketing site for **Автокомплекс Харис** (Haris Auto Complex),
a car wash, machine carpet-cleaning, detailing and full auto-service business in Ruse.

Built with **React + TypeScript + Vite**.

## Highlights

- **Multi-page** (not a single scroller): Home, Services, Gallery, Pricing, About, Contact
- **Language dropdown** — Bulgarian, English, Romanian & German, all fully translated
- **Light & dark theme** — navbar toggle, persisted to `localStorage`, follows the OS preference on first visit (no flash of the wrong colours)
- **Euro pricing** throughout
- Live **carpet-wash video** in the hero and gallery
- Before/after slider (illustrated dirty → freshly-washed car), filterable masonry gallery, FAQ accordion, contact form, Google Maps embed pinned to the exact address
- Self-hosted **Sofia Sans** (full Cyrillic support) — no external font requests
- Scroll-reveal animations with a safety fallback, responsive down to mobile, keyboard focus, reduced-motion support

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build -> dist/
npm run preview  # preview the production build
```

## Project structure

```
public/
  fonts/         self-hosted Sofia Sans + Material Symbols (woff2)
  media/         carpet.mp4 + poster
  favicon.svg
src/
  types.ts       shared domain types
  data.ts        services, pricing, gallery, testimonials (prices in EUR)
  i18n/          language registry + string dictionaries (bg, en; ro/de fall back to en)
  hooks/         useI18n (language context), useReveal (scroll animations)
  components/    Navbar, Footer, LanguageMenu, Cards, Shared, Icon, Logo, PageBanner
  pages/         Home (+ Hero), Services, Gallery, Pricing, About, Contact
  styles/        global tokens + font-face
```

## Languages

All four languages (bg, en, ro, de) are fully translated and selectable.

- **UI chrome** lives in `src/i18n/{bg,en,ro,de}.ts` (each exports a `Strings` object),
  wired together in `src/i18n/index.ts`.
- **Domain data** (service names, descriptions, gallery captions, pricing) uses the
  `L(bg, en, ro, de)` helper in `src/data.ts`.
- The dropdown reads `src/i18n/langs.ts`; set `ready: false` on a language to hide it.

To tweak a translation, edit the matching string in those files — no other wiring needed.

## Swapping placeholder imagery

Gallery and hero panels use tasteful gradient fills as placeholders.
Replace a tile's `grad` with an `<img>`/`video` in `src/data.ts` (the gallery already
supports an optional `video` + `poster`), and drop assets into `public/media/`.

## Notes

- Prices are indicative placeholders (converted from the original BGN figures to EUR).
- The contact form is front-end only — wire `submit` in `src/pages/Contact.tsx` to your
  backend or a form service (Formspree, etc.) to actually send enquiries.
- The Google Maps embed in `src/components/Shared.tsx` (`MapEmbed`) is pinned to
  ул. „Мария Луиза“ 2, 7012 Русе.
- Phone and email live in one place — `PHONE_DISPLAY` / `PHONE_TEL` / `EMAIL` in
  `src/data.ts` (the display keeps the local leading `0`; `tel:` links use `+359…`).
