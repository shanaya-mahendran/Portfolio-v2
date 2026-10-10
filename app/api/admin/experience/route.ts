import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const experiences = await prisma.experience.findMany({
    orderBy: { sortOrder: 'asc' }
  })
  return NextResponse.json({ experiences })
}

export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { title, role, company, location, startDate, endDate, isCurrent, descriptions, sortOrder, status } = data

    if (!title || !company || !startDate) {
      return NextResponse.json({ error: 'Title, company, and start date are required' }, { status: 400 })
    }

    const exp = await prisma.experience.create({
      data: {
        title: String(title).trim(),
        role: role || title,
        company: String(company).trim(),
        location: location || null,
        startDate: String(startDate).trim(),
        endDate: endDate || null,
        isCurrent: Boolean(isCurrent),
        descriptions: typeof descriptions === 'string' ? descriptions : JSON.stringify(descriptions || []),
        sortOrder: Number(sortOrder) || 0,
        status: status || 'PUBLISHED'
      }
    })

    revalidatePath('/about')

    return NextResponse.json({ success: true, experience: exp })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create experience'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { id, title, role, company, location, startDate, endDate, isCurrent, descriptions, sortOrder, status } = data

    if (!id) return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 })

    const exp = await prisma.experience.update({
      where: { id },
      data: {
        ...(title && { title: String(title).trim() }),
        ...(role && { role: String(role).trim() }),
        ...(company && { company: String(company).trim() }),
        location: location !== undefined ? location : undefined,
        ...(startDate && { startDate: String(startDate).trim() }),
        endDate: endDate !== undefined ? endDate : undefined,
        ...(isCurrent !== undefined && { isCurrent: Boolean(isCurrent) }),
        ...(descriptions !== undefined && { descriptions: typeof descriptions === 'string' ? descriptions : JSON.stringify(descriptions) }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(status && { status })
      }
    })

    revalidatePath('/about')

    return NextResponse.json({ success: true, experience: exp })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update experience'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 })

    await prisma.experience.delete({ where: { id } })

    revalidatePath('/about')

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete experience'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
