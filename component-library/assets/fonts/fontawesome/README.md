# Font Awesome webfonts (onvolledige set)

Aangeleverde bestanden:
- `fa-brands-400.eot`
- `fa-brands-400.woff2`
- `fa-regular-400.ttf`

## Status: nog niet direct bruikbaar

Dit is een deel van een Font Awesome-download. Er ontbreken essentiële stukken om dit als iconenset in een site in te zetten:
- De Font Awesome **CSS** zelf (bijv. `all.min.css` of `fontawesome.min.css` + de brands/regular/solid stylesheets) die de `@font-face`-declaraties en de klasse-naar-icoon-mapping (`.fa-*` klassen naar unicode-glyphs) bevat. Zonder die CSS zijn losse lettertype-bestanden niet te gebruiken.
- De **solid**-variant (`fa-solid-900`), die in de praktijk het meest gebruikte gewicht is.
- Voor `fa-regular` ontbreekt de `.woff2` (alleen `.ttf` aanwezig) en voor `fa-brands` ontbreekt de `.ttf`/`.woff` — geen van beide sets is dus compleet voor brede browserondersteuning.

## Huidige standaard blijft: handgemaakte SVG-sprites

Elke site in deze pipeline gebruikt een eigen `assets/icons/sprite.svg` met handgemaakte SVG-iconen (zie bijv. `ziehaarstralen-demo` en `vanoostenvoorvis`). Dat blijft de standaard, want:
- geen externe lettertype-dependency of FOUT/flits bij laden,
- volledige controle over stijl (past bij "geen kunstmatig/nep-ogende iconen"),
- werkt zonder build-stap, direct op GitHub Pages.

## Wanneer dan wel gebruiken

Alleen als een specifiek bedrijf om een reden merkiconen nodig heeft die niet praktisch met de hand te tekenen zijn (bijv. een breed palet aan social-media-merkiconen). Vraag in dat geval eerst om de ontbrekende bestanden (volledige Font Awesome CSS + het `fa-solid`-gewicht) voordat je deze fonts daadwerkelijk in een site laadt.
