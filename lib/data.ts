import prisma from './prisma'
import { getAuthenticatedAdmin } from './auth'
import { FALLBACK_ARENA_ENTRIES, FallbackArenaEntry } from './fallback-data'

export async function getPublicProjects() {
  try {
    return await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { sortOrder: 'asc' }
    })
  } catch (error) {
    console.warn('[data.ts] getPublicProjects database fallback triggered:', error instanceof Error ? error.message : error)
    return []
  }
}

export async function getPublicFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { status: 'PUBLISHED', isFeatured: true },
      orderBy: { sortOrder: 'asc' }
    })
  } catch (error) {
    console.warn('[data.ts] getPublicFeaturedProjects database fallback triggered:', error instanceof Error ? error.message : error)
    return []
  }
}

export async function getProjectBySlug(slug: string, preview = false) {
  try {
    if (preview) {
      const admin = await getAuthenticatedAdmin()
      if (!admin) return null
      return await prisma.project.findUnique({
        where: { slug }
      })
    }

    return await prisma.project.findFirst({
      where: { slug, status: 'PUBLISHED' }
    })
  } catch (error) {
    console.warn(`[data.ts] getProjectBySlug(${slug}) database fallback triggered:`, error instanceof Error ? error.message : error)
    return null
  }
}

export async function getPublicArenaEntries() {
  try {
    const entries = await prisma.arenaEntry.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        competition: true,
        project: true,
        evidenceLinks: true
      },
      orderBy: { sortOrder: 'asc' }
    })
    if (entries && entries.length > 0) {
      return entries
    }
    return FALLBACK_ARENA_ENTRIES as any
  } catch (error) {
    console.warn('[data.ts] getPublicArenaEntries fallback to mock entries:', error instanceof Error ? error.message : error)
    return FALLBACK_ARENA_ENTRIES as any
  }
}

export async function getArenaEntryBySlug(slug: string, preview = false) {
  try {
    if (preview) {
      const admin = await getAuthenticatedAdmin()
      if (!admin) return null
      const entry = await prisma.arenaEntry.findUnique({
        where: { slug },
        include: {
          competition: true,
          project: true,
          sections: { orderBy: { sectionOrder: 'asc' } },
          evidenceLinks: true
        }
      })
      if (entry) return entry
    } else {
      const entry = await prisma.arenaEntry.findFirst({
        where: { slug, status: 'PUBLISHED' },
        include: {
          competition: true,
          project: true,
          sections: { orderBy: { sectionOrder: 'asc' } },
          evidenceLinks: true
        }
      })
      if (entry) return entry
    }
  } catch (error) {
    console.warn(`[data.ts] getArenaEntryBySlug(${slug}) query error, using fallback:`, error instanceof Error ? error.message : error)
  }

  const fallback = FALLBACK_ARENA_ENTRIES.find((e) => e.slug === slug)
  return (fallback || null) as any
}

export async function getPublicSkills() {
  try {
    return await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
    })
  } catch (error) {
    console.warn('[data.ts] getPublicSkills database fallback triggered:', error instanceof Error ? error.message : error)
    return []
  }
}

export async function getPublicExperience() {
  try {
    return await prisma.experience.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { sortOrder: 'asc' }
    })
  } catch (error) {
    console.warn('[data.ts] getPublicExperience database fallback triggered:', error instanceof Error ? error.message : error)
    return []
  }
}

export async function getPublicEducation() {
  try {
    return await prisma.education.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { sortOrder: 'asc' }
    })
  } catch (error) {
    console.warn('[data.ts] getPublicEducation database fallback triggered:', error instanceof Error ? error.message : error)
    return []
  }
}

export async function getPublicSiteSettings() {
  try {
    const rows = await prisma.siteSettings.findMany()
    const settings: Record<string, string> = {}
    rows.forEach((r: { key: string; value: string }) => {
      settings[r.key] = r.value
    })
    return settings
  } catch (error) {
    console.warn('[data.ts] getPublicSiteSettings database fallback triggered:', error instanceof Error ? error.message : error)
    return {}
  }
}
