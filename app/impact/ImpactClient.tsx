'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ExternalLink, BookOpen, Target, CheckCircle2, Circle } from 'lucide-react'

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

interface Props {
  initiatives: InitiativeItem[]
}

// ─── PHASE BADGE ──────────────────────────────────────────────────────────────

const PHASE_COLORS: Record<string, { bg: string; color: string; dot: string }> = {
  'Exploring':       { bg: 'rgba(99,102,241,0.15)',  color: '#818cf8', dot: '#818cf8' },
  'Planned':         { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa', dot: '#60a5fa' },
  'Building':        { bg: 'rgba(245,158,11,0.15)',  color: '#fbbf24', dot: '#fbbf24' },
  'Pilot':           { bg: 'rgba(16,185,129,0.15)',  color: '#34d399', dot: '#34d399' },
  'Deployed':        { bg: 'rgba(20,184,166,0.15)',  color: '#2dd4bf', dot: '#2dd4bf' },
  'Impact Verified': { bg: 'rgba(181,136,211,0.2)',  color: '#c084fc', dot: '#c084fc' },
}

function PhaseBadge({ phase }: { phase: string }) {
  const style = PHASE_COLORS[phase] || PHASE_COLORS['Exploring']
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
      background: style.bg, color: style.color,
      border: `1px solid ${style.color}44`, letterSpacing: '0.5px', whiteSpace: 'nowrap'
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: style.dot, flexShrink: 0 }} />
      {phase}
    </span>
  )
}

// ─── SDG BADGE ────────────────────────────────────────────────────────────────

const SDG_LABELS: Record<number, string> = {
  4: 'SDG 4 — Quality Education',
  8: 'SDG 8 — Decent Work',
  10: 'SDG 10 — Reduced Inequalities',
  11: 'SDG 11 — Sustainable Cities',
  12: 'SDG 12 — Responsible Consumption',
  16: 'SDG 16 — Peace, Justice & Institutions',
}

function SdgPill({ sdg }: { sdg: number }) {
  return (
    <span title={SDG_LABELS[sdg] || `SDG ${sdg}`} style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700,
      background: 'rgba(181,136,211,0.12)', color: 'var(--accent)',
      border: '1px solid rgba(181,136,211,0.25)', cursor: 'default'
    }}>
      SDG {sdg}
    </span>
  )
}

// ─── PHASE TRACKER ───────────────────────────────────────────────────────────

const PHASES = ['Exploring', 'Planned', 'Building', 'Pilot', 'Deployed', 'Impact Verified']

function PhaseTracker({ current }: { current: string }) {
  const currentIdx = PHASES.indexOf(current)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: '16px', overflowX: 'auto' }}>
      {PHASES.map((phase, idx) => {
        const done = idx < currentIdx
        const active = idx === currentIdx
        const style = PHASE_COLORS[phase] || PHASE_COLORS['Exploring']
        return (
          <React.Fragment key={phase}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? 'var(--accent)' : active ? style.bg : 'rgba(255,255,255,0.04)',
                border: `2px solid ${done ? 'var(--accent)' : active ? style.color : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.3s ease', flexShrink: 0
              }}>
                {done ? (
                  <CheckCircle2 size={14} style={{ color: '#fff' }} />
                ) : active ? (
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: style.color }} />
                ) : (
                  <Circle size={10} style={{ color: 'rgba(255,255,255,0.2)' }} />
                )}
              </div>
              <span style={{
                fontSize: '0.58rem', fontWeight: active ? 700 : 500,
                color: done ? 'var(--accent)' : active ? style.color : 'var(--text-muted)',
                textAlign: 'center', marginTop: '4px', lineHeight: 1.2,
                maxWidth: '64px', whiteSpace: 'pre-wrap'
              }}>
                {phase}
              </span>
            </div>
            {idx < PHASES.length - 1 && (
              <div style={{
                flex: 1, height: '2px', minWidth: '12px',
                background: idx < currentIdx
                  ? 'var(--accent)'
                  : 'rgba(255,255,255,0.06)',
                marginBottom: '20px', transition: 'background 0.3s ease'
              }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// ─── INITIATIVE CARD ─────────────────────────────────────────────────────────

function InitiativeCard({ item, index }: { item: InitiativeItem; index: number }) {
  const accentColor = item.coverColor || 'var(--accent)'
  const completedMilestones = item.milestones.filter(m => m.isCompleted).length
  const totalMilestones = item.milestones.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-panel"
      style={{ padding: 0, overflow: 'hidden', position: 'relative' }}
    >
      {/* Colored top accent bar */}
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }} />

      <div style={{ padding: '28px 32px 24px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>{item.icon || '🌍'}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <PhaseBadge phase={item.phase} />
                {item.sdgs.map(s => <SdgPill key={s} sdg={s} />)}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                {item.title}
              </h3>
            </div>
          </div>
          {totalMilestones > 0 && (
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: accentColor }}>{completedMilestones}/{totalMilestones}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Milestones</div>
            </div>
          )}
        </div>

        {/* Objective */}
        <p style={{ marginTop: '14px', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, margin: '14px 0 0' }}>
          {item.primaryObjective}
        </p>

        {/* Phase tracker */}
        <PhaseTracker current={item.phase} />

        {/* Milestone progress bar */}
        {totalMilestones > 0 && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ height: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(completedMilestones / totalMilestones) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                style={{ height: '100%', borderRadius: '4px', background: `linear-gradient(90deg, ${accentColor}, ${accentColor}bb)` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {item.githubUrl && (
              <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '5px 10px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <ExternalLink size={13} /> GitHub
              </a>
            )}
            {item.researchUrl && (
              <a href={item.researchUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '5px 10px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <BookOpen size={13} /> Research
              </a>
            )}
          </div>
          <Link
            href={`/impact/${item.slug}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: accentColor, textDecoration: 'none' }}
          >
            View Case Study <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ImpactClient({ initiatives }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const FILTERS = ['All', 'Exploring', 'Planned', 'Building', 'Pilot', 'Deployed', 'Impact Verified']
  const filtered = activeFilter === 'All' ? initiatives : initiatives.filter(i => i.phase === activeFilter)

  const totalInitiatives = initiatives.length
  const activeCount = initiatives.filter(i => ['Building', 'Pilot', 'Deployed', 'Impact Verified'].includes(i.phase)).length
  const totalMilestones = initiatives.reduce((a, i) => a + i.milestones.length, 0)
  const completedMilestones = initiatives.reduce((a, i) => a + i.milestones.filter(m => m.isCompleted).length, 0)

  return (
    <section className="section-padding" style={{ paddingTop: '140px', minHeight: '100vh', paddingBottom: '100px' }}>
      <div className="container">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="hero-badge" style={{ marginBottom: '16px', display: 'inline-block' }}>🌍 Impact & SDGs</span>
          <h1 className="section-title">
            Building <span className="gradient-text">Sri Lanka&apos;s</span> Digital Future
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '620px' }}>
            A living record of SDG-aligned initiatives — from early exploration to verified, community-level impact.
            Each initiative is a concrete step toward a more inclusive, efficient, and sustainable Sri Lanka.
          </p>
        </motion.div>

        {/* ── Mission ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="glass-panel"
          style={{ marginTop: '60px', padding: '40px', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent), #60a5fa, #34d399)' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3rem', flexShrink: 0 }}>01</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', margin: '0 0 16px' }}>
                My <span className="gradient-text">Mission</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {[
                  { icon: '📡', title: 'Digital Inclusion', desc: 'Closing the connectivity and literacy gap so every Sri Lankan can participate in the digital economy.' },
                  { icon: '🏛️', title: 'Public-Service Efficiency', desc: 'Making civic systems more transparent, accountable, and accessible through technology.' },
                  { icon: '🌱', title: 'Sustainable Communities', desc: 'Using software to enable better resource use, waste reduction, and environmental accountability.' },
                  { icon: '💼', title: 'Economic Opportunity', desc: 'Expanding access to work and income for informal workers and underserved communities.' },
                ].map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '16px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}
                  >
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{v.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{v.title}</div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Roadmap Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginTop: '80px', marginBottom: '12px' }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3rem', color: 'var(--text-muted)', fontWeight: 800, lineHeight: 1 }}>02</div>
            <div>
              <h2 className="section-title" style={{ margin: 0 }}>
                The <span className="gradient-text">SDG Roadmap</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '8px 0 0' }}>
                Four initiatives targeting systemic challenges through technology and community participation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* SDG reference table */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="glass-panel"
          style={{ padding: '20px 24px', marginBottom: '32px', overflowX: 'auto' }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                {['Initiative', 'SDGs', 'Primary Objective'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {initiatives.map((init, i) => (
                <tr key={init.id} style={{ borderBottom: i < initiatives.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {init.icon} {init.title}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {init.sdgs.map(s => <SdgPill key={s} sdg={s} />)}
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                    {init.primaryObjective}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                border: '1px solid',
                borderColor: activeFilter === f ? 'var(--accent)' : 'var(--border-color)',
                background: activeFilter === f ? 'var(--accent-glow)' : 'transparent',
                color: activeFilter === f ? 'var(--accent)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              {f}
              {f !== 'All' && (
                <span style={{ marginLeft: '6px', opacity: 0.7 }}>
                  ({initiatives.filter(i => i.phase === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Initiative cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px' }}
          >
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                No initiatives in this phase yet.
              </div>
            ) : (
              filtered.map((item, index) => (
                <InitiativeCard key={item.id} item={item} index={index} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Progress & Impact ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginTop: '80px' }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <div style={{ fontSize: '3rem', color: 'var(--text-muted)', fontWeight: 800, lineHeight: 1 }}>03</div>
            <div>
              <h2 className="section-title" style={{ margin: 0 }}>
                Progress & <span className="gradient-text">Impact</span>
              </h2>
              <p className="section-subtitle" style={{ margin: '8px 0 0' }}>
                Aggregate progress across all initiatives. Updated as work advances.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {[
              { label: 'Initiatives', value: totalInitiatives, icon: '🎯' },
              { label: 'Active', value: activeCount, icon: '⚡' },
              { label: 'Milestones Completed', value: `${completedMilestones}/${totalMilestones}`, icon: '✅' },
              { label: 'SDGs Addressed', value: [...new Set(initiatives.flatMap(i => i.sdgs))].length, icon: '🌐' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-panel"
                style={{ padding: '28px 24px', textAlign: 'center' }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Per-initiative milestone view */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {initiatives.map((init, i) => (
              <motion.div
                key={init.id}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-panel"
                style={{ padding: '24px 28px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{init.icon || '🌍'}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{init.title}</span>
                  </div>
                  <PhaseBadge phase={init.phase} />
                </div>
                {init.milestones.length === 0 ? (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>No milestones recorded yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {init.milestones.map((m) => (
                      <div key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{ marginTop: '2px', flexShrink: 0 }}>
                          {m.isCompleted
                            ? <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
                            : <Circle size={16} style={{ color: 'var(--text-muted)' }} />
                          }
                        </div>
                        <div>
                          <div style={{ fontSize: '0.88rem', color: m.isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: m.isCompleted ? 600 : 400 }}>
                            {m.title}
                          </div>
                          {m.description && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{m.description}</div>
                          )}
                          {(m.targetDate || m.completedDate) && (
                            <div style={{ fontSize: '0.72rem', color: 'var(--accent)', marginTop: '2px', opacity: 0.8 }}>
                              {m.completedDate ? `✓ ${m.completedDate}` : `Target: ${m.targetDate}`}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Disclaimer ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{
            marginTop: '60px', padding: '20px 24px', borderRadius: '12px',
            background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)'
          }}
        >
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#fbbf24' }}>⚠ A note on methodology:</strong> These are proposed initiatives. Problem statements and statistics are being verified against credible sources.
            A proposed technical solution is not a validated one — real-world impact depends on community participation, stakeholder engagement, and iterative learning.
            Each case study clearly distinguishes between hypotheses and validated outcomes.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
