import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [education, programmes, volunteering] = await Promise.all([
      prisma.education.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { sortOrder: 'asc' }
      }),
      prisma.leadershipProgramme.findMany({
        orderBy: { sortOrder: 'asc' }
      }),
      prisma.volunteering.findMany({
        orderBy: { sortOrder: 'asc' }
      })
    ])

    return NextResponse.json({ education, programmes, volunteering })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching education'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
