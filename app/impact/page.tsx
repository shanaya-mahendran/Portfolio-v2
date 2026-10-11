import { getPublicInitiatives } from '@/lib/data'
import ImpactClient from './ImpactClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Impact & SDG Roadmap | Shanaya Mahendran',
  description: 'A living record of SDG-aligned initiatives — from vision to verified impact in Sri Lanka.',
}

export default async function ImpactPage() {
  const initiatives = await getPublicInitiatives()

  const parsed = initiatives.map((init: any) => {
    let sdgs: number[] = []
    let successCriteria: string[] = []

    try { sdgs = JSON.parse(init.sdgs) } catch {}
    try {
      const sc = JSON.parse(init.successCriteria || '[]')
      successCriteria = Array.isArray(sc) ? sc : [init.successCriteria || '']
    } catch {
      if (init.successCriteria) successCriteria = [init.successCriteria]
    }

    return {
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
      milestones: (init.milestones || []).map((m: any) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        targetDate: m.targetDate,
        completedDate: m.completedDate,
        isCompleted: m.isCompleted,
        sortOrder: m.sortOrder,
      })),
    }
  })

  return <ImpactClient initiatives={parsed} />
}
