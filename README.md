# Michael Kiarie — Portfolio

A single-page developer portfolio built with Vue 3, Vite and Tailwind CSS v4.
Smooth scrolling is handled by Lenis, scroll-triggered reveals by GSAP
ScrollTrigger, and the hero backdrop is a lightweight Three.js particle field
that is lazy-loaded and pauses itself when off-screen.

## Highlights

- **Dark/light theme** persisted to `localStorage` and applied before first
  paint, so the saved theme never flashes.
- **Reduced-motion aware** — every animation, the smooth scroller and the WebGL
  background back off when `prefers-reduced-motion: reduce` is set.
- **Graceful image fallbacks** — project and app cards render a generated
  gradient cover until a real screenshot is dropped into `public/images/`.
- **Content lives in data files**, not in templates, so updating the site is a
  one-file change.

## Project structure

```
src/
  components/
    sections/   Page sections (header, hero, about, skills, ..., footer)
    ui/         Reusable pieces (buttons, cards, icons, meters, pills)
  composables/  Lenis scrolling, GSAP reveals, Three.js field, section spy
  css/main.css  Tailwind v4 theme tokens, base styles and custom utilities
  data/         Profile, skills, experience, projects and apps content
  router/       Routes and scroll behaviour
  stores/       Pinia UI store (theme + mobile menu)
  views/        HomeView and NotFoundView
public/
  images/       Project and app screenshots (optional)
  resume/       Downloadable resume PDF
```

## Editing the content

| What                                  | Where                    |
| ------------------------------------- | ------------------------ |
| Name, headline, contact, socials, nav | `src/data/profile.js`    |
| Skill groups and the tech marquee     | `src/data/skills.js`     |
| Work history and education            | `src/data/experience.js` |
| Project case studies and filters      | `src/data/projects.js`   |
| Side projects / apps                  | `src/data/apps.js`       |
| Colours, fonts, animations            | `src/css/main.css`       |

Screenshots are optional: name the file to match the `image` path in the data
file and drop it into `public/images/projects/` or `public/images/apps/`.

## Project setup

```sh
npm install
```

### Compile and hot-reload for development

```sh
npm run dev
```

### Compile and minify for production

```sh
npm run build
npm run preview
```

### Run unit tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run end-to-end tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Watch the browser while the tests run
HEADED=1 npm run test:e2e -- --project=chromium
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint and format

```sh
npm run lint
npm run format
```

## Deploying from a private repository

GitHub Pages only serves private repositories on paid plans, so this project is
configured for hosts whose free tier builds private repos:

| Host                 | Config in this repo                 | Notes                                       |
| -------------------- | ----------------------------------- | ------------------------------------------- |
| **Cloudflare Pages** | `public/_redirects`                 | Unlimited bandwidth, unlimited sites        |
| **Netlify**          | `netlify.toml`, `public/_redirects` | 100 GB/month bandwidth, 300 build min/month |
| **Vercel**           | `vercel.json`                       | Hobby tier is non-commercial use only       |

All three connect to a private GitHub repo, build on push and keep the source
closed. Build settings are read from the config files above:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22

### Why the redirect rules matter

`vue-router` runs in HTML5 history mode, so the browser asks the host for paths
like `/some-page` that do not exist on disk. Without a fallback rule the host
returns its own 404 page and the app never boots. `public/_redirects` (Cloudflare
Pages, Netlify) and the `rewrites` block in `vercel.json` serve `index.html`
instead and let the router take over. The 404 view still renders for unknown
routes — it is handled client side.

### CLI alternatives

If you would rather not connect a Git host at all, deploy the built folder
directly — the repository never leaves your machine:

```sh
npm run build

npx wrangler pages deploy dist    # Cloudflare Pages
npx netlify deploy --prod --dir=dist
npx vercel deploy --prod dist
npx firebase deploy               # Firebase Hosting, after `firebase init`
```

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) +
[Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
(and disable Vetur), or WebStorm with the Vue plugin enabled.
