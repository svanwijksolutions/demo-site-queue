# Alternating timeline

Verticale tijdlijn met een middellijn en items die om beurten links en rechts staan, elk met een rond icoon op de lijn zelf. Op smalle schermen klapt alles automatisch samen naar één kant. Pure CSS, geen JS nodig.

Vertaald van een DaisyUI (Tailwind-plugin) `timeline`-component naar vanilla CSS/HTML: DaisyUI-klassen als `timeline`, `timeline-start`/`timeline-middle`/`timeline-end` bestaan bij ons niet, dit is met CSS Grid nagebouwd.

## Wanneer gebruiken

Bedrijfsgeschiedenis, mijlpalen, of een stapsgewijs proces met jaartallen/data. Precies het patroon dat al met de hand is gebruikt op `geschiedenis.html` van Van Oosten voor Vis, dit component maakt datzelfde patroon herbruikbaar zonder het opnieuw te hoeven opbouwen.

## Hoe te gebruiken

1. Kopieer de `<ul class="tl">`-structuur uit `alternating-timeline.html`, één `<li class="tl-item">` per mijlpaal met een `.tl-marker` (icoon) en een `.tl-content` (jaartal/titel/tekst).
2. Kopieer `alternating-timeline.css`, pas `--tl-line`/`--tl-marker-border`/`--tl-marker-icon` aan de huisstijl van de site aan.
3. Volgorde in de HTML bepaalt automatisch links/rechts (oneven items rechts uitgelijnd links van de lijn, even items links uitgelijnd rechts van de lijn) via `nth-child`, geen extra klasse per item nodig.
4. Onder 640px breed valt alles automatisch terug op één kolom naast een linkerlijn (mobielvriendelijk zonder extra werk).
5. Items faden bij het laden subtiel omhoog (load-getriggerd, geen scroll-observer), `prefers-reduced-motion` zet dit stil.

## Bestanden

`alternating-timeline.html`, `alternating-timeline.css`
