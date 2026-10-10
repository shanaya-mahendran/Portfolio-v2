import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const education = await prisma.education.findMany({
    orderBy: { sortOrder: 'asc' }
  })
  return NextResponse.json({ education })
}

export async function POST(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { institution, degree, fieldOfStudy, cgpa, date, description, coursesJson, completedLabel, inProgressLabel, sortOrder, status } = data

    if (!institution || !degree || !date) {
      return NextResponse.json({ error: 'Institution, degree, and date are required' }, { status: 400 })
    }

    const edu = await prisma.education.create({
      data: {
        institution: String(institution).trim(),
        degree: String(degree).trim(),
        fieldOfStudy: fieldOfStudy || null,
        cgpa: cgpa || null,
        date: String(date).trim(),
        description: description || '',
        coursesJson: typeof coursesJson === 'string' ? coursesJson : JSON.stringify(coursesJson || {}),
        completedLabel: completedLabel || null,
        inProgressLabel: inProgressLabel || null,
        sortOrder: Number(sortOrder) || 0,
        status: status || 'PUBLISHED'
      }
    })

    revalidatePath('/education')

    return NextResponse.json({ success: true, education: edu })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create education'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await req.json()
    const { id, institution, degree, fieldOfStudy, cgpa, date, description, coursesJson, completedLabel, inProgressLabel, sortOrder, status } = data

    if (!id) return NextResponse.json({ error: 'Education ID is required' }, { status: 400 })

    const edu = await prisma.education.update({
      where: { id },
      data: {
        ...(institution && { institution: String(institution).trim() }),
        ...(degree && { degree: String(degree).trim() }),
        fieldOfStudy: fieldOfStudy !== undefined ? fieldOfStudy : undefined,
        cgpa: cgpa !== undefined ? cgpa : undefined,
        ...(date && { date: String(date).trim() }),
        ...(description !== undefined && { description }),
        ...(coursesJson !== undefined && { coursesJson: typeof coursesJson === 'string' ? coursesJson : JSON.stringify(coursesJson) }),
        completedLabel: completedLabel !== undefined ? completedLabel : undefined,
        inProgressLabel: inProgressLabel !== undefined ? inProgressLabel : undefined,
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(status && { status })
      }
    })

    revalidatePath('/education')

    return NextResponse.json({ success: true, education: edu })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update education'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Education ID is required' }, { status: 400 })

    await prisma.education.delete({ where: { id } })

    revalidatePath('/education')

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete education'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
