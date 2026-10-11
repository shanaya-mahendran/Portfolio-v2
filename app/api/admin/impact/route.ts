import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

// ─── GET (list all initiatives) ───────────────────────────────────────────────
export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const initiatives = await prisma.initiative.findMany({
    include: { milestones: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { sortOrder: 'asc' }
  })
  return NextResponse.json({ initiatives })
}

// ─── POST (create initiative) ─────────────────────────────────────────────────
export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const {
      slug, title, tagline, sdgs, primaryObjective, phase, icon, coverColor,
      problem, targetCommunity, proposedSolution, architecture,
      successCriteria, disclaimer, githubUrl, researchUrl, sortOrder, visibility
    } = data

    if (!slug || !title || !problem || !proposedSolution) {
      return NextResponse.json({ error: 'slug, title, problem, and proposedSolution are required' }, { status: 400 })
    }

    const initiative = await prisma.initiative.create({
      data: {
        slug: String(slug).trim().toLowerCase().replace(/\s+/g, '-'),
        title: String(title).trim(),
        tagline: tagline || null,
        sdgs: typeof sdgs === 'string' ? sdgs : JSON.stringify(sdgs || []),
        primaryObjective: primaryObjective || '',
        phase: phase || 'Exploring',
        icon: icon || null,
        coverColor: coverColor || null,
        problem: String(problem).trim(),
        targetCommunity: targetCommunity || '',
        proposedSolution: String(proposedSolution).trim(),
        architecture: architecture || null,
        successCriteria: successCriteria || null,
        disclaimer: disclaimer || null,
        githubUrl: githubUrl || null,
        researchUrl: researchUrl || null,
        sortOrder: Number(sortOrder) || 0,
        visibility: visibility || 'PUBLISHED'
      }
    })

    revalidatePath('/impact')
    return NextResponse.json({ success: true, initiative })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create initiative'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ─── PUT (update initiative) ──────────────────────────────────────────────────
export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { id, ...rest } = data

    if (!id) return NextResponse.json({ error: 'Initiative ID is required' }, { status: 400 })

    if (rest.sdgs && typeof rest.sdgs !== 'string') {
      rest.sdgs = JSON.stringify(rest.sdgs)
    }
    if (rest.slug) {
      rest.slug = String(rest.slug).trim().toLowerCase().replace(/\s+/g, '-')
    }
    if (rest.sortOrder !== undefined) {
      rest.sortOrder = Number(rest.sortOrder)
    }

    const initiative = await prisma.initiative.update({
      where: { id },
      data: rest
    })

    revalidatePath('/impact')
    revalidatePath(`/impact/${initiative.slug}`)
    return NextResponse.json({ success: true, initiative })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update initiative'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ─── DELETE (delete initiative) ───────────────────────────────────────────────
export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Initiative ID is required' }, { status: 400 })

    await prisma.initiative.delete({ where: { id } })

    revalidatePath('/impact')
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete initiative'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
