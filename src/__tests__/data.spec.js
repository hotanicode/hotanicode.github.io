import { describe, it, expect } from 'vitest'

import { profile, navLinks, socials, stats } from '../data/profile'
import { skillGroups, techMarquee } from '../data/skills'
import { experience, education } from '../data/experience'
import { projects, projectCategories, featuredProjects } from '../data/projects'
import { apps, showcasedApps, otherApps, miniBuilds } from '../data/apps'

describe('profile data', () => {
  it('exposes the core contact details', () => {
    expect(profile.name).toBe('Michael Kiarie')
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    expect(profile.resume).toMatch(/\.pdf$/)
  })

  it('has nav links that map to real section anchors', () => {
    expect(navLinks.length).toBeGreaterThan(0)
    navLinks.forEach((link) => {
      expect(link.hash).toMatch(/^#[a-z-]+$/)
      expect(link.label).toBeTruthy()
    })
  })

  it('provides socials and stats for the hero', () => {
    expect(socials.every((social) => social.url && social.icon)).toBe(true)
    expect(stats).toHaveLength(4)
  })
})

describe('skills data', () => {
  it('keeps every level within 0-100', () => {
    skillGroups.forEach((group) => {
      expect(group.skills.length).toBeGreaterThan(0)
      group.skills.forEach((skill) => {
        expect(skill.level).toBeGreaterThanOrEqual(0)
        expect(skill.level).toBeLessThanOrEqual(100)
      })
    })
  })

  it('has enough entries to fill the marquee', () => {
    expect(techMarquee.length).toBeGreaterThanOrEqual(8)
  })
})

describe('experience data', () => {
  it('marks exactly one current role', () => {
    expect(experience.filter((item) => item.current)).toHaveLength(1)
  })

  it('gives every entry a unique id and a date range', () => {
    const ids = experience.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
    experience.forEach((item) => {
      expect(item.start).toBeTruthy()
      expect(item.end).toBeTruthy()
    })
  })

  it('includes education history', () => {
    expect(education.length).toBeGreaterThan(0)
  })
})

describe('project data', () => {
  it('gives every project a unique id, tags and a category', () => {
    const ids = projects.map((project) => project.id)
    expect(new Set(ids).size).toBe(ids.length)

    projects.forEach((project) => {
      expect(project.title).toBeTruthy()
      expect(project.tags.length).toBeGreaterThan(0)
      expect(project.category).toBeTruthy()
    })
  })

  it('derives filter categories starting with "All"', () => {
    expect(projectCategories[0]).toBe('All')
    expect(new Set(projectCategories).size).toBe(projectCategories.length)
  })

  it('features a subset of projects', () => {
    expect(featuredProjects.length).toBeGreaterThan(0)
    expect(featuredProjects.length).toBeLessThanOrEqual(projects.length)
  })
})

describe('apps data', () => {
  it('uses a known status for every app', () => {
    const allowed = ['Live', 'In progress', 'Concept']
    apps.forEach((app) => {
      expect(allowed).toContain(app.status)
      expect(app.icon).toBeTruthy()
    })
  })

  it('resolves every screenshot to a real asset url', () => {
    showcasedApps.forEach((app) => {
      expect(app.screenshots.length).toBeGreaterThan(0)
      app.screenshots.forEach((shot) => {
        expect(shot.src).toBeTruthy()
        expect(shot.caption).toBeTruthy()
      })
    })
  })

  it('splits apps into showcased and card variants without losing any', () => {
    expect(showcasedApps.length + otherApps.length).toBe(apps.length)
    expect(otherApps.every((app) => !app.screenshots?.length)).toBe(true)
  })

  it('links the Canaaneast Group site', () => {
    const canaan = apps.find((app) => app.id === 'canaaneast-group')

    expect(canaan).toBeDefined()
    expect(canaan.links.demo).toBe('https://canaangroupco.com/')
    expect(canaan.status).toBe('Live')
  })

  it('no longer lists the retired API toolkit', () => {
    expect(apps.some((app) => app.id === 'api-toolkit')).toBe(false)
  })
})

describe('mini builds', () => {
  it('lists the small frontend challenges with unique ids', () => {
    const ids = miniBuilds.map((build) => build.id)

    expect(miniBuilds.length).toBeGreaterThanOrEqual(3)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every build a blurb, tags and a date', () => {
    miniBuilds.forEach((build) => {
      expect(build.name).toBeTruthy()
      expect(build.blurb).toBeTruthy()
      expect(build.tags.length).toBeGreaterThan(0)
      expect(build.date).toBeTruthy()
    })
  })

  it('points each repo link at a GitHub url', () => {
    miniBuilds
      .filter((build) => build.repo)
      .forEach((build) => {
        expect(build.repo).toMatch(/^https:\/\/github\.com\/[^/]+\/.+/)
      })
  })
})
