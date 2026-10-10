'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Swords,
  FlaskConical,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Filter,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react'

interface EvidenceLink {
  id: string
  title: string
  url: string
  type: string
}

interface Competition {
  id: string
  name: string
  organizer: string
  year: number
  category: string
}

interface Project {
  id: string
  title: string
  slug: string
}

export interface ArenaEntry {
  id: string
  slug: string
  title: string
  arenaCategory: string // PODIUM, ATTEMPT, LAB
  outcome: string
  resultDetail: string
  awardTitle?: string | null
  placement?: string | null
  role: string
  teamName?: string | null
  challengeSummary: string
  problemStatement: string
  personalContribution: string
  technicalSolution: string
  retrospective: string
  lessonsLearned: string
  coverImage?: string | null
  status: string
  sortOrder: number
  competition: Competition
  project?: Project | null
  evidenceLinks: EvidenceLink[]
}

export default function ArenaGallery({ initialEntries }: { initialEntries: ArenaEntry[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedOutcome, setSelectedOutcome] = useState<string>('all')
  const [search, setSearch] = useState('')

  const years = Array.from(new Set(initialEntries.map(e => e.competition.year))).sort((a, b) => b - a)

  const outcomes = [
    { value: 'all', label: 'All Outcomes' },
    { value: 'AWARD_WINNER', label: '🏆 Award Winner' },
    { value: 'FINALIST', label: '⭐ Finalist' },
    { value: 'SUBMITTED', label: '📝 Submitted' },
    { value: 'DID_NOT_ADVANCE', label: '⚔️ Did Not Advance' },
    { value: 'PROTOTYPE', label: '🧪 Prototype' }
  ]

  const filtered = initialEntries.filter(e => {
    const matchCat = selectedCategory === 'all' || e.arenaCategory === selectedCategory
    const matchYear = selectedYear === 'all' || e.competition.year.toString() === selectedYear
    const matchOutcome = selectedOutcome === 'all' || e.outcome === selectedOutcome
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.challengeSummary.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.competition.name.toLowerCase().includes(search.toLowerCase())

    return matchCat && matchYear && matchOutcome && matchSearch
  })

  // Group by category if viewing 'all'
  const podiumEntries = filtered.filter(e => e.arenaCategory === 'PODIUM')
  const attemptEntries = filtered.filter(e => e.arenaCategory === 'ATTEMPT')
  const labEntries = filtered.filter(e => e.arenaCategory === 'LAB')

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'AWARD_WINNER':
        return { label: 'Award Winner', bg: 'rgba(234, 179, 8, 0.18)', border: 'rgba(234, 179, 8, 0.4)', color: '#facc15' }
      case 'FINALIST':
        return { label: 'Finalist', bg: 'rgba(168, 85, 247, 0.18)', border: 'rgba(168, 85, 247, 0.4)', color: '#c084fc' }
      case 'DID_NOT_ADVANCE':
        return { label: 'Did Not Advance', bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.3)', color: '#cbd5e1' }
      case 'SUBMITTED':
        return { label: 'Submitted', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', color: '#93c5fd' }
      case 'PROTOTYPE':
        return { label: 'Active Prototype', bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)', color: '#f472b6' }
      default:
        return { label: outcome.replace(/_/g, ' '), bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)', color: '#e2e8f0' }
    }
  }

  const renderCard = (entry: ArenaEntry) => {
    const badge = getOutcomeBadge(entry.outcome)
    return (
      <motion.div
        key={entry.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4 }}
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--border-color)',
          background: 'rgba(18, 10, 26, 0.7)',
          position: 'relative'
        }}
      >
        <Link
          href={`/arena/${entry.slug}`}
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          {/* Card Media Header */}
          <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
            <Image
              src={entry.coverImage || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=500&fit=crop&auto=format'}
              alt={entry.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(14, 7, 19, 0.95) 0%, rgba(14, 7, 19, 0.2) 60%, transparent 100%)'
            }} />

            {/* Category Ribbon */}
            <div style={{
              position: 'absolute',
              top: 14,
              left: 14,
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: 'rgba(14, 7, 19, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(181, 136, 211, 0.35)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {entry.arenaCategory === 'PODIUM' && <Trophy size={13} style={{ color: '#facc15' }} />}
              {entry.arenaCategory === 'ATTEMPT' && <Swords size={13} style={{ color: '#818cf8' }} />}
              {entry.arenaCategory === 'LAB' && <FlaskConical size={13} style={{ color: '#c084fc' }} />}
              <span>{entry.arenaCategory === 'PODIUM' ? 'Podium Finish' : entry.arenaCategory === 'ATTEMPT' ? 'The Attempt' : 'Experimental Lab'}</span>
            </div>

            {/* Outcome Tag */}
            <div style={{
              position: 'absolute',
              top: 14,
              right: 14,
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: 700,
              background: badge.bg,
              border: `1px solid ${badge.border}`,
              color: badge.color,
              backdropFilter: 'blur(8px)'
            }}>
              {badge.label}
            </div>

            {/* Competition Title on bottom of header */}
            <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16 }}>
              <div style={{ fontSize: '0.76rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {entry.competition.name} • {entry.competition.year}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0 0 10px',
                lineHeight: 1.35
              }}>
                {entry.title}
              </h3>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                marginBottom: '12px'
              }}>
                <span>Role: <strong>{entry.role}</strong></span>
                {entry.teamName && <span>• {entry.teamName}</span>}
              </div>

              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                margin: '0 0 16px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {entry.challengeSummary}
              </p>
            </div>

            {/* Card Footer with Result & Deep Dive Action */}
            <div style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {entry.resultDetail || 'Case Study Available'}
              </span>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--accent)',
                fontSize: '0.82rem',
                fontWeight: 600
              }}>
                <span>Case Study</span>
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Category Nav Filters */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '32px'
      }}>
        {[
          { id: 'all', label: 'All Builds Under Pressure', icon: Sparkles },
          { id: 'PODIUM', label: '🏆 Podium Finishes', icon: Trophy },
          { id: 'ATTEMPT', label: '⚔️ The Attempts', icon: Swords },
          { id: 'LAB', label: '🧪 The Experimental Lab', icon: FlaskConical },
        ].map(cat => {
          const isSelected = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '30px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: isSelected ? 'var(--accent)' : 'rgba(255, 255, 255, 0.04)',
                color: isSelected ? '#0e0713' : 'var(--text-secondary)',
                border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                boxShadow: isSelected ? '0 0 20px var(--accent-glow)' : 'none'
              }}
            >
              <cat.icon size={16} />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Sub-Filters: Search, Year, Outcome */}
      <div className="glass" style={{
        padding: '16px 20px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search competitions, roles, or challenges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 42px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'rgba(18, 10, 26, 0.9)',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Years</option>
            {years.map(y => (
              <option key={y} value={y.toString()}>{y}</option>
            ))}
          </select>

          {/* Outcome Filter */}
          <select
            value={selectedOutcome}
            onChange={(e) => setSelectedOutcome(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'rgba(18, 10, 26, 0.9)',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {outcomes.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Categorized Displays or Unified Grid */}
      {selectedCategory === 'all' && search === '' && selectedOutcome === 'all' && selectedYear === 'all' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          {/* Category 1: 🏆 Podium Finishes */}
          {podiumEntries.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(234, 179, 8, 0.15)',
                  color: '#facc15'
                }}>
                  <Trophy size={20} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                  01. <span className="gradient-text">🏆 Podium Finishes</span>
                </h2>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 24px 50px' }}>
                High-pressure competitions where our architectures and pitches secured significant awards and podium standings.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {podiumEntries.map(renderCard)}
              </div>
            </div>
          )}

          {/* Category 2: ⚔️ The Attempts */}
          {attemptEntries.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8'
                }}>
                  <Swords size={20} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                  02. <span className="gradient-text">⚔️ The Attempts</span>
                </h2>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 24px 50px' }}>
                Honest presentations of submitted projects that did not advance — featuring deep engineering retrospectives on what worked, what failed, and what we learned.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {attemptEntries.map(renderCard)}
              </div>
            </div>
          )}

          {/* Category 3: 🧪 The Experimental Lab */}
          {labEntries.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(168, 85, 247, 0.15)',
                  color: '#c084fc'
                }}>
                  <FlaskConical size={20} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                  03. <span className="gradient-text">🧪 The Experimental Lab</span>
                </h2>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 24px 50px' }}>
                Exploratory prototypes, hackathon concepts in active development, and cutting-edge agentic experiments.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {labEntries.map(renderCard)}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Filtered Grid */
        <div>
          <div style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Showing <strong>{filtered.length}</strong> matching entries:
          </div>

          {filtered.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px', borderRadius: 'var(--radius-lg)' }}>
              <FlaskConical size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <h3>No Arena entries found</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto' }}>
                Try adjusting your search query, year, or outcome filters.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {filtered.map(renderCard)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
