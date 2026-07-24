# RULES.md — vaste regels voor elke demo-site

Dit bestand is de **enige bindende bron** voor regels die voor élke demo-site gelden, nu en in de toekomst. Bij elke build (nieuw bedrijf of retrofit van een bestaande site) leest de bouwende subagent dit bestand vers uit de repo, ook als de bouwinstructie in de Routine zelf op dat punt iets anders of ouders zegt. **RULES.md wint altijd.**

**Staande afspraak met Sem (sinds 24-07-2026):** feedback die Sem op welk moment dan ook geeft over hoe sites eruit moeten zien, moeten werken of zich moeten gedragen, wordt hier vastgelegd als permanente regel, niet alleen toegepast als eenmalige aanpassing. Zie `README.md`, sectie "Feedback en regels", voor hoe dat proces werkt.

## Techniek & hosting
- Losse HTML/CSS/JS, geen framework, altijd relatieve paden (gehost op `svanwijksolutions.github.io/<repo>/`, een sub-pad).
- GitHub Pages via self-configuring Actions workflow (`.github/workflows/pages.yml`: `actions/configure-pages` + `upload-pages-artifact` + `deploy-pages`).
- Elke pagina: `<meta name="robots" content="noindex, nofollow">` + `robots.txt` met `Disallow: /`.
- **Nooit** `svanwijksolutions/waterfordscocktails` aanraken, dat is een ander, ongerelateerd project.

## Content & eerlijkheid
- Nooit prijzen, reviewquotes, geschiedenis, KVK/BTW-nummers of andere feiten verzinnen. Staat iets niet betrouwbaar in de aangeleverde bedrijfsgegevens: eerlijke placeholder of gewoon weglaten, nooit gokken.
- Ziet een aangeleverd feit er overduidelijk als test-/placeholderwaarde uit (bijv. een KVK-nummer als 12345678): overweeg het weg te laten in plaats van kritiekloos te publiceren, en meld dit expliciet in het subagent-rapport zodat een mens het kan beoordelen.
- Staan er wel echte prijzen/tarieven in de bedrijfsgegevens: gebruik die letterlijk, bouw er zo nodig een aparte `prijzen.html` voor met duidelijke prijskaarten.
- Nederlandse tekst bevat geen liggend streepje/gedachtestreepje ( - , – , — ) als stijlmiddel om zinsdelen te scheiden, herschrijf met een punt, komma, dubbele punt of "en"/"met". Correct gespelde koppeltekens in samenstellingen (e-mail) zijn gewoon toegestaan. Grep hier expliciet op vlak voor het pushen.

## Beeldmateriaal
- Alleen echte, door de klant aangeleverde foto's (`uploads/<id>/`) of handgemaakte SVG/CSS-vormgeving (geometrische lijniconen, monogrammen, gradients, abstracte vormen).
- Nooit AI-gegenereerde "foto's", ongeacht hoe fotorealistisch, en geen kunstmatig/nep-ogende iconen of AI-art-stijl illustraties (geen 3D-blob-mascottes, geen generieke stockfoto-achtige AI-mensen). Doe nooit alsof gegenereerd beeld een echte foto van dit specifieke bedrijf is.
- Elke foto in een vaste aspect-ratio container (`object-fit: cover; object-position: center;`), nooit uitgerekt/vervormd, met kloppende `alt`-tekst en echte `width`/`height`.

## Taal
- Standaard Nederlands. Meertalig (met clientside taalswitcher, geen aparte URL's per taal) bij bedrijven met een duidelijk internationaal publiek. Zie `README.md` voor de volledige uitleg van de implementatie.

## Footer (staande regel sinds 24-07-2026, disclaimer verwijderd 24-07-2026)
- **Geen** footer-disclaimer meer. De eerdere tekst ("Dit is een ongevraagd ontwerpvoorstel van Drivenn Agency...") mag nergens meer getoond worden, op geen enkele site, geen uitzonderingen. `noindex, nofollow` + `robots.txt: Disallow: /` blijven wel gewoon staan, die regelen de niet-indexering al.
- Footer-onderkant (`.footer-bottom`) bevat ALTIJD een driedelig blok: links copyright (`&copy;` huidig jaar + bedrijfsnaam, plus KVK-nummer als dat bekend is), in het midden "Website gemaakt door S. van Wijk Solutions" met een link naar `https://svanwijksolutions.nl` (`target="_blank" rel="noopener"`), rechts een klikbare link naar de privacyverklaring (`privacy.html`). Op mobiel onder elkaar (`flex-direction: column`), vanaf ongeveer 768px breed op één rij met ruimte ertussen (`justify-content: space-between; align-items: center`).
- Geldt voor élke site, inclusief bestaande `done`-sites. Komt er een nieuwe of gewijzigde regel bij die ook bestaande sites raakt: retrofit die sites net zoals hier gebeurd is, zie de "regel-compliance check" in de Routine-instructie.

## Bewegende elementen
- Load-getriggerde CSS-animaties, hover-effecten en doorlopende subtiele beweging mogen altijd, met een `prefers-reduced-motion`-fallback naar geen animatie.
- Nooit een `IntersectionObserver` die content op `opacity: 0` laat staan totdat er gescrold wordt. Content moet altijd zichtbaar zijn zonder dat scrollen daar een harde voorwaarde voor is.
- Zelftekenende SVG-iconen mogen: een lijnicoon met `stroke-dasharray`/`stroke-dashoffset` die zichzelf "tekent" bij scroll-in-beeld of page-load, mits met dezelfde `prefers-reduced-motion`-fallback.

## Zwevende UI-elementen
- **Nooit** een zwevende ronde "+"-knop (radial FAB/quick-actions-menu) rechtsonder in beeld, ongeacht wat erachter zit (bellen/route/social). Dat patroon mag niet meer gebruikt worden, op geen enkele site.
- Wil een site snelle acties (bellen, route, contact): verwerk die gewoon inline in de header/hero/footer, geen zwevend element eroverheen.

## Pitchmail
- Nooit automatisch versturen, alleen als concept klaarzetten in `pitches/<id>.md`.

## Wijzigingslog
- **24-07-2026**: bestand aangemaakt. Bestaande regels uit `README.md` en de Routine-instructie hierin samengevoegd tot één bindende bron, zodat toekomstige regelwijzigingen een gewone git-commit worden in plaats van een bewerking van de grote Routine-prompt. Footer-regel (driedelig blok) vastgelegd naar aanleiding van Sem's feedback.
- **24-07-2026**: naar aanleiding van feedback op Van Oosten voor Vis: footer-disclaimer volledig geschrapt ("hoef ik nergens meer te zien ooit"), en een nieuwe regel toegevoegd tegen zwevende "+"-knoppen rechtsonder ("dat plusje rechtsonder hoef ik nooit te hebben op een website"). Beide gelden voor alle sites, ook bestaande.
