import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const programmes = await prisma.leadershipProgramme.findMany({
    orderBy: { sortOrder: 'asc' }
  })
  return NextResponse.json({ programmes })
}

export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { title, org, period, status, statusColor, icon, description, activities, sortOrder } = data

    if (!title || !org || !period) {
      return NextResponse.json({ error: 'Title, organization, and period are required' }, { status: 400 })
    }

    const prog = await prisma.leadershipProgramme.create({
      data: {
        title: String(title).trim(),
        org: String(org).trim(),
        period: String(period).trim(),
        status: status || 'Completed',
        statusColor: statusColor || '#10b981',
        icon: icon || '💻',
        description: description || '',
        activities: typeof activities === 'string' ? activities : JSON.stringify(activities || []),
        sortOrder: Number(sortOrder) || 0
      }
    })

    revalidatePath('/education')
    return NextResponse.json({ success: true, programme: prog })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create programme'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { id, title, org, period, status, statusColor, icon, description, activities, sortOrder } = data

    if (!id) return NextResponse.json({ error: 'Programme ID is required' }, { status: 400 })

    const prog = await prisma.leadershipProgramme.update({
      where: { id },
      data: {
        ...(title && { title: String(title).trim() }),
        ...(org && { org: String(org).trim() }),
        ...(period && { period: String(period).trim() }),
        ...(status && { status }),
        statusColor: statusColor !== undefined ? statusColor : undefined,
        icon: icon !== undefined ? icon : undefined,
        description: description !== undefined ? description : undefined,
        activities: activities !== undefined ? (typeof activities === 'string' ? activities : JSON.stringify(activities)) : undefined,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : undefined
      }
    })

    revalidatePath('/education')
    return NextResponse.json({ success: true, programme: prog })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update programme'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  await prisma.leadershipProgramme.delete({ where: { id } })
  revalidatePath('/education')
  return NextResponse.json({ success: true })
}
