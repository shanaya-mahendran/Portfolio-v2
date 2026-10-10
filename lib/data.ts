import prisma from './prisma'
import { getAuthenticatedAdmin } from './auth'

export async function getPublicProjects() {
  return prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { sortOrder: 'asc' }
  })
}

export async function getPublicFeaturedProjects() {
  return prisma.project.findMany({
    where: { status: 'PUBLISHED', isFeatured: true },
    orderBy: { sortOrder: 'asc' }
  })
}

export async function getProjectBySlug(slug: string, preview = false) {
  if (preview) {
    const admin = await getAuthenticatedAdmin()
    if (!admin) return null
    return prisma.project.findUnique({
      where: { slug }
    })
  }

  return prisma.project.findFirst({
    where: { slug, status: 'PUBLISHED' }
  })
}

export async function getPublicArenaEntries() {
  return prisma.arenaEntry.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      competition: true,
      project: true,
      evidenceLinks: true
    },
    orderBy: { sortOrder: 'asc' }
  })
}

export async function getArenaEntryBySlug(slug: string, preview = false) {
  if (preview) {
    const admin = await getAuthenticatedAdmin()
    if (!admin) return null
    return prisma.arenaEntry.findUnique({
      where: { slug },
      include: {
        competition: true,
        project: true,
        sections: { orderBy: { sectionOrder: 'asc' } },
        evidenceLinks: true
      }
    })
  }

  return prisma.arenaEntry.findFirst({
    where: { slug, status: 'PUBLISHED' },
    include: {
      competition: true,
      project: true,
      sections: { orderBy: { sectionOrder: 'asc' } },
      evidenceLinks: true
    }
  })
}

export async function getPublicSkills() {
  return prisma.skill.findMany({
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
  })
}

export async function getPublicExperience() {
  return prisma.experience.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { sortOrder: 'asc' }
  })
}

export async function getPublicEducation() {
  return prisma.education.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { sortOrder: 'asc' }
  })
}

export async function getPublicSiteSettings() {
  const rows = await prisma.siteSettings.findMany()
  const settings: Record<string, string> = {}
  rows.forEach(r => { settings[r.key] = r.value })
  return settings
}
