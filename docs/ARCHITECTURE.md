# ManaHindu — Architecture Guide

## Folder Structure

```
manahindu/
├── index.html                        ← HOME (root)
├── assets/
│   ├── css/
│   │   ├── main.css                  ← Global: header, nav, footer
│   │   ├── components.css            ← Reusable: cards, buttons, badges
│   │   ├── typography.css            ← Fonts, Telugu text
│   │   └── home.css                  ← Homepage only
│   ├── js/
│   │   ├── main.js                   ← Global: nav toggle, topbar date
│   │   └── panchangam.js             ← Panchangam calculation
│   └── images/
│       └── common/                   ← Logo, favicon
└── pages/
    ├── temples/
    │   ├── index.html                ← Temples listing
    │   ├── temples.css               ← Module styles
    │   ├── images/tirupati/          ← Temple photos
    │   └── detail/
    │       ├── tirupati.html         ← Detail page
    │       └── tirupati.css          ← Detail styles
    ├── hinduism/
    │   ├── index.html
    │   └── hinduism.css
    ├── festivals/
    │   ├── index.html
    │   └── festivals.css
    ├── vlogs/
    │   ├── index.html
    │   └── vlogs.css
    ├── news/
    │   ├── index.html
    │   └── news.css
    └── about/
        ├── index.html
        └── about.css
```

## CSS Loading Order (every page)
1. assets/css/main.css        — global layout
2. assets/css/components.css  — reusable UI
3. assets/css/typography.css  — fonts
4. pages/module/module.css    — module specific
5. pages/module/detail/page.css — page specific (detail pages only)

## Path Depth Convention
- depth 0 = index.html (root)
- depth 1 = pages/ (not used currently)
- depth 2 = pages/module/index.html
- depth 3 = pages/module/detail/page.html

## Future Migration to Vue/Angular
- Each page → Vue component in src/pages/
- Each module CSS → scoped styles in component
- assets/js/panchangam.js → src/utils/panchangam.js
- API calls → src/services/templeService.js

## Future C# Backend API
- GET /api/temples
- GET /api/temples/{id}
- GET /api/festivals/{year}
- GET /api/news
- GET /api/panchangam?date=YYYY-MM-DD
