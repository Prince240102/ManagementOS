# TGIsmE — Quantumgrowth Capital

Marketing site for **TGISME Capital Advisors LLP**, investment manager of Quantumgrowth Capital (SEBI-registered Category III AIF, Reg. IN/AIF3/23-24/1473).

## Stack
Static HTML + Tailwind CSS (via CDN). No build step required.

## Pages
| File | Purpose |
|---|---|
| `index.html` / `tgisme.html` | Homepage |
| `investors.html` | For Investors — fund facts, FAQ, IM request |
| `smes.html` | For SMEs — criteria, stages, deck submission |
| `approach.html` | Our Approach — 4-step process |
| `portfolio.html` | Portfolio — sector mix, company grid, case studies |
| `insights.html` | Insights — featured + archive |
| `about.html` | About — story, team, values, offices |
| `contact.html` | Contact — three channels, offices, form |

## Brand System
- Primary indigo `#2A3794`
- Signature green `#09A14A`
- Warm orange `#F69322`
- Ink `#1C1D2D` · Paper `#F8F6F2`
- Display: Montserrat · Body: Inter

## Local preview
Any static file server works:

```bash
# Python 3
python -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080`.

## Deployment
Configured for Vercel static hosting (`vercel.json` handles clean URLs and security headers). GitHub Pages also works without modification.

## Compliance
Every page carries the SEBI-mandated disclaimer. No performance claims or comparative language anywhere.
