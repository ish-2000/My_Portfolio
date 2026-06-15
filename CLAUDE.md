# CLAUDE.md — Antigravity Portfolio
# Claude Code reads this file automatically every session.
# Never delete or rename this file.
# Always read this file before writing a single line of code.

---

## Project identity
- Project name: Antigravity
- Type: Personal portfolio website
- Owner: Full-stack product designer & developer
- Goal: Premium, high-trust portfolio that sells design taste
  and engineering capability equally
- Target clients: Startups, agencies, enterprise brands
- Reference brief: docs/portfolio-brief.md — read this too

---

## Tech stack — frontend only for now
- Framework: Vite + React
- Routing: React Router v6 — router lives in routes/AppRouter.jsx
- Styling: Tailwind CSS v4 with @tailwindcss/vite plugin
- CSS import: @import "tailwindcss" in src/styles/index.css
- Smooth scroll: Lenis (via hooks/useLenis.js)
- Animation scroll: GSAP + ScrollTrigger
- Animation hover/micro: Framer Motion
- Backend (later): Node.js + Express + MongoDB + Resend

---

## Absolute styling rules — never break these
1. Tailwind CSS utility classes via className on every element
2. Zero inline style={{}} objects anywhere in JSX
3. Zero CSS modules — no .module.css files ever
4. Zero styled-components or any CSS-in-JS library
5. Zero UI libraries — no Bootstrap, MUI, Chakra, DaisyUI,
   Flowbite, shadcn, Ant Design, or any prebuilt kit
6. src/styles/tokens.css holds CSS custom properties only —
   not a module, imported in main.jsx
7. src/styles/index.css holds @import "tailwindcss" and
   global base styles only
8. GSAP animated properties go through gsap.to(ref.current)
   only — never set transform/opacity in className
9. Framer Motion handles hover states and micro-interactions
10. Never hardcode a colour outside the token list below

---

## Tailwind v4 configuration
Tailwind v4 uses CSS-based config inside index.css.
Do NOT use tailwind.config.js for theme — use @theme in CSS.

src/styles/index.css must contain:

@import "tailwindcss";

@theme {
  --font-display: 'Switzer', sans-serif;
  --font-body:    'Inter', sans-serif;

  --color-accent:         #7C3AED;
  --color-accent-hover:   #6D28D9;
  --color-accent-dark:    #5B21B6;
  --color-accent-light:   #EDE9FF;
  --color-accent-border:  #DDD6FE;

  --color-surface-white:    #FFFFFF;
  --color-surface-offwhite: #F7F6F3;
  --color-surface-subtle:   #EFEFEC;
  --color-surface-border:   #E0DFDB;

  --color-dark:         #0D0D0D;
  --color-dark-card:    #171717;
  --color-dark-hover:   #222220;
  --color-dark-border:  #2E2E2C;
  --color-dark-muted:   #6B6A66;

  --color-text-primary:   #0E0E0E;
  --color-text-secondary: #3D3D3A;
  --color-text-tertiary:  #6B6A66;
  --color-text-muted:     #9A9892;
  --color-text-ghost:     #2E2E2C;
  --color-text-dark:      #F0EFEB;

  --radius-card:    12px;
  --radius-card-lg: 20px;
  --radius-pill:    9999px;
}

Usage in className:
  bg-accent          → background #7C3AED
  bg-accent-light    → background #EDE9FF
  text-accent        → color #7C3AED
  text-accent-dark   → color #5B21B6
  border-accent-border → border #DDD6FE
  bg-dark            → background #0D0D0D
  bg-dark-card       → background #171717
  text-text-primary  → color #0E0E0E
  text-text-dark     → color #F0EFEB
  text-text-ghost    → color #2E2E2C
  bg-surface-offwhite → background #F7F6F3
  font-display       → Switzer
  font-body          → Inter

---

## CSS custom properties — src/styles/tokens.css
Import this in main.jsx after index.css.
Used by GSAP for dynamic animation values.

:root {
  --color-accent:           #7C3AED;
  --color-accent-hover:     #6D28D9;
  --color-accent-light:     #EDE9FF;
  --color-accent-border:    #DDD6FE;
  --color-bg-dark:          #0D0D0D;
  --color-bg-dark-card:     #171717;
  --color-text-dark-primary:#F0EFEB;
  --color-text-dark-ghost:  #2E2E2C;
}

---

## Google Fonts — index.html head
Add this preconnect and link before </head>:
Syne: weights 400, 600, 700, 800 (Removed in favor of self-hosted Switzer)
Switzer: weights 500, 800 (self-hosted)
Inter: weights 300, 400, 500, 600

---

## File naming rules — strictly enforced
- Every component file is named ComponentName.jsx
- NEVER use index.jsx as a component filename
- NEVER nest a component inside a folder with index.jsx
- Correct: src/components/sections/Hero.jsx
- Wrong:   src/components/sections/Hero/index.jsx
- Pages:   Home.jsx · LetsTalk.jsx
- Hooks:   useLenis.js · useScrollReveal.js · useSplitText.js
- Router:  routes/AppRouter.jsx

---

## Folder structure — create exactly this
antigravity/
├── docs/
│   └── portfolio-brief.md
├── public/
│   ├── images/
│   ├── icons/
│   └── videos/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── mockups/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── SectionLabel.jsx
│   │   │   └── GlassCard.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── PositioningStrip.jsx
│   │   │   ├── SelectedWork.jsx
│   │   │   ├── Philosophy.jsx
│   │   │   ├── Capabilities.jsx
│   │   │   ├── MyProcess.jsx
│   │   │   ├── TrustSignals.jsx
│   │   │   └── SoftCTA.jsx
│   │   └── Preloader.jsx
│   ├── data/
│   │   ├── projects.js
│   │   ├── services.js
│   │   └── techStack.js
│   ├── hooks/
│   │   ├── useLenis.js
│   │   ├── useScrollReveal.js
│   │   └── useSplitText.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── LetsTalk.jsx
│   ├── routes/
│   │   └── AppRouter.jsx
│   ├── styles/
│   │   ├── index.css
│   │   └── tokens.css
│   ├── utils/
│   │   └── cn.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── CLAUDE.md
└── .env

---

## Typography rules
- Display font: Switzer — section headlines, hero headline
- Body font: Inter — body copy, labels, captions, UI text
- Hero headline: font-display text-[clamp(48px,6vw,96px)]
  font-bold tracking-[-0.03em] leading-[1.05]
- Section titles: font-display text-[clamp(36px,4.5vw,72px)]
  font-bold tracking-[-0.03em] leading-[1.1]
- Section label: font-body text-[11px] font-medium
  tracking-[0.1em] uppercase text-text-muted
- Body: font-body text-base font-normal leading-7
- Card titles: font-body text-sm font-semibold
- Tags: font-body text-[11px] font-medium

---

## Page structure — Home.jsx renders in this order
0. Preloader        full screen · GSAP · 1.8s · unmounts after
1. Navbar           fixed · white · logo + links + CTA button
2. Hero             white · full viewport · 2 col layout
3. PositioningStrip white · 3 service pillars
4. SelectedWork     bg-dark · project cards with mockups
5. Philosophy       bg-dark · GSAP word colour reveal · pinned
6. Capabilities     white · 3 col cards · purple skill tags
7. MyProcess        bg-surface-offwhite · 4 steps horizontal
8. TrustSignals     white · stats count up · availability pills
9. SoftCTA          bg-accent-light · full width strip
10. Footer          bg-dark · closing statement + social links

Separate route: /lets-talk → LetsTalk.jsx

---

## Section design specs

### Navbar
- className: fixed top-0 left-0 w-full z-50
  bg-surface-white border-b border-surface-border
- Logo: "antigravity" — font-display font-bold text-text-primary
  with accent dot → one letter or period in text-accent
- Nav links: Work · Process · About — font-body text-sm
  text-text-tertiary hover:text-text-primary
- CTA: "Let's Talk →" — bg-accent text-white rounded-lg
  px-4 py-2 text-sm font-medium hover:bg-accent-hover
- On scroll: add shadow-[0_4px_24px_rgba(0,0,0,0.06)]

### Hero
- bg-surface-white min-h-screen
- Two column: left 55% right 45%
- Left:
  - Availability pill: green dot + "Available for projects"
    bg-green-50 text-green-700 rounded-pill px-3 py-1 text-xs
  - Headline: "Design that ships. Code that scales."
    "scales." wrapped in span with text-accent
  - Subline: font-body text-lg text-text-tertiary max-w-md
  - CTA row: primary bg-accent + secondary border outlined
  - Social proof: 3 initials avatars + "10+ products shipped"
- Right:
  - bg-surface-offwhite rounded-card-lg
  - Three floating cards at different positions and z-index
  - Card A: Tech stack tags (bottom-left, z-10, rotate-[-3deg])
  - Card B: Latest project mockup (top-right, z-20, rotate-[2deg])
  - Card C: Availability status (center, z-30, rotate-[-1deg])
  - GSAP parallax: each card different scroll speed
  - All cards: bg-white rounded-card border border-surface-border

### SelectedWork — DARK
- bg-dark min-h-screen px-20 py-24
- SectionLabel in muted colour
- 2-col grid for cards 1-2, full width for card 3
- ProjectCard: bg-dark-card rounded-card p-6
  - Mockup area: bg-dark-hover rounded-lg mb-4 h-48
  - Accent line: w-6 h-0.5 bg-accent mb-3
  - Title: font-display text-text-dark font-bold
  - Tags: bg-dark-hover text-dark-muted rounded-md px-2 py-1
  - Hover: scale-[1.02] transition-transform duration-200

### Philosophy — DARK — most important section
- bg-dark min-h-screen flex items-center
- Section pinned during GSAP scroll animation
- Statement split into word <span> elements on mount
- Each word starts as text-text-ghost (#2E2E2C)
- GSAP ScrollTrigger scrub:true animates colour to #F0EFEB
- Staggered start per word index
- Font: font-display text-[clamp(28px,3vw,48px)] font-bold
- Statement: "I don't just build things. I design them to work.
  Every pixel has a reason. Every line of code has a purpose."

### Capabilities — WHITE
- bg-surface-white py-24 px-20
- 3-col grid gap-6
- Each card: bg-surface-white border border-surface-border
  rounded-card p-6 hover:border-accent transition-colors
- Card icon: bg-accent-light rounded-lg p-2 w-10 h-10 mb-4
- Title: font-display text-xl font-bold text-text-primary
- Description: font-body text-sm text-text-tertiary leading-7
- Tags: bg-accent-light text-accent-dark text-[11px] font-medium
  rounded-md px-2 py-1

### MyProcess — OFF-WHITE
- bg-surface-offwhite py-24 px-20
- 4-col grid gap-8
- Step number: font-display text-[80px] font-bold
  text-surface-subtle leading-none mb-2
- Step name: font-display text-xl font-bold text-text-primary
- Description: font-body text-sm text-text-tertiary
- Connector: horizontal line between steps border-surface-border
- Steps: 01 Discover · 02 Design · 03 Build · 04 Ship

### TrustSignals — WHITE
- bg-surface-white py-20 px-20
- 3 stat blocks centered
- Number: font-display text-[clamp(36px,4vw,56px)] font-bold
  text-accent — GSAP countUp on scroll enter
- Label: font-body text-sm text-text-muted
- Divider then availability pills:
  rounded-pill border border-surface-border px-4 py-2 text-sm

### SoftCTA — PURPLE TINT
- bg-accent-light border-y border-accent-border py-8 px-20
- flex justify-between items-center
- Left: text-xl font-display font-bold text-text-primary
  + text-sm text-text-tertiary subline
- Right: bg-accent text-white rounded-lg px-6 py-3
  hover:bg-accent-hover → links to /lets-talk

### Footer — DARK
- bg-dark py-20 px-20
- Large closing statement: font-display text-display-lg
  font-bold text-text-dark mb-4
- Subline: font-body text-dark-muted mb-8
- CTA row: bg-accent button + outlined border-dark-border button
- Divider: border-dark-border my-8
- Bottom: copyright text-dark-muted text-sm +
  social icons right (LinkedIn · GitHub · Dribbble)
  each: border border-dark-border rounded-lg p-2 hover:border-accent

---

## Let's Talk page — /lets-talk
- Full page bg-surface-offwhite
- Same Navbar at top
- Centered card max-w-[860px] mx-auto mt-16
  bg-white rounded-card-lg border border-surface-border shadow-sm
- Two col inside: 300px left · flex-1 right
- Left panel:
  - Avatar: initials "YN" bg-accent-light text-accent
    rounded-full w-12 h-12 flex items-center justify-content-center
  - Name + role in font-display
  - "Discovery Call" badge: bg-accent-light text-accent-dark
    text-xs rounded-md px-2 py-1 border border-accent-border
  - Meeting title font-display text-xl font-bold
  - Meta rows: icon + text-text-tertiary text-sm
  - Email: text-accent text-sm hover:underline
  - Social buttons: border border-surface-border rounded-lg p-2
  - Availability: green dot pulse + "Currently accepting projects"
- Right panel:
  - 3-step indicator with step numbers
  - Calendar: weekdays only · past dates disabled
    Timezone via Intl.DateTimeFormat() auto-detect
    Selected: bg-accent text-white
    Today: accent dot below number
  - Time grid: 3 col · hover border-accent text-accent
    Selected: bg-accent text-white
  - Confirm button: bg-accent w-full disabled:bg-surface-border
- Trust strip below card text-xs text-text-muted

---

## Animation rules
- Register in App.jsx:
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    gsap.registerPlugin(ScrollTrigger)
- Always check reduced motion first:
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
- Scroll reveal standard:
    gsap.from(el, { y: 40, opacity: 0, duration: 0.6,
    ease: 'power2.out', scrollTrigger: { start: 'top 85%' }})
- Stagger siblings: 0.1s
- Philosophy: scrub: true, pin: true, word-by-word colour change
- Parallax hero cards: different y speeds per card
- CountUp stats: 0 → target, 1.2s, power2.out, scroll trigger
- Preloader: GSAP timeline 1.8s total, unmounts after complete
- Never auto-play on load except Preloader

## GSAP vs Framer Motion jobs
GSAP:
  preloader timeline · scroll reveals · philosophy word reveal
  parallax · countUp · section pin

Framer Motion:
  card hover whileHover · button whileTap · page transitions

---

## Reusable components

### Button.jsx
Props: variant ('primary'|'secondary'|'outline')
       size ('sm'|'md'|'lg') · children · onClick · to
Primary:   bg-accent hover:bg-accent-hover text-white
Secondary: border border-surface-border hover:border-accent
Outline dark: border border-dark-border text-text-dark
           hover:border-accent

### Container.jsx
Max width wrapper: max-w-[1280px] mx-auto px-20 (desktop)
                   px-6 (mobile)

### SectionLabel.jsx
Props: number ('/01') · label ('Selected Work') · dark (bool)
Renders: uppercase label + accent line + section number
Used top of every section for consistent rhythm

### GlassCard.jsx
Props: children · className
Base: backdrop-blur-md bg-white/70 border border-white/30
      rounded-card shadow-sm
On dark sections: bg-white/5 border-white/10

### Tag.jsx
Props: children · variant ('accent'|'gray')
Accent: bg-accent-light text-accent-dark rounded-md text-[11px]
Gray: bg-surface-subtle text-text-tertiary rounded-md text-[11px]

### ProjectCard.jsx
Props: title · description · tags[] · year · role · image

---

## Data files — content separated from components

### data/projects.js
Export array of project objects:
{ id, title, description, role, tags, year, image, link }

### data/services.js
Export array:
{ id, title, description, icon }
Services: Design · Build · Strategy

### data/techStack.js
Export array:
{ id, name, category }
Categories: Design · Frontend · Backend · Tools

---

## Hooks

### useLenis.js
Initialise Lenis smooth scroll
Sync with GSAP ScrollTrigger ticker
Return lenis instance

### useScrollReveal.js
Accept ref and options
Create GSAP ScrollTrigger reveal
Return nothing (side effect only)

### useSplitText.js
Accept a string
Return array of word span elements
Used by Philosophy section

---

## What Claude must NEVER do
- Use inline style={{}} objects
- Create .module.css files
- Install Bootstrap, MUI, Chakra, DaisyUI, shadcn, Flowbite
- Use index.jsx as a filename
- Write lorem ipsum in any component
- Use colours outside the token list
- Auto-play animations except Preloader
- Build more than one section per prompt
- Use <select> — use pill button selectors instead
- Use box-shadow heavier than
  shadow-[0_4px_24px_rgba(0,0,0,0.08)]
- Skip prefers-reduced-motion check
- Use tailwind.config.js for theme — use @theme in index.css

---

## Commit message convention
feat: preloader animation
feat: hero section
feat: navbar component
feat: lets-talk page ui
fix: philosophy scroll trigger
chore: project foundation setup
refactor: extract button component

---

## Golden prompt formula
"Read CLAUDE.md and docs/portfolio-brief.md.
Build [ComponentName] in [filepath].
[Exact layout description].
[Exact Tailwind classes].
[Exact animation behaviour and timing].
Pure Tailwind className only. Zero inline styles. Zero CSS modules."
