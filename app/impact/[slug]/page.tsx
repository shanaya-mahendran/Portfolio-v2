import { notFound } from 'next/navigation'
import { getPublicInitiatives } from '@/lib/data'
import InitiativeDetail from './InitiativeDetail'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const initiatives = await getPublicInitiatives()
  const init = initiatives.find(i => i.slug === params.slug)
  if (!init) return { title: 'Not Found' }
  return {
    title: `${init.title} | Impact & SDGs | Shanaya Mahendran`,
    description: init.primaryObjective,
  }
}

export default async function InitiativePage({ params }: { params: { slug: string } }) {
  const initiatives = await getPublicInitiatives()
  const init = initiatives.find(i => i.slug === params.slug)
  if (!init) notFound()

  let sdgs: number[] = []
  let successCriteria: string[] = []

  try { sdgs = JSON.parse(init.sdgs) } catch {}
  try {
    const sc = JSON.parse(init.successCriteria || '[]')
    successCriteria = Array.isArray(sc) ? sc : [init.successCriteria || '']
  } catch {
    if (init.successCriteria) successCriteria = [init.successCriteria]
  }

  const parsed = {
    id: init.id,
    slug: init.slug,
    title: init.title,
    tagline: init.tagline,
    sdgs,
    primaryObjective: init.primaryObjective,
    phase: init.phase,
    icon: init.icon,
    coverColor: init.coverColor,
    problem: init.problem,
    targetCommunity: init.targetCommunity,
    proposedSolution: init.proposedSolution,
    architecture: init.architecture,
    successCriteria,
    disclaimer: init.disclaimer,
    githubUrl: init.githubUrl,
    researchUrl: init.researchUrl,
    milestones: init.milestones.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      targetDate: m.targetDate,
      completedDate: m.completedDate,
      isCompleted: m.isCompleted,
      sortOrder: m.sortOrder,
    })),
  }

  return <InitiativeDetail initiative={parsed} />
}
