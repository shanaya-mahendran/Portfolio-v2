'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, GraduationCap, X } from 'lucide-react'

interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy?: string | null
  cgpa?: string | null
  date: string
  description: string
  sortOrder: number
  status: string
}

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEdu, setEditingEdu] = useState<Education | null>(null)

  const [form, setForm] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    cgpa: '',
    date: '',
    description: '',
    sortOrder: 0,
    status: 'PUBLISHED'
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/education')
      const data = await res.json()
      if (res.ok) setEducations(data.education || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const handleOpenCreate = () => {
    setEditingEdu(null)
    setForm({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      cgpa: '',
      date: '',
      description: '',
      sortOrder: educations.length + 1,
      status: 'PUBLISHED'
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (edu: Education) => {
    setEditingEdu(edu)
    setForm({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy || '',
      cgpa: edu.cgpa || '',
      date: edu.date,
      description: edu.description,
      sortOrder: edu.sortOrder,
      status: edu.status
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingEdu ? 'PUT' : 'POST'
      await fetch('/api/admin/education', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...(editingEdu && { id: editingEdu.id }) })
      })
      setModalOpen(false)
      loadData()
    } catch {}
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education entry?')) return
    await fetch(`/api/admin/education?id=${id}`, { method: 'DELETE' })
    loadData()
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 6px' }}>
            Education <span className="gradient-text">Manager</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage academic institutions, degrees, and coursework details.
          </p>
        </div>
        <button onClick={handleOpenCreate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} />
          <span>Add Degree</span>
        </button>
      </div>

      <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {educations.map(edu => (
            <div key={edu.id} style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'rgba(255, 255, 255, 0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{edu.degree}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {edu.institution} • {edu.date} {edu.cgpa ? `• ${edu.cgpa}` : ''}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleOpenEdit(edu)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(edu.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.8)', padding: '20px' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', padding: '28px', borderRadius: 'var(--radius-lg)', background: 'rgba(18, 10, 26, 0.96)' }}>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 16px' }}>{editingEdu ? 'Edit Degree' : 'New Degree'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Degree Title</label>
                <input required type="text" value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Institution</label>
                  <input required type="text" value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Dates (e.g. Jan 2026 – Present)</label>
                  <input required type="text" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>GPA / CGPA (optional)</label>
                <input type="text" value={form.cgpa} onChange={e => setForm({ ...form, cgpa: e.target.value })} placeholder="GPA: 3.76" style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }} />
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
