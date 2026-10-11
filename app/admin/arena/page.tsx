'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  X,
  Award,
  Swords,
  FlaskConical,
  Link as LinkIcon
} from 'lucide-react'

interface Competition {
  id: string
  slug: string
  name: string
  organizer: string
  year: number
  category: string
}

interface EvidenceLink {
  id?: string
  title: string
  url: string
  type: string
}

interface ArenaEntry {
  id: string
  slug: string
  title: string
  competitionId: string
  competition?: Competition
  projectId?: string | null
  arenaCategory: string
  outcome: string
  resultDetail: string
  awardTitle?: string | null
  placement?: string | null
  role: string
  teamName?: string | null
  teamMembers?: string | null
  challengeSummary: string
  problemStatement: string
  constraints?: string | null
  personalContribution: string
  technicalSolution: string
  architectureDetails?: string | null
  retrospective: string
  lessonsLearned: string
  coverImage?: string | null
  status: string
  sortOrder: number
  evidenceLinks?: EvidenceLink[]
}

export default function AdminArenaPage() {
  const [entries, setEntries] = useState<ArenaEntry[]>([])
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'entries' | 'competitions'>('entries')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [entryModalOpen, setEntryModalOpen] = useState(false)
  const [compModalOpen, setCompModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<ArenaEntry | null>(null)
  const [editingComp, setEditingComp] = useState<Competition | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Entry Form State
  const [entryForm, setEntryForm] = useState({
    title: '',
    slug: '',
    competitionId: '',
    projectId: '',
    arenaCategory: 'PODIUM',
    outcome: 'AWARD_WINNER',
    resultDetail: '',
    awardTitle: '',
    placement: '',
    role: '',
    teamName: '',
    teamMembers: '',
    challengeSummary: '',
    problemStatement: '',
    constraints: '',
    personalContribution: '',
    technicalSolution: '',
    architectureDetails: '',
    retrospective: '',
    lessonsLearned: '',
    coverImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=500&fit=crop&auto=format',
    status: 'DRAFT',
    sortOrder: 0,
    evidenceLinks: [{ title: 'GitHub', url: '', type: 'GITHUB' }]
  })

  // Comp Form State
  const [compForm, setCompForm] = useState({
    name: '',
    slug: '',
    organizer: '',
    year: new Date().getFullYear(),
    category: 'Hackathon',
    location: '',
    websiteUrl: '',
    description: ''
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const [entriesRes, compsRes] = await Promise.all([
        fetch('/api/admin/arena'),
        fetch('/api/admin/competitions')
      ])
      const entriesData = await entriesRes.json()
      const compsData = await compsRes.json()

      if (entriesRes.ok) setEntries(entriesData.entries || [])
      if (compsRes.ok) setCompetitions(compsData.competitions || [])
    } catch {
      setFeedback({ type: 'error', message: 'Failed to fetch Arena records' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenCreateEntry = () => {
    setEditingEntry(null)
    setEntryForm({
      title: '',
      slug: '',
      competitionId: competitions[0]?.id || '',
      projectId: '',
      arenaCategory: 'PODIUM',
      outcome: 'AWARD_WINNER',
      resultDetail: '',
      awardTitle: '',
      placement: '',
      role: 'Team Leader',
      teamName: '',
      teamMembers: '',
      challengeSummary: '',
      problemStatement: '',
      constraints: '',
      personalContribution: '',
      technicalSolution: '',
      architectureDetails: '',
      retrospective: '',
      lessonsLearned: '',
      coverImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=500&fit=crop&auto=format',
      status: 'DRAFT',
      sortOrder: entries.length + 1,
      evidenceLinks: [{ title: 'GitHub Repository', url: '', type: 'GITHUB' }]
    })
    setEntryModalOpen(true)
  }

  const handleOpenEditEntry = (e: ArenaEntry) => {
    setEditingEntry(e)
    setEntryForm({
      title: e.title,
      slug: e.slug,
      competitionId: e.competitionId,
      projectId: e.projectId || '',
      arenaCategory: e.arenaCategory,
      outcome: e.outcome,
      resultDetail: e.resultDetail,
      awardTitle: e.awardTitle || '',
      placement: e.placement || '',
      role: e.role,
      teamName: e.teamName || '',
      teamMembers: e.teamMembers || '',
      challengeSummary: e.challengeSummary,
      problemStatement: e.problemStatement,
      constraints: e.constraints || '',
      personalContribution: e.personalContribution,
      technicalSolution: e.technicalSolution,
      architectureDetails: e.architectureDetails || '',
      retrospective: e.retrospective,
      lessonsLearned: e.lessonsLearned,
      coverImage: e.coverImage || '',
      status: e.status,
      sortOrder: e.sortOrder,
      evidenceLinks: e.evidenceLinks && e.evidenceLinks.length > 0 ? e.evidenceLinks : [{ title: 'GitHub', url: '', type: 'GITHUB' }]
    })
    setEntryModalOpen(true)
  }

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    const payload = {
      ...entryForm,
      ...(editingEntry && { id: editingEntry.id }),
      evidenceLinks: entryForm.evidenceLinks.filter(l => Boolean(l.url.trim()))
    }

    try {
      const method = editingEntry ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/arena', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save arena entry')

      setFeedback({ type: 'success', message: 'Arena entry saved successfully' })
      setEntryModalOpen(false)
      loadData()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving entry'
      setFeedback({ type: 'error', message: msg })
    }
  }

  const handleDeleteEntry = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/arena?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setFeedback({ type: 'success', message: 'Entry removed from The Arena' })
      setConfirmDeleteId(null)
      loadData()
    } catch {
      setFeedback({ type: 'error', message: 'Failed to delete arena entry' })
    }
  }

  const handleSaveComp = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)
    const payload = {
      ...compForm,
      ...(editingComp && { id: editingComp.id })
    }
    try {
      const method = editingComp ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/competitions', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save competition')

      setFeedback({ type: 'success', message: 'Competition saved' })
      setCompModalOpen(false)
      loadData()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving competition'
      setFeedback({ type: 'error', message: msg })
    }
  }

  const filteredEntries = entries.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.challengeSummary.toLowerCase().includes(search.toLowerCase()) ||
      e.outcome.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'all' || e.arenaCategory === categoryFilter
    return matchSearch && matchCat
  })

  return (
    <div className="container">
      {/* Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 6px' }}>
            The Arena <span className="gradient-text">Management</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Showcase battles under pressure: Podium Finishes, The Attempts, and Experimental Lab builds.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              setEditingComp(null)
              setCompForm({
                name: '',
                slug: '',
                organizer: '',
                year: new Date().getFullYear(),
                category: 'Hackathon',
                location: '',
                websiteUrl: '',
                description: ''
              })
              setCompModalOpen(true)
            }}
            className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px' }}
          >
            <Plus size={16} />
            <span>New Competition</span>
          </button>

          <button
            onClick={handleOpenCreateEntry}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px' }}
          >
            <Plus size={18} />
            <span>New Arena Entry</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('entries')}
          style={{
            padding: '10px 16px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'entries' ? '2px solid var(--accent)' : '2px solid transparent',
            color: activeTab === 'entries' ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.92rem',
            cursor: 'pointer'
          }}
        >
          Arena Entries ({entries.length})
        </button>
        <button
          onClick={() => setActiveTab('competitions')}
          style={{
            padding: '10px 16px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'competitions' ? '2px solid var(--accent)' : '2px solid transparent',
            color: activeTab === 'competitions' ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.92rem',
            cursor: 'pointer'
          }}
        >
          Competitions ({competitions.length})
        </button>
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '12px 18px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: feedback.type === 'success' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            border: `1px solid ${feedback.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: feedback.type === 'success' ? '#4ade80' : '#f87171',
            fontSize: '0.9rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {feedback.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </motion.div>
      )}

      {activeTab === 'entries' && (
        <>
          {/* Filter Bar */}
          <div className="glass" style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
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
                placeholder="Search Arena entries..."
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

            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'PODIUM', label: '🏆 Podium' },
                { id: 'ATTEMPT', label: '⚔️ Attempts' },
                { id: 'LAB', label: '🧪 Lab' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: categoryFilter === cat.id ? 'var(--accent)' : 'rgba(255, 255, 255, 0.04)',
                    color: categoryFilter === cat.id ? '#0e0713' : 'var(--text-secondary)',
                    border: categoryFilter === cat.id ? '1px solid var(--accent)' : '1px solid var(--border-color)'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Entries Table */}
          <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.02)' }}>
                  <th style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>ARENA BUILD</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>CATEGORY</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>OUTCOME</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>STATUS</th>
                  <th style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Loading entries...
                    </td>
                  </tr>
                ) : filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No Arena entries match your search.
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map(e => (
                    <tr key={e.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{e.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Role: {e.role} {e.teamName ? `• Team: ${e.teamName}` : ''}
                        </div>
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '3px 9px',
                          borderRadius: '8px',
                          background: e.arenaCategory === 'PODIUM'
                            ? 'rgba(234, 179, 8, 0.15)'
                            : e.arenaCategory === 'ATTEMPT'
                            ? 'rgba(99, 102, 241, 0.15)'
                            : 'rgba(168, 85, 247, 0.15)',
                          color: e.arenaCategory === 'PODIUM'
                            ? '#facc15'
                            : e.arenaCategory === 'ATTEMPT'
                            ? '#818cf8'
                            : '#c084fc'
                        }}>
                          {e.arenaCategory === 'PODIUM' ? '🏆 PODIUM' : e.arenaCategory === 'ATTEMPT' ? '⚔️ ATTEMPT' : '🧪 LAB'}
                        </span>
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          {e.outcome.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '12px',
                          background: e.status === 'PUBLISHED' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                          color: e.status === 'PUBLISHED' ? '#4ade80' : '#facc15'
                        }}>
                          {e.status}
                        </span>
                      </td>

                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <a
                            href={`/arena/${e.slug}?preview=true`}
                            target="_blank"
                            title="Preview entry"
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-secondary)',
                              padding: '6px',
                              borderRadius: '6px'
                            }}
                          >
                            <ExternalLink size={15} />
                          </a>

                          <button
                            onClick={() => handleOpenEditEntry(e)}
                            title="Edit entry"
                            style={{
                              background: 'rgba(181, 136, 211, 0.1)',
                              border: '1px solid rgba(181, 136, 211, 0.25)',
                              color: 'var(--accent)',
                              padding: '6px',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit2 size={15} />
                          </button>

                          {confirmDeleteId === e.id ? (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <button
                                onClick={() => handleDeleteEntry(e.id)}
                                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', padding: '4px', cursor: 'pointer' }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(e.id)}
                              title="Delete entry"
                              style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                color: '#f87171',
                                padding: '6px',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'competitions' && (
        <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {competitions.map(c => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{c.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                    Organizer: {c.organizer} • Year: {c.year} • Category: {c.category}
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>
                  slug: <code>{c.slug}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Entry Modal */}
      <AnimatePresence>
        {entryModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass"
              style={{
                width: '100%',
                maxWidth: '780px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '32px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                boxShadow: '0 20px 50px var(--shadow-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
                  {editingEntry ? 'Edit Arena Case Study' : 'New Arena Case Study'}
                </h2>
                <button onClick={() => setEntryModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEntry} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Entry Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={entryForm.title}
                      onChange={(e) => {
                        const title = e.target.value
                        setEntryForm(prev => ({
                          ...prev,
                          title,
                          slug: editingEntry ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                        }))
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={entryForm.slug}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, slug: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Competition *
                    </label>
                    <select
                      value={entryForm.competitionId}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, competitionId: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface-light)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    >
                      {competitions.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.year})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Arena Category *
                    </label>
                    <select
                      value={entryForm.arenaCategory}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, arenaCategory: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface-light)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    >
                      <option value="PODIUM">🏆 Podium Finish</option>
                      <option value="ATTEMPT">⚔️ The Attempt</option>
                      <option value="LAB">🧪 Experimental Lab</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Verified Outcome *
                    </label>
                    <select
                      value={entryForm.outcome}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, outcome: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface-light)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    >
                      <option value="AWARD_WINNER">Award Winner</option>
                      <option value="FINALIST">Finalist</option>
                      <option value="SUBMITTED">Submitted</option>
                      <option value="DID_NOT_ADVANCE">Did Not Advance</option>
                      <option value="PROTOTYPE">Prototype</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="ARCHIVED_EXPERIMENT">Archived Experiment</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Result Detail (e.g. 3rd place, Trustworthy Smart Ecosystem Ideathon)
                    </label>
                    <input
                      type="text"
                      value={entryForm.resultDetail}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, resultDetail: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      My Role (e.g. Team Leader, HungryBeast) *
                    </label>
                    <input
                      type="text"
                      required
                      value={entryForm.role}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, role: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Challenge Summary *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={entryForm.challengeSummary}
                    onChange={(e) => setEntryForm(prev => ({ ...prev, challengeSummary: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      The Problem Statement *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={entryForm.problemStatement}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, problemStatement: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Constraints & Pressures (Time, edge connectivity, etc.)
                    </label>
                    <textarea
                      rows={3}
                      value={entryForm.constraints}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, constraints: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Personal Contribution *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={entryForm.personalContribution}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, personalContribution: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Technical Solution & Architecture *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={entryForm.technicalSolution}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, technicalSolution: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#facc15', marginBottom: '6px' }}>
                      The Retrospective (Honest evaluation: what worked, what failed) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={entryForm.retrospective}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, retrospective: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(234, 179, 8, 0.3)',
                        background: 'rgba(234, 179, 8, 0.03)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '6px' }}>
                      Lessons Learned (Engineering & product takeaways) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={entryForm.lessonsLearned}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, lessonsLearned: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(181, 136, 211, 0.3)',
                        background: 'rgba(181, 136, 211, 0.03)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Status
                    </label>
                    <select
                      value={entryForm.status}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, status: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface-light)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    >
                      <option value="DRAFT">Draft (Private)</option>
                      <option value="PUBLISHED">Published (Public)</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={entryForm.coverImage || ''}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, coverImage: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={entryForm.sortOrder}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" onClick={() => setEntryModalOpen(false)} className="btn btn-outline" style={{ padding: '10px 20px' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                    {editingEntry ? 'Update Arena Case Study' : 'Publish / Save Draft'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Competition Modal */}
      <AnimatePresence>
        {compModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass"
              style={{
                width: '100%',
                maxWidth: '540px',
                padding: '32px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                boxShadow: '0 20px 50px var(--shadow-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Add Competition</h2>
                <button onClick={() => setCompModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveComp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Competition Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={compForm.name}
                    onChange={(e) => {
                      const name = e.target.value
                      setCompForm(prev => ({
                        ...prev,
                        name,
                        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      }))
                    }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={compForm.slug}
                      onChange={(e) => setCompForm(prev => ({ ...prev, slug: e.target.value }))}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={compForm.year}
                      onChange={(e) => setCompForm(prev => ({ ...prev, year: parseInt(e.target.value) || 2026 }))}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Organizer *
                  </label>
                  <input
                    type="text"
                    required
                    value={compForm.organizer}
                    onChange={(e) => setCompForm(prev => ({ ...prev, organizer: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setCompModalOpen(false)} className="btn btn-outline" style={{ padding: '8px 18px' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>
                    Save Competition
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
