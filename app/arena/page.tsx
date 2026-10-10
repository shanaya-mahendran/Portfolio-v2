import React from 'react'
import type { Metadata } from 'next'
import { getPublicArenaEntries } from '@/lib/data'
import ArenaGallery from './ArenaGallery'
import { Trophy, Swords, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Arena — Builds Under Pressure | Shanaya Mahendran',
  description: 'Podium finishes, high-pressure hackathon builds, and honest retrospectives on technical decisions, team leadership, and lessons learned.',
  keywords: ['Hackathons', 'Competitions', 'SmartPark', 'IEEE CS R10', 'Full Stack Developer', 'Shanaya Mahendran'],
}

export const revalidate = 60 // Revalidate every 60s or on-demand via revalidatePath

export default async function ArenaPage() {
  const entries = await getPublicArenaEntries()

  return (
    <div style={{ minHeight: '100vh', padding: '40px 0 100px', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '24px',
            background: 'rgba(181, 136, 211, 0.12)',
            border: '1px solid rgba(181, 136, 211, 0.3)',
            color: 'var(--accent)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}>
            <Swords size={16} />
            <span>BUILDS UNDER PRESSURE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.15 }}>
            The <span className="gradient-text">Arena</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
            Hackathons, ideathons, and engineering battles under tight deadlines.
            Here you will find our <strong>victories</strong>, our <strong>unfinished battles</strong>, and honest <strong>retrospectives</strong> explaining what worked, what fell short, and how we grew.
          </p>
        </div>

        {/* Gallery */}
        <ArenaGallery initialEntries={entries} />
      </div>
    </div>
  )
}
