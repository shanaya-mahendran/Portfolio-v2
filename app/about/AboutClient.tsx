'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Download, BookOpen, Music, Sprout, Zap, Globe2, HeartHandshake, TrendingUp } from 'lucide-react'

const VALUES = [
  { icon: Zap, title: 'Move Fast, Stay Stable', desc: 'Iterate quickly without compromising quality.' },
  { icon: Globe2, title: 'Open Source First', desc: 'Believe in the power of community-driven development.' },
  { icon: HeartHandshake, title: 'User-Centric', desc: 'Build products that people actually love to use.' },
  { icon: TrendingUp, title: 'Continuous Growth', desc: 'Always learning, always improving.' }
]

interface TimelineItem {
  date: string
  title: string
  descriptions: string[]
}

interface Props {
  experiences: TimelineItem[]
}

export default function AboutClient({ experiences }: Props) {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const monogramVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    show: {
      opacity: 1, scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], staggerChildren: 0.12, delayChildren: 0.12 }
    }
  }

  const letterVariants = {
    hidden: (direction: number) => ({ opacity: 0, y: 26, x: 0, rotate: direction === -1 ? -18 : 18, filter: 'blur(6px)' }),
    show: (direction: number) => ({
      opacity: 1, y: 0, x: direction * 14, rotate: direction * 3, filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    })
  }

  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container">

        {/* About Hero */}
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="about-image"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', width: '100%', minWidth: 0,
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              border: '1px solid var(--border-color)', minHeight: '320px',
              background: 'linear-gradient(145deg, rgba(12, 18, 24, 0.96), rgba(17, 24, 39, 0.92) 52%, rgba(15, 23, 42, 0.98))'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(45, 212, 191, 0.18), transparent 42%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.18), transparent 38%)' }} />
            <motion.div variants={monogramVariants} initial="hidden" animate="show" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '32px' }}>
              <div style={{ position: 'absolute', inset: 'auto 12% 18% 12%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.02em', fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.08em' }}>
                <motion.span custom={-1} variants={letterVariants} style={{ fontSize: 'clamp(4.5rem, 15vw, 10rem)', background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 38%, #22d3ee 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', textShadow: '0 12px 40px rgba(0,0,0,0.35)' }}>S</motion.span>
                <motion.span custom={1} variants={letterVariants} style={{ fontSize: 'clamp(4.5rem, 15vw, 10rem)', background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 38%, #a78bfa 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', textShadow: '0 12px 40px rgba(0,0,0,0.35)' }}>M</motion.span>
              </div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} style={{ marginTop: '18px', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '90%', marginInline: 'auto' }}>
                Engineering intuitive digital solutions.
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={containerVariants} className="about-text">
            <motion.span variants={itemVariants} className="hero-badge">About Me</motion.span>
            <motion.h1 variants={itemVariants} className="section-title" style={{ marginBottom: '16px', lineHeight: 1.2 }}>
              Engineer, <span className="gradient-text">Builder</span>, Lifelong Learner.
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              I&apos;m <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Shanaya Mahendran</span>, an undergraduate in Information Technology
              with a passion for <span style={{ color: 'var(--accent)' }}>full-stack development</span> and open source.
              I love turning complex problems into elegant, scalable solutions.
            </motion.p>
            <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Currently going to work with <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Winter of Social Codes</span> and building fast, modern web apps with React, TypeScript, and Next.js.
              I believe in open source and continuous growth.
            </motion.p>
            <motion.div variants={itemVariants} style={{ marginTop: '24px' }}>
              <a href="https://drive.google.com/file/d/1WZtPDE8b1zp3TgfEwFHhCfIf8MA2Fv7K/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Download size={18} /> Download CV
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: '80px' }}>
          <h2 className="section-title">My <span className="gradient-text">Experience</span></h2>
          <p className="section-subtitle">Roles and the path I&apos;ve travelled.</p>
        </motion.div>

        <div className="timeline-wrapper" style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px dashed var(--border-color)', marginTop: '40px' }}>
          {experiences.length === 0 ? (
            <div style={{ marginLeft: '16px', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No experience records found.
            </div>
          ) : (
            experiences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }} transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-panel"
                style={{ marginBottom: '32px', padding: '24px 32px', position: 'relative', marginLeft: '16px' }}
              >
                <div style={{ position: 'absolute', left: '-49px', top: '32px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)' }}></div>
                <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>{item.date}</div>
                <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '12px' }}>{item.title}</h4>
                {item.descriptions.map((desc, descIndex) => (
                  <p key={descIndex} style={{ color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.6 }}>{desc}</p>
                ))}
              </motion.div>
            ))
          )}
        </div>

        {/* Values */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h2 className="section-title">Values & <span className="gradient-text">Philosophy</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {VALUES.map((v, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }} whileHover={{ y: -5 }} className="glass-panel" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', color: 'var(--accent)' }}>
                <v.icon size={40} strokeWidth={1.8} />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{v.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Interests */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h2 className="section-title">Beyond <span className="gradient-text">Code</span></h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>When I&apos;m not building software, I&apos;m exploring the world.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--accent)' }}><BookOpen size={32} /></span>
            <div><h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Reading</h4><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tech, sci-fi, philosophy</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--accent)', fontSize: '32px', lineHeight: 1 }}>🎹</span>
            <div><h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Music</h4><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Piano and production</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--accent)', fontSize: '32px', lineHeight: 1 }}>🥋</span>
            <div><h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Karate</h4><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Every morning</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--accent)' }}><Sprout size={32} /></span>
            <div><h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Gardening</h4><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Growing fresh herbs</p></div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
