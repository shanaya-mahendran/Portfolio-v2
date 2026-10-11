'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, GraduationCap, Award, HeartHandshake, X } from 'lucide-react'

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

interface Programme {
  id: string
  title: string
  org: string
  period: string
  status: string
  statusColor?: string | null
  icon?: string | null
  description: string
  activities: string
  sortOrder: number
}

interface VolunteeringItem {
  id: string
  title: string
  org: string
  period: string
  status?: string | null
  statusColor?: string | null
  icon?: string | null
  description: string
  activities: string
  sortOrder: number
}

export default function AdminEducationPage() {
  const [activeTab, setActiveTab] = useState<'education' | 'programmes' | 'volunteering'>('education')
  const [educations, setEducations] = useState<Education[]>([])
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [volunteering, setVolunteering] = useState<VolunteeringItem[]>([])
  const [loading, setLoading] = useState(true)

  // Education Modal
  const [eduModalOpen, setEduModalOpen] = useState(false)
  const [editingEdu, setEditingEdu] = useState<Education | null>(null)
  const [eduForm, setEduForm] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    cgpa: '',
    date: '',
    description: '',
    sortOrder: 0,
    status: 'PUBLISHED'
  })

  // Programme Modal
  const [progModalOpen, setProgModalOpen] = useState(false)
  const [editingProg, setEditingProg] = useState<Programme | null>(null)
  const [progForm, setProgForm] = useState({
    title: '',
    org: '',
    period: '',
    status: 'Completed',
    statusColor: '#10b981',
    icon: '💻',
    description: '',
    activities: '',
    sortOrder: 0
  })

  // Volunteering Modal
  const [volModalOpen, setVolModalOpen] = useState(false)
  const [editingVol, setEditingVol] = useState<VolunteeringItem | null>(null)
  const [volForm, setVolForm] = useState({
    title: '',
    org: '',
    period: '',
    status: 'Active',
    statusColor: '#3b82f6',
    icon: '🤝',
    description: '',
    activities: '',
    sortOrder: 0
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const [eduRes, progRes, volRes] = await Promise.all([
        fetch('/api/admin/education'),
        fetch('/api/admin/programmes'),
        fetch('/api/admin/volunteering')
      ])

      if (eduRes.ok) {
        const d = await eduRes.json()
        setEducations(d.education || [])
      }
      if (progRes.ok) {
        const d = await progRes.json()
        setProgrammes(d.programmes || [])
      }
      if (volRes.ok) {
        const d = await volRes.json()
        setVolunteering(d.volunteering || [])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  // Education Handlers
  const handleOpenCreateEdu = () => {
    setEditingEdu(null)
    setEduForm({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      cgpa: '',
      date: '',
      description: '',
      sortOrder: educations.length + 1,
      status: 'PUBLISHED'
    })
    setEduModalOpen(true)
  }

  const handleOpenEditEdu = (edu: Education) => {
    setEditingEdu(edu)
    setEduForm({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy || '',
      cgpa: edu.cgpa || '',
      date: edu.date,
      description: edu.description,
      sortOrder: edu.sortOrder,
      status: edu.status
    })
    setEduModalOpen(true)
  }

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingEdu ? 'PUT' : 'POST'
    await fetch('/api/admin/education', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...eduForm, ...(editingEdu && { id: editingEdu.id }) })
    })
    setEduModalOpen(false)
    loadData()
  }

  const handleDeleteEdu = async (id: string) => {
    if (!confirm('Delete this education entry?')) return
    await fetch(`/api/admin/education?id=${id}`, { method: 'DELETE' })
    loadData()
  }

  // Programme Handlers
  const handleOpenCreateProg = () => {
    setEditingProg(null)
    setProgForm({
      title: '',
      org: '',
      period: '',
      status: 'Completed',
      statusColor: '#10b981',
      icon: '💻',
      description: '',
      activities: '',
      sortOrder: programmes.length + 1
    })
    setProgModalOpen(true)
  }

  const handleOpenEditProg = (prog: Programme) => {
    setEditingProg(prog)
    let acts = ''
    try {
      const parsed = JSON.parse(prog.activities)
      acts = Array.isArray(parsed) ? parsed.join('\n') : prog.activities
    } catch {
      acts = prog.activities
    }

    setProgForm({
      title: prog.title,
      org: prog.org,
      period: prog.period,
      status: prog.status,
      statusColor: prog.statusColor || '#10b981',
      icon: prog.icon || '💻',
      description: prog.description,
      activities: acts,
      sortOrder: prog.sortOrder
    })
    setProgModalOpen(true)
  }

  const handleSaveProg = async (e: React.FormEvent) => {
    e.preventDefault()
    const activitiesArray = progForm.activities.split('\n').map(s => s.trim()).filter(Boolean)
    const method = editingProg ? 'PUT' : 'POST'
    await fetch('/api/admin/programmes', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...progForm,
        activities: activitiesArray,
        ...(editingProg && { id: editingProg.id })
      })
    })
    setProgModalOpen(false)
    loadData()
  }

  const handleDeleteProg = async (id: string) => {
    if (!confirm('Delete this programme?')) return
    await fetch(`/api/admin/programmes?id=${id}`, { method: 'DELETE' })
    loadData()
  }

  // Volunteering Handlers
  const handleOpenCreateVol = () => {
    setEditingVol(null)
    setVolForm({
      title: '',
      org: '',
      period: '',
      status: 'Active',
      statusColor: '#3b82f6',
      icon: '🤝',
      description: '',
      activities: '',
      sortOrder: volunteering.length + 1
    })
    setVolModalOpen(true)
  }

  const handleOpenEditVol = (vol: VolunteeringItem) => {
    setEditingVol(vol)
    let acts = ''
    try {
      const parsed = JSON.parse(vol.activities)
      acts = Array.isArray(parsed) ? parsed.join('\n') : vol.activities
    } catch {
      acts = vol.activities
    }

    setVolForm({
      title: vol.title,
      org: vol.org,
      period: vol.period,
      status: vol.status || 'Active',
      statusColor: vol.statusColor || '#3b82f6',
      icon: vol.icon || '🤝',
      description: vol.description,
      activities: acts,
      sortOrder: vol.sortOrder
    })
    setVolModalOpen(true)
  }

  const handleSaveVol = async (e: React.FormEvent) => {
    e.preventDefault()
    const activitiesArray = volForm.activities.split('\n').map(s => s.trim()).filter(Boolean)
    const method = editingVol ? 'PUT' : 'POST'
    await fetch('/api/admin/volunteering', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...volForm,
        activities: activitiesArray,
        ...(editingVol && { id: editingVol.id })
      })
    })
    setVolModalOpen(false)
    loadData()
  }

  const handleDeleteVol = async (id: string) => {
    if (!confirm('Delete this volunteering record?')) return
    await fetch(`/api/admin/volunteering?id=${id}`, { method: 'DELETE' })
    loadData()
  }

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            Education, Leadership & Volunteering <span className="gradient-text">CMS</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            Manage your degrees, leadership programmes, and volunteering initiatives dynamically.
          </p>
        </div>

        {activeTab === 'education' && (
          <button onClick={handleOpenCreateEdu} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} />
            <span>Add Degree</span>
          </button>
        )}
        {activeTab === 'programmes' && (
          <button onClick={handleOpenCreateProg} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} />
            <span>Add Programme</span>
          </button>
        )}
        {activeTab === 'volunteering' && (
          <button onClick={handleOpenCreateVol} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} />
            <span>Add Volunteering</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('education')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: 'var(--radius)',
            border: activeTab === 'education' ? '1px solid var(--accent)' : '1px solid transparent',
            background: activeTab === 'education' ? 'var(--accent-glow)' : 'transparent',
            color: activeTab === 'education' ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <GraduationCap size={18} />
          <span>Degrees ({educations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('programmes')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: 'var(--radius)',
            border: activeTab === 'programmes' ? '1px solid var(--accent)' : '1px solid transparent',
            background: activeTab === 'programmes' ? 'var(--accent-glow)' : 'transparent',
            color: activeTab === 'programmes' ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Award size={18} />
          <span>Leadership Programmes ({programmes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('volunteering')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: 'var(--radius)',
            border: activeTab === 'volunteering' ? '1px solid var(--accent)' : '1px solid transparent',
            background: activeTab === 'volunteering' ? 'var(--accent-glow)' : 'transparent',
            color: activeTab === 'volunteering' ? 'var(--accent)' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <HeartHandshake size={18} />
          <span>Volunteering ({volunteering.length})</span>
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading records...</div>
      ) : (
        <>
          {/* TAB 1: Degrees */}
          {activeTab === 'education' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {educations.length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No education records found. Click &quot;Add Degree&quot; to create one.</div>
              ) : (
                educations.map(e => (
                  <div key={e.id} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{e.degree}</h2>
                        {e.cgpa && <span style={{ padding: '2px 8px', borderRadius: '12px', background: 'var(--accent-glow)', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 700 }}>{e.cgpa}</span>}
                      </div>
                      <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{e.institution}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>{e.date}</div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{e.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '20px' }}>
                      <button onClick={() => handleOpenEditEdu(e)} className="btn btn-outline" style={{ padding: '8px' }} aria-label="Edit education"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteEdu(e.id)} className="btn btn-outline" style={{ padding: '8px', color: '#ef4444' }} aria-label="Delete education"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Leadership Programmes */}
          {activeTab === 'programmes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {programmes.length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No leadership programmes found. Click &quot;Add Programme&quot; to create one.</div>
              ) : (
                programmes.map(p => (
                  <div key={p.id} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '1.4rem' }}>{p.icon || '💻'}</span>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{p.title}</h2>
                        <span style={{ padding: '2px 8px', borderRadius: '12px', background: `${p.statusColor || '#10b981'}22`, color: p.statusColor || '#10b981', fontSize: '0.78rem', fontWeight: 700 }}>{p.status}</span>
                      </div>
                      <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{p.org}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>{p.period}</div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{p.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '20px' }}>
                      <button onClick={() => handleOpenEditProg(p)} className="btn btn-outline" style={{ padding: '8px' }} aria-label="Edit programme"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteProg(p.id)} className="btn btn-outline" style={{ padding: '8px', color: '#ef4444' }} aria-label="Delete programme"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Volunteering */}
          {activeTab === 'volunteering' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {volunteering.length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No volunteering records found. Click &quot;Add Volunteering&quot; to create one.</div>
              ) : (
                volunteering.map(v => (
                  <div key={v.id} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '1.4rem' }}>{v.icon || '🤝'}</span>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{v.title}</h2>
                        {v.status && <span style={{ padding: '2px 8px', borderRadius: '12px', background: `${v.statusColor || '#3b82f6'}22`, color: v.statusColor || '#3b82f6', fontSize: '0.78rem', fontWeight: 700 }}>{v.status}</span>}
                      </div>
                      <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{v.org}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>{v.period}</div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{v.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '20px' }}>
                      <button onClick={() => handleOpenEditVol(v)} className="btn btn-outline" style={{ padding: '8px' }} aria-label="Edit volunteering"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteVol(v.id)} className="btn btn-outline" style={{ padding: '8px', color: '#ef4444' }} aria-label="Delete volunteering"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* Degree Modal */}
      {eduModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.7)', padding: '20px' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', padding: '28px', borderRadius: 'var(--radius-lg)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', boxShadow: '0 20px 50px var(--shadow-color)' }}>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 16px', color: 'var(--text-primary)' }}>{editingEdu ? 'Edit Degree' : 'New Degree'}</h2>
            <form onSubmit={handleSaveEdu} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Degree Title *</label>
                <input required type="text" value={eduForm.degree} onChange={e => setEduForm({ ...eduForm, degree: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Institution *</label>
                  <input required type="text" value={eduForm.institution} onChange={e => setEduForm({ ...eduForm, institution: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Dates (e.g. Jan 2026 – Present) *</label>
                  <input required type="text" value={eduForm.date} onChange={e => setEduForm({ ...eduForm, date: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>CGPA / GPA (optional)</label>
                <input type="text" value={eduForm.cgpa} onChange={e => setEduForm({ ...eduForm, cgpa: e.target.value })} placeholder="GPA: 3.76" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Description</label>
                <textarea rows={3} value={eduForm.description} onChange={e => setEduForm({ ...eduForm, description: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEduModalOpen(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>Save Degree</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Programme Modal */}
      {progModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.7)', padding: '20px' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', padding: '28px', borderRadius: 'var(--radius-lg)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', boxShadow: '0 20px 50px var(--shadow-color)' }}>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 16px', color: 'var(--text-primary)' }}>{editingProg ? 'Edit Leadership Programme' : 'New Leadership Programme'}</h2>
            <form onSubmit={handleSaveProg} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Programme Title *</label>
                <input required type="text" value={progForm.title} onChange={e => setProgForm({ ...progForm, title: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Organization *</label>
                  <input required type="text" value={progForm.org} onChange={e => setProgForm({ ...progForm, org: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Period (e.g. August 2026) *</label>
                  <input required type="text" value={progForm.period} onChange={e => setProgForm({ ...progForm, period: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Status Badge</label>
                  <input type="text" value={progForm.status} onChange={e => setProgForm({ ...progForm, status: e.target.value })} placeholder="Completed" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Icon Emoji</label>
                  <input type="text" value={progForm.icon} onChange={e => setProgForm({ ...progForm, icon: e.target.value })} placeholder="💻" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Description</label>
                <textarea rows={3} value={progForm.description} onChange={e => setProgForm({ ...progForm, description: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Key Activities (one per line)</label>
                <textarea rows={4} value={progForm.activities} onChange={e => setProgForm({ ...progForm, activities: e.target.value })} placeholder="Led team to 3rd place&#10;Attended deep tech workshops" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setProgModalOpen(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>Save Programme</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Volunteering Modal */}
      {volModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.7)', padding: '20px' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', padding: '28px', borderRadius: 'var(--radius-lg)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', boxShadow: '0 20px 50px var(--shadow-color)' }}>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 16px', color: 'var(--text-primary)' }}>{editingVol ? 'Edit Volunteering' : 'New Volunteering'}</h2>
            <form onSubmit={handleSaveVol} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Title / Role *</label>
                <input required type="text" value={volForm.title} onChange={e => setVolForm({ ...volForm, title: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Organization *</label>
                  <input required type="text" value={volForm.org} onChange={e => setVolForm({ ...volForm, org: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Period *</label>
                  <input required type="text" value={volForm.period} onChange={e => setVolForm({ ...volForm, period: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Status Badge</label>
                  <input type="text" value={volForm.status} onChange={e => setVolForm({ ...volForm, status: e.target.value })} placeholder="Active" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Icon Emoji</label>
                  <input type="text" value={volForm.icon} onChange={e => setVolForm({ ...volForm, icon: e.target.value })} placeholder="🤝" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Description</label>
                <textarea rows={3} value={volForm.description} onChange={e => setVolForm({ ...volForm, description: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Key Activities (one per line)</label>
                <textarea rows={4} value={volForm.activities} onChange={e => setVolForm({ ...volForm, activities: e.target.value })} placeholder="Representing community across university&#10;Organizing workshops" style={{ width: '100%', padding: '8px 12px', background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setVolModalOpen(false)} className="btn btn-outline" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px' }}>Save Volunteering</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
