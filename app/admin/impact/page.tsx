'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, CheckCircle2, Circle, X, Globe } from 'lucide-react'

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
  sdgs: string
  primaryObjective: string
  phase: string
  icon?: string | null
  coverColor?: string | null
  problem: string
  targetCommunity: string
  proposedSolution: string
  architecture?: string | null
  successCriteria?: string | null
  disclaimer?: string | null
  githubUrl?: string | null
  researchUrl?: string | null
  sortOrder: number
  visibility: string
  milestones: MilestoneItem[]
}

const PHASES = ['Exploring', 'Planned', 'Building', 'Pilot', 'Deployed', 'Impact Verified']
const PHASE_COLORS: Record<string, string> = {
  'Exploring': '#818cf8', 'Planned': '#60a5fa', 'Building': '#fbbf24',
  'Pilot': '#34d399', 'Deployed': '#2dd4bf', 'Impact Verified': '#c084fc',
}

// ─── BLANK FORMS ──────────────────────────────────────────────────────────────

const BLANK_INIT_FORM = {
  slug: '', title: '', tagline: '', sdgs: '', primaryObjective: '',
  phase: 'Exploring', icon: '🌍', coverColor: '#b588d3',
  problem: '', targetCommunity: '', proposedSolution: '',
  architecture: '', successCriteria: '', disclaimer: '',
  githubUrl: '', researchUrl: '', sortOrder: 0, visibility: 'PUBLISHED'
}

const BLANK_MS_FORM = {
  title: '', description: '', targetDate: '', completedDate: '', isCompleted: false, sortOrder: 0
}

// ─── FEEDBACK BANNER ─────────────────────────────────────────────────────────

function Feedback({ msg, type }: { msg: string; type: 'success' | 'error' }) {
  return (
    <div style={{
      padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.88rem',
      background: type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
      border: `1px solid ${type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
      color: type === 'success' ? '#4ade80' : '#f87171'
    }}>
      {msg}
    </div>
  )
}

// ─── MODAL WRAPPER ───────────────────────────────────────────────────────────

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', padding: '20px', overflowY: 'auto' }}>
      <div className="glass" style={{ width: '100%', maxWidth: '680px', padding: '28px', borderRadius: 'var(--radius-lg)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', boxShadow: '0 20px 50px var(--shadow-color)', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ─── FIELD ────────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px',
  background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)',
  color: 'var(--text-primary)', borderRadius: 'var(--radius)', fontSize: '0.88rem',
  boxSizing: 'border-box'
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function AdminImpactPage() {
  const [initiatives, setInitiatives] = useState<InitiativeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Initiative modal
  const [initModal, setInitModal] = useState(false)
  const [editingInit, setEditingInit] = useState<InitiativeItem | null>(null)
  const [initForm, setInitForm] = useState(BLANK_INIT_FORM)

  // Milestone modal
  const [msModal, setMsModal] = useState(false)
  const [editingMs, setEditingMs] = useState<MilestoneItem | null>(null)
  const [msForm, setMsForm] = useState(BLANK_MS_FORM)
  const [msInitiativeId, setMsInitiativeId] = useState('')

  const toast = (msg: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ msg, type })
    setTimeout(() => setFeedback(null), 3500)
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/impact')
      const d = await res.json()
      if (res.ok) setInitiatives(d.initiatives || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  // ── Initiative handlers ────────────────────────────────────────────────────

  const openCreateInit = () => {
    setEditingInit(null)
    setInitForm({ ...BLANK_INIT_FORM, sortOrder: initiatives.length + 1 })
    setInitModal(true)
  }

  const openEditInit = (init: InitiativeItem) => {
    setEditingInit(init)
    let sdgsStr = init.sdgs
    try { sdgsStr = JSON.parse(init.sdgs).join(', ') } catch {}
    setInitForm({
      slug: init.slug, title: init.title, tagline: init.tagline || '',
      sdgs: sdgsStr, primaryObjective: init.primaryObjective,
      phase: init.phase, icon: init.icon || '🌍', coverColor: init.coverColor || '#b588d3',
      problem: init.problem, targetCommunity: init.targetCommunity,
      proposedSolution: init.proposedSolution, architecture: init.architecture || '',
      successCriteria: (() => {
        try { return JSON.parse(init.successCriteria || '[]').join('\n') } catch { return init.successCriteria || '' }
      })(),
      disclaimer: init.disclaimer || '',
      githubUrl: init.githubUrl || '', researchUrl: init.researchUrl || '',
      sortOrder: init.sortOrder, visibility: init.visibility
    })
    setInitModal(true)
  }

  const saveInit = async (e: React.FormEvent) => {
    e.preventDefault()
    const sdgsArr = initForm.sdgs.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
    const scArr = initForm.successCriteria.split('\n').map(s => s.trim()).filter(Boolean)
    const payload = {
      ...initForm, sdgs: sdgsArr, successCriteria: scArr,
      sortOrder: Number(initForm.sortOrder),
      ...(editingInit && { id: editingInit.id })
    }
    const method = editingInit ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/impact', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { toast('Initiative saved successfully'); setInitModal(false); loadData() }
    else { const d = await res.json(); toast(d.error || 'Failed to save', 'error') }
  }

  const deleteInit = async (id: string) => {
    if (!confirm('Delete this initiative and all its milestones?')) return
    const res = await fetch(`/api/admin/impact?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast('Initiative deleted'); loadData() }
    else toast('Delete failed', 'error')
  }

  // ── Milestone handlers ─────────────────────────────────────────────────────

  const openCreateMs = (initiativeId: string) => {
    setMsInitiativeId(initiativeId)
    setEditingMs(null)
    const init = initiatives.find(i => i.id === initiativeId)
    setMsForm({ ...BLANK_MS_FORM, sortOrder: (init?.milestones.length || 0) + 1 })
    setMsModal(true)
  }

  const openEditMs = (ms: MilestoneItem, initiativeId: string) => {
    setMsInitiativeId(initiativeId)
    setEditingMs(ms)
    setMsForm({
      title: ms.title, description: ms.description || '',
      targetDate: ms.targetDate || '', completedDate: ms.completedDate || '',
      isCompleted: ms.isCompleted, sortOrder: ms.sortOrder
    })
    setMsModal(true)
  }

  const saveMs = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...msForm, sortOrder: Number(msForm.sortOrder),
      ...(editingMs ? { id: editingMs.id } : { initiativeId: msInitiativeId })
    }
    const method = editingMs ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/impact/milestones', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { toast('Milestone saved'); setMsModal(false); loadData() }
    else toast('Failed to save milestone', 'error')
  }

  const deleteMs = async (id: string) => {
    if (!confirm('Delete this milestone?')) return
    const res = await fetch(`/api/admin/impact/milestones?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast('Milestone deleted'); loadData() }
    else toast('Delete failed', 'error')
  }

  const toggleMsComplete = async (ms: MilestoneItem) => {
    const res = await fetch('/api/admin/impact/milestones', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: ms.id, isCompleted: !ms.isCompleted, completedDate: !ms.isCompleted ? new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null })
    })
    if (res.ok) loadData()
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 6px' }}>
            Impact & SDG <span className="gradient-text">Roadmap</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage SDG-aligned initiatives, phases, milestones, and research links.
          </p>
        </div>
        <button onClick={openCreateInit} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Add Initiative
        </button>
      </div>

      {feedback && <Feedback msg={feedback.msg} type={feedback.type} />}

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading initiatives…</div>
      ) : initiatives.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No initiatives yet. Click &quot;Add Initiative&quot; to create your first one.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {initiatives.map(init => {
            const phaseColor = PHASE_COLORS[init.phase] || '#818cf8'
            const completed = init.milestones.filter(m => m.isCompleted).length
            const isExpanded = expandedId === init.id
            return (
              <div key={init.id} className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Accent bar */}
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${init.coverColor || phaseColor}, ${phaseColor}88)` }} />

                {/* Card header */}
                <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.4rem' }}>{init.icon || '🌍'}</span>
                      <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, background: `${phaseColor}22`, color: phaseColor, border: `1px solid ${phaseColor}44` }}>
                        {init.phase}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {completed}/{init.milestones.length} milestones
                      </span>
                      {init.visibility === 'DRAFT' && (
                        <span style={{ padding: '2px 8px', borderRadius: '8px', fontSize: '0.68rem', fontWeight: 700, background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}>DRAFT</span>
                      )}
                    </div>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary)' }}>{init.title}</h2>
                    {init.primaryObjective && <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0 }}>{init.primaryObjective}</p>}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                    <a href={`/impact/${init.slug}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.78rem', textDecoration: 'none' }}>
                      <Globe size={13} />
                    </a>
                    <button onClick={() => openEditInit(init)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '6px' }}><Edit2 size={16} /></button>
                    <button onClick={() => deleteInit(init.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '6px' }}><Trash2 size={16} /></button>
                    <button onClick={() => setExpandedId(isExpanded ? null : init.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Expanded milestones */}
                {isExpanded && (
                  <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 12px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                        Implementation Milestones
                      </span>
                      <button onClick={() => openCreateMs(init.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 10px', borderRadius: 'var(--radius)', border: '1px solid var(--accent)', background: 'var(--accent-glow)', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                        <Plus size={12} /> Add Milestone
                      </button>
                    </div>

                    {init.milestones.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: '0 0 8px' }}>No milestones yet.</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {init.milestones.map(ms => (
                          <div key={ms.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
                            <button onClick={() => toggleMsComplete(ms)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', flexShrink: 0, color: ms.isCompleted ? 'var(--accent)' : 'var(--text-muted)' }}>
                              {ms.isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                            </button>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '0.88rem', fontWeight: ms.isCompleted ? 600 : 400, color: ms.isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: ms.isCompleted ? 'none' : 'none' }}>{ms.title}</div>
                              {ms.targetDate && !ms.completedDate && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Target: {ms.targetDate}</div>}
                              {ms.completedDate && <div style={{ fontSize: '0.72rem', color: 'var(--accent)', marginTop: '2px' }}>✓ {ms.completedDate}</div>}
                            </div>
                            <button onClick={() => openEditMs(ms, init.id)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '4px', flexShrink: 0 }}><Edit2 size={13} /></button>
                            <button onClick={() => deleteMs(ms.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '4px', flexShrink: 0 }}><Trash2 size={13} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── Initiative Modal ── */}
      {initModal && (
        <Modal title={editingInit ? 'Edit Initiative' : 'New Initiative'} onClose={() => setInitModal(false)}>
          <form onSubmit={saveInit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Title *">
                <input required style={inputStyle} value={initForm.title} onChange={e => setInitForm({ ...initForm, title: e.target.value })} />
              </Field>
              <Field label="Slug *">
                <input required style={inputStyle} value={initForm.slug} onChange={e => setInitForm({ ...initForm, slug: e.target.value })} placeholder="smart-waste-network" />
              </Field>
            </div>
            <Field label="Tagline (one-liner)">
              <input style={inputStyle} value={initForm.tagline} onChange={e => setInitForm({ ...initForm, tagline: e.target.value })} />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="SDG Numbers (comma-separated)">
                <input style={inputStyle} value={initForm.sdgs} onChange={e => setInitForm({ ...initForm, sdgs: e.target.value })} placeholder="11, 12" />
              </Field>
              <Field label="Phase">
                <select style={inputStyle} value={initForm.phase} onChange={e => setInitForm({ ...initForm, phase: e.target.value })}>
                  {PHASES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <Field label="Icon Emoji">
                <input style={inputStyle} value={initForm.icon} onChange={e => setInitForm({ ...initForm, icon: e.target.value })} placeholder="🌍" />
              </Field>
              <Field label="Card Accent Color">
                <input type="color" style={{ ...inputStyle, height: '38px', padding: '2px 6px' }} value={initForm.coverColor} onChange={e => setInitForm({ ...initForm, coverColor: e.target.value })} />
              </Field>
              <Field label="Visibility">
                <select style={inputStyle} value={initForm.visibility} onChange={e => setInitForm({ ...initForm, visibility: e.target.value })}>
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </Field>
            </div>
            <Field label="Primary Objective">
              <input style={inputStyle} value={initForm.primaryObjective} onChange={e => setInitForm({ ...initForm, primaryObjective: e.target.value })} />
            </Field>
            <Field label="The Problem *">
              <textarea required rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={initForm.problem} onChange={e => setInitForm({ ...initForm, problem: e.target.value })} />
            </Field>
            <Field label="Target Community">
              <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={initForm.targetCommunity} onChange={e => setInitForm({ ...initForm, targetCommunity: e.target.value })} />
            </Field>
            <Field label="Proposed Solution *">
              <textarea required rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={initForm.proposedSolution} onChange={e => setInitForm({ ...initForm, proposedSolution: e.target.value })} />
            </Field>
            <Field label="Architecture & Approach">
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={initForm.architecture} onChange={e => setInitForm({ ...initForm, architecture: e.target.value })} />
            </Field>
            <Field label="Success Criteria (one per line)">
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="500+ households onboarded&#10;Waste diversion rate ≥ 30%" value={initForm.successCriteria} onChange={e => setInitForm({ ...initForm, successCriteria: e.target.value })} />
            </Field>
            <Field label="Disclaimer / Methodology Note">
              <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={initForm.disclaimer} onChange={e => setInitForm({ ...initForm, disclaimer: e.target.value })} />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="GitHub URL">
                <input type="url" style={inputStyle} value={initForm.githubUrl} onChange={e => setInitForm({ ...initForm, githubUrl: e.target.value })} placeholder="https://github.com/…" />
              </Field>
              <Field label="Research / Sources URL">
                <input type="url" style={inputStyle} value={initForm.researchUrl} onChange={e => setInitForm({ ...initForm, researchUrl: e.target.value })} placeholder="https://…" />
              </Field>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setInitModal(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>Save Initiative</button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Milestone Modal ── */}
      {msModal && (
        <Modal title={editingMs ? 'Edit Milestone' : 'Add Milestone'} onClose={() => setMsModal(false)}>
          <form onSubmit={saveMs} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Field label="Milestone Title *">
              <input required style={inputStyle} value={msForm.title} onChange={e => setMsForm({ ...msForm, title: e.target.value })} placeholder="Complete problem research" />
            </Field>
            <Field label="Description">
              <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={msForm.description} onChange={e => setMsForm({ ...msForm, description: e.target.value })} />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Target Date">
                <input style={inputStyle} value={msForm.targetDate} onChange={e => setMsForm({ ...msForm, targetDate: e.target.value })} placeholder="Q1 2027" />
              </Field>
              <Field label="Completed Date">
                <input style={inputStyle} value={msForm.completedDate} onChange={e => setMsForm({ ...msForm, completedDate: e.target.value })} placeholder="15 Oct 2026" />
              </Field>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="msCompleted" checked={msForm.isCompleted} onChange={e => setMsForm({ ...msForm, isCompleted: e.target.checked })} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              <label htmlFor="msCompleted" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>Mark as completed</label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setMsModal(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>Save Milestone</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
