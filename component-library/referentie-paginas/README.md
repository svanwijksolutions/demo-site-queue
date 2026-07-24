# Referentiepagina's (alleen inspiratie, niet direct bruikbaar)

Deze map bevat complete, aangeleverde landingspagina's die **niet** voldoen aan onze bouwregels en dus nooit rechtstreeks in een klantsite mogen worden geplakt:

- Ze gebruiken Tailwind via een CDN-`<script>` (`cdn.tailwindcss.com`) in plaats van losse, geschreven CSS.
- Ze laden Google Fonts/Font Awesome/Lucide via externe CDN's (geblokkeerd/onbetrouwbaar in onze sandbox, en een externe dependency die we normaal vermijden).
- Ze bevatten stockfoto's (Unsplash/Pexels/randomuser.me) en verzonnen bedrijfsnamen, cijfers en testimonials, dat is per definitie in strijd met onze regel "geen verzonnen feiten/prijzen/reviewquotes".
- Eén bestand (`aura-beauty-salon.html`) bevatte oorspronkelijk een ingebakken formulier-tracking-script van een externe partij (landinghero.ai) met een eigen project-ID. Dat script is **verwijderd** voor het opslaan hier: nooit code met een vreemde API-sleutel/project-ID hergebruiken in een klantproject.

## Waar dit wel goed voor is

Elke pagina hieronder staat voor een sterk, herkenbaar **lay-out- of interactiepatroon**. Open het bestand lokaal in een browser om het effect te zien, en bouw het specifieke patroon dat je nodig hebt daarna met de hand na in vanilla HTML/CSS/JS, met de kleuren/typografie/content van het bedrijf waarvoor je bouwt. Nooit een heel bestand kopiëren en alleen de teksten vervangen.

**Let op:** dit zijn bewust ingekorte uittreksels (hero-sectie plus de één of twee secties met het meest onderscheidende patroon), niet altijd de volledige oorspronkelijke pagina van begin tot eind. De weggelaten secties waren doorgaans standaard content-blokken (extra feature-rijen, statische footers) zonder een nieuw interactiepatroon. Ontbreekt er iets specifieks dat je nodig hebt uit een van deze pagina's? Vraag er dan opnieuw naar, dan wordt dat stuk alsnog toegevoegd.

| Bestand | Wat is de moeite waard om te lenen |
|---|---|
| `vertex-elite-marketing-agency.html` | Gestapelde bento-services-grid, horizontaal scrollende logo-marquee met mask-fade aan de randen, geanimeerde testimonial-slider met fade-transitie |
| `lumina-physiotherapy.html` | Actie-blokken met hover-zoom-foto's onder een hero, "zig-zag" links/rechts-afwisselende secties, geanimeerde tellers |
| `portfolio-cursor-follow-hero.html` | Cursor-volgende zwevende fotokaart met letter-repel-effect on hover (puur JS, geen framework) |
| `maya-chen-portfolio.html` | Volledige uitklap-navigatiemenu, horizontaal auto-scrollende projectenrij met perspective-tilt, tellers met easing |
| `julian-voss-creative-director.html` | Verticaal roulerend woord in de hero-titel (CSS `translateY`-loop door een lijst synoniemen), fullscreen menu-overlay met hover-ticker per item |
| `carzap-car-detailing.html` | Sticky navbar die kleur/achtergrond wisselt bij scroll, horizontaal scrollende vooraf/nadien-gallerij met pijlknoppen, prijzentoggle (maand/jaar) |
| `lumina-health-medical.html` | Glasmorfe pill-navigatie, letter-voor-letter tekstonthulling on scroll, bento-grid met asymmetrische kaartgroottes, marquee-formulierkop |
| `vertex-strategy-advisory.html` | Tekst-masker-onthulling (`translateY(110%)` per regel), parallax-header bij muisbeweging, staggered card-reveal |
| `midnight-ramen-restaurant.html` | Bento-grid met scheve cirkel-decoraties, prijskaarten met "mix-blend-multiply" productfoto's, sticky header met social-iconen |
| `aura-beauty-salon.html` | Booggevormde sectie-overgangen (`clip-path`/`border-radius` als halve maan), draaiend decoratief pictogram, hover-dropdown-megamenu. **Let op: het ingebakken formulier-trackingscript van een externe partij is uit dit bestand verwijderd voordat het hier is opgeslagen.** |
| `velora-ai-hero-section.html` | Sterrenveld + bewegende nevelvlekken als achtergrond, zwevende "prompt"-kaart, knop met doorschietend hover-glow-effect |
| `cryptix-pricing-section.html` | Prijzengrid met kruispuntmarkeringen op de randen, live prijstoggle (maand/jaar), knop met "verifiëren → succes"-microstatus |
| `codepulse-footer.html` | Footer met bewegende verticale lichtstralen en zwevende gradient-blobs op de achtergrond |
| `visual-design-studio-hero.html` | Extreem grote, vetgedrukte titel-typografie met een enkel geaccentueerd woord |

## Vaste regel

Nooit Tailwind-CDN, Google Fonts-CDN, Font Awesome-CDN of stockfoto-URL's overnemen in een echte site. Altijd vertalen naar losse CSS met de site-eigen design-tokens, en foto's/content vervangen door echt materiaal van het bedrijf (of weglaten als dat er niet is).
