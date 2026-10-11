import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [experience, settingsRows] = await Promise.all([
      prisma.experience.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { sortOrder: 'asc' }
      }),
      prisma.siteSettings.findMany()
    ])

    const settings: Record<string, string> = {}
    settingsRows.forEach((r) => { settings[r.key] = r.value })

    return NextResponse.json({ experience, settings })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching about data'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
