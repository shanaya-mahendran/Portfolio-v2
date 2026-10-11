import { getPublicExperience } from '@/lib/data'
import AboutClient from './AboutClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'About | Shanaya Mahendran',
  description: 'Learn about Shanaya Mahendran — engineer, builder, and lifelong learner.',
}

export default async function AboutPage() {
  const experiences = await getPublicExperience()

  const parsedExperiences = experiences.map((exp) => {
    let descriptions: string[] = []
    try {
      const parsed = JSON.parse(exp.descriptions)
      descriptions = Array.isArray(parsed) ? parsed : [exp.descriptions]
    } catch {
      descriptions = [exp.descriptions]
    }
    return {
      date: exp.isCurrent
        ? `${exp.startDate} – Present`
        : `${exp.startDate}${exp.endDate ? ` – ${exp.endDate}` : ''}`,
      title: `${exp.title} | ${exp.company}`,
      descriptions,
    }
  })

  return <AboutClient experiences={parsedExperiences} />
}
