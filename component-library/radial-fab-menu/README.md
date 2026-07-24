# Radial FAB menu

Ronde actieknop met een plus-icoon dat naar een kruisje draait, waarbij een aantal icoon-knoppen radiaal uitwaaieren in een gestaffelde veeranimatie. Volledig toetsenbord- en klik-buiten-toegankelijk.

## Wanneer gebruiken

Snelle acties bundelen achter één knop, bijvoorbeeld "bellen / whatsapp / e-mail / route" op een contactpagina, of "delen / bewaren / afdrukken" bij een aanbod. Zes items is het maximum voor een leesbare waaier, bij minder items gewoon overbodige `.rfab-item`-knoppen verwijderen.

## Hoe te gebruiken

1. Kopieer de markup uit `radial-fab-menu.html`, vervang de SVG-iconen door de eigen set (of hergebruik de site-eigen sprite via `<use>`).
2. Kopieer `radial-fab-menu.css`, pas `--rfab-accent` en de afstand (`translate()`-waardes bij `.rfab--open .rfab-item`) aan.
3. Kopieer `radial-fab-menu.js`. Opent/sluit op klik, sluit bij klik buiten het menu of op Escape. Werkt zonder auto-cyclus, puur op gebruikersinteractie (in tegenstelling tot een eerdere demo-versie die zichzelf automatisch opende, dat hoort niet in een echte site).

## Bestanden

`radial-fab-menu.html`, `radial-fab-menu.css`, `radial-fab-menu.js`
