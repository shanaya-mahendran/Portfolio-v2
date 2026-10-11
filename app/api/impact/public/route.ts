import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const initiatives = await prisma.initiative.findMany({
      where: { visibility: 'PUBLISHED' },
      include: { milestones: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { sortOrder: 'asc' }
    })
    return NextResponse.json({ initiatives })
  } catch {
    return NextResponse.json({ initiatives: [] })
  }
}
