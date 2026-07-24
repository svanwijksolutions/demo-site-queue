# uploads/

Zet hier overdag foto's klaar voor een bedrijf uit de wachtrij, in een submap die exact overeenkomt met het `id`-veld van dat bedrijf in `../companies.json`.

Voorbeeld:
```
uploads/
  slagerijjansen/
    winkel-buiten.jpg
    vitrine.jpg
    eigenaar.jpg
```

Zet daarna `fotos_beschikbaar: true` op het bijbehorende item in `companies.json`. Geen map/foto's voor een bedrijf? Dan gebruikt de nachtelijke Routine gegenereerde illustraties in plaats van foto's.
