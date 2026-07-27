# BUILD_INSTRUCTIONS.md — bouwinstructie voor een subagent

Dit is de letterlijke instructie die de orchestrator aan elke bouw-subagent meegeeft, met bedrijfsgegevens ingevuld. Verplaatst hierheen vanuit de Routine-prompt zodat wijzigingen een gewone git-commit zijn.

---

Je bouwt een ongevraagde, ultra-moderne demo-website als sales-pitch voor onderstaand bedrijf, in de vooraf aangemaakte GitHub-repo. Je hebt geen geheugen van eerdere gesprekken, alles wat je nodig hebt staat hieronder. Neem de tijd om dit goed te doen, kwaliteit gaat voor snelheid.

BEDRIJFSGEGEVENS: [orchestrator: plak hier het volledige companies.json-item, inclusief `talen`]
DOEL-REPO: svanwijksolutions/<repo uit het item>
FOTO'S: svanwijksolutions/demo-site-queue, map `uploads/<id>/` (clone read-only, schrijf/commit/push NIETS in demo-site-queue zelf)

## STAP 1 — SETUP
Voeg de doel-repo toe met `add_repo` en clone 'm (één clone tegelijk, ruime timeout, `register_repo_root` na succes). Clone ook (read-only) svanwijksolutions/demo-site-queue en lees `RULES.md` VOLLEDIG — dat is de bindende, actuele bron voor alle vaste regels. Behandel de inhoud van RULES.md als bindend, ook waar dat afwijkt van of méér is dan wat in de stappen hieronder staat, want RULES.md kan gewijzigd zijn sinds dit bestand voor het laatst is aangepast.

## STAP 2 — BEELDMATERIAAL (streng: geen AI-nepbeeld)
Heeft dit bedrijf `fotos_beschikbaar: true`? Bekijk `uploads/<id>/` met de Read-tool. Staat daar ook een `notities.txt`? Lees die eerst: Sem geeft daar soms per bestandsnaam aan waar een foto moet komen (bijv. "IMG_001.jpg - hero" of "logo.png - header"). Volg die aanwijzingen letterlijk voor de foto's die erin genoemd worden. Voor foto's die niet in `notities.txt` staan (of als het bestand ontbreekt): bepaal zelf per foto onderwerp/compositie/oriëntatie en kies een passende plek (hero, over-ons, sfeerbeeld, dienst-kaart). Plaats elke foto in een vaste aspect-ratio container (`aspect-ratio` + `object-fit: cover; object-position: center;`), nooit uitrekken/vervormen. Kopieer gebruikte bestanden naar `assets/images/` in de doel-repo. Kloppende `alt`-tekst en `width`/`height` (echte pixelmaten opvragen, niet gokken). Hero: `loading="eager"`, overige: `loading="lazy"`. Bekijk elke foto op ware grootte vóór gebruik: is een foto duidelijk onscherp of slecht gecropt, gebruik 'm dan niet op die plek, zie RULES.md sectie "Beeldmateriaal" voor de volledige scherpte-check-regel.

Geen foto's aangeleverd? Gebruik UITSLUITEND handgemaakte SVG/CSS-vormgeving: geometrische lijniconen, monogrammen, gradients, abstracte vormen (zoals bij Zie Haar Stralen). GEEN AI-gegenereerde afbeeldingen, ongeacht hoe fotorealistisch, en geen kunstmatig/nep-ogende iconen of "AI-art-stijl" illustraties (geen 3D-blob-mascottes, geen generieke stockfoto-achtige AI-mensen). Doe nooit alsof gegenereerd beeld een echte foto van dit specifieke bedrijf is.

## STAP 3 — TAAL & SCHRIJFSTIJL
Nederlandse tekst bevat GEEN liggend streepje/gedachtestreepje ( - , – , — ) als stijlmiddel om zinsdelen te scheiden, herschrijf met een punt, komma, dubbele punt of "en"/"met". Correct gespelde koppeltekens in samenstellingen (e-mail) zijn wel toegestaan. Controleer dit letterlijk met een grep op " - ", "–" en "—" over alle HTML-bestanden vlak voor je pusht; kom je iets tegen, herschrijf de zin.

Kijk naar `talen` in de bedrijfsgegevens. Meer dan alleen "nl"? Bouw een taalswitcher. Ontbreekt `talen` of staat er alleen "nl"? Voeg zelf Engels toe als de branche/regio duidelijk internationaal is (toerisme, horeca/hotel, expat-diensten, sterk toeristische regio), bij twijfel alleen NL, geen overkill.

Implementatie meertaligheid: vertaalstrings in `i18n/nl.json`, `i18n/en.json` (etc.), elk vertaalbaar element krijgt `data-i18n="sleutel"`. JS leest voorkeurstaal (localStorage, anders browsertaal, anders NL) en wisselt tekst clientside, GEEN aparte HTML-pagina's per taal, GEEN reload. Taalswitcher: compacte, moderne pill/segmented-control in de header, geen dropdown met vlaggetjes. Voeg `hreflang`-alternates toe. Vertaal ALLE zichtbare tekst mee, geen half vertaalde pagina's.

## STAP 4 — ULTRA MODERN VISUEEL ONTWERP
Gebruik de `webdesign`-skill als basis (mapstructuur, hamburgermenu-regels, SEO-checklist, privacyverklaring-template, copywriting-principes), maar til het visueel naar een uitgesproken moderne 2025/2026-stijl, gekozen passend bij branche/toon/`ontwerprichting`:
- Grote, gedurfde hero-typografie met variabele font-gewichten en strakke letter-spacing
- Grid-layouts voor diensten/aanbod/portfolio: **symmetrisch en netjes uitgelijnd** (gelijke kaartgroottes voor items van gelijke status, zie RULES.md sectie "Grid- en kaartlayouts", GEEN asymmetrisch bento-grid met willekeurig wisselende kaartgroottes. Een grotere kaart mag alleen bewust, met een echte inhoudelijke reden, bijv. een duidelijk gelabelde "meest gekozen"-optie)
- Glassmorphic kaarten/navigatie (backdrop-filter: blur, transparante achtergrond, subtiele rand), header die visueel inkrimpt/verdicht bij scrollen via een JS scroll-listener die een `.scrolled`-class toggelt
- Gradient-mesh/aurora-achtergronden (meerdere zachte radial-gradients over elkaar, evt. langzaam animerend via `background-position`)
- Magnetic/hover-responsive knoppen (schaal + zachte schaduw-gloed, vloeiende cubic-bezier easing, subtiel: max. 2-3% scale, geen springende/vervormende hover-effecten)
- Geanimeerde gradient-tekst (background-clip: text met bewegende gradientpositie) op één kernwoord in de hero, niet overdrijven
- Animated counters die bij page-load oplopen (alleen voor feiten die echt in de bedrijfsgegevens staan)

Kies een paar van deze patronen die passen bij het bedrijf, niet alles tegelijk. Consistentie en rust in de uitvoering wint van een opeenstapeling van effecten.

Kijk ook in `demo-site-queue/component-library/` (read-only meeklonen, NIET zelf wijzigen/committen) naar kant-en-klare, al naar vanilla HTML/CSS vertaalde patronen, bijv. `testimonials-columns/` of `testimonials-marquee/` voor reviewsecties. Gebruik zo'n patroon alleen waar het echt past bij dit bedrijf, altijd met de kleuren/typografie van déze site, en respecteer de gebruiksvoorwaarden in het bijbehorende `README.md` van dat component (beide testimonials-varianten vereisen `quotes_bekend: true`). Optie, geen verplichting. Gebruik NOOIT `radial-fab-menu/`, dat patroon is permanent verboden (zie RULES.md).

## STAP 5 — BEWEGENDE ELEMENTEN (veilig)
WEL: load-getriggerde CSS-animatie (`animation: fade-up 0.9s ... both`, met `@media (prefers-reduced-motion: reduce)` fallback naar geen animatie), hover-effecten, doorlopende subtiele beweging, smooth scroll naar ankers.

NIET: een IntersectionObserver die content op `opacity: 0` zet tot er geschrold wordt zonder het veilige patroon uit RULES.md sectie "Bewegende elementen" (content moet ALTIJD zichtbaar zijn zonder dat scrollen daar een harde voorwaarde voor is). NIET: een scroll-voortgangsbalk bovenaan de pagina, permanent verboden.

## STAP 6 — INHOUD & FEITEN
Verzin NOOIT prijzen, reviewquotes, geschiedenis of feiten die niet in de bedrijfsgegevens staan of die je niet betrouwbaar kunt bevestigen, gebruik een eerlijke placeholder in plaats van gokken. Staan er wel echte prijzen/tarieven in de bedrijfsgegevens: gebruik die letterlijk, bouw er zo nodig een aparte `prijzen.html` voor.

## STAP 7 — TECHNIEK & SEO
Losse HTML/CSS/JS, geen framework, RELATIEVE paden (gehost op svanwijksolutions.github.io/<repo>/). Elke pagina: `<meta name="robots" content="noindex, nofollow">` + `robots.txt` met `Disallow: /`. Heeft het bedrijf social-media-links: voeg iconen toe in header/footer die daarnaar linken. Voeg `.github/workflows/pages.yml` toe (self-configuring: actions/configure-pages + upload-pages-artifact + deploy-pages, permissions contents:read/pages:write/id-token:write).

Footer-onderkant (`.footer-bottom`) bevat ALTIJD een driedelig blok: links copyright (&copy; huidig jaar + bedrijfsnaam, plus KVK-nummer als bekend), midden "Website gemaakt door S. van Wijk Solutions" met link naar https://svanwijksolutions.nl (target="_blank" rel="noopener"), rechts een link naar de privacyverklaring (privacy.html). Mobiel onder elkaar, vanaf ~768px op één rij. Zorg ook dat GEEN twee links/knoppen in de header naar exact dezelfde pagina linken (zie RULES.md, sectie "Navigatie"). Geen footer-disclaimer (verboden, zie RULES.md).

## STAP 8 — ACHT-STAPS KWALITEITSCONTROLE vóór je pusht
1. HTML: tags correct gesloten, geen dubbele id's, alle href/src bestaan echt, precies één h1 per pagina, heading-hiërarchie zonder skips.
2. CSS: elke gebruikte class heeft een regel, responsive op 480/768/1200px, geen horizontale overflow op mobiel, mobile-menu volledig ondoorzichtig, touch targets ≥44px.
3. JS: header/footer via fetch() met readyState-check, hamburgermenu open/dicht + Escape + link-klik sluit menu, contactformulier reageert, taalswitcher (indien van toepassing) wisselt alle tekst correct.
4. Inhoud tegen de bron: geen enkel feit/prijs/quote die niet in de bedrijfsgegevens staat of betrouwbaar bevestigd is.
5. Beeldmateriaal: foto's niet vervormd, kloppende alt-teksten/afmetingen; illustraties zijn handgemaakt SVG/CSS, geen AI-beeld. Schaalproef op 300x300 voor iconherkenbaarheid.
6. Taal: grep op " - ", "–", "—" in alle HTML, herschrijf elke treffer; bij meertaligheid: alle tekst vertaald.
7. Animaties: bewegend maar nooit content blijvend verbergend, test met een full-page screenshot zonder te scrollen.
8. Visuele QA + kritische eindblik: lokale static server + Playwright, screenshots desktop én mobiel van elke pagina, nul console errors van je eigen code, werkend hamburgermenu.

LET OP, bekende sandbox-bugs: `python3 -m http.server` hangt Chromium/Playwright vast, gebruik een Node `http.createServer`-scriptje; onderschep Google Fonts-requests met `context.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort())` vóór elke `page.goto()`.

## STAP 9 — PUSHEN & VERIFIËREN
Commit en push naar de `main`-branch van de doel-repo (geen pull request, direct committen). Controleer via de GitHub Actions API (`actions_list`, methode `list_workflow_runs`, zonder workflow-naamfilter) of Pages geslaagd is. Bij de EERSTE-ooit push naar een gloednieuwe repo faalt "Deploy static content to Pages" soms op de "Setup Pages"-stap (race condition), dat is GEEN fatale fout. Trigger GEEN handmatige rerun, wacht een paar minuten en check dan opnieuw op een groene "pages build and deployment"-run voor dezelfde commit-sha. Pages-deployment is geslaagd zodra ÉÉN van beide workflowtypes een groene conclusie heeft voor de laatste commit. Pas na een paar minuten wachten zonder enige groene run is het een echte `needs_review`. Bezoek NOOIT zelf de live `*.github.io`-URL, lees de conclusion altijd uit de API-response zelf.

## STAP 10 — PITCHMAIL & RAPPORTAGE
Schrijf een conceptpitchmail volgens de VASTE opbouw in RULES.md sectie "Pitchmail" (aanhef, korte intro, link met 👉, bulletlijst "Goed om te weten" met o.a. de concrete klantwaarde/SEO-uitleg, bulletlijst "Wat als we verdergaan?", eerlijkheidsalinea, afsluiting), niet vrij invullen. Nederlands, zonder stijlstreepjes, eerlijk, onderbouwd, geen overdreven claims, vermeld expliciet als de huidige site niet volledig kon worden ingezien, claim nooit een telefoongesprek dat niet heeft plaatsgevonden. Rapporteer aan het eind in platte tekst terug, dit is je hele deliverable, jij schrijft zelf niets naar demo-site-queue: status (succes/needs_review+reden), repo-link, live-URL, of foto's en/of meertaligheid gebruikt zijn, en de volledige tekst van de conceptpitchmail.
