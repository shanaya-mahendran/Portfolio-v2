import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }]
    })
    return NextResponse.json({ skills })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching skills'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
