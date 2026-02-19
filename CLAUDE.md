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
- `kontakt.html` — Contact page (form, direct contact info, WhatsApp button, TidyCal booking CTA)
- `send-mail.php` — PHP mail script for contact form (honeypot spam protection, server-side validation)
- `impressum.html` — Legal notice (fully implemented)
- `datenschutz.html` — Privacy policy (fully implemented)
- `css/style.css` — All styles, mobile-first with BEM naming convention
- `js/main.js` — Vanilla JS (ES6, `const`/`let`) in an IIFE: cookie banner, mobile nav, header scroll effect, Intersection Observer animations, smooth scrolling, calculator logic, contact form success/error messages
- `images/` — Static assets (logo.png for header, logo-footer.png for footer, portraits, 4 Storyset illustrations, favicon files)
- `images/logos/` — 15 partner/tool logos (SVG + 1 PNG) for the logo marquee on `leistungen.html`
- `robots.txt` — Explicit `Allow: /` for 15+ AI crawler user-agents (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) + wildcard `*`, references sitemap
- `sitemap.xml` — All 6 pages with priority weights
- `llms.txt` — Markdown summary for LLM discovery (llms.txt standard): business description, services, key pages

Reference documents (deployed but blocked via `.htaccess`):
- `Valueate_Website_Uebergabe_v2.md` — Canonical source for all texts, design specs, and section structure
- `Website-Analyse_KI-Agentur.md` — Competitor analysis with recommendations

## Git & Hosting

- **Repository**: https://github.com/BerndWeiler/Valueate.de
- **Branch**: main
- **Hosting**: Hostinger (static files in `public_html/`)
- **Internal links**: Use `href="index.html"` (not `href="/"`), so pages work when opened locally as files

### Deployment

**Automatic deployment** via GitHub → Hostinger (Git auto-deploy from `main` branch). All files in the repo are deployed to `public_html/`.

`.htaccess` blocks HTTP access to sensitive files (`.md`, `.gitignore`) — they exist on the server but return 403 Forbidden.

```
public_html/
├── .htaccess (blocks .md and .gitignore access)
├── index.html, leistungen.html, kostenersparnis-rechner.html, kontakt.html, impressum.html, datenschutz.html
├── send-mail.php
├── robots.txt, sitemap.xml, llms.txt
├── css/style.css
├── js/main.js
├── images/ (all image files + favicon.svg, favicon-32x32.png, apple-touch-icon.png)
├── images/logos/ (15 logo files for marquee)
└── google1887c5edf8ff7bdb.html (Google Search Console Verifizierung)
```

**NOT in repo (excluded via `.gitignore`):** `.claude/`, `.cursor/`, `.DS_Store`

## Development

No build step. Serve with any static server:

```bash
python3 -m http.server 8000
```

## Wordplay Banner (Eye-Catcher)

All pages have a fixed dark banner (`#1A1A1A`) directly below the header that plays on the brand name "Valueate" and the "-ate" suffix. It rotates through: **Value**ate → **Cre**ate → **Innov**ate → **Integr**ate → **Valid**ate → **Acceler**ate.

- **BEM namespace**: `.wordplay-banner`, `.wordplay-banner__inner`, `.wordplay-banner__prefix`, `.wordplay-banner__suffix`
- **Position**: Fixed, `top: var(--header-height)`, `z-index: 998`
- **Height**: `--banner-height: 48px` (CSS variable in `:root`)
- **Animation**: JS `setInterval` (2.5s) swaps the prefix text with a fade-up transition (0.4s). The suffix "ate" stays fixed in orange, the prefix is right-aligned (`width: 4.5em; text-align: right`) so "ate" never moves.
- **Accessibility**: `prefers-reduced-motion` disables the rotation (stays on "Valueate"). `aria-label` lists all words.
- **Layout impact**: All page sections with `--header-height`-based padding include `+ var(--banner-height)`. Mobile nav overlay `top` also adjusted.

## Favicon

3D-V-Checkmark aus dem Valueate-Logo (dunkler linker Arm, metallisch-graue innere Fläche, orange äußere Fläche). Die PNGs sind direkt aus `images/logo.png` extrahiert (kein manuelles SVG-Nachbauen), das SVG bettet das PNG als Base64 ein, um den Metallic-Effekt zu erhalten.

- `images/favicon.svg` — SVG mit eingebettetem PNG (Base64), für moderne Browser
- `images/favicon-32x32.png` — 32×32 PNG-Fallback für ältere Browser
- `images/apple-touch-icon.png` — 180×180 PNG mit weißem Hintergrund für iOS Home-Screen

All 6 HTML pages include the favicon `<link>` tags after `<meta name="viewport">`.

## Title Tag Schema

Brand-first format: **"Valueate – [Seitenname] | Bernd Weiler"**

| Page | Title |
|------|-------|
| `index.html` | Valueate – KI-Systeme für KMU \| Bernd Weiler |
| `leistungen.html` | Valueate – Leistungen \| Bernd Weiler |
| `kontakt.html` | Valueate – Kontakt \| Bernd Weiler |
| `kostenersparnis-rechner.html` | Valueate – Kostenersparnis-Rechner \| Bernd Weiler |
| `impressum.html` | Valueate – Impressum \| Bernd Weiler |
| `datenschutz.html` | Valueate – Datenschutz \| Bernd Weiler |

## Navigation Structure

All pages share the same header/footer. Current nav items:
1. **Startseite** → `index.html`
2. **Leistungen** → `leistungen.html`
3. **Kostenrechner** → `kostenersparnis-rechner.html`
4. **Kontakt** → `kontakt.html`

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

### Logo Marquee (Trust Band)

Scrolling logo band between the last service block and the CTA section. Title: "Wir arbeiten mit Produkten von".

- **BEM namespace**: `.logo-marquee`, `.logo-marquee__track`, `.logo-marquee__scroll`, `.logo-marquee__link`, `.logo-marquee__logo`
- **15 logos** (OpenAI, Anthropic, Google, Mistral AI, IONOS, Perplexity, Meta, Apple, Microsoft, AWS, GitHub, Hostinger, Midjourney, Black Forest Labs, ElevenLabs)
- **Technique**: HTML duplicated (2×15 = 30 img tags), CSS `@keyframes marquee` with `translateX(-50%)` for seamless infinite loop
- **Styling**: `filter: grayscale(100%) opacity(0.4)`, full color on hover, `mask-image` fade edges left/right
- **Accessibility**: Pause on hover, `prefers-reduced-motion` fallback (static wrapped grid), duplicate logos have `aria-hidden="true"` and `tabindex="-1"`
- Each logo is wrapped in an `<a>` tag linking to the company website
- **Important CSS**: `max-width: none` on `.logo-marquee__logo` to override global `img { max-width: 100% }` — without this, logos collapse in Safari
- Logo files in `images/logos/` (14 SVG + 1 PNG for BFL)

## Kostenersparnis-Rechner

### Intro / Explanation Section
Above the calculator widget, a `.calc-page__intro` block explains the two solution types:
- **H2** "So funktioniert der Rechner" + intro paragraph
- **Two cards** (`.calc-page__intro-cards`, 2-column grid on tablet+): KI-Sprachassistent (phone icon) and KI-Automatisierung (settings icon), each with description + orange price badge (`.calc-page__intro-price`)
- **Instruction paragraph** (`.calc-page__intro-instruction`)

### Calculator Widget
Interactive calculator with real-time updates. Inputs:
- **Art der Lösung**: Radio pills — KI-Sprachassistent (0,15 €/Min) or KI-Automatisierung (0,03 €/Ausführung)
- **Aufwand pro Ausführung**: Range slider 1–60 Min
- **Häufigkeit pro Monat**: Range slider 10–5.000x
- **Mitarbeiterkosten**: Range slider 15–100 €/Std

Formulas:
- Manuelle Kosten/Jahr = (Min / 60) × Stundenlohn × Häufigkeit × 12
- KI-Kosten/Jahr = Min × 0,15 × Häufigkeit × 12 (voice) OR 0,03 × Häufigkeit × 12 (automation)
- Ersparnis = Differenz + Prozentwert

## SEO and AI Discoverability

- **Schema.org** (JSON-LD on `index.html`): `ProfessionalService` with full address (Biberach), geo coordinates, 11 `areaServed` entries (cities + states)
- **Geo meta tags** on all indexed pages: `geo.region` (DE-BW), `geo.placename`, `geo.position`, `ICBM`
- **OG tags** on `index.html`, `leistungen.html`, `kostenersparnis-rechner.html`, `kontakt.html`
- **Meta robots**: `index, follow` on content pages; `noindex, follow` on legal pages
- **Canonical URLs** on all indexed pages
- `robots.txt` with explicit AI crawler allows (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, etc.) + `sitemap.xml` with priorities
- `llms.txt` at root — Markdown summary for LLM/AI discovery (business info, services, page index)
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
- **Sections**: Each section has its own BEM namespace (`hero__`, `services__`, `leistungen__`, `logo-marquee__`, `steps__`, `about__`, `usecases__`, `comparison__`, `cta-final__`, `calc__`, `calc-page__`, `contact-page__`, `contact__`, `legal-page`)
- **Responsive**: Mobile-first base styles, enhanced at `@media (min-width: 768px)` and `@media (min-width: 1024px)`
- **Accessibility**: Semantic HTML, ARIA attributes on interactive elements
- **Footer**: Shared across all pages. Logo (`logo-footer.png`), Kontakt column (with Standort), Rechtliches column with copyright. Social icons have brand-color hover (WhatsApp green, LinkedIn blue).

## Language & Tone Rules

These rules apply to ALL German text on the site:
- **Siezen** (formal "Sie"), never "du"
- **Ich-Form** ("Ich helfe..."), not "wir" — except for shared activities ("wir sprechen")
- No buzzwords, no technical jargon ("Fachchinesisch")
- Never use "Agenten" or "Agent" (too technical for SME audience) — use "KI-Automatisierung" or "KI-Sprachassistent" instead
- **"und" instead of "&"** in all visible text
- Use Gedankenstriche (–) instead of colons before lists
- Use Gedankenstrich (–) instead of periods in headlines

## Visual Design Rules

- Storyset illustrations (Amico style, orange accents) — in services section (homepage) and services detail page
- Use Cases and Vier Schritte: clean cards with SVG icons only, **NO AI-generated images**
- Icons: Lucide/Tabler/Phosphor (free SVG icon sets)
- Show people, not technology in illustrations
- Only ONE primary CTA type throughout (calendar booking via TidyCal)
- **CTA pulse animation**: `.btn--lg` buttons have orange glow pulse (`btn-glow`), phone icon in circle (`btn__icon`) with ring pulse (`btn-pulse-ring`) and ringing animation (`btn-phone-ring`). `.contact__whatsapp` has green glow pulse (`btn-glow-green`). All animations pause on hover and respect `prefers-reduced-motion`.
- No AI-generated photorealistic images (hurts credibility for an AI consulting site)

## External Services & Contact

- **Booking**: TidyCal — `https://tidycal.com/valueate/erstgespraech` (all CTA buttons)
- **Email**: kontakt@valueate.de
- **Phone/WhatsApp**: +49 152 06237493
- **LinkedIn**: linkedin.com/in/berndweiler
- **Address**: Birkenharder Str. 10, 88400 Biberach an der Riß
- **Fonts**: Google Fonts CDN (DM Sans, Playfair Display)
- **Google Ads**: Gutschein-Aktion aktiv — 400 € Guthaben bei 400 € Ausgaben (Code: `4XPTN-XYKND-PRVN`). Eingelöst am 19.02.2026, Anforderungen erfüllen bis **20.04.2026**. Nach Erhalt des Guthabens: innerhalb von 60 Tagen aufbrauchen.

## Planned / Missing Content

### High Priority
- **Transparent price ranges** on `leistungen.html` (key differentiator — no competitor shows prices)
- **Google Search Console** — Verifizierung via `google1887c5edf8ff7bdb.html` eingerichtet, Sitemap eingereicht, `index.html` ist indexiert. **TODO (ab ~22.02.2026):** Indexierung für Unterseiten beantragen (leistungen.html, kontakt.html, kostenersparnis-rechner.html)

### Medium Priority
- **FAQ section** — Häufige Fragen von KMU-Kunden
- **Vertrauenssignale section** (Section 6 on homepage) — testimonials, pilot project results (when available)
- ~~**Google Business Profile** einrichten (local SEO)~~ ✅ Eingerichtet mit Logo (19.02.2026). Knowledge Panel dauert ca. 2–4 Wochen.

### Low Priority (Content-Marketing / Scale)
- **Blog** with practical SME-focused articles (SEO content)
- **Branch-specific pages** (Handwerk, Gastronomie, E-Commerce, Dienstleistungen, Gesundheitswesen)
- **City-specific landing pages** (e.g., ki-beratung-ulm.html) for stronger local SEO
- **Lead magnet** (e.g., "KI-Checkliste" PDF download)

## GEO-Optimierung (Generative Engine Optimization) — TODO

### Priorität 1 — Hoher Impact, zuerst umsetzen
- [ ] **FAQPage Schema + sichtbare FAQ-Inhalte** — 5–10 Fragen auf `index.html` und `leistungen.html` mit JSON-LD FAQPage-Markup (3,2x häufiger in AI Overviews zitiert)
- [ ] **Service Schema mit Preisen** auf `leistungen.html` — Einzelne `Service`-Objekte mit `Offer`/`priceSpecification` für jede Leistung (direkt verwertbar für KI-Anfragen wie "Was kostet KI-Beratung für KMU?")
- [ ] **Person Schema erweitern** — `jobTitle`, `knowsAbout`, `description`, `sameAs` zum bestehenden `founder`-Objekt in `index.html` hinzufügen (E-E-A-T Signale)
- [ ] **Content als Self-Contained Units** — Jeder H2/H3-Abschnitt als eigenständige, zitierbare Einheit (120–180 Wörter). KI extrahiert Passagen, keine ganzen Seiten.
- [ ] **Frage-basierte H2-Überschriften** (selektiv) — z.B. "Wie läuft eine KI-Beratung ab?" statt "Vier Schritte" (bis zu 7x mehr Citations für kleinere Domains)

### Priorität 2 — Bald umsetzen
- [ ] **llms-full.txt erstellen** — Kompletter Content inline (nicht nur Links), für kleine Sites besonders sinnvoll
- [ ] **datePublished / dateModified** in Schema + sichtbar auf Seiten — Content < 3 Monate bekommt ~doppelt so viele Citations
- [ ] **Speakable Schema** — Identifiziert TTS-geeignete Abschnitte für Sprachassistenten (62% Voice-Suchen 2026)
- [ ] **Google Business Profile einrichten** — Primäre Datenquelle für lokale KI-Suchen ("KI-Berater Biberach")
- [ ] **Quellenangaben in Texten** — "Laut McKinsey (2025)..." erhöht Zitierwahrscheinlichkeit um 30–40%

### Priorität 3 — Langfristige Sichtbarkeit
- [ ] **Eigenständige FAQ-Seite** — 15–25 Fragen in Clustern (Kosten, Ablauf, Technik, Branchen, Datenschutz)
- [ ] **Off-Site Brand Mentions** — Gastartikel (t3n, Gründerszene), IHK-Eintrag, LinkedIn-Sichtbarkeit (Brand Mentions 3x stärker als Backlinks für KI)
- [ ] **First-Paragraph Answer Pattern** — Erste 60 Wörter jeder Seite als direkte Antwort (+35% Citation-Boost)
- [ ] **Bild-Alt-Texte anreichern** — Beschreibende, kontextreiche Alt-Texte statt generischer Beschreibungen
- [ ] **Vierteljährliche Content-Aktualisierung** — Datum, Statistiken, Beispiele regelmäßig auffrischen

## Key Competitor Insight

kiberatung.de (Everlast AI) is the closest competitor model for this target audience. Main takeaway: showing prices and concrete ROI numbers is the strongest differentiator for SME customers. Large consultancies (alexanderthamm, appliedai, tngtech, inovex) all hide pricing.
