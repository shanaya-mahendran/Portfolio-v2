import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArenaEntryBySlug } from '@/lib/data'
import {
  Trophy,
  Swords,
  FlaskConical,
  ArrowLeft,
  Users,
  Award,
  Lightbulb,
  AlertTriangle,
  Compass,
  Cpu,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen
} from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'
  const entry = await getArenaEntryBySlug(slug, isPreview)

  if (!entry) {
    return { title: 'Case Study Not Found' }
  }

  return {
    title: `${entry.title} — Case Study | The Arena`,
    description: entry.challengeSummary,
    openGraph: {
      title: `${entry.title} | Shanaya Mahendran`,
      description: entry.challengeSummary,
      images: entry.coverImage ? [entry.coverImage] : []
    }
  }
}

export default async function ArenaDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  const entry = await getArenaEntryBySlug(slug, isPreview)

  if (!entry) {
    notFound()
  }

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'AWARD_WINNER':
        return { label: 'Award Winner', bg: 'rgba(234, 179, 8, 0.18)', border: 'rgba(234, 179, 8, 0.4)', color: '#d97706' }
      case 'FINALIST':
        return { label: 'Finalist', bg: 'rgba(168, 85, 247, 0.18)', border: 'rgba(168, 85, 247, 0.4)', color: 'var(--accent)' }
      case 'DID_NOT_ADVANCE':
        return { label: 'Did Not Advance', bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.3)', color: 'var(--text-muted)' }
      case 'SUBMITTED':
        return { label: 'Submitted', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', color: '#3b82f6' }
      case 'PROTOTYPE':
        return { label: 'Active Prototype', bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)', color: '#ec4899' }
      default:
        return { label: outcome.replace(/_/g, ' '), bg: 'var(--accent-glow)', border: 'var(--border-color)', color: 'var(--text-primary)' }
    }
  }

  const badge = getOutcomeBadge(entry.outcome)

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(80px, 10vw, 100px) 0 80px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>

        {/* ── Top Navigation ─────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <Link
            href="/arena"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'color 0.2s ease',
              padding: '6px 0',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to The Arena</span>
          </Link>

          {entry.status === 'DRAFT' && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'rgba(234, 179, 8, 0.15)',
              border: '1px solid rgba(234, 179, 8, 0.35)',
              color: '#d97706',
              fontSize: '0.78rem',
              fontWeight: 700
            }}>
              <ShieldCheck size={14} />
              <span>ADMIN PREVIEW MODE</span>
            </div>
          )}
        </div>

        {/* ── Hero Card ──────────────────────────────────────────────── */}
        <header className="glass-panel" style={{
          overflow: 'hidden',
          marginBottom: '32px',
          padding: 0,
        }}>
          {/* Cover image */}
          {entry.coverImage && (
            <div style={{ position: 'relative', height: 'clamp(200px, 35vw, 340px)', width: '100%' }}>
              <Image
                src={entry.coverImage}
                alt={entry.title}
                fill
                sizes="(max-width: 960px) 100vw, 960px"
                style={{ objectFit: 'cover' }}
                priority
              />
              {/* Gradient overlay using theme variables */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, var(--card-bg) 0%, transparent 60%)',
                opacity: 0.95,
              }} />

              {/* Floating badges on image */}
              <div style={{
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  {entry.arenaCategory === 'PODIUM' && <Trophy size={13} style={{ color: '#d97706' }} />}
                  {entry.arenaCategory === 'ATTEMPT' && <Swords size={13} style={{ color: 'var(--accent)' }} />}
                  {entry.arenaCategory === 'LAB' && <FlaskConical size={13} style={{ color: 'var(--accent)' }} />}
                  <span>
                    {entry.arenaCategory === 'PODIUM' ? 'Podium Finish'
                      : entry.arenaCategory === 'ATTEMPT' ? 'The Attempt'
                        : 'The Experimental Lab'}
                  </span>
                </span>

                <span style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: badge.bg,
                  border: `1px solid ${badge.border}`,
                  color: badge.color,
                  backdropFilter: 'blur(8px)'
                }}>
                  {badge.label}
                </span>
              </div>
            </div>
          )}

          <div style={{ padding: 'clamp(20px, 4vw, 36px) clamp(16px, 4vw, 32px)' }}>
            {/* Competition label */}
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '10px'
            }}>
              {entry.competition.name} • {entry.competition.year}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              margin: '0 0 20px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
            }}>
              {entry.title}
            </h1>

            {/* No cover image badges — show inline if no image */}
            {!entry.coverImage && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <span style={{
                  padding: '5px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
                  background: 'var(--accent-glow)', border: '1px solid var(--border-color)',
                  color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '5px'
                }}>
                  {entry.arenaCategory === 'PODIUM' && <Trophy size={13} />}
                  {entry.arenaCategory === 'ATTEMPT' && <Swords size={13} />}
                  {entry.arenaCategory === 'LAB' && <FlaskConical size={13} />}
                  <span>{entry.arenaCategory === 'PODIUM' ? 'Podium Finish' : entry.arenaCategory === 'ATTEMPT' ? 'The Attempt' : 'The Experimental Lab'}</span>
                </span>
                <span style={{
                  padding: '5px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
                  background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color
                }}>
                  {badge.label}
                </span>
              </div>
            )}

            {/* Metadata grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              padding: '16px',
              borderRadius: 'var(--radius)',
              background: 'var(--bg-surface-light)',
              border: '1px solid var(--border-color)',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>My Role</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{entry.role}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>Team</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{entry.teamName || 'Solo'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>Result</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: badge.color, marginTop: '4px' }}>{entry.resultDetail || badge.label}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>Year</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{entry.competition.year}</div>
              </div>
            </div>

            {/* Evidence Links */}
            {entry.evidenceLinks && entry.evidenceLinks.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Links:</span>
                {entry.evidenceLinks.map((link: { id: string; url: string; title: string }) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      borderRadius: '20px'
                    }}
                  >
                    <span>{link.title}</span>
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* ── Case Study Sections ─────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 3vw, 28px)' }}>

          {/* Challenge & Problem */}
          <section className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Compass size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                The Challenge & Core Problem
              </h2>
            </div>
            <p style={{ fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {entry.challengeSummary}
            </p>
            <div style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius)',
              background: 'var(--bg-surface-light)',
              borderLeft: '3px solid var(--accent)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Problem Statement
              </div>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {entry.problemStatement}
              </div>
            </div>

            {entry.constraints && (
              <div style={{
                marginTop: '16px',
                padding: '14px 18px',
                borderRadius: 'var(--radius)',
                background: 'rgba(234, 179, 8, 0.06)',
                border: '1px solid rgba(234, 179, 8, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  <AlertTriangle size={15} />
                  <span>Constraints & Real-World Pressures</span>
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {entry.constraints}
                </p>
              </div>
            )}
          </section>

          {/* Role & Contribution */}
          <section className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Users size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Leadership & Personal Contribution
              </h2>
            </div>
            <p style={{ fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}>
              {entry.personalContribution}
            </p>
          </section>

          {/* Technical Solution */}
          <section className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Cpu size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                The Technical Solution
              </h2>
            </div>
            <p style={{ fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: entry.architectureDetails ? '16px' : 0 }}>
              {entry.technicalSolution}
            </p>

            {entry.architectureDetails && (
              <div style={{
                padding: '18px 20px',
                borderRadius: 'var(--radius)',
                background: 'var(--bg-surface-light)',
                border: '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                color: 'var(--accent)',
                lineHeight: 1.65,
                overflowX: 'auto',
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  // Architecture Specifications
                </div>
                {entry.architectureDetails}
              </div>
            )}
          </section>

          {/* Retrospective */}
          <section className="glass-panel" style={{
            padding: 'clamp(20px, 4vw, 32px)',
            borderTop: '2px solid rgba(234, 179, 8, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <BookOpen size={20} style={{ color: '#d97706', flexShrink: 0 }} />
              <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                The Retrospective{' '}
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 500 }}>
                  (What Worked & What Failed)
                </span>
              </h2>
            </div>

            <p style={{ fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {entry.retrospective}
            </p>

            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius)',
              background: 'var(--accent-glow)',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                <Sparkles size={17} />
                <span>Core Engineering Takeaways & Lessons Learned</span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {entry.lessonsLearned}
              </p>
            </div>
          </section>

          {/* Custom sections */}
          {entry.sections && entry.sections.map((section: { id: string; title: string; content: string }) => (
            <section key={section.id} className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
              <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, margin: '0 0 14px', color: 'var(--text-primary)' }}>
                {section.title}
              </h2>
              <div style={{ fontSize: '0.97rem', lineHeight: 1.75, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link
            href="/arena"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}
          >
            <ArrowLeft size={16} />
            <span>Explore All Battles in The Arena</span>
          </Link>
        </div>

      </div>
    </div>
  )
}
