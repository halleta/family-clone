# Family — Design-Study Clone

An unofficial, **100% original-code** recreation of the [family.co](https://family.co)
(Family wallet) marketing site, built as a design study. No assets were taken
from the real site: every mascot, coin, confetti shape, and "product video" is
hand-built inline SVG / CSS / JS.

> **Unofficial design-study clone. Not affiliated with Family.** A disclaimer
> appears in the footer of every page.

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```bash
cd ~/workspace/family-clone
python3 -m http.server 8000
# → http://localhost:8000
```

(Google Fonts are loaded from the CDN; everything else is local.)

## Pages

| File | What it recreates |
|---|---|
| `index.html` | Home — sticky nav w/ dropdowns, staggered hero, animated iPhone wallet UI, logo strip, 6 feature cards, dark "details" vignettes, phone mockup, dual testimonial marquee, FAQ preview, mascot CTA band, demo modal, footer |
| `faq.html` | Full FAQ accordion (orange "+" rotates 45°) |
| `blog.html` | Filter pills (dark active) + article rows with hairline dividers |
| `changelog.html` | Version badges + timeline (date \| dot + spine \| content) |
| `support.html` | Search input (live-filters articles) + squircle glyph tile grid |
| `legal.html` | Document rows with "Last updated …" captions |
| `docs.html` | Sticky sidebar (search + sections) + article with code chips |
| `download.html` | Platform pills, CSS-built QR-style placeholder, feature bullets |

## The "little videos", as code

The looping product clips are recreated without any `<video>` files:

- **Hero iPhone** — balance counts up in a loop, transaction rows slide in every 3s
- **Send demo iPhone** — "Sending to Maya" scene with Transaction Safe pill
- **Demo modal** — second live wallet animation behind a spring-scale card
- **Dark vignettes** — CSS-only loops: swap-row glow, "Backing Up" progress pill,
  Submitted → Pending → Completed timeline, Transaction Safe check-draw

## Motion (per the audit)

Hero per-word stagger (rise + rotateX), ambient float on all mascots/confetti,
scroll fade+rise reveals, header hairline on scroll, dual-direction marquee
(pause on hover), accordion height animation, dropdown fade+slide with chevron
flip, spring modal, top loading bar (scaleX).

## Tokens

From the family.co audit (`../research_notes/design-system/report.md` §2):
`--beige #FBFAF9`, `--heading #343433`, `--body #494440`, accents
`#3784F4 #44C67F #FFBE4C #FF5310 #EF4444 #9553F9 #CA9230`,
hairlines `rgba(0,0,0,0.05)`, selection `#D8ECFC`. Light-only theme.
Nunito (display) + Inter (body) stand in for their custom faces.
