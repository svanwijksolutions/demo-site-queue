# Testimonials columns

Drie kolommen met reviewkaarten die traag en oneindig omhoog doorlopen (verschillende snelheid per kolom), met een uitvloeiende rand boven en onder (mask-image). Voelt modern en levendig aan zonder afleidend te zijn.

Vertaald van een React + Tailwind + Framer Motion (`motion/react`) component naar pure CSS. Geen JavaScript nodig: de infinite-scroll-illusie werkt met een CSS `@keyframes`-animatie op een track waarvan de content exact verdubbeld is.

## Wanneer gebruiken

- Alleen als er **echte** reviewquotes bekend zijn (`quotes_bekend: true` in `companies.json`). Geen quotes bekend? Dan deze sectie overslaan, geen tekst verzinnen.
- Past goed bij bedrijven met meerdere (5+) korte, prettig leesbare reviews. Bij maar 1 of 2 reviews is een simpel citaatblok of losse kaarten een beter alternatief dan drie schaarse kolommen.
- Vereist echte naam + rol/context van de reviewer waar mogelijk (bijv. "Bruid, mei 2025" i.p.v. een verzonnen achternaam). Geen avatarfoto beschikbaar? Laat de foto weg en gebruik een initialen-cirkel (zie CSS `.tc-avatar-fallback`) in plaats van een stockfoto of AI-gezicht.

## Hoe te gebruiken

1. Kopieer de HTML-structuur uit `testimonials-columns.html`, vul 'm met de echte reviews van het bedrijf.
2. **Belangrijk:** plak de set kaarten twee keer achter elkaar in elke `.tc-track` (zie commentaar in het bestand) — de animatie schuift precies 50% omhoog, dat moet naadloos aansluiten op een identieke tweede set.
3. Verdeel reviews over de kolommen (bijv. 3/3/3 bij 9 reviews, of minder kolommen bij minder reviews — verwijder dan gewoon de 2e/3e `.tc-column`).
4. Kopieer `testimonials-columns.css` en pas de custom properties bovenin aan de site-eigen kleuren/typografie aan (zie `--tc-*` variabelen, deze vallen terug op de bestaande site-variabelen als die al gedefinieerd zijn).
5. Middelste en derde kolom zijn standaard verborgen onder resp. `768px` en `1024px` breedte (net als het origineel) — op mobiel zie je dus alleen de eerste kolom.
6. `prefers-reduced-motion: reduce` zet de animatie stil (kaarten blijven gewoon leesbaar staan).

## Bestanden

- `testimonials-columns.html` — voorbeeldmarkup met 3 kolommen
- `testimonials-columns.css` — styling + animatie, met aanpasbare custom properties
