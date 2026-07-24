# Fluid metaballs loader

Drie gloeiende bollen die vloeiend samensmelten en weer splitsen via een SVG gooey-filter (`feGaussianBlur` + `feColorMatrix`). Pure CSS-animatie plus één SVG-filter, geen JS nodig voor de beweging zelf.

## Wanneer gebruiken

Laadscherm of wachtstatus met een organische, techy uitstraling op een donkere achtergrond. Niet gebruiken op lichte achtergronden zonder de kleuren/achtergrond aan te passen (nu donker gebouwd).

## Hoe te gebruiken

1. Kopieer de `.fm-container` markup inclusief de SVG-filter (`#fm-goo-filter`) uit `fluid-metaballs-loader.html` naar de pagina.
2. Kopieer `fluid-metaballs-loader.css`, pas de drie bolkleuren (`--fm-color-1/2/3`) aan de huisstijl aan.
3. Kopieer `fluid-metaballs-loader.js` (pauzeert de animatie als het tabblad niet zichtbaar is, en respecteert `prefers-reduced-motion`).
4. De SVG-filter (`feGaussianBlur stdDeviation="9"`) is behoorlijk GPU-intensief, gebruik dit spaarzaam (één loader tegelijk, niet herhaald op een pagina).

## Bestanden

`fluid-metaballs-loader.html`, `fluid-metaballs-loader.css`, `fluid-metaballs-loader.js`
