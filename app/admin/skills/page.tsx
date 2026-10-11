'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, CheckCircle, AlertCircle, X, Cpu } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  proficiencyLevel: number
  sortOrder: number
  isFeatured: boolean
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiencyLevel: 85,
    sortOrder: 0,
    isFeatured: true
  })

  const loadSkills = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/skills')
      const data = await res.json()
      if (res.ok) setSkills(data.skills || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSkills()
  }, [])

  const handleOpenCreate = () => {
    setEditingSkill(null)
    setFormData({
      name: '',
      category: 'Frontend',
      proficiencyLevel: 85,
      sortOrder: skills.length + 1,
      isFeatured: true
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (s: Skill) => {
    setEditingSkill(s)
    setFormData({
      name: s.name,
      category: s.category,
      proficiencyLevel: s.proficiencyLevel,
      sortOrder: s.sortOrder,
      isFeatured: s.isFeatured
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)
    try {
      const method = editingSkill ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/skills', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...(editingSkill && { id: editingSkill.id }) })
      })
      if (!res.ok) throw new Error('Failed to save skill')
      setFeedback({ type: 'success', message: 'Skill saved' })
      setModalOpen(false)
      loadSkills()
    } catch {
      setFeedback({ type: 'error', message: 'Error saving skill' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return
    try {
      await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' })
      setFeedback({ type: 'success', message: 'Skill removed' })
      loadSkills()
    } catch {
      setFeedback({ type: 'error', message: 'Delete failed' })
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 6px' }}>
            Skills <span className="gradient-text">Manager</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage frontend, backend, tools, and language proficiencies.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} />
          <span>Add Skill</span>
        </button>
      </div>

      {feedback && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', background: feedback.type === 'success' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
          {feedback.message}
        </div>
      )}

      <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {skills.map(s => (
            <div key={s.id} style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'rgba(255, 255, 255, 0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{s.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {s.category} • {s.proficiencyLevel}%
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleOpenEdit(s)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.8)', padding: '20px' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '440px', padding: '28px', borderRadius: 'var(--radius-lg)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', boxShadow: '0 20px 50px var(--shadow-color)' }}>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 16px', color: 'var(--text-primary)' }}>{editingSkill ? 'Edit Skill' : 'New Skill'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Skill Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Category</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }}>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend & Databases">Backend & Databases</option>
                  <option value="Tools & Practices">Tools & Practices</option>
                  <option value="Languages">Languages</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Proficiency (0-100%)</label>
                <input type="number" min="0" max="100" value={formData.proficiencyLevel} onChange={e => setFormData({ ...formData, proficiencyLevel: parseInt(e.target.value) || 0 })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
