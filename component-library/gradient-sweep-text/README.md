# Gradient sweep text

Een diagonale lichtband met bewegende gradient-kleuren veegt over een woord heen, met een donker basiswoord eronder. Pure CSS (`mask-image` + `background-clip: text`), geen JS nodig.

## Wanneer gebruiken

Hero-onthulling of splash-moment voor een merknaam of kernwoord op een donkere achtergrond. Kort woord (tot ongeveer 8 tekens) werkt het best.

## Hoe te gebruiken

1. Kopieer de twee gestapelde divs uit `gradient-sweep-text.html` (basiswoord + belicht woord), zet in beide dezelfde tekst.
2. Kopieer `gradient-sweep-text.css`, pas het kleurenpalet (`--gs-gradient`) en het basiswoord-kleur (`--gs-base`) aan de huisstijl aan.
4. `prefers-reduced-motion` zet de animatie automatisch stil en toont het belichte woord statisch.

## Bestanden

`gradient-sweep-text.html`, `gradient-sweep-text.css`
