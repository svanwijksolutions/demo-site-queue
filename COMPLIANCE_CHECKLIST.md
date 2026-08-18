# COMPLIANCE_CHECKLIST.md — lichte, tekstuele controle van bestaande `done`-sites tegen RULES.md

Dit checklist hoort bij de wekelijkse "Feedback naar regels"-Routine, sectie "Compliance-sweep bestaande sites"
hieronder aan die Routine-prompt toegevoegd op 28-07-2026. Vervult de belofte in `RULES.md` (sectie Footer,
laatste regel): "Komt er een nieuwe of gewijzigde regel bij die ook bestaande sites raakt: retrofit die sites
[...] zie de 'regel-compliance check' in de Routine-instructie."

## Scope — bewust beperkt

Dit is GEEN volledige visuele audit (geen Playwright, geen screenshots, geen subagent, geen Opus). Alleen
controles die met een simpele tekst-/structuurcheck (grep op ruwe bestandsinhoud via de GitHub API, geen
lokale clone nodig) betrouwbaar te doen zijn, tegen lage kosten, wekelijks. Regels die een visueel/CSS-
computed-style-oordeel vereisen (gelijke hoogte, contrast tekst-over-foto, herkenbare iconen, knop-padding)
horen hier NIET bij — die blijven afhankelijk van Sem's eigen review of een losse feedbackronde. Overschat dit
checklist niet: het vangt alleen concrete, grep-bare regressies, geen ontwerpkwaliteit.

## Uitvoering

Voor elk item in `companies.json` met `status: "done"` of `status: "wacht_op_akkoord"` (d.w.z. elke gebouwde,
live site): haal via `get_file_contents` (raw, geen clone nodig voor deze lichte check) de bestanden op die in
de checks hieronder genoemd staan, uit de `repo` van dat bedrijf. Voer elke check uit. Sla per site alleen de TREFFERS (problemen) op, geen "OK"-regels.

## Checks

1. **Footer-disclaimer** (RULES.md, sectie Footer): zoek in `components/footer.html` (of `index.html` als er
   geen losse footer-component is) naar de tekst "ongevraagd ontwerpvoorstel" of "Drivenn Agency". Treft dit:
   meld als probleem, dit mag nergens meer staan.
2. **Implementatiestatus-tekst bij contactformulier** (RULES.md, sectie Formulieren): zoek in `contact.html`
   naar "wordt nog gekoppeld", "voorlopig rechtstreeks" of vergelijkbare "nog niet af"-taal rond het formulier.
3. **Stijlstreepjes** (RULES.md, sectie Content & eerlijkheid): grep op " - " (spatie-streepje-spatie), "–" en
   "—" in de zichtbare tekst van elke HTML-pagina van de site (niet in HTML-comments, class-namen of URL's).
   Losse false positives (bijv. een KVK-nummer met streepje) mag je zelf als niet-relevant wegfilteren, meld
   alleen echte lopende-tekst-treffers.
4. **404-pagina aanwezig** (RULES.md, sectie 404-pagina): bestaat `404.html` in de repo-root? Ontbreekt die:
   meld als probleem.
5. **Niet-indexering** (RULES.md/README): staat er in `robots.txt` een regel `Disallow: /`, en bevat elke
   pagina een `noindex`-meta-tag? Ontbreekt een van beide: meld als probleem.
6. **Footer driedelig blok**: dit wordt al apart en automatisch gerepareerd door PIPELINE.md STAP 4
   (footer-retrofit), hoef je hier niet nogmaals te checken.
7. **Zwevende ronde "+"-knop** (RULES.md, sectie Zwevende UI-elementen): een betrouwbare grep is lastig, doe
   een lichte heuristiek: zoek in de CSS naar een regel die `position: fixed` combineert met zowel
   `border-radius: 50%` als een `bottom`/`right`-positionering in dezelfde of een aangrenzende regel. Twijfel
   je: meld het als "mogelijk, handmatig checken" in plaats van te gokken.

## Rapportage

Geen enkele treffer op geen enkele site: schrijf niets, geen lege log-entry.

Wel treffers: voeg een gedateerde sectie toe aan `compliance-log.md` (maak het bestand aan als het nog niet
bestaat) met per site de gevonden problemen, en neem dezelfde bevindingen kort op in het afsluitende bericht
van deze Routine-run (samen met eventuele nieuwe regels uit het "Feedback naar regels"-deel hierboven). Voeg
NOOIT zelf een fix toe vanuit deze sweep — alleen signaleren, Sem beslist en een fix loopt via de normale
kleine-aanpassing- of feedback-subagent-route.
