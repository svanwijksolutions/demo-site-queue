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

## Component-bibliotheek

`component-library/` in deze repo is een groeiende verzameling kant-en-klare, ultra-moderne UI-patronen (bijv. doorlopende testimonial-kolommen) die je zelf aanlevert (vaak als React/Tailwind/Framer Motion-voorbeeld, bijv. uit een componentgalerij) en die daarna altijd eerst naar pure vanilla HTML/CSS/(desnoods lichte JS) wordt vertaald voordat 'm in de bibliotheek komt — nooit ruwe React/JSX in een site plakken.

Bij elke build kijkt de bouwende subagent of er een passend patroon in `component-library/` staat en gebruikt het waar het bij het bedrijf past, met de kleuren/typografie van de site zelf in plaats van de voorbeeldstyling. Het is een optie, geen verplichte checklist. Zie `component-library/README.md` voor de volledige uitleg en `component-library/testimonials-columns/` als eerste voorbeeld.

Nieuwe componenten toevoegen: plak de code gewoon in de chat (met een korte aanwijzing welk soort sectie het is), Claude vertaalt 'm naar vanilla en zet 'm in een nieuwe map onder `component-library/`.

## Statussen

- `pending` — klaar om opgepakt te worden (zodra `repo_ready: true`)
- `in_progress` — wordt op dit moment gebouwd (voorkomt dubbel oppakken bij overlappende runs)
- `done` — live, pitchmail klaar in `pitches/<id>.md`
- `needs_review` — de Routine is vastgelopen of twijfelde (ontbrekende/tegenstrijdige info, mislukte Pages-build, etc.) — zie `notities` voor de reden. Nooit stilzwijgend verzonnen invullen.

**Kans op een vastgelopen `in_progress`-item:** als een run halverwege afbreekt (bijv. door een sessie-onderbreking, zie "Credits en onderbroken runs" hieronder), kan een item op `in_progress` blijven staan zonder dat er ooit een subagent-rapport binnenkomt. Elke nachtrun controleert daarom bij STAP 3, vóór het selecteren van nieuwe `pending`-items: staat er een item langer dan 24 uur op `in_progress` (vergelijk met `toegevoegd_op`/de laatst bekende commit-tijd op dat item)? Zet het dan terug naar `needs_review` met als reden "vastgelopen `in_progress`, waarschijnlijk onderbroken run" in `notities`, ververs `overzicht.xlsx`, commit+push, en laat het gewoon aan Sem over om te beslissen of het opnieuw geprobeerd moet worden (bijv. door het terug op `pending` te zetten).

## Overzicht.xlsx

`overzicht.xlsx` is een leesbaar Excel-overzicht van alle bedrijven in `companies.json` (bedrijfsnaam, contactpersoon, branche, regio, status, repo, live-URL, pitchmail-status, telefoon, e-mail, toegevoegd-op, afgerond-op), automatisch gegenereerd door `scripts/generate_overzicht.py`. Dit bestand wordt **niet handmatig bewerkt** — elke wijziging aan `companies.json` (nieuw bedrijf, statuswijziging, afgeronde build) wordt gevolgd door een her-run van dit script en een commit van het bijgewerkte `overzicht.xlsx` in dezelfde commit. Wil je zelf even snel het overzicht verversen: `python3 scripts/generate_overzicht.py` vanuit de root van deze repo (vereist `openpyxl`).

## Vaste regels

Alle regels die voor élke build gelden (techniek, eerlijkheid/geen verzonnen feiten, beeldmateriaal, taal, footer, robots/noindex, bewegende elementen, pitchmail, enz.) staan in **[`RULES.md`](RULES.md)**, niet meer hier. Dat bestand is de enige bindende bron — bij twijfel of tegenstrijdigheid wint `RULES.md`, ook van wat de bouwinstructie in de Routine zelf op dat moment zegt (die instructie kan achterlopen; `RULES.md` wordt live uit de repo gelezen bij elke build).

Zie voor de stap-voor-stap bouwprocedure (hoe je het aanpakt, kwaliteitscontrole, push/verify) de volledige bouwinstructie in de Routine zelf, en de `webdesign`-skill voor mapstructuur/hamburgermenu/SEO-basis.

## Feedback en regels

Sem kan op elk moment in de chat feedback geven over hoe sites eruit moeten zien, moeten werken of zich moeten gedragen (bijv. "de footer moet er zo uitzien", "geen AI-illustraties", enz.). **Sinds 24-07-2026 geldt als staande afspraak:** zulke feedback wordt niet alleen toegepast op het moment zelf, maar ook vastgelegd als permanente regel in `RULES.md`, met een gedateerde regel in het wijzigingslog onderaan dat bestand. Waar zinvol wordt een nieuwe regel ook retroactief toegepast op bestaande `done`-sites, via de "regel-compliance check" die de orchestrator elke nachtrun uitvoert (zie de Routine-instructie) — zo hoeft niet elke keer handmatig een specifieke site aangewezen te worden.

Twijfelt de bouwende partij (subagent of orchestrator) of iets een eenmalige wens is of een staande regel: navragen bij Sem in plaats van het zelf te beslissen.

## Communicatie (staande afspraak sinds 27-07-2026)

Elke keer dat er in de chat daadwerkelijk iets is uitgevoerd (een build, een RULES.md/README.md-wijziging, een statusupdate, een fix, etc.), sluit het antwoord af met één korte regel die met een vinkje begint en in het kort samenvat wat er gedaan is, bijvoorbeeld:
`✅ ManiMania en De Keuken van Sandra live gezet, overzicht.xlsx bijgewerkt.`
Dit geldt zowel voor gewone chatberichten als voor de samenvatting aan het eind van elke nachtelijke Routine-run (zowel de bouw-pipeline als de feedback-analyse). Bij "niets gedaan"-runs (leeg wachtrij, geen nieuwe feedback) is een vinkje niet nodig, dan volstaat de korte "niets te doen"-melding zoals al gebruikelijk.

## Credits en onderbroken runs

De twee nachtelijke Routines draaien op hetzelfde Claude-account als de rest van deze chat en gebruiken dus hetzelfde tegoed. Wat wel en niet zeker is:
- **Zeker:** een Routine is een geplande trigger die blijft bestaan ongeacht of een individuele run lukt. Raakt het tegoed op tijdens een run, dan faalt die ene run, maar de Routine zelf wordt niet verwijderd of uitgeschakeld — hij vuurt gewoon weer op het eerstvolgende geplande moment (elke dag, dezelfde tijd).
- **Onzeker/niet hard gegarandeerd:** of een halverwege afgebroken run automatisch hervat zodra er weer tegoed is, vóór het volgende geplande moment. Daar is geen document over geraadpleegd waar dat expliciet bevestigd wordt, dus ga er niet blind van uit dat dat gebeurt.
- **Concreet risico, nu ondervangen:** als een run precies afbreekt nadat een bedrijf op `status: "in_progress"` is gezet maar vóórdat de bijbehorende subagent heeft gerapporteerd, blijft dat item potentieel voor altijd "in bewerking" staan zonder dat iemand het merkt, want alleen `pending`-items worden automatisch opnieuw opgepakt. Zie de nieuwe check hierboven bij "Statussen": elke volgende run herkent een `in_progress`-item dat langer dan 24 uur stilstaat en zet het terug naar `needs_review`, zodat het niet onopgemerkt blijft hangen.

## Bekende sandbox-beperkingen

- `*.github.io` en de meeste externe sites (o.a. 21st.dev, Google Maps/Fonts) zijn geblokkeerd door het netwerkbeleid van deze omgeving — subagents kunnen dus niet live naar componentgalerijen kijken voor inspiratie en gebruiken in plaats daarvan de uitgeschreven patroonlijst in de Routine-instructie. Live-URL's worden geverifieerd via de GitHub Actions-status, niet door de site zelf te bezoeken.
- Dit netwerkbeleid blokkeert niet alleen de bekende lijst hierboven, maar in de praktijk vrijwel elke willekeurige externe bedrijfswebsite (bevestigd bij o.a. `manimania.nl` en `dekeukenvansandra.nl`, beide met een expliciete `connect_rejected`/403 van de sandbox-proxy zelf, niet van de doelsite). Ga er dus van uit dat de huidige site van een nieuw bedrijf **niet** opgehaald kan worden met WebFetch/curl, ook al lijkt het een gewone publieke site. Vraag de klant altijd om de tekst van de bestaande site handmatig te plakken in de chat in plaats van te proberen 'm te bezoeken.
- **Eerste push naar een gloednieuwe repo faalt soms op de "Setup Pages"-stap** (race condition: Pages moet nog voor het eerst ingeschakeld worden). Bevestigd waargenomen bij zowel `ziehaarstralen-demo` (1x falen, daarna vanzelf hersteld) als `vanoostenvoorvis` (2x falen, ook na een handmatige rerun van de workflow bleef `configure-pages` mislukken). In beide gevallen bouwde een automatische, losstaande GitHub-workflow "pages build and deployment" de site een paar minuten later alsnog succesvol, zonder enig ingrijpen. Bij de daaropvolgende push slaagden beide workflows meteen. **Conclusie: niet handmatig rerunnen bij een gefaalde eerste run** (dat kost alleen tijd en verandert niets), maar gewoon controleren of er een geslaagde "pages build and deployment"-run bijstaat (`actions_list` zonder workflow-naamfilter) voor dezelfde commit-sha. Beschouw de Pages-deployment als geslaagd zodra één van beide workflowtypes een groene run heeft voor de laatste commit. Alleen als geen van beide na een paar minuten slaagt, is `needs_review` op zijn plaats.
