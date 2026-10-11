'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Briefcase, X } from 'lucide-react'

interface Experience {
  id: string
  title: string
  role: string
  company: string
  location?: string | null
  startDate: string
  endDate?: string | null
  isCurrent: boolean
  descriptions: string
  sortOrder: number
  status: string
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    role: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    descriptions: '',
    sortOrder: 0,
    status: 'PUBLISHED'
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/experience')
      const data = await res.json()
      if (res.ok) setExperiences(data.experiences || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const handleOpenCreate = () => {
    setEditingExp(null)
    setForm({
      title: '',
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      descriptions: '',
      sortOrder: experiences.length + 1,
      status: 'PUBLISHED'
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp(exp)
    let desc = exp.descriptions
    try {
      const arr = JSON.parse(exp.descriptions)
      if (Array.isArray(arr)) desc = arr.join('\n')
    } catch {}

    setForm({
      title: exp.title,
      role: exp.role,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      isCurrent: exp.isCurrent,
      descriptions: desc,
      sortOrder: exp.sortOrder,
      status: exp.status
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...form,
      descriptions: form.descriptions.split('\n').filter(Boolean),
      ...(editingExp && { id: editingExp.id })
    }
    try {
      const method = editingExp ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/experience', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Save failed')
      setFeedback('Experience entry saved')
      setModalOpen(false)
      loadData()
    } catch {
      setFeedback('Failed to save experience')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience entry?')) return
    await fetch(`/api/admin/experience?id=${id}`, { method: 'DELETE' })
    loadData()
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 6px' }}>
            Experience <span className="gradient-text">Manager</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage career timeline, internships, and engineering contributions.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {experiences.map(e => (
            <div key={e.id} style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'rgba(255, 255, 255, 0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{e.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {e.company} • {e.startDate} – {e.isCurrent ? 'Present' : e.endDate}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleOpenEdit(e)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(e.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.8)', padding: '20px' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', borderRadius: 'var(--radius-lg)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', boxShadow: '0 20px 50px var(--shadow-color)' }}>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 16px', color: 'var(--text-primary)' }}>{editingExp ? 'Edit Experience' : 'New Experience'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Title</label>
                  <input required type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Company</label>
                  <input required type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Start Date</label>
                  <input required type="text" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} placeholder="Oct 2026" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>End Date</label>
                  <input type="text" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} placeholder="Present" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Bullet Points (one per line)</label>
                <textarea rows={5} value={form.descriptions} onChange={e => setForm({ ...form, descriptions: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
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
