'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Course = { code: string; name: string; grade: string; knowledge: string; credits?: number }

type EduItem = {
  id: string
  date: string
  degree: string
  institution: string
  cgpa?: string | null
  description: string
  completed: Course[]
  inProgress: Course[]
  completedLabel: string
  inProgressLabel: string
  showCredits: boolean
}

type ProgItem = {
  id: string
  title: string
  org: string
  period: string
  icon?: string | null
  description: string
  activities: string[]
  status?: string | null
  statusColor?: string | null
}

interface Props {
  educations: EduItem[]
  programmes: ProgItem[]
  volunteering: ProgItem[]
}

// ─── GRADE BADGE ──────────────────────────────────────────────────────────────

function GradeBadge({ grade }: { grade: string }) {
  const isInProgress = grade === 'In Progress' || grade === 'Pending'
  const isAPlus = grade === 'A+'
  const bg = isInProgress ? 'rgba(139,69,186,0.25)' : isAPlus ? 'rgba(181,136,211,0.22)' : 'rgba(181,136,211,0.14)'
  const color = isInProgress ? 'var(--accent)' : isAPlus ? 'var(--accent)' : 'var(--text-secondary)'
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: '20px',
      fontSize: '0.72rem', fontWeight: 700,
      background: bg, color,
      border: `1px solid ${isInProgress ? 'rgba(139,69,186,0.4)' : isAPlus ? 'rgba(181,136,211,0.35)' : 'rgba(181,136,211,0.2)'}`,
      letterSpacing: '0.5px', whiteSpace: 'nowrap',
    }}>
      {grade}
    </span>
  )
}

// ─── COURSE TABLE ─────────────────────────────────────────────────────────────

function CourseTable({ courses, label, showCredits }: { courses: Course[]; label: string; showCredits?: boolean }) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
        {label}
      </div>
      <div style={{ border: '1px solid rgba(181,136,211,0.18)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: showCredits ? '1.2fr 2.8fr 0.5fr 0.7fr' : '1.2fr 3fr 0.7fr',
          background: 'rgba(139,69,186,0.15)', padding: '10px 16px',
          fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', gap: '8px',
        }}>
          <span>Code</span><span>Course Name</span>
          {showCredits && <span style={{ textAlign: 'center' }}>Cr.</span>}
          <span style={{ textAlign: 'center' }}>Grade</span>
        </div>
        {courses.map((course, idx) => {
          const isExpanded = expandedRow === course.code
          const isLast = idx === courses.length - 1
          return (
            <React.Fragment key={course.code}>
              <motion.div
                onClick={() => setExpandedRow(isExpanded ? null : course.code)}
                whileHover={{ background: 'rgba(181,136,211,0.07)' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: showCredits ? '1.2fr 2.8fr 0.5fr 0.7fr' : '1.2fr 3fr 0.7fr',
                  padding: '10px 16px', gap: '8px', alignItems: 'center',
                  cursor: 'pointer',
                  borderBottom: (isLast && !isExpanded) ? 'none' : '1px solid rgba(181,136,211,0.08)',
                  transition: 'background 0.2s',
                  background: isExpanded ? 'rgba(181,136,211,0.06)' : 'transparent',
                }}
              >
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600 }}>{course.code}</span>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>{course.name}</span>
                {showCredits && <span style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{course.credits}</span>}
                <div style={{ display: 'flex', justifyContent: 'center' }}><GradeBadge grade={course.grade} /></div>
              </motion.div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden', borderBottom: isLast ? 'none' : '1px solid rgba(181,136,211,0.08)' }}
                  >
                    <div style={{ padding: '12px 20px 16px', background: 'rgba(139,69,186,0.08)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1rem', marginTop: '2px' }}>💡</span>
                      <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent)', marginBottom: '4px' }}>What I Gained</div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{course.knowledge}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

// ─── EDUCATION CARD ───────────────────────────────────────────────────────────

function EducationCard({ item, index, expandedId, onToggle }: { item: EduItem; index: number; expandedId: string | null; onToggle: (id: string) => void }) {
  const expanded = expandedId === item.id
  const hasCourses = item.completed.length > 0 || item.inProgress.length > 0
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }} transition={{ delay: index * 0.15, duration: 0.5 }}
      className="glass-panel" style={{ marginBottom: '40px', padding: '32px', position: 'relative', marginLeft: '24px' }}
    >
      <div style={{ position: 'absolute', left: '-58px', top: '32px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 16px var(--accent-glow-strong)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.5px' }}>{item.date}</span>
          <h3 style={{ margin: '8px 0 4px', fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>{item.degree}</h3>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.institution}</p>
          {item.cgpa && (
            <span style={{ display: 'inline-block', marginTop: '8px', padding: '3px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(181,136,211,0.18)', color: 'var(--accent)', border: '1px solid rgba(181,136,211,0.3)', letterSpacing: '0.5px' }}>
              {item.cgpa}
            </span>
          )}
        </div>
        {hasCourses && (
          <motion.button
            onClick={() => onToggle(item.id)}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', background: expanded ? 'rgba(181,136,211,0.25)' : 'rgba(181,136,211,0.1)', border: '1px solid rgba(181,136,211,0.3)', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.25s ease', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
          >
            <span style={{ display: 'inline-block', transition: 'transform 0.3s ease', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
            {expanded ? 'Hide Courses' : 'View Courses & Grades'}
          </motion.button>
        )}
      </div>
      <p style={{ marginTop: '16px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.description}</p>
      <AnimatePresence>
        {expanded && hasCourses && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}
          >
            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(181,136,211,0.12)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>💡</span> Click any course row to reveal the knowledge and skills gained.
              </p>
              {item.completed.length > 0 && <CourseTable courses={item.completed} label={item.completedLabel} showCredits={item.showCredits} />}
              {item.inProgress.length > 0 && <CourseTable courses={item.inProgress} label={item.inProgressLabel} showCredits={item.showCredits} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── PROGRAMME CARD ───────────────────────────────────────────────────────────

function ProgrammeCard({ item, index, type, expandedId, onToggle }: { item: ProgItem; index: number; type: 'programme' | 'volunteering' | 'achievement'; expandedId: string | null; onToggle: (id: string) => void }) {
  const expanded = expandedId === item.id
  const dotColor = item.statusColor ?? (type === 'achievement' ? '#f59e0b' : 'var(--accent)')
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }} transition={{ delay: index * 0.12, duration: 0.5 }}
      className="glass-panel" style={{ marginBottom: '32px', position: 'relative', marginLeft: '24px', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', left: '-58px', top: '28px', width: '16px', height: '16px', borderRadius: '50%', background: dotColor, boxShadow: `0 0 16px ${dotColor}88` }} />
      <motion.div onClick={() => onToggle(item.id)} whileHover={{ background: 'rgba(181,136,211,0.04)' }} style={{ padding: '28px 32px', cursor: 'pointer', transition: 'background 0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.3rem' }}>{item.icon || (type === 'volunteering' ? '🤝' : '💻')}</span>
              <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem' }}>{item.period}</span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', marginBottom: '4px', lineHeight: 1.35 }}>{item.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', fontWeight: 500 }}>{item.org}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            {item.status && (
              <span style={{ padding: '4px 14px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, background: `${item.statusColor}22`, color: item.statusColor ?? undefined, border: `1px solid ${item.statusColor}55`, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                {item.status}
              </span>
            )}
            <span style={{ fontSize: '0.78rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.8 }}>
              {expanded ? '▴ Collapse' : '▾ Details'}
            </span>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 32px 28px', borderTop: '1px solid rgba(181,136,211,0.12)' }}>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginTop: '20px', fontSize: '0.9rem' }}>{item.description}</p>
              {item.activities.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />Key Activities
                  </div>
                  <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {item.activities.map((act, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.6 }}>
                        <span style={{ color: 'var(--accent)', marginTop: '4px', flexShrink: 0 }}>▸</span>{act}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── SUB-LABEL ────────────────────────────────────────────────────────────────

function SubLabel({ label }: { label: string }) {
  return (
    <div style={{ marginLeft: '24px', marginTop: '48px', marginBottom: '24px' }}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '30px', height: '1px', background: 'var(--border-color)', display: 'inline-block' }} />{label}
        </span>
      </motion.div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function EducationClient({ educations, programmes, volunteering }: Props) {
  const [openEduId, setOpenEduId] = useState<string | null>(null)
  const [openProgId, setOpenProgId] = useState<string | null>(null)

  const toggleEdu = (id: string) => setOpenEduId(prev => prev === id ? null : id)
  const toggleProg = (id: string) => setOpenProgId(prev => prev === id ? null : id)

  return (
    <section className="section-padding" style={{ paddingTop: '140px', minHeight: '100vh', paddingBottom: '100px' }}>
      <div className="container">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="section-title">Academic <span className="gradient-text">Journey</span></h1>
          <p className="section-subtitle">My formal education, degrees, programmes, and volunteering milestones.</p>
        </motion.div>

        <div style={{ marginTop: '48px', position: 'relative', paddingLeft: '24px', borderLeft: '2px dashed var(--border-color)' }}>

          {educations.length === 0 ? (
            <div style={{ marginLeft: '24px', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No education records found.
            </div>
          ) : (
            educations.map((item, index) => (
              <EducationCard key={item.id} item={item} index={index} expandedId={openEduId} onToggle={toggleEdu} />
            ))
          )}

          {/* Programmes & Volunteering Section */}
          <div style={{ marginLeft: '24px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: '70px', marginBottom: '40px' }}>
              <h2 className="section-title">Programmes & <span className="gradient-text">Volunteering</span></h2>
              <p className="section-subtitle">Leadership programmes, community initiatives, and industry volunteering.</p>
            </motion.div>
          </div>

          {programmes.map((item, index) => (
            <ProgrammeCard key={item.id} item={item} index={index} type="programme" expandedId={openProgId} onToggle={toggleProg} />
          ))}

          {volunteering.length > 0 && (
            <>
              <SubLabel label="Volunteering" />
              {volunteering.map((item, index) => (
                <ProgrammeCard key={item.id} item={item} index={index} type="volunteering" expandedId={openProgId} onToggle={toggleProg} />
              ))}
            </>
          )}

        </div>

      </div>
    </section>
  )
}
