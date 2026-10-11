import { getPublicEducation, getPublicProgrammes, getPublicVolunteering } from '@/lib/data'
import EducationClient from './EducationClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Academic Journey | Shanaya Mahendran',
  description: 'Formal education, degrees, leadership programmes, and volunteering milestones.',
}

export default async function EducationPage() {
  const [educations, programmes, volunteering] = await Promise.all([
    getPublicEducation(),
    getPublicProgrammes(),
    getPublicVolunteering(),
  ])

  // Parse coursesJson for each education entry
  const parsedEducations = educations.map((edu) => {
    let completed: { code: string; name: string; grade: string; knowledge: string }[] = []
    let inProgress: { code: string; name: string; grade: string; knowledge: string }[] = []
    try {
      if (edu.coursesJson) {
        const parsed = JSON.parse(edu.coursesJson)
        completed = parsed.completed || []
        inProgress = parsed.inProgress || []
      }
    } catch {}
    return {
      id: edu.id,
      date: edu.date,
      degree: edu.degree,
      institution: edu.institution,
      cgpa: edu.cgpa,
      description: edu.description,
      completed,
      inProgress,
      completedLabel: edu.completedLabel || 'Completed',
      inProgressLabel: edu.inProgressLabel || 'In Progress',
      showCredits: false,
    }
  })

  const parsedProgrammes = programmes.map((p) => {
    let activities: string[] = []
    try {
      const parsed = JSON.parse(p.activities)
      activities = Array.isArray(parsed) ? parsed : []
    } catch {}
    return {
      id: p.id,
      title: p.title,
      org: p.org,
      period: p.period,
      status: p.status,
      statusColor: p.statusColor,
      icon: p.icon,
      description: p.description,
      activities,
    }
  })

  const parsedVolunteering = volunteering.map((v) => {
    let activities: string[] = []
    try {
      const parsed = JSON.parse(v.activities)
      activities = Array.isArray(parsed) ? parsed : []
    } catch {}
    return {
      id: v.id,
      title: v.title,
      org: v.org,
      period: v.period,
      status: v.status,
      statusColor: v.statusColor,
      icon: v.icon,
      description: v.description,
      activities,
    }
  })

  return (
    <EducationClient
      educations={parsedEducations}
      programmes={parsedProgrammes}
      volunteering={parsedVolunteering}
    />
  )
}
