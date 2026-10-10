import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const competitions = await prisma.competition.findMany({
    include: { _count: { select: { arenaEntries: true } } },
    orderBy: { year: 'desc' }
  })
  return NextResponse.json({ competitions })
}

export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { name, slug, organizer, year, category, location, websiteUrl, description } = data

    if (!name || !slug || !organizer || !year) {
      return NextResponse.json({ error: 'Name, slug, organizer, and year are required' }, { status: 400 })
    }

    const cleanSlug = String(slug).trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')

    const comp = await prisma.competition.create({
      data: {
        name: String(name).trim(),
        slug: cleanSlug,
        organizer: String(organizer).trim(),
        year: Number(year),
        category: category || 'Hackathon',
        location: location || null,
        websiteUrl: websiteUrl || null,
        description: description || null
      }
    })

    revalidatePath('/arena')

    return NextResponse.json({ success: true, competition: comp })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create competition'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { id, name, slug, organizer, year, category, location, websiteUrl, description } = data

    if (!id) return NextResponse.json({ error: 'Competition ID is required' }, { status: 400 })

    const cleanSlug = slug ? String(slug).trim().toLowerCase().replace(/[^a-z0-9-]/g, '-') : undefined

    const comp = await prisma.competition.update({
      where: { id },
      data: {
        ...(name && { name: String(name).trim() }),
        ...(cleanSlug && { slug: cleanSlug }),
        ...(organizer && { organizer: String(organizer).trim() }),
        ...(year && { year: Number(year) }),
        ...(category && { category }),
        location: location !== undefined ? location : undefined,
        websiteUrl: websiteUrl !== undefined ? websiteUrl : undefined,
        description: description !== undefined ? description : undefined
      }
    })

    revalidatePath('/arena')

    return NextResponse.json({ success: true, competition: comp })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update competition'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Competition ID is required' }, { status: 400 })

    await prisma.competition.delete({ where: { id } })

    revalidatePath('/arena')

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete competition'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
