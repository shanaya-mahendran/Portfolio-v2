'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Upload, Trash2, Copy, Check, AlertCircle, X, Image as ImageIcon } from 'lucide-react'

interface MediaAsset {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  altText?: string | null
  createdAt: string
}

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const loadMedia = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/media')
      const data = await res.json()
      if (res.ok) setAssets(data.assets || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setFeedback(null)

    const form = new FormData()
    form.append('file', file)
    form.append('altText', file.name)

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: form
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setFeedback({ type: 'success', message: 'Image uploaded to media library' })
      loadMedia()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      setFeedback({ type: 'error', message: msg })
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media asset?')) return
    try {
      await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' })
      setFeedback({ type: 'success', message: 'Asset removed' })
      loadMedia()
    } catch {
      setFeedback({ type: 'error', message: 'Delete failed' })
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 6px' }}>
            Media <span className="gradient-text">Library</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Upload, inspect, and copy image links for projects and competition case studies.
          </p>
        </div>

        <label className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: uploading ? 'not-allowed' : 'pointer' }}>
          <Upload size={16} />
          <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
        </label>
      </div>

      {feedback && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', background: feedback.type === 'success' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
          {feedback.message}
        </div>
      )}

      <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', padding: '24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading media library...</div>
        ) : assets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            <ImageIcon size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p>No uploaded media assets yet. Use the upload button above.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px' }}>
            {assets.map(asset => (
              <div key={asset.id} style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ position: 'relative', height: '140px', width: '100%', background: 'rgba(0, 0, 0, 0.3)' }}>
                  <Image src={asset.url} alt={asset.originalName} fill sizes="250px" style={{ objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {asset.originalName}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {(asset.size / 1024).toFixed(1)} KB • {asset.mimeType}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                    <button
                      onClick={() => handleCopy(asset.url, asset.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        color: copiedId === asset.id ? '#4ade80' : 'var(--accent)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {copiedId === asset.id ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedId === asset.id ? 'Copied' : 'Copy URL'}</span>
                    </button>

                    <button
                      onClick={() => handleDelete(asset.id)}
                      style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0 }}
                      title="Delete asset"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
