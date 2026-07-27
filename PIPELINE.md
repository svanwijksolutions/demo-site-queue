# PIPELINE.md — orchestratie-instructies voor de nachtelijke demo-site pipeline

Dit is DE bindende bron voor hoe een nachtelijke pipeline-firing zich moet gedragen. De Routine-triggers zelf bevatten alleen een korte verwijzing hierheen (welk blok van de nacht het is), zodat wijzigingen aan het proces een gewone git-commit zijn in plaats van een bewerking van drie losse, bijna-identieke Routine-prompts.

Je bent de ORCHESTRATOR. Bevestigd getest: sessies die via "verse sessie per keer" worden gestart hebben GEEN toegang tot `mcp__github__` of `mcp__Claude_Code_Remote__` tools, daarom draaien de drie nachtblokken in dezelfde bestaande, persistente sessie. Delegeer elk bedrijf/elke sitefix aan een eigen achtergrond-subagent via de Agent-tool (`subagent_type: "general-purpose"`, `run_in_background: true`), subagents erven je volledige toolset inclusief GitHub-tools.

## CONTEXT (geldt voor elk blok)

- Privé queue-repo: `svanwijksolutions/demo-site-queue`. Bevat `companies.json` (wachtrij), `pitches/` (conceptpitchmails), `uploads/<id>/` (aangeleverde foto's), `component-library/` (herbruikbare UI-patronen), `RULES.md` (DE bindende bron voor site-regels, altijd vers uitlezen), `README.md` (volledige procesdocumentatie), `BUILD_INSTRUCTIONS.md` (bouwinstructie voor nieuwe sites, geef dit letterlijk mee aan bouw-subagents), `FEEDBACK_FIX_INSTRUCTIONS.md` (instructie voor het verwerken van feedback op een bestaande site), `scripts/generate_overzicht.py` + `overzicht.xlsx` (Excel-overzicht voor Sem).
- svanwijksolutions is een PERSOONLIJK GitHub-account, GitHub Apps kunnen daar nooit zelf repo's aanmaken. Elk nieuw bedrijf heeft dus een handmatig aangemaakte lege repo nodig (`<id>-demo`) voordat het opgepakt kan worden.
- `*.github.io` en de meeste externe sites zijn geblokkeerd door het netwerkbeleid van deze sandbox. Verifieer live sites via de GitHub Actions-status, nooit door de URL zelf te bezoeken. GitHub's bijlage-CDN (`user-images.githubusercontent.com`, `github.com/user-attachments/...`) is ook geblokkeerd, bevestigd getest, gebruik daarom nooit foto's die als bijlage in een issue zitten, alleen foto's die als bestand in de repo zelf staan (`uploads/<id>/`).
- **NOOIT** `svanwijksolutions/waterfordscocktails` aanraken.
- Scan NOOIT automatisch andere repo's in het svanwijksolutions-account op "lege" repo's om daar zomaar demo-code in te zetten. Meerdere repo's in dit account (bijv. bakkerij-peterse, jjgiezeschilderwerk, zosiavalstartherapie, wasserijdewaslijn, tomacoaching, waterfords-cms, saarloosvastgoed) zijn echte, lopende klantprojecten die niets met deze pipeline te maken hebben. Deze pipeline werkt uitsluitend met bedrijven die via `companies.json` (aangemaakt vanuit een "nieuw-bedrijf"-issue) in de wachtrij staan.

## Welk blok is dit?

De aanroepende Routine-prompt vertelt je welk blok dit is (1, 2 of 3) en hoeveel uur geleden blok 1 vermoedelijk startte. Dat bepaalt alleen het **nachtbudget** hieronder, de rest van de stappen zijn voor elk blok identiek.

## Nachtbudget (voorkomt dat drie blokken samen te veel verbruiken)

Sem's Claude Pro-tegoed werkt met een rollend 5-uur-venster én een wekelijkse limiet. Drie blokken per nacht mogen NIET drie keer zoveel doen als de oude, enkele nachtrun. Reken daarom bij elk blok eerst uit wat er dit "nacht-venster" (sinds blok 1, dus ruwweg de laatste 5-10 uur, gebruik het aantal uur dat de trigger-prompt meegeeft) al gedaan is, en trek dat af van het totale nachtbudget:

- **Maximaal 2 nieuwe bedrijf-builds per nacht, in totaal over alle drie de blokken samen.** Tel dit door commit-berichten op `companies.json` te doorzoeken die beginnen met `NIEUWE BUILD:` binnen het venster: `git log --since="<N> hours ago" --oneline -- companies.json | grep -c "NIEUWE BUILD:"`. Gebruik voor blok 1 altijd het volledige budget (2), voor blok 2 `--since="6 hours ago"`, voor blok 3 `--since="10 hours ago"`.
- **Maximaal 3 feedback-issues verwerkt per nacht, in totaal.** Tel dit via `search_issues` met query `repo:svanwijksolutions/demo-site-queue label:feedback state:closed closed:>=<ISO-tijdstip N uur geleden>` (bereken het tijdstip met `date -u -d "-<N> hours" +%Y-%m-%dT%H:%M:%SZ`, zelfde N als hierboven).
- Is het budget voor een categorie al op: sla die categorie dit blok over, meld dat kort in je afsluitende samenvatting, geen subagent spawnen voor iets waar toch geen budget meer voor is.
- **Intake-issues verwerken (nieuwe bedrijven in companies.json zetten) telt NIET mee voor dit budget** — dat is alleen tekst parsen en een JSON-bestand bijwerken, geen bouw-werk, mag altijd elk blok.

## STAP 1 — Setup
Zorg voor een actuele lokale clone van `svanwijksolutions/demo-site-queue` (git pull, of add_repo+clone als je 'm nog niet hebt).

## STAP 2 — Intake-issues verwerken (nieuwe bedrijven)
Lijst open issues met label `nieuw-bedrijf` op (`search_issues` of `list_issues`, `repo:svanwijksolutions/demo-site-queue`). Voor elk issue dat nog GEEN corresponderend item in `companies.json` heeft (vergelijk op de ingevulde `id`):

1. Parse de issue-body (GitHub Issue Forms renderen elk veld als `### <label>` gevolgd door de ingevulde waarde, of `_No response_` als leeg).
2. Ontbreekt `id`, `bedrijfsnaam`, `branche` of `diensten` (verplichte velden): reageer op het issue dat er verplichte info mist en welke, laat het issue OPEN staan (niet verwerkt), ga door naar het volgende issue.
3. Bepaal `fotos_beschikbaar`: bestaat `uploads/<id>/` al met bestanden erin? Dan `true`, anders `false`.
4. Bepaal `repo_ready` en `repo`: is de checkbox "Ik heb de lege GitHub-repo al aangemaakt" aangevinkt? Dan `repo_ready: true`, `repo: "<id>-demo"`. Anders `repo_ready: false`, `repo: "<id>-demo"` (verwachte naam, nog niet bevestigd).
5. Voeg een nieuw item toe aan `companies.json` met alle geparste velden, `status: "pending"`, `talen` als array (split op komma, trim spaties, default `["nl"]` als leeg), `notities` = de ingevulde notities plus, indien relevant, een vermelding dat de repo nog aangemaakt moet worden.
6. Ververs `overzicht.xlsx` (`python3 scripts/generate_overzicht.py`, installeer `openpyxl` met pip indien nodig).
7. Commit (bericht: `Intake: <bedrijfsnaam> toegevoegd aan wachtrij (issue #<nummer>)`) en push.
8. Reageer op het issue met een korte bevestiging (wat is toegevoegd, of de repo nog aangemaakt moet worden) en sluit het issue.

Dit mag ELK blok gebeuren, telt niet mee voor het nachtbudget.

## STAP 3 — Feedback-issues verwerken
Lijst open issues met label `feedback` op. Verwerk er maximaal zoveel als er nog nachtbudget over is (zie hierboven), oudste eerst. Voor elk issue:

1. Parse `site` (repo-naam of bedrijfsnaam) en `feedback` (de vrije tekst) uit de issue-body. Herleid de exacte repo-naam via `companies.json` (`repo`-veld) als een fuzzy match nodig is.
2. Is de checkbox "moet een vaste regel worden" aangevinkt: verwerk dat punt EERST zelf (niet via een subagent) als nieuwe regel in `RULES.md` inclusief een gedateerde Wijzigingslog-regel die verwijst naar issue #<nummer>, commit+push, vóórdat je de subagent voor de sitefix zelf spawnt (zodat de subagent de nieuwe regel al vers kan lezen).
3. Spawn een subagent met de inhoud van `FEEDBACK_FIX_INSTRUCTIONS.md`, met de repo-naam en de letterlijke feedback-tekst ingevuld. Meerdere feedback-issues in dit blok: spawn ze allemaal in ÉÉN bericht, parallel.
4. Wacht op elk rapport. Succes: reageer op het issue met een korte samenvatting van wat is gedaan en sluit het issue. Probleem: reageer met de reden, laat het issue OPEN staan (blijft zichtbaar als openstaand werk, geen needs_review-mechanisme nodig voor losse feedback-issues).

## STAP 4 — Footer-retrofit + vastgelopen `in_progress`-check
Mag elk blok, is idempotent (checkt eerst of er iets te doen is):

- **Footer-retrofit**: voor elke site in `companies.json` met `status: "done"`, controleer of `components/footer.html` al het driedelige `.footer-bottom`-blok heeft (zie `RULES.md`, sectie "Footer"). Ontbreekt dat: voeg het toe met de bestaande copyright-info van die site, commit+push naar de eigen `main`-branch van die site-repo, controleer kort of de Pages-deploy daarna nog slaagt. Heeft een site het al: sla over.
- **Vastgelopen `in_progress`-check**: staat er een item op `status: "in_progress"` waarvan de laatste wijziging in de git-historie van `companies.json` langer dan 24 uur geleden is (`git log -1 --format=%cI -- companies.json` voor dat specifieke moment, of gewoon `git log --follow -p -- companies.json` doorzoeken op wanneer dat id voor het laatst `in_progress` werd)? Zet het terug naar `status: "needs_review"` met reden "vastgelopen in_progress, waarschijnlijk onderbroken run" in `notities`, ververs `overzicht.xlsx`, commit+push.

## STAP 5 — Nieuwe bedrijven bouwen
Alleen zoveel als er nog nachtbudget over is (zie hierboven). Lees `companies.json`, selecteer tot dat aantal items met `status: "pending"` EN `repo_ready: true`. Niets beschikbaar (leeg budget, of geen pending+ready items): meld dat kort, geen subagent spawnen.

1. Zet voor elk gekozen item `status: "in_progress"` in `companies.json`. Commit met een bericht dat begint met `NIEUWE BUILD:` (zie nachtbudget-telling hierboven), bijv. `NIEUWE BUILD: <bedrijfsnaam> opgepakt`. Push.
2. Ververs `overzicht.xlsx`, neem mee in dezelfde commit.
3. Spawn voor ELK gekozen item, in ÉÉN bericht, parallel, een subagent met de VOLLEDIGE inhoud van `BUILD_INSTRUCTIONS.md`, met de bedrijfsgegevens (het hele companies.json-item, inclusief `talen`) ingevuld op de daarvoor bedoelde plek. Elke subagent werkt ALLEEN aan zijn eigen bedrijf/repo, raakt companies.json/pitches NIET zelf aan, rapporteert aan het eind in platte tekst terug.
4. Wacht op elk rapport, race niet vooruit, verzin geen resultaten.
5. Verwerk per rapport, één voor één (voorkomt schrijfconflicten):
   - Succes: schrijf de pitchmail naar `pitches/<id>.md`, werk `companies.json` bij (`status: "done"`, `repo`, `live_url`, `pitch_email_klaar: true`, `afgerond_op`), ververs `overzicht.xlsx`, commit+push.
   - Probleem: zet `status: "needs_review"` met de reden in `notities`, ververs `overzicht.xlsx`, commit+push. Verzin nooit zelf een oplossing namens de subagent.

## STAP 6 — Afsluiten
Sluit af met een duidelijke, beknopte samenvatting van dit blok: welke intake-issues verwerkt zijn, welke feedback-issues verwerkt zijn (en welke nog open staan), welke bedrijven gebouwd zijn (met live-URL), wat het nachtbudget nog toeliet versus wat is overgeslagen, en of de footer-/stale-check iets te doen had. Eindig met één vinkje-regel conform `README.md` sectie "Communicatie".
