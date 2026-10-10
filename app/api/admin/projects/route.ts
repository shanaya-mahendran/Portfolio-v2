import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' }
  })
  return NextResponse.json({ projects })
}

export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { title, slug, status, description, category, tags, image, link, github, detail, isFeatured, sortOrder } = data

    if (!title || !slug || !description) {
      return NextResponse.json({ error: 'Title, slug, and description are required' }, { status: 400 })
    }

    const cleanSlug = String(slug).trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')

    const project = await prisma.project.create({
      data: {
        title: String(title).trim(),
        slug: cleanSlug,
        status: status || 'DRAFT',
        description: String(description).trim(),
        category: category || 'fullstack',
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        image: image || '/images/Portfolio.png',
        link: link || null,
        github: github || null,
        detail: detail || description,
        isFeatured: Boolean(isFeatured),
        sortOrder: Number(sortOrder) || 0
      }
    })

    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath(`/projects/${cleanSlug}`)

    return NextResponse.json({ success: true, project })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create project'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { id, title, slug, status, description, category, tags, image, link, github, detail, isFeatured, sortOrder } = data

    if (!id) return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })

    const cleanSlug = slug ? String(slug).trim().toLowerCase().replace(/[^a-z0-9-]/g, '-') : undefined

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(title && { title: String(title).trim() }),
        ...(cleanSlug && { slug: cleanSlug }),
        ...(status && { status }),
        ...(description && { description: String(description).trim() }),
        ...(category && { category }),
        ...(tags !== undefined && { tags: typeof tags === 'string' ? tags : JSON.stringify(tags) }),
        ...(image && { image }),
        link: link !== undefined ? link : undefined,
        github: github !== undefined ? github : undefined,
        ...(detail && { detail }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) })
      }
    })

    revalidatePath('/')
    revalidatePath('/projects')
    if (cleanSlug) revalidatePath(`/projects/${cleanSlug}`)

    return NextResponse.json({ success: true, project })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update project'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })

    await prisma.project.delete({ where: { id } })

    revalidatePath('/')
    revalidatePath('/projects')

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete project'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
