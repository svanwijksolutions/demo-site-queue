# Stroke-draw button

Ghost-knop waarvan de afgeronde rand zichzelf tekent (SVG `stroke-dashoffset`) bij hover en op een rustige, doorlopende cyclus. Puur CSS/SVG plus een klein stukje JS voor de idle-cyclus.

## Wanneer gebruiken

CTA-knoppen op een donkere of foto-achtergrond, waar een tactiele hover-respons gewenst is zonder zware beweging. Werkt het best als secundaire actie naast een "gevulde" primaire knop.

## Hoe te gebruiken

1. Kopieer de knop-markup uit `stroke-draw-button.html`, pas het label aan.
2. Kopieer `stroke-draw-button.css` en stel `--sd-accent` in op de accentkleur van de site.
3. Kopieer `stroke-draw-button.js` als de doorlopende idle-cyclus gewenst is (rand tekent zichzelf om de paar seconden, ook zonder hover). Puur hover-only nodig? Dan is de JS overbodig, de hover-variant werkt al met CSS alleen.
4. `stroke-dasharray` in de CSS (480) hoort bij de standaard knopafmeting in de HTML. Wijzig je de knopgrootte fors, herbereken dan de dasharray (ongeveer `2 * (breedte + hoogte)`).

## Bestanden

`stroke-draw-button.html`, `stroke-draw-button.css`, `stroke-draw-button.js`
