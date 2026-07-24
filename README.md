# demo-site-queue

Interne wachtrij voor Drivenn Agency's demo-site pipeline (svanwijksolutions sandbox). Privé repo — bevat prospectgegevens en concept-pitchmails, niet bedoeld voor publicatie.

## Hoe het werkt

1. `companies.json` is de wachtrij. Elke nacht pakt de Routine tot 2-3 items met `status: "pending"` **en** `repo_ready: true` op, bouwt daar een volledige demo-website voor (zelfde aanpak als `ziehaarstralen-demo`), zet die live via GitHub Pages, en schrijft een conceptpitchmail naar `pitches/<id>.md` in deze repo.
2. GitHub Apps kunnen op een persoonlijk account geen nieuwe repo's aanmaken — dat is een platformbeperking, geen instelling. **Elk item heeft dus een handmatig aangemaakte lege repo nodig voordat de Routine het oppakt.**
3. Na het aanmaken van de lege repo (publiek, naamgeving `<id>-demo`) zet je `repo_ready` op `true` en vul je `repo` in. Zonder die stap blijft een item gewoon `pending` en verschijnt het in de ochtendsamenvatting als "wacht op repo".
4. Verder is het volledig automatisch: de Claude GitHub App staat op "All repositories", dus een nieuw aangemaakte repo is direct zichtbaar — de Routine hoeft 'm alleen nog aan zijn eigen (verse) sessie toe te voegen via `add_repo`, dat gebeurt vanzelf tijdens de run. Jij hoeft alleen de lege repo aan te maken, verder niets.

## Een nieuw bedrijf toevoegen

1. Voeg een object toe aan `companies.json` met minimaal: `id`, `bedrijfsnaam`, `branche`, `contactpersoon`, `contact` (adres, telefoon, email, kvk, huidige_site), `regio`, `diensten`, `reviews`, `ontwerprichting`. Zet `status: "pending"` en `repo_ready: false`.
2. Maak op github.com/svanwijksolutions een nieuwe **publieke** repo aan genaamd `<id>-demo`.
3. Zet `repo_ready: true` en `repo: "<id>-demo"` in het item.
4. Klaar — de eerstvolgende nachtrun pakt het op (mits er ruimte is, max. 2-3 per nacht).

## Statussen

- `pending` — klaar om opgepakt te worden (zodra `repo_ready: true`)
- `in_progress` — wordt op dit moment gebouwd (voorkomt dubbel oppakken bij overlappende runs)
- `done` — live, pitchmail klaar in `pitches/<id>.md`
- `needs_review` — de Routine is vastgelopen of twijfelde (ontbrekende/tegenstrijdige info, mislukte Pages-build, etc.) — zie `notities` voor de reden. Nooit stilzwijgend verzonnen invullen.

## Vaste regels voor elke build (zie ook `webdesign`-skill)

- Losse HTML/CSS/JS, relatieve paden (GitHub Pages sub-pad hosting)
- Geen verzonnen prijzen, reviewquotes, geschiedenis of feiten — eerlijke placeholders
- Geen echte foto's van personen zonder rechten — CSS/SVG-oplossingen
- `noindex, nofollow` + `robots.txt: Disallow: /` — het zijn ongevraagde concepten, geen live sites
- Footer-disclaimer: "Dit is een ongevraagd ontwerpvoorstel van Drivenn Agency..."
- GitHub Pages via self-configuring Actions workflow (`.github/workflows/pages.yml`, `actions/configure-pages` + `upload-pages-artifact` + `deploy-pages`)
- Pitchmail wordt **nooit verzonden**, alleen klaargezet in `pitches/<id>.md`
- **Nooit** `svanwijksolutions/waterfordscocktails` aanraken — dat is een ander, ongerelateerd project
