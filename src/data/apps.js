/**
 * Apps and side projects.
 *
 * Screenshots live in `src/assets/images/` and are resolved through Vite so
 * they get hashed and optimised at build time. Add a file named
 * `<app>-<n>.png` and reference it from the `screenshots` array below.
 *
 * NOTE: the copy, links and captions here are a starting point — adjust them
 * as each build ships.
 */
import { socials } from './profile'

const screenshotUrls = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** Resolve a bare file name (e.g. `travels-1.png`) to its built URL. */
function screenshot(fileName, caption) {
  const match = Object.entries(screenshotUrls).find(([path]) => path.endsWith(`/${fileName}`))

  if (!match) {
    console.warn(`[data/apps] screenshot not found: ${fileName}`)
    return null
  }

  return { src: match[1], caption }
}

/** Drops any screenshot whose file is missing so the layout never breaks. */
const shots = (...entries) => entries.filter(Boolean)

/** Builds a repo URL from the GitHub profile in `profile.js`, so the username lives in one place. */
const GITHUB_PROFILE =
  socials.find((social) => social.icon === 'github')?.url ?? 'https://github.com'

export const repoUrl = (repo) => `${GITHUB_PROFILE.replace(/\/$/, '')}/${repo}`

export const apps = [
  {
    id: 'mentoring',
    name: 'Mentoring',
    tagline: 'Pairing students with industry mentors, from a phone.',
    description:
      'A mobile companion for the mentoring programme: students browse available mentors, request sessions and keep track of their goals, while mentors manage their availability and log each meeting.',
    highlights: [
      'Mentor discovery with profile, expertise and availability.',
      'Session requests, scheduling and progress logging.',
      'Push-style notifications across the mentoring lifecycle.',
    ],
    platform: 'Mobile',
    status: 'Live',
    year: '2026',
    tags: ['Mobile', 'REST API', 'Laravel', 'MySQL'],
    icon: 'spark',
    screenshots: shots(
      screenshot('mentoring-1.png', 'Home'),
      screenshot('mentoring-2.png', 'Mentor profile'),
      screenshot('mentoring-3.png', 'Sessions'),
    ),
    links: { demo: null, repo: null },
  },
  {
    id: 'travels',
    name: 'Travels',
    tagline: 'Plan the trip, keep the memories.',
    description:
      'A travel companion for planning routes, saving places worth returning to and keeping a photo journal of each trip — built for the hiking weekends that never quite fit in a notes app.',
    highlights: [
      'Trip planning with saved destinations and notes.',
      'Offline-friendly itinerary and photo journal.',
      'Map-based browsing of past and upcoming trips.',
    ],
    platform: 'Mobile',
    status: 'In progress',
    year: '2026',
    tags: ['Mobile', 'Maps', 'Offline-first'],
    icon: 'pin',
    screenshots: shots(
      screenshot('travels-1.png', 'Discover'),
      screenshot('travels-2.png', 'Trip details'),
      screenshot('travels-3.png', 'Journal'),
    ),
    links: { demo: null, repo: null },
  },
  {
    id: 'portfolio',
    name: 'This Portfolio',
    tagline: 'Vue 3, Tailwind v4, GSAP and a Three.js starfield.',
    description:
      'A single-page portfolio built with Vue 3 and Vite. Scroll is driven by Lenis, section reveals by GSAP ScrollTrigger, and the hero background is a lightweight Three.js particle field that respects reduced-motion settings.',
    platform: 'Web',
    status: 'Live',
    year: '2026',
    tags: ['Vue 3', 'Tailwind CSS v4', 'GSAP', 'Three.js'],
    icon: 'sparkles',
    screenshots: [],
    image: '/images/apps/portfolio.png',
    links: { demo: '/', repo: 'https://github.com/michael-hotani/my-portfolio' },
  },
  {
    id: 'canaaneast-group',
    name: 'Canaaneast Group',
    tagline: 'Breaking boundaries — the corporate home of a multi-sector investment group.',
    description:
      'A corporate website for Canaaneast Group, a progressive company with diverse interests across multiple sectors. The site presents their investment portfolio and sector expertise, and carries a brand promise built on world-class benchmarks and top-notch quality.',
    platform: 'Web',
    status: 'Live',
    year: '2025',
    tags: ['Web', 'Corporate site', 'Responsive', 'SEO'],
    icon: 'layers',
    screenshots: [],
    image: '/images/apps/canaangroupco.png',
    links: { demo: 'https://canaangroupco.com/', repo: null },
  },
]

/**
 * Weekend-sized frontend builds — the small challenges I use to keep the
 * fundamentals sharp.
 *
 * These repositories are private, so the cards link to the deployed demo
 * instead. Paste each URL into `demo` once the build is live (Netlify,
 * Cloudflare Pages and Vercel all deploy from private repos for free).
 * If a repo is ever made public, add `repo: repoUrl('<name>')` and the card
 * will fall back to it when no demo exists.
 */
export const miniBuilds = [
  {
    id: 'advice-generator',
    name: 'Advice Generator',
    blurb: 'Fetches a random piece of advice from an API and handles the loading and error states.',
    date: 'Sep 2023',
    tags: ['JavaScript', 'REST API', 'CSS'],
    demo: null,
    repo: null,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    blurb: 'A calculator with chained operations, keyboard input and a switchable colour theme.',
    date: 'Aug 2023',
    tags: ['JavaScript', 'CSS Grid'],
    demo: null,
    repo: null,
  },
  {
    id: 'age-calculator-app',
    name: 'Age Calculator',
    blurb: 'Validates a date of birth, then counts the exact years, months and days from it.',
    date: 'Aug 2023',
    tags: ['JavaScript', 'Form validation'],
    demo: null,
    repo: null,
  },
]

/** Apps with device screenshots get the full-width showcase treatment. */
export const showcasedApps = apps.filter((app) => app.screenshots?.length)

/** Everything else falls back to the compact card grid. */
export const otherApps = apps.filter((app) => !app.screenshots?.length)

export default apps
