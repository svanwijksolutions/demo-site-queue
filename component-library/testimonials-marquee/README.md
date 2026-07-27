# Testimonials marquee

Eén horizontale balk met reviewkaarten naast elkaar die traag naar links doorloopt (oneindige loop), pauzeert bij hover/focus, en een uitvloeiende rand links/rechts (mask-image). Ontstaan uit feedback van Sem op Zie Haar Stralen: reviews moeten "naast elkaar" staan en "een soort van bewegen in een balk", in plaats van de verticale kolommen van `testimonials-columns/`.

Vertaald naar pure CSS, geen JavaScript nodig: de infinite-scroll-illusie werkt met een CSS `@keyframes`-animatie op een track waarvan de kaarten-set exact verdubbeld is (zelfde patroon als `testimonials-columns/`, maar horizontaal in plaats van verticaal).

## Wanneer gebruiken

- Alleen als er **echte** reviewquotes bekend zijn (`quotes_bekend: true` in `companies.json`). Geen quotes bekend? Dan deze sectie overslaan, geen tekst verzinnen.
- Past goed als Sem/de klant een lange lijst reviews aanlevert (10+) die je niet allemaal apart wilt uitschrijven, en er nadrukkelijk om vraagt dat reviews "naast elkaar" en "bewegend" getoond worden. Wil de klant liever een rustige, statische lijst: gebruik gewone kaarten of `testimonials-columns/` in plaats van deze marquee.
- Neem reviewteksten **1:1** over zoals aangeleverd, nooit inkorten met eigen woorden of aanvullen. Is een review erg lang, gebruik dan de ingebouwde `-webkit-line-clamp` in `.tm-quote` om 'm netjes af te kappen in de kaart (de volledige tekst blijft dan wel correct, alleen visueel afgekapt), verzin nooit een eigen samenvatting.
- Toont sterren als vast 5-sterren-icoon-rijtje per kaart, niet het numerieke cijfer dat sommige reviewplatforms tonen (bijv. "9,3") als de klant zelf aangeeft dat dat toch een 5-sterrenbeoordeling is/voorstelt.

## Hoe te gebruiken

1. Kopieer de HTML-structuur uit `testimonials-marquee.html`, vul 'm met de echte reviews van het bedrijf (naam + volledige quote, geen samenvatting).
2. **Belangrijk:** plak de complete set kaarten twee keer achter elkaar in `.tm-track` (zie commentaar in het bestand) — de animatie schuift precies 50% naar links, dat moet naadloos aansluiten op een identieke tweede set. Zet `aria-hidden="true"` op de tweede (dubbele) set zodat schermlezers niet elke review twee keer voorgelezen krijgen.
3. Vervang `assets/icons/sprite.svg#icon-star` door het sterretjes-icoon van de site zelf (of voeg een `icon-star`-symbool toe aan de sprite als die er nog niet is).
4. Kopieer `testimonials-marquee.css` en pas de custom properties bovenin aan de site-eigen kleuren/typografie aan (zie `--tm-*` variabelen, deze vallen terug op de bestaande site-variabelen als die al gedefinieerd zijn).
5. Stel `--tm-duration` in op de sectie op basis van het aantal kaarten (vuistregel: circa 4-6 seconden per kaart voor een rustig, goed leesbaar tempo, bijv. `--tm-duration: 90s;` bij 16 kaarten).
6. `prefers-reduced-motion: reduce` zet de animatie stil én maakt de balk handmatig horizontaal scrollbaar (`overflow-x: auto`), zodat niets ontoegankelijk wordt.
7. De balk pauzeert automatisch zodra een bezoeker er met muis of toetsenbord in is (hover/focus-within), zodat een review rustig uitgelezen kan worden.

## Bestanden

- `testimonials-marquee.html` — voorbeeldmarkup met twee identieke kaarten-sets
- `testimonials-marquee.css` — styling + animatie, met aanpasbare custom properties
