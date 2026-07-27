# Component-bibliotheek

Verzameling herbruikbare, ultra-moderne UI-patronen voor de demo-site pipeline. Groeit na elke aanlevering van nieuwe componenten.

## Waarom dit bestaat

Aangeleverde inspiratie (bijv. uit componentgalerijen) is vaak React + Tailwind + Framer Motion (`motion/react`). Onze sites zijn en blijven losse HTML/CSS/JS zonder framework of build-stap (relatieve paden, direct bruikbaar op GitHub Pages). Elke component in deze map is daarom altijd al **vertaald naar vanilla HTML/CSS/(optioneel lichte JS)** voordat hij hier terechtkomt — plak nooit ruwe JSX/React-code direct in een site.

## Hoe een subagent dit gebruikt

1. Kijk bij het bouwen van een sectie (hero, testimonials, features, CTA, etc.) of er hier al een passend patroon bestaat.
2. Gebruik het niet klakkeloos: pas kleuren, spacing, typografie en content aan de huisstijl van het bedrijf aan (design tokens/CSS-variabelen van de site, niet de kleuren uit het voorbeeld).
3. Alleen gebruiken waar de content het toelaat — bijv. het testimonials-patroon vereist **echte** reviewquotes (`quotes_bekend: true`); zonder echte quotes wordt de sectie gewoon overgeslagen, nooit gevuld met verzonnen tekst.
4. Niet verplicht: een component hier is een optie, geen checklist die overal moet terugkomen. Kies wat bij het bedrijf past.
5. Respecteer de vaste regels uit de hoofd-`README.md` (geen AI-foto's/nep-iconen, geen streepjes, `prefers-reduced-motion`-fallback, animaties die nooit content permanent verbergen).

## Structuur

Elke component heeft een eigen map: `component-library/<naam>/` met minimaal:
- `README.md` — wat het is, wanneer te gebruiken, waarvan het is vertaald
- een `.html`-snippet (markup)
- een `.css`-bestand (styling + animatie)
- eventueel een klein `.js`-bestand, alleen als het echt niet met pure CSS kan

## Beschikbare componenten (klaar voor gebruik, vanilla, getest)

- [`testimonials-columns/`](testimonials-columns/README.md) — drie verticaal doorlopende kolommen met reviewkaarten (glassmorphism/schaduw), pure CSS-animatie
- [`testimonials-marquee/`](testimonials-marquee/README.md) — één horizontale balk met reviewkaarten naast elkaar die traag doorloopt, pauzeert bij hover, pure CSS-animatie
- [`rack-focus-text/`](rack-focus-text/README.md) — twee woorden die om beurten scherp/onscherp ademen (cinematische rack focus), pure CSS/JS
- [`stroke-draw-button/`](stroke-draw-button/README.md) — ghost-knop waarvan de rand zichzelf tekent bij hover (SVG stroke-dashoffset)
- [`fluid-metaballs-loader/`](fluid-metaballs-loader/README.md) — vloeiend samensmeltende gloeibollen als laadanimatie (SVG gooey-filter)
- [`wavy-sine-text/`](wavy-sine-text/README.md) — letters die golvend bewegen langs een sinusgolf
- [`otp-input-boxes/`](otp-input-boxes/README.md) — illustratieve, auto-vullende verificatiecode-vakjes (alleen decoratief, geen echte invoer)
- ~~`radial-fab-menu/`~~ — **verboden sinds 24-07-2026** (zie `RULES.md`, sectie "Zwevende UI-elementen"), niet meer gebruiken op geen enkele site. Blijft alleen in deze map staan als historisch archief.
- [`gradient-sweep-text/`](gradient-sweep-text/README.md) — bewegende lichtband met kleurverloop veegt over een woord heen
- [`alternating-timeline/`](alternating-timeline/README.md) — verticale tijdlijn met om-en-om links/rechts uitgelijnde mijlpalen, geschikt voor bedrijfsgeschiedenis

## Referentiepagina's (alleen inspiratie, niet direct bruikbaar)

- [`referentie-paginas/`](referentie-paginas/README.md) — 14 complete, aangeleverde landingspagina's (Tailwind-CDN, Google Fonts, stockfoto's) die **niet** aan onze bouwregels voldoen en dus nooit rechtstreeks gekopieerd mogen worden. Bevat wel sterke lay-out-/interactiepatronen (bento-grids, megamenu's, marquees, tekstonthullingen) die het waard zijn om met de hand na te bouwen in vanilla CSS. Zie het README daar voor een overzicht per bestand en de vaste waarschuwing.

## Overige assets

- [`assets/fonts/fontawesome/`](assets/fonts/fontawesome/README.md) — aangeleverde Font Awesome webfont-bestanden (nog onvolledige set, zie toelichting daar)
