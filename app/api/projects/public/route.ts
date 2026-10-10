import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { sortOrder: 'asc' }
    })
    return NextResponse.json({ projects })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching projects'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
