'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, BookOpen, CheckCircle2, Circle, Target, Users, Lightbulb, BarChart2, AlertTriangle, Layers } from 'lucide-react'

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface MilestoneItem {
  id: string
  title: string
  description?: string | null
  targetDate?: string | null
  completedDate?: string | null
  isCompleted: boolean
  sortOrder: number
}

interface InitiativeItem {
  id: string
  slug: string
  title: string
  tagline?: string | null
  sdgs: number[]
  primaryObjective: string
  phase: string
  icon?: string | null
  coverColor?: string | null
  problem: string
  targetCommunity: string
  proposedSolution: string
  architecture?: string | null
  successCriteria: string[]
  disclaimer?: string | null
  githubUrl?: string | null
  researchUrl?: string | null
  milestones: MilestoneItem[]
}

// ─── PHASE COLORS ─────────────────────────────────────────────────────────────

const PHASE_COLORS: Record<string, { bg: string; color: string }> = {
  'Exploring':       { bg: 'rgba(99,102,241,0.15)',  color: '#818cf8' },
  'Planned':         { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa' },
  'Building':        { bg: 'rgba(245,158,11,0.15)',  color: '#fbbf24' },
  'Pilot':           { bg: 'rgba(16,185,129,0.15)',  color: '#34d399' },
  'Deployed':        { bg: 'rgba(20,184,166,0.15)',  color: '#2dd4bf' },
  'Impact Verified': { bg: 'rgba(181,136,211,0.2)',  color: '#c084fc' },
}

const PHASES = ['Exploring', 'Planned', 'Building', 'Pilot', 'Deployed', 'Impact Verified']

const SDG_LABELS: Record<number, string> = {
  4: 'SDG 4 — Quality Education',
  8: 'SDG 8 — Decent Work & Economic Growth',
  10: 'SDG 10 — Reduced Inequalities',
  11: 'SDG 11 — Sustainable Cities & Communities',
  12: 'SDG 12 — Responsible Consumption',
  16: 'SDG 16 — Peace, Justice & Strong Institutions',
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.45 }}
      className="glass-panel"
      style={{ padding: 'clamp(18px, 4vw, 28px)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Icon size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', margin: 0 }}>{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}

export default function InitiativeDetail({ initiative: init }: { initiative: InitiativeItem }) {
  const accentColor = init.coverColor || 'var(--accent)'
  const phaseStyle = PHASE_COLORS[init.phase] || PHASE_COLORS['Exploring']
  const currentPhaseIdx = PHASES.indexOf(init.phase)
  const completedMilestones = init.milestones.filter(m => m.isCompleted).length

  return (
    <section style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '860px' }}>

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/impact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '32px' }}>
            <ArrowLeft size={15} /> Back to Impact & SDGs
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="glass-panel"
          style={{ padding: 0, overflow: 'hidden', marginBottom: '28px' }}
        >
          <div style={{ height: '5px', background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }} />
          <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
            {/* SDG pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {init.sdgs.map(s => (
                <span key={s} title={SDG_LABELS[s]} style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700, background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}>
                  {SDG_LABELS[s] || `SDG ${s}`}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '3rem', lineHeight: 1 }}>{init.icon || '🌍'}</span>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontFamily: 'var(--font-heading)', margin: '0 0 8px', lineHeight: 1.25 }}>
                  {init.title}
                </h1>
                {init.tagline && (
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: '0 0 16px' }}>{init.tagline}</p>
                )}
                {/* Phase badge */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '5px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
                  background: phaseStyle.bg, color: phaseStyle.color,
                  border: `1px solid ${phaseStyle.color}44`
                }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: phaseStyle.color }} />
                  {init.phase}
                </span>
              </div>
            </div>

            {/* Phase progress bar */}
            <div style={{ marginTop: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '4px', overflowX: 'auto' }}>
                {PHASES.map((phase, idx) => {
                  const done = idx <= currentPhaseIdx
                  const ps = PHASE_COLORS[phase] || PHASE_COLORS['Exploring']
                  return (
                    <div key={phase} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '60px' }}>
                      <div style={{
                        width: '100%', height: '6px', borderRadius: '3px',
                        background: done ? (idx === currentPhaseIdx ? `linear-gradient(90deg, ${accentColor}, ${ps.color})` : accentColor) : 'var(--border-color)',
                        marginBottom: '6px', transition: 'background 0.3s ease'
                      }} />
                      <span style={{ fontSize: '0.58rem', color: done ? phaseStyle.color : 'var(--text-muted)', fontWeight: done ? 700 : 400, textAlign: 'center', lineHeight: 1.2 }}>
                        {phase}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
              {init.githubUrl && (
                <a href={init.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.82rem' }}>
                  <ExternalLink size={14} /> GitHub Repository
                </a>
              )}
              {init.researchUrl && (
                <a href={init.researchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.82rem' }}>
                  <BookOpen size={14} /> Research & Sources
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <Section icon={Target} title="The Problem">
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>{init.problem}</p>
          </Section>

          <Section icon={Users} title="Target Community">
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>{init.targetCommunity}</p>
          </Section>

          <Section icon={Lightbulb} title="Proposed Solution">
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>{init.proposedSolution}</p>
          </Section>

          {init.architecture && (
            <Section icon={Layers} title="Architecture & Approach">
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>{init.architecture}</p>
            </Section>
          )}

          {/* Implementation Milestones */}
          <Section icon={BarChart2} title={`Implementation Milestones (${completedMilestones}/${init.milestones.length} Complete)`}>
            {init.milestones.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>No milestones recorded yet. Check back soon.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {init.milestones.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
                    style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 16px', borderRadius: '10px', background: m.isCompleted ? 'var(--accent-glow)' : 'var(--bg-surface-light)', border: `1px solid ${m.isCompleted ? 'var(--border-color)' : 'var(--border-color)'}` }}
                  >
                    <div style={{ marginTop: '2px', flexShrink: 0 }}>
                      {m.isCompleted
                        ? <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                        : <Circle size={18} style={{ color: 'var(--text-muted)' }} />
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem', color: m.isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{m.title}</div>
                      {m.description && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 1.6 }}>{m.description}</p>
                      )}
                      {(m.targetDate || m.completedDate) && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '6px', opacity: 0.85 }}>
                          {m.completedDate ? `✓ Completed: ${m.completedDate}` : `Target: ${m.targetDate}`}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Section>

          {/* Success Criteria */}
          {init.successCriteria.length > 0 && (
            <Section icon={BarChart2} title="Measurable Success Criteria">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {init.successCriteria.map((sc, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '4px' }}>▸</span>
                    {sc}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Disclaimer */}
          {init.disclaimer && (
            <div style={{ padding: '18px 22px', borderRadius: '12px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <AlertTriangle size={16} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.7 }}>
                  <strong style={{ color: '#fbbf24' }}>Note: </strong>{init.disclaimer}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Back link */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: '48px' }}>
          <Link href="/impact" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={15} /> Back to all initiatives
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
