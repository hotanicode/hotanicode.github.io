/**
 * Professional project case studies.
 *
 * Images are optional — drop a file in `public/images/projects/` matching the
 * `image` path and the card will use it, otherwise it falls back to a
 * generated gradient cover.
 */
export const projects = [
  {
    id: 'eclaims-modernisation',
    title: 'eClaims Modernisation',
    tagline: 'Java 8 → Java 21, Spring Boot 1.5 → 3.2, Angular 4 → Angular 16.',
    description:
      'A university-wide claims processing platform that had drifted years behind its dependencies. I led the incremental upgrade of both the backend and the frontend while the system stayed in daily production use.',
    highlights: [
      'Rewrote deprecated Spring APIs and migrated configuration to Spring Boot 3.2.',
      'Replaced the Angular 4 frontend with a modular Angular 16 application.',
      'Cut response times on the heaviest claim queries and reduced downtime incidents.',
    ],
    tags: ['Java 21', 'Spring Boot 3', 'Angular 16', 'MySQL'],
    year: '2023 — 2025',
    role: 'Lead upgrade developer',
    category: 'Enterprise',
    featured: true,
    internal: true,
    image: '/images/projects/eclaims.png',
    links: { demo: null, repo: null },
  },
  {
    id: 'eforms',
    title: 'Dynamic eForms Engine',
    tagline: 'Configurable forms, workflows and routing without redeploying.',
    description:
      'A form-builder platform that lets non-technical staff compose forms, attach approval workflows and define where each submission is routed — replacing a backlog of one-off form requests.',
    highlights: [
      'Schema-driven form rendering with per-field validation rules.',
      'Configurable multi-step approval workflows and routing destinations.',
      'Audit trail for every submission and approval action.',
    ],
    tags: ['Spring Boot', 'Angular', 'MySQL', 'Workflow Engine'],
    year: '2024',
    role: 'Designer & developer',
    category: 'Platform',
    featured: true,
    internal: true,
    image: '/images/projects/eforms.png',
    links: { demo: null, repo: null },
  },
  {
    id: 'certificate-verification',
    title: 'Certificate Verification System',
    tagline: 'PayPal-backed verification for academic certificates.',
    description:
      'Employers and institutions verify the authenticity of academic certificates online. I designed and integrated the PayPal payment flow, including webhook handling and reconciliation of verification requests.',
    highlights: [
      'End-to-end PayPal integration with webhook verification.',
      'Idempotent payment reconciliation to prevent duplicate charges.',
      'Automated receipts and verification result delivery.',
    ],
    tags: ['Spring Boot', 'PayPal API', 'REST', 'MySQL'],
    year: '2024',
    role: 'Backend developer',
    category: 'Payments',
    featured: true,
    internal: true,
    image: '/images/projects/certificate-verification.png',
    links: { demo: null, repo: null },
  },
  {
    id: 'partnership-management',
    title: 'Partnership Management System',
    tagline: 'Tracking institutional partnerships from proposal to renewal.',
    description:
      'A Laravel application that centralises partner records, agreement documents, renewal dates and reporting for the university partnerships office.',
    highlights: [
      'Role-based access for partnership officers and administrators.',
      'Document management with renewal reminders.',
      'Filament admin panel for rapid internal tooling.',
    ],
    tags: ['Laravel', 'Filament', 'PHP', 'MySQL'],
    year: '2023',
    role: 'Full-stack developer',
    category: 'Internal Tools',
    featured: false,
    internal: true,
    image: '/images/projects/partnership-management.png',
    links: { demo: null, repo: null },
  },
  {
    id: 'industry-mentoring',
    title: 'Industry Mentoring System',
    tagline: 'Matching students with industry mentors.',
    description:
      'Handles mentor applications, student matching, session scheduling and progress reporting for the university mentoring programme.',
    highlights: [
      'Mentor–mentee matching with capacity limits.',
      'Session logging and progress reporting for coordinators.',
      'Email notifications across the mentoring lifecycle.',
    ],
    tags: ['Laravel', 'Filament', 'MySQL'],
    year: '2023',
    role: 'Full-stack developer',
    category: 'Internal Tools',
    featured: false,
    internal: true,
    image: '/images/projects/industry-mentoring.png',
    links: { demo: null, repo: null },
  },
  {
    id: 'career-development',
    title: 'Career Development System',
    tagline: 'Career services, digitised.',
    description:
      'Supports the career development office with student profiles, opportunity listings and application tracking, built on Laravel with a Filament back office.',
    highlights: [
      'Opportunity listings with application tracking.',
      'Student profile and CV management.',
      'API integrations with response validation.',
    ],
    tags: ['Laravel', 'Filament', 'REST APIs'],
    year: '2023',
    role: 'Full-stack developer',
    category: 'Internal Tools',
    featured: false,
    internal: true,
    image: '/images/projects/career-development.png',
    links: { demo: null, repo: null },
  },
]

/** Unique category list, with an "All" option prepended, for the filter bar. */
export const projectCategories = ['All', ...new Set(projects.map((project) => project.category))]

export const featuredProjects = projects.filter((project) => project.featured)

export default projects
