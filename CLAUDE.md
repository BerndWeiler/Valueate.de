# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Valueate.de is a static marketing website for Bernd Weiler's AI consulting and implementation business targeting German SMEs (kleine und mittelständische Unternehmen). The site is entirely in German. Domain: https://www.valueate.de

**Core positioning:** Pragmatic AI automation for SMEs — no buzzwords, fixed prices, personal contact. Key differentiator vs. large consultancies: transparent pricing, fast turnaround, direct access to the person who implements.

**Location:** Biberach an der Riß (Baden-Württemberg). Target region: Süddeutschland — Biberach, Ulm, Neu-Ulm, Augsburg, Bodensee, Stuttgart, München.

## Architecture

**Zero-build static site** — no package manager, no bundler, no framework.

- `index.html` — Homepage with all sections (hero, services, use cases, process steps, about, comparison, CTA)
- `leistungen.html` — Services detail page with 4 service blocks (Analyse, Automatisierung, Schulung, Website-Erstellung)
- `kostenersparnis-rechner.html` — Interactive cost savings calculator (sliders, real-time calculation)
- `impressum.html` — Legal notice (fully implemented)
- `datenschutz.html` — Privacy policy (fully implemented)
- `css/style.css` — All styles, mobile-first with BEM naming convention
- `js/main.js` — Vanilla JS in an IIFE: cookie banner, mobile nav, header scroll effect, Intersection Observer animations, smooth scrolling, calculator logic
- `images/` — Static assets (logo.png for header, logo-footer.png for footer, portraits, 4 Storyset illustrations)
- `robots.txt` — Allows all crawlers, references sitemap
- `sitemap.xml` — All 5 pages with priority weights

Reference documents (not deployed):
- `Valueate_Website_Uebergabe_v2.md` — Canonical source for all texts, design specs, and section structure
- `Website-Analyse_KI-Agentur.md` — Competitor analysis with recommendations

## Git & Hosting

- **Repository**: https://github.com/BerndWeiler/Valueate.de
- **Branch**: main
- **Hosting**: Hostinger (static files in `public_html/`)
- **Internal links**: Use `href="index.html"` (not `href="/"`), so pages work when opened locally as files

### Upload to Hostinger

Only deploy these files — everything else stays local:
```
public_html/
├── index.html, leistungen.html, kostenersparnis-rechner.html, impressum.html, datenschutz.html
├── robots.txt, sitemap.xml
├── css/style.css
├── js/main.js
└── images/ (all 8 image files)
```

**DO NOT upload:** `.git/`, `.claude/`, `.cursor/`, `.gitignore`, `.DS_Store`, `CLAUDE.md`, `*.md` reference docs

## Development

No build step. Serve with any static server:

```bash
python3 -m http.server 8000
```

## Navigation Structure

All pages share the same header/footer. Current nav items:
1. **Startseite** → `index.html`
2. **Leistungen** → `leistungen.html`
3. **Kostenrechner** → `kostenersparnis-rechner.html`

Active page gets `class="active"` on the nav link (both desktop and mobile nav).

## Homepage Section Structure

All sections marked ✅ FINAL in the handover doc are implemented:

1. **Hero** — H1 + two text boxes + CTA + portrait photo
2. **Leistungen** — 3 service cards with Storyset illustrations (Amico style), linked to `leistungen.html`
3. **Use Cases** — 4 cards in 2x2 grid with small SVG icons (no images)
4. **Vier Schritte** — 4 step cards with orange number circles + CTA
5. **Über mich** — Text left, portrait + stats right
6. **Vertrauenssignale** — ⏳ NOT YET IMPLEMENTED (planned for when testimonials are available)
7. **Differenzierung** ("Warum Valueate?") — Comparison table (desktop) / cards (mobile)
8. **Abschluss-CTA** — Final call-to-action with contact details

## Leistungen (Services Detail Page)

4 service blocks with alternating image/text layout (BEM: `.leistungen__block`, `.leistungen__block--reverse`):
1. **Analyse und Strategie** — `illustration-analyse.png`
2. **KI-Automatisierung** — `illustration-automatisierung.png`
3. **Implementierung und Schulung** — `illustration-schulung.png`
4. **Website-Erstellung** — `illustration-website.png`

Each block: H2 title, 2 paragraphs, orange bullet list (`.leistungen__list`), individual CTA button.

## Kostenersparnis-Rechner

Interactive calculator with real-time updates. Inputs:
- **Art der Lösung**: Radio pills — KI-Sprachassistent (0,15 €/Min) or KI-Automatisierung (0,03 €/Ausführung)
- **Aufwand pro Ausführung**: Range slider 1–60 Min
- **Häufigkeit pro Monat**: Range slider 10–5.000x
- **Mitarbeiterkosten**: Range slider 15–100 €/Std

Formulas:
- Manuelle Kosten/Jahr = (Min / 60) × Stundenlohn × Häufigkeit × 12
- KI-Kosten/Jahr = Min × 0,15 × Häufigkeit × 12 (voice) OR 0,03 × Häufigkeit × 12 (automation)
- Ersparnis = Differenz + Prozentwert

## SEO

- **Schema.org** (JSON-LD on `index.html`): `ProfessionalService` with full address (Biberach), geo coordinates, 11 `areaServed` entries (cities + states)
- **Geo meta tags** on all indexed pages: `geo.region` (DE-BW), `geo.placename`, `geo.position`, `ICBM`
- **OG tags** on `index.html`, `leistungen.html`, `kostenersparnis-rechner.html`
- **Meta robots**: `index, follow` on content pages; `noindex, follow` on legal pages
- **Canonical URLs** on all indexed pages
- `robots.txt` + `sitemap.xml` with priorities
- Footer shows "Standort: Biberach an der Riß — Für Unternehmen in ganz Süddeutschland" on every page

## CSS Design System

CSS custom properties in `:root` (style.css):
- Primary color: `--orange: #E6821F` (light: `#FFF3E8`, dark: `#C96D14`)
- Backgrounds alternate: white (`#FFFFFF`) and light gray (`#F5F5F5`)
- Typography: DM Sans (body) + Playfair Display (headings) via Google Fonts
- Breakpoints: 768px (tablet), 1024px (desktop), 1280px (large desktop)
- Container max-width: 1200px (`--max-width`)

## Code Conventions

- **BEM naming**: `.block__element--modifier` (e.g., `.services__card`, `.btn--lg`, `.calc__result--highlight`)
- **State classes**: `is-` prefix (e.g., `is-visible`, `is-open`, `is-active`, `is-scrolled`)
- **Sections**: Each section has its own BEM namespace (`hero__`, `services__`, `leistungen__`, `steps__`, `about__`, `usecases__`, `comparison__`, `cta-final__`, `calc__`, `calc-page__`, `legal-page`)
- **Responsive**: Mobile-first base styles, enhanced at `@media (min-width: 768px)` and `@media (min-width: 1024px)`
- **Accessibility**: Semantic HTML, ARIA attributes on interactive elements
- **Footer**: Shared across all pages. Logo (`logo-footer.png`), Kontakt column (with Standort), Rechtliches column with copyright. Social icons have brand-color hover (WhatsApp green, LinkedIn blue).

## Language & Tone Rules

These rules apply to ALL German text on the site:
- **Siezen** (formal "Sie"), never "du"
- **Ich-Form** ("Ich helfe..."), not "wir" — except for shared activities ("wir sprechen")
- No buzzwords, no technical jargon ("Fachchinesisch")
- Never use "Agenten" (too technical for SME audience) — use "KI-Automatisierung" instead
- **"und" instead of "&"** in all visible text
- Use Gedankenstriche (–) instead of colons before lists
- Use Gedankenstrich (–) instead of periods in headlines

## Visual Design Rules

- Storyset illustrations (Amico style, orange accents) — in services section (homepage) and services detail page
- Use Cases and Vier Schritte: clean cards with SVG icons only, **NO AI-generated images**
- Icons: Lucide/Tabler/Phosphor (free SVG icon sets)
- Show people, not technology in illustrations
- Only ONE primary CTA type throughout (calendar booking via TidyCal)
- No AI-generated photorealistic images (hurts credibility for an AI consulting site)

## External Services & Contact

- **Booking**: TidyCal — `https://tidycal.com/valueate/erstgespraech` (all CTA buttons)
- **Email**: kontakt@valueate.de
- **Phone/WhatsApp**: +49 152 06237493
- **LinkedIn**: linkedin.com/in/berndweiler
- **Address**: Birkenharder Str. 10, 88400 Biberach an der Riß
- **Fonts**: Google Fonts CDN (DM Sans, Playfair Display)

## Planned / Missing Content

- `kontakt.html` — Contact & booking page (TidyCal embed + contact info), not yet created
- **Vertrauenssignale section** (Section 6) — testimonials, pilot project results
- **Transparent price ranges** on services (key differentiator — no competitor shows prices)
- **FAQ section**
- **Blog** with practical SME-focused articles
- **Branch-specific pages** (Handwerk, Gastronomie, E-Commerce, Dienstleistungen, Gesundheitswesen)
- **City-specific landing pages** (e.g., ki-beratung-ulm.html) for stronger local SEO
- **Lead magnet** (e.g., "KI-Checkliste" PDF download)
- **Google Business Profile** einrichten
- **Google Search Console** einrichten und Sitemap einreichen

## Key Competitor Insight

kiberatung.de (Everlast AI) is the closest competitor model for this target audience. Main takeaway: showing prices and concrete ROI numbers is the strongest differentiator for SME customers. Large consultancies (alexanderthamm, appliedai, tngtech, inovex) all hide pricing.
