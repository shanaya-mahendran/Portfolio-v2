'use client'

import React, { useState, useEffect } from 'react'
import { Settings, Save, CheckCircle, AlertCircle, Lock } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const loadSettings = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      if (res.ok) setSettings(data.settings || {})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadSettings() }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      })
      if (!res.ok) throw new Error('Save failed')
      setFeedback({ type: 'success', message: 'Settings saved and public cache revalidated' })
    } catch {
      setFeedback({ type: 'error', message: 'Failed to update settings' })
    }
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 6px' }}>
          Site & Profile <span className="gradient-text">Settings</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Manage global site parameters, social profiles, and synchronized counts.
        </p>
      </div>

      {feedback && (
        <div style={{
          padding: '12px 18px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '20px',
          background: feedback.type === 'success' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: `1px solid ${feedback.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          color: feedback.type === 'success' ? '#4ade80' : '#f87171'
        }}>
          {feedback.message}
        </div>
      )}

      <div className="glass-panel" style={{ maxWidth: '680px', borderRadius: 'var(--radius-md)', padding: '32px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Site Title & Meta Name
            </label>
            <input
              type="text"
              value={settings.site_title || ''}
              onChange={e => setSettings({ ...settings, site_title: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Hero Tagline
            </label>
            <textarea
              rows={2}
              value={settings.hero_tagline || ''}
              onChange={e => setSettings({ ...settings, hero_tagline: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Verified Open Source Merged PRs Count
            </label>
            <input
              type="number"
              value={settings.open_source_pr_count || '43'}
              onChange={e => setSettings({ ...settings, open_source_pr_count: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                GitHub Profile URL
              </label>
              <input
                type="text"
                value={settings.github_url || ''}
                onChange={e => setSettings({ ...settings, github_url: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Contact Email
              </label>
              <input
                type="email"
                value={settings.email_address || ''}
                onChange={e => setSettings({ ...settings, email_address: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
            >
              <Save size={16} />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
