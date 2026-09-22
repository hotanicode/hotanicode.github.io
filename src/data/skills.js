/**
 * Skill groups rendered by the Skills section.
 * `level` is a 0-100 confidence score used for the progress meters.
 */
export const skillGroups = [
  {
    title: 'Languages',
    icon: 'code',
    blurb: 'The languages I reach for first.',
    skills: [
      { name: 'PHP', level: 92 },
      { name: 'Java', level: 88 },
      { name: 'JavaScript', level: 85 },
      { name: 'Python', level: 70 },
      { name: 'SQL', level: 84 },
    ],
  },
  {
    title: 'Frameworks',
    icon: 'layers',
    blurb: 'Backend and frontend frameworks I ship with.',
    skills: [
      { name: 'Laravel', level: 93 },
      { name: 'Filament', level: 86 },
      { name: 'Spring Boot', level: 87 },
      { name: 'Angular', level: 82 },
      { name: 'Vue 3', level: 76 },
    ],
  },
  {
    title: 'Data & Infrastructure',
    icon: 'database',
    blurb: 'Where the data lives and how the code gets there.',
    skills: [
      { name: 'MySQL', level: 88 },
      { name: 'Docker', level: 78 },
      { name: 'Linux (Ubuntu)', level: 85 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Git', level: 90 },
    ],
  },
  {
    title: 'Engineering Practice',
    icon: 'spark',
    blurb: 'How I approach the work itself.',
    skills: [
      { name: 'API Integration', level: 90 },
      { name: 'System Upgrades', level: 88 },
      { name: 'Debugging', level: 89 },
      { name: 'Deployment', level: 84 },
      { name: 'Technical Documentation', level: 75 },
    ],
  },
]

/** Flat list used by the scrolling tech marquee. */
export const techMarquee = [
  'Laravel',
  'Spring Boot',
  'Angular',
  'Vue 3',
  'PHP',
  'Java 21',
  'JavaScript',
  'Python',
  'MySQL',
  'Docker',
  'Filament',
  'REST APIs',
  'CI/CD',
  'Git',
  'Ubuntu',
  'Tailwind CSS',
]

export default skillGroups
