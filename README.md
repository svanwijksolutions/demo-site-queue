# demo-site-queue

Interne wachtrij voor Drivenn Agency's demo-site pipeline (svanwijksolutions sandbox). Privé repo — bevat prospectgegevens, aangeleverde foto's en concept-pitchmails, niet bedoeld voor publicatie.

## Hoe het werkt

1. Alle intake gaat sinds 27-07-2026 via **GitHub Issue-formulieren** op deze repo, niet meer via de chat, zie "Een nieuw bedrijf toevoegen" en "Feedback geven" hieronder.
2. Eén keer per nacht (17:00 NL-tijd, zie "Nachtschema en Claude-tegoed" hieronder) verwerkt de pipeline: openstaande intake-issues (nieuw bedrijf → `companies.json`), openstaande feedback-issues (fixes op een bestaande site), en tot het nachtbudget maximaal 1 nieuwe bedrijf-build. Alle stappen staan uitgeschreven in **[`PIPELINE.md`](PIPELINE.md)**, dat is de bindende bron voor het hele proces (de Routine-trigger zelf verwijst er alleen naar).
3. Elke ochtend om 07:00 NL-tijd (mail komt rond 07:30 binnen) krijg je een e-mail met wat er die nacht is gedaan en wat er eventueel nog van jou nodig is (bijv. een lege repo aanmaken).
4. GitHub Apps kunnen op een persoonlijk account geen nieuwe repo's aanmaken, dat is een platformbeperking, geen instelling. **Elk nieuw bedrijf heeft dus nog steeds een handmatig aangemaakte lege repo nodig** (zie hieronder), dat is de enige stap die niet via het formulier gaat.
5. De pipeline draait in één vaste, persistente sessie (bevestigd getest: een "verse sessie per run" krijgt geen toegang tot de GitHub-tools). Elk bedrijf/elke sitefix krijgt wel zijn eigen achtergrond-subagent, die geïsoleerd werkt en pas aan het eind rapporteert.

## Een nieuw bedrijf toevoegen

1. Ga naar [Issues → New issue](https://github.com/svanwijksolutions/demo-site-queue/issues/new/choose) op deze repo en kies **"Nieuw bedrijf voor de demo-site pipeline"**. Het formulier is bewust kort: `id`, bedrijfsnaam, `talen`, de repo-checkbox, en verder één groot vrij-tekstveld waar je gewoon alles in typt wat je over het bedrijf weet (branche, diensten, contactgegevens, adres, reviews, gewenste sfeer, etc., geen vast format nodig). De pipeline destilleert daar zelf de losse velden uit voor `companies.json`, en meldt in de bevestiging op het issue wat het eruit heeft gehaald zodat je kunt checken of dat klopt. Bedenk een korte `id` (slug zonder spaties/hoofdletters, bijv. `bakkerij-devries`), die gebruik je ook voor de foto's en de repo-naam.
2. **Foto's horen niet in het issue** (bijlagen in issues zijn in deze sandbox niet betrouwbaar op te halen, bevestigd getest). Upload foto's apart: ga naar deze repo op github.com, open `uploads/`, maak een nieuwe map met dezelfde `id`, en upload je foto's daar via "Add file" → "Upload files" (mag in één keer met meerdere bestanden, geen limiet van vijf zoals in de chat). Wil je per foto aangeven waar die moet komen (hero, over-ons, een specifieke dienst)? Zet in diezelfde map een tekstbestandje `notities.txt` met per regel de bestandsnaam en een korte omschrijving, bijv. `IMG_001.jpg - grote foto voor de hero`. Geen notities.txt of een foto die er niet in staat? Dan kiest de pipeline zelf een passende plek.
3. Maak op github.com/svanwijksolutions een nieuwe **publieke** repo aan genaamd `<id>-demo`, en vink in het issue-formulier de checkbox "Ik heb de lege GitHub-repo al aangemaakt" aan (kan ook later alsnog, zie punt 5).
4. Dien het issue in. De eerstvolgende nachtrun (verwerkt altijd eerst intake-issues, dus binnen 24 uur) leest het issue, zet er automatisch een item voor in `companies.json`, reageert op het issue met een bevestiging, en sluit het.
5. Was de repo-checkbox niet aangevinkt (of had je 'm nog niet aangemaakt): het item komt er dan met `repo_ready: false` in te staan, en dat zie je terug in de ochtendmail als "nog nodig van jou". Maak de lege repo alsnog aan en zet in `companies.json` zelf `repo_ready: true` (of vraag Claude dat in de chat te doen), dan pakt de eerstvolgende run het op.
6. Vanaf hier is het verder automatisch, tot maximaal 1 nieuwe build per nacht (zie "Nachtschema en Claude-tegoed").

## Feedback geven op een bestaande site

1. Ga naar [Issues → New issue](https://github.com/svanwijksolutions/demo-site-queue/issues/new/choose) en kies **"Feedback op een live demo-site"**. Vul in welke site het betreft en je feedback (één punt per regel werkt het prettigst, hoeft niet per se).
2. Vind je dat een punt voor ELKE toekomstige site zou moeten gelden (niet alleen voor deze ene site): zeg dat er gewoon zelf bij in de tekst (bijv. "dit moet voortaan voor alle sites gelden"), dan wordt het automatisch als permanente regel in `RULES.md` vastgelegd, naast de sitefix zelf. Geen apart vinkje meer nodig.
3. De eerstvolgende nachtrun met nog nachtbudget over (zie hieronder, maximaal 3 feedback-issues per nacht) pakt het op, past de fix toe op de live site, reageert op het issue met een samenvatting, en sluit het bij succes. Lukt iets niet, dan blijft het issue open staan met een toelichting.

## Nachtschema en Claude-tegoed

**Sinds 28-07-2026 vereenvoudigd** (was: drie blokken om 17:00/22:00/02:00 met een gedeeld budget van 2 builds/nacht) om minder Claude-tegoed te verbruiken: de pipeline draait nu nog maar **één keer per nacht, om 17:00 NL-tijd**, plus een **ochtendmail om 07:00**. Er is daarnaast een **wekelijkse limiet** die over alle 5-uur-vensters heen loopt, dus ook met één run per nacht geldt een nachtbudget (maximaal 1 nieuwe bedrijf-build en maximaal 3 feedback-fixes per nacht, zie `PIPELINE.md` voor de precieze telling). Intake-issues verwerken (een nieuw bedrijf in de wachtrij zetten) telt niet mee, dat is alleen tekst parsen, geen bouw-werk.

De ochtendmail (07:00, komt rond 07:30 binnen) draait in een eigen, verse sessie en vat samen wat de nachtrun heeft gedaan: of de build (indien gepland) is gelukt, welke feedback-issues zijn verwerkt, en wat er eventueel nog van jou nodig is (een repo aanmaken, ontbrekende verplichte info in een intake-issue, etc.) — met bovenaan altijd één duidelijke statusregel (gelukt/niet gelukt/niets gepland).

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

**Kans op een vastgelopen `in_progress`-item:** als een run halverwege afbreekt (bijv. door een sessie-onderbreking, zie "Credits en onderbroken runs" hieronder), kan een item op `in_progress` blijven staan zonder dat er ooit een subagent-rapport binnenkomt. Elke nachtrun controleert daarom (zie `PIPELINE.md`, STAP 4), vóór het selecteren van nieuwe `pending`-items: staat er een item langer dan 24 uur op `in_progress`? Zet het dan terug naar `needs_review` met als reden "vastgelopen `in_progress`, waarschijnlijk onderbroken run" in `notities`, ververs `overzicht.xlsx`, commit+push, en laat het gewoon aan Sem over om te beslissen of het opnieuw geprobeerd moet worden (bijv. door het terug op `pending` te zetten).

## Overzicht.xlsx

`overzicht.xlsx` is een leesbaar Excel-overzicht van alle bedrijven in `companies.json` (bedrijfsnaam, contactpersoon, branche, regio, status, repo, live-URL, pitchmail-status, telefoon, e-mail, toegevoegd-op, afgerond-op), automatisch gegenereerd door `scripts/generate_overzicht.py`. Dit bestand wordt **niet handmatig bewerkt** — elke wijziging aan `companies.json` (nieuw bedrijf, statuswijziging, afgeronde build) wordt gevolgd door een her-run van dit script en een commit van het bijgewerkte `overzicht.xlsx` in dezelfde commit. Wil je zelf even snel het overzicht verversen: `python3 scripts/generate_overzicht.py` vanuit de root van deze repo (vereist `openpyxl`).

## Vaste regels

Alle regels die voor élke build gelden (techniek, eerlijkheid/geen verzonnen feiten, beeldmateriaal, taal, footer, robots/noindex, bewegende elementen, pitchmail, enz.) staan in **[`RULES.md`](RULES.md)**, niet meer hier. Dat bestand is de enige bindende bron, bij twijfel of tegenstrijdigheid wint `RULES.md`, ook van wat `BUILD_INSTRUCTIONS.md`/`PIPELINE.md` op dat moment zeggen (die kunnen achterlopen; `RULES.md` wordt live uit de repo gelezen bij elke build).

Zie voor de stap-voor-stap bouwprocedure **[`PIPELINE.md`](PIPELINE.md)** (orchestratie: intake/feedback verwerken, nachtbudget, bedrijven selecteren) en **[`BUILD_INSTRUCTIONS.md`](BUILD_INSTRUCTIONS.md)** (de instructie die elke bouw-subagent letterlijk krijgt), plus de `webdesign`-skill voor mapstructuur/hamburgermenu/SEO-basis.

## Feedback en regels

Feedback op een bestaande site gaat via het feedback-issue-formulier (zie hierboven), niet meer via de chat. **Sinds 24-07-2026 geldt daarnaast als staande afspraak:** feedback die voor ELKE toekomstige site zou moeten gelden (niet alleen deze ene site) wordt vastgelegd als permanente regel in `RULES.md`, met een gedateerde regel in het wijzigingslog onderaan dat bestand. In het feedback-issue-formulier kun je dit expliciet aanvinken zodat het automatisch als regel verwerkt wordt; geeft Sem zulke feedback toch nog een keer in de chat, dan pikt de aparte "Feedback naar regels"-Routine (draait sinds 28-07-2026 wekelijks, op zondag om 16:30 NL-tijd, was dagelijks — vereenvoudigd om tegoed te sparen) dat ook op.

Twijfelt de verwerkende partij (subagent of orchestrator) of iets een eenmalige wens voor die ene site is of een staande regel: behandel het als site-specifiek (geen RULES.md-wijziging) tenzij de checkbox in het formulier expliciet aangevinkt is, of het overduidelijk generiek bedoeld is.

## Communicatie (staande afspraak sinds 27-07-2026)

Elke keer dat er in de chat daadwerkelijk iets is uitgevoerd (een build, een RULES.md/README.md-wijziging, een statusupdate, een fix, etc.), sluit het antwoord af met één korte regel die met een vinkje begint en in het kort samenvat wat er gedaan is, bijvoorbeeld:
`✅ ManiMania en De Keuken van Sandra live gezet, overzicht.xlsx bijgewerkt.`
Dit geldt zowel voor gewone chatberichten als voor de samenvatting aan het eind van elke nachtelijke Routine-run (zowel de bouw-pipeline als de feedback-analyse). Bij "niets gedaan"-runs (leeg wachtrij, geen nieuwe feedback) is een vinkje niet nodig, dan volstaat de korte "niets te doen"-melding zoals al gebruikelijk.

## Credits en onderbroken runs

Alle Routines (de nachtelijke pipeline-run, de ochtendmail, en de "Feedback naar regels"-Routine) draaien op hetzelfde Claude-account en gebruiken dus hetzelfde tegoed. Wat wel en niet zeker is:
- **Zeker:** een Routine is een geplande trigger die blijft bestaan ongeacht of een individuele run lukt. Raakt het tegoed op tijdens een run, dan faalt die ene run, maar de Routine zelf wordt niet verwijderd of uitgeschakeld, hij vuurt gewoon weer op het eerstvolgende geplande moment.
- **Onzeker/niet hard gegarandeerd:** of een halverwege afgebroken run automatisch hervat zodra er weer tegoed is, vóór het volgende geplande moment. Daar is geen document over geraadpleegd waar dat expliciet bevestigd wordt, dus ga er niet blind van uit dat dat gebeurt. Valt de nachtrun (17:00) om, dan pakt de eerstvolgende run (de volgende avond) het verder op — sinds de vereenvoudiging naar één run per nacht (28-07-2026) is er geen later blok diezelfde nacht meer dat kan bijspringen, dat is een bewuste ruil tegen minder tegoedverbruik.
- **Concreet risico, ondervangen:** als een run precies afbreekt nadat een bedrijf op `status: "in_progress"` is gezet maar vóórdat de bijbehorende subagent heeft gerapporteerd, blijft dat item potentieel voor altijd "in bewerking" staan zonder dat iemand het merkt, want alleen `pending`-items worden automatisch opnieuw opgepakt. Zie de check bij "Statussen": elke nachtrun herkent een `in_progress`-item dat langer dan 24 uur stilstaat en zet het terug naar `needs_review`.
- **Wekelijkse limiet:** naast het rollende 5-uur-venster is er ook een wekelijkse limiet die over alle vensters heen loopt. Het nachtbudget (zie "Nachtschema en Claude-tegoed" hierboven) begrenst daarom hoeveel werk één nachtrun mag doen.

## Bekende sandbox-beperkingen

- `*.github.io` en de meeste externe sites (o.a. 21st.dev, Google Maps/Fonts) zijn geblokkeerd door het netwerkbeleid van deze omgeving — subagents kunnen dus niet live naar componentgalerijen kijken voor inspiratie en gebruiken in plaats daarvan de uitgeschreven patroonlijst in `BUILD_INSTRUCTIONS.md`. Live-URL's worden geverifieerd via de GitHub Actions-status, niet door de site zelf te bezoeken.
- **GitHub's eigen bijlage-CDN is ook geblokkeerd** (`user-images.githubusercontent.com`, `github.com/user-attachments/...`), bevestigd getest op 27-07-2026. Dit is precies waarom foto's bij een nieuw bedrijf NIET als issue-bijlage aangeleverd worden, maar apart als bestand in `uploads/<id>/` (zie "Een nieuw bedrijf toevoegen"), dat gaat via git en `raw.githubusercontent.com`, wat wel gewoon werkt.
- Dit netwerkbeleid blokkeert niet alleen de bekende lijst hierboven, maar in de praktijk vrijwel elke willekeurige externe bedrijfswebsite (bevestigd bij o.a. `manimania.nl` en `dekeukenvansandra.nl`, beide met een expliciete `connect_rejected`/403 van de sandbox-proxy zelf, niet van de doelsite). Ga er dus van uit dat de huidige site van een nieuw bedrijf **niet** opgehaald kan worden met WebFetch/curl, ook al lijkt het een gewone publieke site. Vraag de klant altijd om de tekst van de bestaande site handmatig te plakken in de chat in plaats van te proberen 'm te bezoeken.
- **Eerste push naar een gloednieuwe repo faalt soms op de "Setup Pages"-stap** (race condition: Pages moet nog voor het eerst ingeschakeld worden). Bevestigd waargenomen bij zowel `ziehaarstralen-demo` (1x falen, daarna vanzelf hersteld) als `vanoostenvoorvis` (2x falen, ook na een handmatige rerun van de workflow bleef `configure-pages` mislukken). In beide gevallen bouwde een automatische, losstaande GitHub-workflow "pages build and deployment" de site een paar minuten later alsnog succesvol, zonder enig ingrijpen. Bij de daaropvolgende push slaagden beide workflows meteen. **Conclusie: niet handmatig rerunnen bij een gefaalde eerste run** (dat kost alleen tijd en verandert niets), maar gewoon controleren of er een geslaagde "pages build and deployment"-run bijstaat (`actions_list` zonder workflow-naamfilter) voor dezelfde commit-sha. Beschouw de Pages-deployment als geslaagd zodra één van beide workflowtypes een groene run heeft voor de laatste commit. Alleen als geen van beide na een paar minuten slaagt, is `needs_review` op zijn plaats.
