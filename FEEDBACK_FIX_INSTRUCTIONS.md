# FEEDBACK_FIX_INSTRUCTIONS.md — instructie voor het verwerken van feedback op een bestaande site

Dit is de letterlijke instructie die de orchestrator aan een feedback-fix-subagent meegeeft, met de repo-naam en de feedback-tekst ingevuld. Gemodelleerd naar de aanpak die op 27-07-2026 handmatig is gebruikt om feedback op Zie Haar Stralen, Van Oosten voor Vis en ManiMania te verwerken.

---

Je werkt aan een bestaande, live demo-website in de GitHub-repo `svanwijksolutions/<REPO>`. Dit is GEEN nieuwe build, de site staat al live en werkt. Je verwerkt hier een concrete feedbackronde van de opdrachtgever (Sem). Je hebt geen geheugen van eerdere gesprekken, alles wat je nodig hebt staat hieronder.

REPO: svanwijksolutions/<REPO>

FEEDBACK (letterlijk zoals aangeleverd, verwerk elk punt):
<FEEDBACK>

## Setup
Voeg de repo toe met `add_repo`, clone 'm, `register_repo_root` na succes. Clone ook (read-only) `svanwijksolutions/demo-site-queue` en lees `RULES.md` VOLLEDIG, dat is de bindende, actuele bron voor alle vaste regels (kan net zijn aangepast naar aanleiding van deze of eerdere feedback). Behandel RULES.md als bindend.

**Ga nooit uit van een schone, correcte startsituatie** (staande regel sinds 28-07-2026, n.a.v. een geval op Cone6 waar een eerdere feedback-verwerking zelf een bug had geïntroduceerd — mailto-verzending gesloopt plus precies de tekst toegevoegd die inmiddels verboden is — en die pas bij de volgende feedbackronde aan het licht kwam): bekijk `git log --oneline -10` op de site-repo voordat je begint. Staat er een recente commit die aangeeft dat een eerdere sessie al aan (een deel van) dezelfde feedback heeft gewerkt? Beoordeel die wijziging dan zelf kritisch alsof het je eigen werk was (klopt de banner-overlay/contrast echt, werkt het formulier nog, staat er geen verboden patroon in), in plaats van aan te nemen dat die al correct is. Vind je een fout: repareer die gewoon mee en meld het expliciet in je eindrapport, ook als het geen onderdeel was van de feedback die je nu meekreeg.

Werk rechtstreeks op de `main`-branch (geen pull request, commit en push direct, PR's op deze repo's mergen vaak vrijwel direct vanzelf waardoor losse commits erna niet meer aankomen).

## Aanpak
Ga de feedback puntsgewijs na. Zoek zelf uit welk bestand/component elk punt raakt (header, footer, een specifieke pagina, CSS voor een sectie, etc.), en los het concreet op. Twijfel je over de juiste interpretatie van een punt: kies de meest voor de hand liggende lezing en licht je keuze kort toe in je eindrapport, vraag niet om verduidelijking (je kunt niemand bereiken).

Let in het bijzonder op deze staande RULES.md-regels, die vaak relevant zijn bij dit soort feedback:
- Geen scroll-voortgangsbalk, nooit twee header-links naar dezelfde pagina, symmetrische grids/kaarten (sectie "Grid- en kaartlayouts"), verplichte foto-scherpte-check, geen generieke font-pairings (sectie "Lettertype-toolkit").
- Verzin nooit nieuwe feiten (prijzen, cijfers, quotes) die niet al op de site of in `demo-site-queue/companies.json` stonden.

## Kwaliteitscontrole vóór je pusht
HTML-structuur/geen dubbele id's, CSS/responsive op 480/768/1200px, JS/hamburgermenu/formulier werken nog, geen enkel verzonnen feit toegevoegd, foto's niet vervormd met kloppende alt-teksten, grep op " - "/"–"/"—" in eventuele nieuwe tekst, animaties nooit content blijvend verbergend, en een kritische visuele eindblik met lokale static server + Playwright (screenshots desktop + mobiel van elke geraakte pagina). LET OP, bekende sandbox-bugs: `python3 -m http.server` hangt Chromium/Playwright vast, gebruik een Node `http.createServer`-scriptje; onderschep Google Fonts-requests met `context.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort())` vóór elke `page.goto()`.

## Pushen & verifiëren
Commit en push naar `main`. Controleer via de GitHub Actions API (`actions_list`, methode `list_workflow_runs`, zonder workflow-naamfilter) of de Pages-deploy geslaagd is (groene run van "Deploy static content to Pages" of "pages build and deployment" voor je laatste commit-sha). Bij een falende eerste run niet handmatig rerunnen, gewoon een paar minuten wachten en opnieuw checken. Blijft het na een paar minuten rood op beide workflowtypes: meld dat als probleem in je rapport in plaats van te blijven wachten.

## Rapportage
Rapporteer aan het eind in platte tekst terug (dit is je hele deliverable, je schrijft zelf niets naar demo-site-queue en reageert zelf niet op de GitHub-issue): per feedbackpunt wat je precies hebt gedaan, bevestiging van de Pages-deploy-status (of de reden waarom die niet bevestigd kon worden), en de commit-sha.
