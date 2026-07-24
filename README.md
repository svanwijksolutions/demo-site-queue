# demo-site-queue

Interne wachtrij voor Drivenn Agency's demo-site pipeline (svanwijksolutions sandbox). Privé repo — bevat prospectgegevens, aangeleverde foto's en concept-pitchmails, niet bedoeld voor publicatie.

## Hoe het werkt

1. `companies.json` is de wachtrij. Elke nacht (22:00 NL-tijd) pakt de Routine tot 2-3 items met `status: "pending"` **en** `repo_ready: true` op, bouwt daar een volledige, ultra-moderne demo-website voor met animaties en (indien aangeleverd) echte foto's, zet die live via GitHub Pages, en schrijft een conceptpitchmail naar `pitches/<id>.md` in deze repo.
2. GitHub Apps kunnen op een persoonlijk account geen nieuwe repo's aanmaken — dat is een platformbeperking, geen instelling. **Elk item heeft dus een handmatig aangemaakte lege repo nodig voordat de Routine het oppakt.**
3. Na het aanmaken van de lege repo (publiek, naamgeving `<id>-demo`) zet je `repo_ready` op `true` en vul je `repo` in. Zonder die stap blijft een item gewoon `pending` en verschijnt het in de ochtendsamenvatting als "wacht op repo".
4. Verder is het volledig automatisch: de Claude GitHub App staat op "All repositories", dus een nieuw aangemaakte repo is direct zichtbaar — de Routine hoeft 'm alleen nog aan zijn eigen sessie toe te voegen via `add_repo`, dat gebeurt vanzelf tijdens de run. Jij hoeft alleen de lege repo aan te maken, verder niets.
5. De Routine draait in één vaste, persistente chat (bevestigd getest: een "verse sessie per run" krijgt geen toegang tot de GitHub-tools, dus dat kon niet). Binnen die ene chat krijgt elk bedrijf wel zijn eigen achtergrond-subagent, die geïsoleerd aan zijn eigen repo werkt en pas aan het eind rapporteert — het dichtstbijzijnde alternatief voor "elk bedrijf een eigen uitvoering" dat betrouwbaar werkt.
6. Nieuw bedrijf of foto's toevoegen hoeft niet meer via deze bestanden direct — vertel het gewoon in de chat (met Claude) en die verwerkt het voor je in `companies.json`/`uploads/`.

## Foto's aanleveren (overdag, vóór 22:00)

De Routine heeft geen rechtenvrije foto's van een specifiek bedrijf — die moet jij aanleveren als je wilt dat de site echte foto's gebruikt in plaats van gegenereerde illustraties.

1. Zet de foto's in `uploads/<id>/` in deze repo (willekeurige bestandsnamen, jpg/png/webp), waarbij `<id>` overeenkomt met het `id`-veld in `companies.json`.
2. Zet `fotos_beschikbaar: true` in het item in `companies.json`.
3. De Routine analyseert elke foto (compositie/oriëntatie/onderwerp) en plaatst 'm op een passende plek (hero, over-ons, sfeerbeeld, dienst-kaart) — altijd met een vaste aspect-ratio container + `object-fit: cover`, zodat niets uitgerekt of vervormd wordt, en met beschrijvende alt-tekst.
4. Geen foto's aangeleverd voor een bedrijf (`fotos_beschikbaar: false` of ontbrekend)? Dan valt de Routine terug op gegenereerde illustraties/CSS-vormgeving, zoals bij `ziehaarstralen-demo`.

## Een nieuw bedrijf toevoegen

1. Voeg een object toe aan `companies.json` met minimaal: `id`, `bedrijfsnaam`, `branche`, `contactpersoon`, `contact` (adres, telefoon, email, kvk, huidige_site), `regio`, `diensten`, `reviews`, `ontwerprichting`, `talen` (array, bijv. `["nl"]` of `["nl","en"]` — zie hieronder). Zet `status: "pending"`, `repo_ready: false`, `fotos_beschikbaar: false`.
2. Maak op github.com/svanwijksolutions een nieuwe **publieke** repo aan genaamd `<id>-demo`.
3. Zet `repo_ready: true` en `repo: "<id>-demo"` in het item.
4. (Optioneel) Zet vóór 22:00 foto's in `uploads/<id>/` en `fotos_beschikbaar: true` — zie hierboven.
5. Klaar — de eerstvolgende nachtrun (22:00 NL-tijd) pakt het op (mits er ruimte is, max. 2-3 per nacht).

Makkelijkste route: vertel het gewoon in de chat (met foto's als bijlage), Claude verwerkt de rest.

## Talen

Standaard is elke site alleen Nederlands (`talen: ["nl"]`). Voor bedrijven met internationaal publiek (toerisme, horeca, hotels, expat-diensten, of een toeristische regio) kun je een tweede/derde taal opgeven, bijv. `talen: ["nl", "en"]`. Is `talen` niet gezet, dan mag de bouwende subagent zelf EN toevoegen als de branche/regio duidelijk internationaal is — bij twijfel blijft het bij NL. De taalswitcher wisselt clientside (geen aparte URL's per taal), met vertaalbestanden in `i18n/<taal>.json`.

## Statussen

- `pending` — klaar om opgepakt te worden (zodra `repo_ready: true`)
- `in_progress` — wordt op dit moment gebouwd (voorkomt dubbel oppakken bij overlappende runs)
- `done` — live, pitchmail klaar in `pitches/<id>.md`
- `needs_review` — de Routine is vastgelopen of twijfelde (ontbrekende/tegenstrijdige info, mislukte Pages-build, etc.) — zie `notities` voor de reden. Nooit stilzwijgend verzonnen invullen.

## Vaste regels voor elke build (zie ook `webdesign`-skill, en de volledige bouwinstructie in de Routine)

- Losse HTML/CSS/JS, geen framework, relatieve paden (GitHub Pages sub-pad hosting)
- Ultra modern en visueel rijk: bento-grids, glassmorphism, gradient-mesh achtergronden, grote expressieve typografie — met bewegende elementen (load-animaties, hover-effecten, doorlopende subtiele beweging) die nooit content permanent verbergen (geen scroll-observer die op `opacity: 0` blijft hangen)
- Geen AI-gegenereerde "foto's" en geen kunstmatig/nep-ogende iconen. Alleen: (a) echte foto's die de gebruiker aanlevert in `uploads/<id>/`, correct geplaatst zonder vervorming, of (b) handgemaakte SVG/CSS-vormgeving (zoals het bloem-monogram bij Zie Haar Stralen) — nooit AI-artstijl illustraties of stockfoto-achtige AI-mensen
- Nederlandse tekst zonder liggend streepje/gedachtestreepje ( - , – , — ) als stijlmiddel — herschrijf met een punt, komma, dubbele punt of "en". Correct gespelde koppeltekens in samenstellingen (e-mail) zijn wel gewoon toegestaan
- Meertalig (met moderne taalswitcher) bij relevante bedrijven, zie "Talen" hierboven
- Geen verzonnen prijzen, reviewquotes, geschiedenis of feiten — eerlijke placeholders
- `noindex, nofollow` + `robots.txt: Disallow: /` — het zijn ongevraagde concepten, geen live sites
- Footer-disclaimer: "Dit is een ongevraagd ontwerpvoorstel van Drivenn Agency..."
- GitHub Pages via self-configuring Actions workflow (`.github/workflows/pages.yml`, `actions/configure-pages` + `upload-pages-artifact` + `deploy-pages`)
- 8-staps kwaliteitscontrole vóór elke push (zie Routine-instructie) — niet oppervlakkig 8x hetzelfde checken, maar 8 verschillende invalshoeken
- Pitchmail wordt **nooit verzonden**, alleen klaargezet in `pitches/<id>.md`
- **Nooit** `svanwijksolutions/waterfordscocktails` aanraken — dat is een ander, ongerelateerd project

## Bekende sandbox-beperkingen

- `*.github.io` en de meeste externe sites (o.a. 21st.dev, Google Maps/Fonts) zijn geblokkeerd door het netwerkbeleid van deze omgeving — subagents kunnen dus niet live naar componentgalerijen kijken voor inspiratie en gebruiken in plaats daarvan de uitgeschreven patroonlijst in de Routine-instructie. Live-URL's worden geverifieerd via de GitHub Actions-status, niet door de site zelf te bezoeken.
- **Eerste push naar een gloednieuwe repo faalt soms op de "Setup Pages"-stap** (race condition: Pages moet nog voor het eerst ingeschakeld worden). Bevestigd waargenomen bij `ziehaarstralen-demo`: de allereerste "Deploy static content to Pages"-run faalde op `configure-pages`, maar een automatische, losstaande GitHub-workflow "pages build and deployment" bouwde de site een paar minuten later alsnog succesvol. Bij de daaropvolgende push slaagden beide workflows meteen. Zie dit dus NIET als een harde fout: controleer bij een gefaalde eerste run ook of er een geslaagde "pages build and deployment"-run bijstaat (`actions_list` zonder workflow-naamfilter), en beschouw de Pages-deployment als geslaagd zodra één van beide workflowtypes een groene run heeft voor de laatste commit. Alleen als geen van beide na een paar minuten slaagt, is `needs_review` op zijn plaats.
