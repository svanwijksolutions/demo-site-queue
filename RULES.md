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
- Tekst mag niet als AI-gegenereerd aanvoelen: geen opvultaal ("Hier is het interessante:"), geen "niet X, maar Y"-contrasten als stijltruc, geen bold-first bullets, geen drieledige opsommingen (tricolons) puur voor het ritme, geen vage superlatieven zonder onderbouwing. Zie `reference/deslop/` (bron: `every-app/open-seo`, MIT-licentie) voor de volledige catalogus met voor/na-voorbeelden als een stuk copy nog te "AI" aanvoelt.

## Typografie
- Geen standaard/generieke font-pairings die als AI-sjabloon-default aanvoelen (bijv. Space Grotesk + Inter, of vergelijkbare "elk Vercel-template ziet er zo uit"-combinaties). Kies een karaktervol, onderscheidend display-lettertype dat bij het merk past (een expressieve serif, een warme slab, of een geometrische sans met echt eigen karakter), gecombineerd met een goed leesbaar workhorse-lettertype voor lopende tekst.
- De eis zit vooral in het display-lettertype voor koppen/grote statements, daar valt "generiek AI-template" het meest op. Body-tekst mag een betrouwbare, zeer leesbare sans blijven, leesbaarheid wint daar van originaliteit.
- Voorbeeld: Van Oosten voor Vis gebruikt sinds 24-07-2026 Fraunces (display) + Inter (body) in plaats van Space Grotesk + Inter.

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
- Scroll-getriggerde animaties mogen ook (staande regel sinds 24-07-2026, vervangt het eerdere blanket-verbod op `IntersectionObserver`), maar uitsluitend via dit veilige patroon:
  1. Content staat in de kale HTML/CSS altijd gewoon zichtbaar. Geen `opacity: 0` in een regel die ook zonder JS van kracht is.
  2. JS voegt pas ná het laden een klasse toe aan `<body>` (bijv. `.js-motion`), en alléén als `IntersectionObserver` bestaat én `prefers-reduced-motion` niet aan staat. Alléén onder die klasse geldt een CSS-regel die scroll-elementen initieel verbergt (`.js-motion .scroll-in { opacity: 0; transform: translateY(...); }`), zodat zonder JS, of bij een fout, niets verborgen raakt.
  3. Een `IntersectionObserver` voegt `.in-view` toe zodra een element in beeld komt, wat het weer zichtbaar maakt.
  4. Verplicht vangnet: een timeout (3 à 4 seconden na load) die alsnog `.in-view` forceert op alles wat de observer gemist heeft. Dit voorkomt precies het probleem van eerder: content die permanent onzichtbaar blijft als de observer om wat voor reden dan ook niet vuurt.
  5. Test dit expliciet met een full-page screenshot zonder te scrollen (8-staps kwaliteitscontrole, stap 7): alles moet ook zonder scroll-interactie na een paar seconden zichtbaar zijn.
- Zelftekenende SVG-iconen mogen: een lijnicoon met `stroke-dasharray`/`stroke-dashoffset` die zichzelf "tekent" bij scroll-in-beeld of page-load, mits met dezelfde `prefers-reduced-motion`-fallback.
- Meer ideeën die passen bij "modern, niet standaard": gestaggerde reveals (kaarten na elkaar in plaats van tegelijk), lichte parallax op hero-beelden (`transform: translateY()` gekoppeld aan scrollpositie, met reduced-motion fallback), een scroll-voortgangsbalk, tellers die pas oplopen zodra ze in beeld komen in plaats van alleen bij page-load, microinteracties op iconen bij hover. Kies een paar die bij het merk passen, geen opeenstapeling van alles tegelijk.

## Navigatie
- Heeft een paginasoort (Aanbod, Diensten, Portfolio, enz.) meerdere duidelijke subonderdelen (categorieën, diensttypes, enz.): geef het bijbehorende item in de hoofdnavigatie een uitklapbaar dropdown/mega-menu dat die subonderdelen direct toont en aanklikbaar maakt, in plaats van alleen een link naar de overzichtspagina. Geldt voor elk paginatype waar dit zich voordoet, niet alleen "Aanbod".
- Desktop: dropdown opent bij hover/focus op het navigatie-item, sluit bij het verlaten van het menu of bij Escape, volledig toetsenbord-navigeerbaar.
- Mobiel: geen aparte flyout. De subonderdelen klappen inline uit onder het hoofditem in het mobiele menu (accordion-stijl), geen twee losse interactiepatronen door elkaar.

## SEO
Gedistilleerd uit een technische-SEO-checklist die Sem heeft aangeleverd (bron: `every-app/open-seo`, zie `reference/README.md`). Dit zijn de punten die zonder externe tools/diensten te borgen zijn bij het bouwen:
- Elke pagina een unieke `<title>` (circa 50 tot 60 tekens) en unieke `<meta name="description">` (circa 140 tot 160 tekens), geen dubbele titels/descriptions tussen pagina's onderling.
- Precies één `<h1>` per pagina, kloppende koppen-hiërarchie zonder skips (staat al in de 8-staps kwaliteitscontrole).
- Geen dode interne links en geen "orphan"-pagina's: elke pagina die bestaat, is ook vanuit de navigatie of een andere pagina bereikbaar.
- Correcte canonical URL per pagina (`<link rel="canonical">`), en bij meertalige sites kloppende `hreflang`-alternates (staat al in de bouwinstructie).
- Structured data (JSON-LD) waar relevant, consistent op alle pagina's van een site, niet alleen op de homepage.
- Content staat in de statische HTML zelf, niet achter client-side rendering verstopt. Dit hebben we sowieso al staan (losse HTML/CSS/JS, geen framework) en is ook wat AI-crawlers (GPTBot, ClaudeBot) en gewone zoekmachine-crawlers het makkelijkst kunnen lezen.
- Deze demo-sites blijven zelf altijd `noindex, nofollow` + `robots.txt: Disallow: /` (zie "Techniek & hosting"). Dat is geen tegenstelling met bovenstaande punten: de site is technisch al SEO-klaar zodra een klant 'm live zou zetten en de noindex-regel eraf haalt.

## Zwevende UI-elementen
- **Nooit** een zwevende ronde "+"-knop (radial FAB/quick-actions-menu) rechtsonder in beeld, ongeacht wat erachter zit (bellen/route/social). Dat patroon mag niet meer gebruikt worden, op geen enkele site.
- Wil een site snelle acties (bellen, route, contact): verwerk die gewoon inline in de header/hero/footer, geen zwevend element eroverheen.

## Pitchmail
- Nooit automatisch versturen, alleen als concept klaarzetten in `pitches/<id>.md`.

## Wijzigingslog
- **24-07-2026**: bestand aangemaakt. Bestaande regels uit `README.md` en de Routine-instructie hierin samengevoegd tot één bindende bron, zodat toekomstige regelwijzigingen een gewone git-commit worden in plaats van een bewerking van de grote Routine-prompt. Footer-regel (driedelig blok) vastgelegd naar aanleiding van Sem's feedback.
- **24-07-2026**: naar aanleiding van feedback op Van Oosten voor Vis: footer-disclaimer volledig geschrapt ("hoef ik nergens meer te zien ooit"), en een nieuwe regel toegevoegd tegen zwevende "+"-knoppen rechtsonder ("dat plusje rechtsonder hoef ik nooit te hebben op een website"). Beide gelden voor alle sites, ook bestaande.
- **24-07-2026**: naar aanleiding van verdere feedback op Van Oosten voor Vis: typografie-regel tegen standaard font-pairings toegevoegd (Space Grotesk + Inter voelde als "AI-lettertype" aan), animatieregel verruimd met een veilig scroll-reveal-patroon (rijkere beweging toegestaan, zonder het permanent-onzichtbare-content risico van het eerdere blanket-verbod), nieuwe navigatieregel voor dropdown-menu's bij pagina's met subonderdelen, en een SEO-sectie toegevoegd op basis van door Sem aangeleverd referentiemateriaal (`every-app/open-seo`, zie `reference/`).
