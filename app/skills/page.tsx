import { getPublicSkills } from '@/lib/data'
import SkillsClient from './SkillsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Skills | Shanaya Mahendran',
  description: 'Tech stack, tools, languages, and frameworks Shanaya Mahendran works with.',
}

export default async function SkillsPage() {
  const skills = await getPublicSkills()

  // Group by category for skill bars
  const categoryMap: Record<string, { name: string; level: number }[]> = {}
  for (const skill of skills) {
    if (!categoryMap[skill.category]) categoryMap[skill.category] = []
    categoryMap[skill.category].push({ name: skill.name, level: skill.proficiencyLevel })
  }

  const skillCategories = Object.entries(categoryMap).map(([name, skills]) => ({ name, skills }))
  const allSkillTags = skills.map(s => s.name)

  return <SkillsClient skillCategories={skillCategories} allSkillTags={allSkillTags} />
}
