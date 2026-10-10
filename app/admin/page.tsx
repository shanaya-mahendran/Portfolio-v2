import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { getAuthenticatedAdmin } from '@/lib/auth'
import {
  FolderGit2,
  Trophy,
  Cpu,
  Mail,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    redirect('/admin/login')
  }

  const [
    projectCount,
    draftProjectCount,
    arenaCount,
    draftArenaCount,
    skillCount,
    messageCount,
    recentProjects,
    recentArenaEntries
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: 'DRAFT' } }),
    prisma.arenaEntry.count(),
    prisma.arenaEntry.count({ where: { status: 'DRAFT' } }),
    prisma.skill.count(),
    prisma.message.count(),
    prisma.project.findMany({ take: 5, orderBy: { updatedAt: 'desc' } }),
    prisma.arenaEntry.findMany({ take: 5, include: { competition: true }, orderBy: { updatedAt: 'desc' } })
  ])

  return (
    <div className="container">
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px' }}>
          Portfolio <span className="gradient-text">Control Center</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
          Manage your published projects, The Arena case studies, resume details, and system settings.
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Projects</span>
            <div style={{ color: 'var(--accent)' }}><FolderGit2 size={22} /></div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{projectCount}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {draftProjectCount} draft{draftProjectCount === 1 ? '' : 's'}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>The Arena Entries</span>
            <div style={{ color: 'var(--accent)' }}><Trophy size={22} /></div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{arenaCount}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {draftArenaCount} draft{draftArenaCount === 1 ? '' : 's'}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Skills Logged</span>
            <div style={{ color: 'var(--accent)' }}><Cpu size={22} /></div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{skillCount}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Across 4 categories
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Inbound Messages</span>
            <div style={{ color: 'var(--accent)' }}><Mail size={22} /></div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{messageCount}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            From contact form
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="glass" style={{
        padding: '20px 24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        marginBottom: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={20} style={{ color: 'var(--accent)' }} />
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Quick Actions:</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/admin/projects" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
            <PlusCircle size={15} style={{ marginRight: '6px' }} />
            New Project
          </Link>
          <Link href="/admin/arena" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
            <Trophy size={15} style={{ marginRight: '6px' }} />
            New Arena Entry
          </Link>
          <Link href="/admin/media" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
            <Layers size={15} style={{ marginRight: '6px' }} />
            Upload Media
          </Link>
          <Link href="/arena" target="_blank" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
            <ExternalLink size={15} style={{ marginRight: '6px' }} />
            Preview The Arena
          </Link>
        </div>
      </div>

      {/* Recent Items Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Recent Projects */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Recent Projects</h2>
            <Link href="/admin/projects" style={{ fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none' }}>
              Manage all →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentProjects.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {p.category} • slug: {p.slug}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: p.status === 'PUBLISHED' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                    color: p.status === 'PUBLISHED' ? '#4ade80' : '#facc15'
                  }}>
                    {p.status}
                  </span>
                  <Link
                    href={`/admin/projects`}
                    style={{ fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none' }}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Arena Entries */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Recent Arena Entries</h2>
            <Link href="/admin/arena" style={{ fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none' }}>
              Manage all →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentArenaEntries.map((e) => (
              <div
                key={e.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {e.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {e.competition?.name} • {e.arenaCategory}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: e.status === 'PUBLISHED' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                    color: e.status === 'PUBLISHED' ? '#4ade80' : '#facc15'
                  }}>
                    {e.status}
                  </span>
                  <Link
                    href={`/arena/${e.slug}?preview=true`}
                    target="_blank"
                    style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  >
                    Preview
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
