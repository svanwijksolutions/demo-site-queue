# Rack focus text

Twee woorden die om beurten scherp en onscherp worden in een trage, filmische ademhaling, met een zachte gloed op het onscherpe woord. Pure CSS/JS (CSS `filter: blur()` aangestuurd door `requestAnimationFrame`), geen dependencies.

## Wanneer gebruiken

Hero of laadscherm voor een merk waar rust, vakmanschap en precisie de toon zetten (fotografie, ambacht, high-end dienstverlening). Niet gebruiken als beide woorden gelijktijdig goed leesbaar moeten zijn, dat is inherent niet het doel van dit effect.

## Hoe te gebruiken

1. Kopieer de twee `.rf-word`-divs uit `rack-focus-text.html`, vul `data-w` én de zichtbare tekst met de eigen twee woorden of een korte zin.
2. Kopieer `rack-focus-text.css`, pas `--rf-accent`/`--rf-text` aan de huisstijl aan.
3. Kopieer `rack-focus-text.js` naar het site-eigen script, of laad apart. De ids `rfWordA`/`rfWordB` moeten overeenkomen met de HTML.
4. Stopt automatisch bij `prefers-reduced-motion` (toont dan gewoon woord 1 scherp, woord 2 zacht) en pauzeert wanneer het tabblad niet zichtbaar is.

## Bestanden

`rack-focus-text.html`, `rack-focus-text.css`, `rack-focus-text.js`
