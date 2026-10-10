import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const skills = await prisma.skill.findMany({
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
  })
  return NextResponse.json({ skills })
}

export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { name, category, proficiencyLevel, icon, sortOrder, isFeatured } = data

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
    }

    const skill = await prisma.skill.create({
      data: {
        name: String(name).trim(),
        category: String(category).trim(),
        proficiencyLevel: Number(proficiencyLevel) || 80,
        icon: icon || null,
        sortOrder: Number(sortOrder) || 0,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true
      }
    })

    revalidatePath('/skills')

    return NextResponse.json({ success: true, skill })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create skill'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { id, name, category, proficiencyLevel, icon, sortOrder, isFeatured } = data

    if (!id) return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 })

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        ...(name && { name: String(name).trim() }),
        ...(category && { category: String(category).trim() }),
        ...(proficiencyLevel !== undefined && { proficiencyLevel: Number(proficiencyLevel) }),
        icon: icon !== undefined ? icon : undefined,
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) })
      }
    })

    revalidatePath('/skills')

    return NextResponse.json({ success: true, skill })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update skill'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 })

    await prisma.skill.delete({ where: { id } })

    revalidatePath('/skills')

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete skill'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
