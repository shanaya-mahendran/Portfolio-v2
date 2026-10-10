import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const entries = await prisma.arenaEntry.findMany({
    include: {
      competition: true,
      project: true,
      evidenceLinks: true,
      sections: { orderBy: { sectionOrder: 'asc' } }
    },
    orderBy: { sortOrder: 'asc' }
  })

  return NextResponse.json({ entries })
}

export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const {
      title,
      slug,
      competitionId,
      projectId,
      arenaCategory,
      outcome,
      resultDetail,
      awardTitle,
      placement,
      role,
      teamName,
      teamMembers,
      challengeSummary,
      problemStatement,
      constraints,
      personalContribution,
      technicalSolution,
      architectureDetails,
      retrospective,
      lessonsLearned,
      coverImage,
      status,
      sortOrder,
      evidenceLinks,
      sections
    } = data

    if (!title || !slug || !competitionId || !challengeSummary || !problemStatement || !retrospective) {
      return NextResponse.json({
        error: 'Title, slug, competition, challenge summary, problem statement, and retrospective are required'
      }, { status: 400 })
    }

    const cleanSlug = String(slug).trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')

    const entry = await prisma.$transaction(async (tx) => {
      const created = await tx.arenaEntry.create({
        data: {
          title: String(title).trim(),
          slug: cleanSlug,
          competitionId,
          projectId: projectId || null,
          arenaCategory: arenaCategory || 'ATTEMPT',
          outcome: outcome || 'SUBMITTED',
          resultDetail: resultDetail || '',
          awardTitle: awardTitle || null,
          placement: placement || null,
          role: role || 'Lead Developer',
          teamName: teamName || null,
          teamMembers: teamMembers || null,
          challengeSummary: String(challengeSummary).trim(),
          problemStatement: String(problemStatement).trim(),
          constraints: constraints || null,
          personalContribution: personalContribution || '',
          technicalSolution: technicalSolution || '',
          architectureDetails: architectureDetails || null,
          retrospective: String(retrospective).trim(),
          lessonsLearned: lessonsLearned || '',
          coverImage: coverImage || null,
          status: status || 'DRAFT',
          sortOrder: Number(sortOrder) || 0
        }
      })

      if (Array.isArray(evidenceLinks) && evidenceLinks.length > 0) {
        await tx.evidenceLink.createMany({
          data: evidenceLinks.map((link: { title: string; url: string; type?: string }) => ({
            arenaEntryId: created.id,
            title: link.title || 'Evidence',
            url: link.url,
            type: link.type || 'GITHUB'
          }))
        })
      }

      if (Array.isArray(sections) && sections.length > 0) {
        await tx.caseStudySection.createMany({
          data: sections.map((sec: { title: string; content: string; sectionOrder?: number }, idx: number) => ({
            arenaEntryId: created.id,
            title: sec.title || `Section ${idx + 1}`,
            content: sec.content || '',
            sectionOrder: sec.sectionOrder ?? idx
          }))
        })
      }

      return created
    })

    revalidatePath('/arena')
    revalidatePath(`/arena/${cleanSlug}`)

    return NextResponse.json({ success: true, entry })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create arena entry'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const {
      id,
      title,
      slug,
      competitionId,
      projectId,
      arenaCategory,
      outcome,
      resultDetail,
      awardTitle,
      placement,
      role,
      teamName,
      teamMembers,
      challengeSummary,
      problemStatement,
      constraints,
      personalContribution,
      technicalSolution,
      architectureDetails,
      retrospective,
      lessonsLearned,
      coverImage,
      status,
      sortOrder,
      evidenceLinks,
      sections
    } = data

    if (!id) return NextResponse.json({ error: 'Arena Entry ID is required' }, { status: 400 })

    const cleanSlug = slug ? String(slug).trim().toLowerCase().replace(/[^a-z0-9-]/g, '-') : undefined

    const updated = await prisma.$transaction(async (tx) => {
      const entry = await tx.arenaEntry.update({
        where: { id },
        data: {
          ...(title && { title: String(title).trim() }),
          ...(cleanSlug && { slug: cleanSlug }),
          ...(competitionId && { competitionId }),
          projectId: projectId !== undefined ? (projectId || null) : undefined,
          ...(arenaCategory && { arenaCategory }),
          ...(outcome && { outcome }),
          ...(resultDetail !== undefined && { resultDetail }),
          awardTitle: awardTitle !== undefined ? (awardTitle || null) : undefined,
          placement: placement !== undefined ? (placement || null) : undefined,
          ...(role && { role }),
          teamName: teamName !== undefined ? (teamName || null) : undefined,
          teamMembers: teamMembers !== undefined ? (teamMembers || null) : undefined,
          ...(challengeSummary && { challengeSummary }),
          ...(problemStatement && { problemStatement }),
          constraints: constraints !== undefined ? (constraints || null) : undefined,
          ...(personalContribution !== undefined && { personalContribution }),
          ...(technicalSolution !== undefined && { technicalSolution }),
          architectureDetails: architectureDetails !== undefined ? (architectureDetails || null) : undefined,
          ...(retrospective && { retrospective }),
          ...(lessonsLearned !== undefined && { lessonsLearned }),
          coverImage: coverImage !== undefined ? (coverImage || null) : undefined,
          ...(status && { status }),
          ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) })
        }
      })

      if (Array.isArray(evidenceLinks)) {
        await tx.evidenceLink.deleteMany({ where: { arenaEntryId: id } })
        if (evidenceLinks.length > 0) {
          await tx.evidenceLink.createMany({
            data: evidenceLinks.map((link: { title: string; url: string; type?: string }) => ({
              arenaEntryId: id,
              title: link.title || 'Evidence',
              url: link.url,
              type: link.type || 'GITHUB'
            }))
          })
        }
      }

      if (Array.isArray(sections)) {
        await tx.caseStudySection.deleteMany({ where: { arenaEntryId: id } })
        if (sections.length > 0) {
          await tx.caseStudySection.createMany({
            data: sections.map((sec: { title: string; content: string; sectionOrder?: number }, idx: number) => ({
              arenaEntryId: id,
              title: sec.title || `Section ${idx + 1}`,
              content: sec.content || '',
              sectionOrder: sec.sectionOrder ?? idx
            }))
          })
        }
      }

      return entry
    })

    revalidatePath('/arena')
    if (cleanSlug) revalidatePath(`/arena/${cleanSlug}`)

    return NextResponse.json({ success: true, entry: updated })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update arena entry'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Arena Entry ID is required' }, { status: 400 })

    await prisma.arenaEntry.delete({ where: { id } })

    revalidatePath('/arena')

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete arena entry'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
