# compliance-log.md — treffers uit de wekelijkse compliance-sweep (COMPLIANCE_CHECKLIST.md)

Alleen treffers worden hier gelogd, geen "OK"-regels. Zie `COMPLIANCE_CHECKLIST.md` voor de scope en methode
(lichte tekstuele controle via de GitHub API, geen visuele beoordeling, geen fixes vanuit deze sweep zelf).

## 09-08-2026

Sweep uitgevoerd over alle 9 sites met `status: "done"` in `companies.json`: ziehaarstralen, vanoostenvoorvis,
manimania, cone6, dierenkliniek-animalis, bitwizard, meijer-administratievediensten, cocon-b-b,
smithuis-installatie.

### Treffers

**1. Footer-disclaimer, maar dan in `robots.txt` in plaats van de footer** (check 1, RULES.md sectie Footer):
`components/footer.html` is bij beide onderstaande sites al schoon (geen disclaimer meer), maar de tekst leeft
nog voort in de bovenste regel van `robots.txt` als commentaar:

```
# Dit is een concept-website: een ongevraagd ontwerpvoorstel van Drivenn Agency,
# nog geen live/goedgekeurde website van <bedrijfsnaam>.
# Bewust volledig uitgesloten van indexering zolang dat zo is.
```

- `svanwijksolutions/ziehaarstralen-demo` — `robots.txt`
- `svanwijksolutions/vanoostenvoorvis` — `robots.txt`

Beide zijn de twee oudste sites in de wachtrij, gebouwd vóór de disclaimer-ban van 24-07-2026 (zie RULES.md
Wijzigingslog). Toen de footer-disclaimer destijds is verwijderd, is deze robots.txt-regel kennelijk over het
hoofd gezien, waarschijnlijk omdat niemand op het idee kwam daar ook te zoeken. Technisch niet zichtbaar voor
een bezoeker (het is een crawler-instructie, geen paginatekst), maar de letterlijke naam "Drivenn Agency" en de
"ongevraagd ontwerpvoorstel"-formulering staan wel gewoon leesbaar in de broncode van beide repo's, wat
RULES.md expliciet uitsluit ("mag nergens meer getoond worden, op geen enkele site, geen uitzonderingen").
De overige 7 sites (gebouwd na 24-07-2026) hebben een kortere, neutrale robots.txt-comment of geen comment,
zonder deze tekst.

**Geen fix toegepast vanuit deze sweep** (per COMPLIANCE_CHECKLIST.md). Dit is een kleine, mechanische
tekstvervanging in `robots.txt` op precies twee regels bij twee sites, geschikt voor de lichte
zelf-uitgevoerde route bij een volgend BLOK FEEDBACK (of eerder, op verzoek van Sem).

### Overige checks (2–5): geen treffers

Contactformulier-implementatiestatus-taal (check 2), stijlstreepjes (check 3, gecontroleerd op
`components/footer.html` en `contact.html` van alle 9 sites), 404-pagina aanwezig (check 4) en
noindex-meta-tag + `Disallow: /` (check 5): geen enkele treffer op geen enkele site.

### Niet uitgevoerd deze ronde

Check 7 (zwevende ronde "+"-knop, CSS-heuristiek) is deze ronde overgeslagen vanwege de omvang (zou de
volledige `style.css` van alle 9 sites vereisen, samen ruim 300 KB) in combinatie met de bewust lichte,
lage-kosten opzet van dit checklist. Check 3 (stijlstreepjes) is uitgevoerd op `footer.html` en `contact.html`
per site, niet op elke losse subpagina van elke site (bijv. niet op alle acht `aanbod-*.html`-pagina's van
vanoostenvoorvis of alle vijf inhoudspagina's van cone6) — dat zou de sweep flink duurder maken voor een regel
die sinds de bouw van elke site al verplicht in de eigen kwaliteitscontrole van de bouw-subagent zit
(BUILD_INSTRUCTIONS.md STAP 8, punt 6), dus het regressierisico op pagina's die niet recent gewijzigd zijn is
laag.
