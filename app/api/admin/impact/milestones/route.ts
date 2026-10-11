import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

// POST: add a milestone to an initiative
export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { initiativeId, title, description, targetDate, isCompleted, sortOrder } = data

    if (!initiativeId || !title) {
      return NextResponse.json({ error: 'initiativeId and title are required' }, { status: 400 })
    }

    const milestone = await prisma.milestone.create({
      data: {
        initiativeId,
        title: String(title).trim(),
        description: description || null,
        targetDate: targetDate || null,
        isCompleted: Boolean(isCompleted),
        sortOrder: Number(sortOrder) || 0
      }
    })

    revalidatePath('/impact')
    return NextResponse.json({ success: true, milestone })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to add milestone'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT: update a milestone
export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { id, ...rest } = data
    if (!id) return NextResponse.json({ error: 'Milestone ID is required' }, { status: 400 })

    if (rest.sortOrder !== undefined) rest.sortOrder = Number(rest.sortOrder)
    if (rest.isCompleted !== undefined) rest.isCompleted = Boolean(rest.isCompleted)

    const milestone = await prisma.milestone.update({ where: { id }, data: rest })
    revalidatePath('/impact')
    return NextResponse.json({ success: true, milestone })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update milestone'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE: remove a milestone
export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Milestone ID is required' }, { status: 400 })

    await prisma.milestone.delete({ where: { id } })
    revalidatePath('/impact')
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete milestone'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
