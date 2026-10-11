import { notFound } from 'next/navigation'
import { getPublicInitiatives } from '@/lib/data'
import InitiativeDetail from './InitiativeDetail'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const initiatives = await getPublicInitiatives()
  const init = initiatives.find((i: any) => i.slug === slug)
  if (!init) return { title: 'Not Found' }
  return {
    title: `${init.title} | Impact & SDGs | Shanaya Mahendran`,
    description: init.primaryObjective,
  }
}

export default async function InitiativePage({ params }: Props) {
  const { slug } = await params
  const initiatives = await getPublicInitiatives()
  const raw = initiatives.find((i: any) => i.slug === slug)

  // notFound() throws so after this point raw is guaranteed to exist
  if (!raw) {
    notFound()
  }

  // parse SDGs
  let sdgs: number[] = []
  try { sdgs = JSON.parse(raw.sdgs) } catch {}

  // parse success criteria
  let successCriteria: string[] = []
  try {
    const sc = JSON.parse(raw.successCriteria ?? '[]')
    successCriteria = Array.isArray(sc) ? sc : (raw.successCriteria ? [raw.successCriteria] : [])
  } catch {
    if (raw.successCriteria) successCriteria = [raw.successCriteria]
  }

  const initiative = {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    tagline: raw.tagline ?? null,
    sdgs,
    primaryObjective: raw.primaryObjective,
    phase: raw.phase,
    icon: raw.icon ?? null,
    coverColor: raw.coverColor ?? null,
    problem: raw.problem,
    targetCommunity: raw.targetCommunity,
    proposedSolution: raw.proposedSolution,
    architecture: raw.architecture ?? null,
    successCriteria,
    disclaimer: raw.disclaimer ?? null,
    githubUrl: raw.githubUrl ?? null,
    researchUrl: raw.researchUrl ?? null,
    milestones: (raw.milestones ?? []).map((m: {
      id: string
      title: string
      description?: string | null
      targetDate?: string | null
      completedDate?: string | null
      isCompleted: boolean
      sortOrder: number
    }) => ({
      id: m.id,
      title: m.title,
      description: m.description ?? null,
      targetDate: m.targetDate ?? null,
      completedDate: m.completedDate ?? null,
      isCompleted: m.isCompleted,
      sortOrder: m.sortOrder,
    })),
  }

  return <InitiativeDetail initiative={initiative} />
}
