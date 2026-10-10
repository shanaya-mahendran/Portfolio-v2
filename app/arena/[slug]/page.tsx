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
  Calendar,
  Users,
  Award,
  Lightbulb,
  AlertTriangle,
  Compass,
  Cpu,
  FileText,
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
        return { label: 'Award Winner', bg: 'rgba(234, 179, 8, 0.18)', border: 'rgba(234, 179, 8, 0.4)', color: '#facc15' }
      case 'FINALIST':
        return { label: 'Finalist', bg: 'rgba(168, 85, 247, 0.18)', border: 'rgba(168, 85, 247, 0.4)', color: '#c084fc' }
      case 'DID_NOT_ADVANCE':
        return { label: 'Did Not Advance', bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.3)', color: '#cbd5e1' }
      case 'SUBMITTED':
        return { label: 'Submitted', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)', color: '#93c5fd' }
      case 'PROTOTYPE':
        return { label: 'Active Prototype', bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)', color: '#f472b6' }
      default:
        return { label: outcome.replace(/_/g, ' '), bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)', color: '#e2e8f0' }
    }
  }

  const badge = getOutcomeBadge(entry.outcome)

  return (
    <div style={{ minHeight: '100vh', padding: '30px 0 100px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Top Back Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
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
              transition: 'color 0.2s ease'
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
              background: 'rgba(234, 179, 8, 0.2)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              color: '#facc15',
              fontSize: '0.78rem',
              fontWeight: 700
            }}>
              <ShieldCheck size={14} />
              <span>ADMIN PREVIEW MODE</span>
            </div>
          )}
        </div>

        {/* Hero Section */}
        <header className="glass" style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          marginBottom: '40px'
        }}>
          {entry.coverImage && (
            <div style={{ position: 'relative', height: '340px', width: '100%' }}>
              <Image
                src={entry.coverImage}
                alt={entry.title}
                fill
                sizes="(max-width: 960px) 100vw, 960px"
                style={{ objectFit: 'cover' }}
                priority
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(14, 7, 19, 0.95) 0%, rgba(14, 7, 19, 0.3) 60%, transparent 100%)'
              }} />

              {/* Floating badges */}
              <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background: 'rgba(14, 7, 19, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(181, 136, 211, 0.35)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {entry.arenaCategory === 'PODIUM' && <Trophy size={14} style={{ color: '#facc15' }} />}
                  {entry.arenaCategory === 'ATTEMPT' && <Swords size={14} style={{ color: '#818cf8' }} />}
                  {entry.arenaCategory === 'LAB' && <FlaskConical size={14} style={{ color: '#c084fc' }} />}
                  <span>{entry.arenaCategory === 'PODIUM' ? 'Podium Finish' : entry.arenaCategory === 'ATTEMPT' ? 'The Attempt' : 'The Experimental Lab'}</span>
                </span>

                <span style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
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

          <div style={{ padding: '36px 32px' }}>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '10px'
            }}>
              {entry.competition.name} • {entry.competition.year}
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.7rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              margin: '0 0 20px',
              color: 'var(--text-primary)'
            }}>
              {entry.title}
            </h1>

            {/* Quick Metadata Pill Matrix */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              padding: '18px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>My Role</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{entry.role}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Team</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{entry.teamName || 'Solo Contributor'}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Verified Result</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: badge.color, marginTop: '2px' }}>{entry.resultDetail || badge.label}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Year & Organizer</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{entry.competition.year} • {entry.competition.organizer}</div>
              </div>
            </div>

            {/* Evidence Links */}
            {entry.evidenceLinks && entry.evidenceLinks.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Evidence & Links:</span>
                {entry.evidenceLinks.map(link => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      borderRadius: '20px'
                    }}
                  >
                    <span>{link.title}</span>
                    <ExternalLink size={13} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Deep Dive Case Study Content Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Section: Challenge Summary */}
          <section className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ color: 'var(--accent)' }}><Compass size={22} /></div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>The Challenge & Core Problem</h2>
            </div>
            <div style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              <p style={{ margin: '0 0 16px' }}>{entry.challengeSummary}</p>
              <div style={{
                padding: '18px 20px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.02)',
                borderLeft: '3px solid var(--accent)'
              }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Problem Statement</div>
                <div>{entry.problemStatement}</div>
              </div>
            </div>

            {entry.constraints && (
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#facc15', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                  <AlertTriangle size={16} />
                  <span>Constraints & Real-World Pressures:</span>
                </div>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {entry.constraints}
                </p>
              </div>
            )}
          </section>

          {/* Section: My Role & Contribution */}
          <section className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ color: 'var(--accent)' }}><Users size={22} /></div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Leadership & Personal Contribution</h2>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
              {entry.personalContribution}
            </p>
          </section>

          {/* Section: Technical Solution & Architecture */}
          <section className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ color: 'var(--accent)' }}><Cpu size={22} /></div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>The Technical Solution</h2>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
              {entry.technicalSolution}
            </p>

            {entry.architectureDetails && (
              <div style={{
                padding: '20px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(14, 7, 19, 0.6)',
                border: '1px solid var(--border-color)',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: 'var(--accent)',
                lineHeight: 1.6
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '6px', textTransform: 'uppercase' }}>
                  // Architecture Specifications
                </div>
                {entry.architectureDetails}
              </div>
            )}
          </section>

          {/* Section: The Retrospective & Lessons Learned */}
          <section className="glass-panel" style={{
            padding: '32px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            background: 'linear-gradient(180deg, rgba(234, 179, 8, 0.04) 0%, rgba(18, 10, 26, 0.8) 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ color: '#facc15' }}><BookOpen size={22} /></div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
                The Retrospective <span style={{ color: '#facc15', fontSize: '0.9rem', fontWeight: 500 }}>(What Worked & What Failed)</span>
              </h2>
            </div>

            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 24px' }}>
              {entry.retrospective}
            </p>

            <div style={{
              padding: '20px 24px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(181, 136, 211, 0.08)',
              border: '1px solid rgba(181, 136, 211, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>
                <Sparkles size={18} />
                <span>Core Engineering Takeaways & Lessons Learned</span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                {entry.lessonsLearned}
              </p>
            </div>
          </section>

          {/* Custom Sections if any */}
          {entry.sections && entry.sections.map(section => (
            <section key={section.id} className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 16px' }}>{section.title}</h2>
              <div style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link href="/arena" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}>
            <ArrowLeft size={16} />
            <span>Explore All Battles in The Arena</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
