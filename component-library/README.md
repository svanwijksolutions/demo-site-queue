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

## Beschikbare componenten

- [`testimonials-columns/`](testimonials-columns/README.md) — drie verticaal doorlopende kolommen met reviewkaarten (glassmorphism/schaduw), pure CSS-animatie

## Overige assets

- [`assets/fonts/fontawesome/`](assets/fonts/fontawesome/README.md) — aangeleverde Font Awesome webfont-bestanden (nog onvolledige set, zie toelichting daar)
