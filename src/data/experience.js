/** Work history, newest first. */
export const experience = [
  {
    id: 'strathmore-ict-dev',
    role: 'Assistant Software Developer',
    company: 'Strathmore University — I.C.T Department',
    location: 'Nairobi, Kenya',
    start: 'Aug 2023',
    end: 'Present',
    current: true,
    summary:
      'Modernising and maintaining the university core systems, from framework upgrades to new payment and workflow features.',
    highlights: [
      'Upgraded the legacy eClaims system from Java 8 to Java 21 and Spring Boot 1.5 to 3.2, improving performance and maintainability.',
      'Migrated the frontend from Angular 4 to Angular 16, enhancing user experience and application scalability.',
      'Developed and integrated PayPal payment functionality into the Certificate Verification System.',
      'Designed and built a dynamic eForms system with configurable form creation, workflows and routing destinations.',
      'Implemented and managed CI/CD pipelines for automated testing and deployment on test servers.',
      'Provided IT support and troubleshooting for eClaims, keeping downtime to a minimum.',
    ],
    stack: ['Java 21', 'Spring Boot 3', 'Angular 16', 'MySQL', 'Docker', 'CI/CD'],
  },
  {
    id: 'strathmore-ict-intern',
    role: 'Software Developer Intern',
    company: 'Strathmore University — I.C.T Department',
    location: 'Nairobi, Kenya',
    start: 'Feb 2023',
    end: 'Jul 2023',
    summary:
      'Built internal Laravel systems end to end, from data modelling through to deployment on test environments.',
    highlights: [
      'Designed and developed internal systems including the Partnership Management System.',
      'Built Industry Mentoring and Career Development systems using Laravel and Filament.',
      'Integrated APIs and implemented response validation mechanisms.',
      'Deployed and maintained applications in test environments.',
      'Debugged backend issues and improved overall system performance.',
    ],
    stack: ['Laravel', 'Filament', 'PHP', 'MySQL', 'REST APIs'],
  },
  {
    id: 'strathmore-business-school',
    role: 'Software Developer Intern',
    company: 'Strathmore Business School',
    location: 'Nairobi, Kenya',
    start: 'Jan 2019',
    end: 'Mar 2019',
    summary: 'First professional exposure to maintaining production application modules.',
    highlights: [
      'Assisted in the development and maintenance of application modules.',
      'Supported debugging, testing and documentation efforts.',
      'Contributed to UI/UX and general system improvements.',
    ],
    stack: ['PHP', 'JavaScript', 'MySQL'],
  },
  {
    id: 'nairobi-tech-week',
    role: 'Technical Volunteer',
    company: 'Nairobi Tech Week — Strathmore University',
    location: 'Nairobi, Kenya',
    start: 'Mar 2017',
    end: 'Mar 2017',
    summary: 'Supported the technical running of talks and hackathons.',
    highlights: [
      'Supported setup of technical equipment during events and hackathons.',
      'Assisted guests and speakers, escalating issues when necessary.',
    ],
    stack: ['Event Ops', 'Support'],
  },
]

export const education = [
  {
    id: 'strathmore-bbit',
    qualification: 'BSc. Business and Information Technology — Networking Major',
    institution: 'Strathmore University',
    location: 'Nairobi, Kenya',
    start: '2017',
    end: '2022',
    note: 'Graduated with Honors',
  },
]

export default experience
