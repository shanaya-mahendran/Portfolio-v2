'use client'

import React, { useState, useEffect } from 'react'

interface SkillCategory {
  name: string
  skills: { name: string; level: number }[]
}

interface Props {
  skillCategories: SkillCategory[]
  allSkillTags: string[]
}

export default function SkillsClient({ skillCategories, allSkillTags }: Props) {
  const [activeTag, setActiveTag] = useState('')

  useEffect(() => {
    const fillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target as HTMLElement
          const target = fill.dataset.target
          fill.style.width = target + '%'
          fillObserver.unobserve(fill)
        }
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('.skill-bar-fill').forEach(f => fillObserver.observe(f))
    return () => fillObserver.disconnect()
  }, [skillCategories])

  return (
    <>
      <section className="section-padding" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h2 className="section-title">Tech Stack &amp; <span className="accent-text">Expertise</span></h2>
          <p className="section-subtitle">Tools, languages, and frameworks I work with daily.</p>

          {skillCategories.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>No skills found. Add some in the CMS.</p>
          ) : (
            <div id="skillsContainer">
              {skillCategories.map(cat => (
                <div className="skill-category" key={cat.name}>
                  <h3>{cat.name}</h3>
                  {cat.skills.map(s => (
                    <div className="skill-bar-wrap" data-level={s.level} key={s.name}>
                      <div className="label">
                        <span>{s.name}</span>
                        <span>{s.level}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: '0%' }} data-target={s.level}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <h3 className="section-title" style={{ fontSize: '1.6rem', marginTop: '48px' }}>Skill <span className="accent-text">Cloud</span></h3>
          <p className="section-subtitle" style={{ marginBottom: '16px' }}>All the technologies I&apos;ve worked with.</p>
          <div className="skill-tag-cloud" id="skillCloud">
            {allSkillTags.map(tag => (
              <span
                key={tag}
                className={`skill-tag ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(prev => prev === tag ? '' : tag)}
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
