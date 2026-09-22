/**
 * Single source of truth for personal details, contact info and social links.
 */
export const profile = {
  name: 'Michael Kiarie',
  firstName: 'Michael',
  initials: 'MK',
  role: 'Software Developer',
  headline: 'I build backends that hold up and interfaces that keep up.',
  location: 'Nairobi, Kenya',
  available: true,
  availability: 'Open to full-stack & backend roles',
  roles: [
    'Software Developer',
    'Backend Engineer',
    'Laravel & Spring Boot Dev',
    'Angular & Vue Dev',
  ],
  summary:
    'Results driven software developer with experience across backend and full-stack development, specialising in Laravel, Spring Boot and Angular. I upgrade legacy systems, implement modern architectures and ship scalable applications.',
  bio: [
    'I am a software developer at the Strathmore University I.C.T Department, where most of my work lives at the intersection of legacy code and modern architecture. I have taken production systems from Java 8 to Java 21, Spring Boot 1.5 to 3.2 and Angular 4 to Angular 16 without taking the services down.',
    'Day to day I design APIs, integrate third-party services such as PayPal, build configurable form and workflow engines, and keep CI/CD pipelines green so deployments stay boring. I care about readable code, sensible database design and systems that are still maintainable two years later.',
    'Outside of work you will find me reading, playing chess or on a trail somewhere around Nairobi.',
  ],
  email: 'mickeyhotshot@gmail.com',
  phone: '+254 724 234 210',
  phoneHref: '+254724234210',
  resume: '/resume/Michael_Kiarie_Resume.pdf',
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Kiswahili', level: 'Fluent' },
    { name: 'French', level: 'Intermediate' },
  ],
  interests: ['Reading', 'Chess', 'Hiking'],
}

export const stats = [
  { value: '3+', label: 'Years building software' },
  { value: '10+', label: 'Systems shipped & maintained' },
  { value: '2', label: 'Major stack migrations led' },
  { value: '100u%', label: 'Automated deployments' },
]

export const socials = [
  { name: 'GitHub', url: 'https://github.com/MickeyH254', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/michael-kiarie', icon: 'linkedin' },
  { name: 'Email', url: `mailto:${profile.email}`, icon: 'mail' },
]

export const navLinks = [
  { label: 'Home', hash: '#home' },
  { label: 'About', hash: '#about' },
  { label: 'Skills', hash: '#skills' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Apps', hash: '#apps' },
  { label: 'Contact', hash: '#contact' },
]

export default profile
