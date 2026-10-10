'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Download, BookOpen, Music, Activity, Sprout, Zap, Globe2, HeartHandshake, TrendingUp } from 'lucide-react'

const DATA = {
  timeline: [
    {
      date: 'Oct 2026 – Present',
      title: 'Backend Engineering Intern | DevConnect',
      descriptions: [
        'Currently applying a rigorous, assessment-based backend engineering foundation in a real-world production environment at DevConnect. I bring a deep understanding of the full backend lifecycle—from API design and database integrity to security, reliability, and deployment—to build secure, scalable, and production-ready server-side applications.',
        '• API Architecture & Design: Designing RESTful APIs with proper resource modeling, HTTP semantics, and status codes. Implementing robust boundary validation, multi-audience error handling, and idempotency to prevent duplicate operations.',
        '• Security & Authentication: Implementing secure authentication (sessions vs. tokens), authorization checks, password hashing (and breach mitigation strategies), rate limiting, and abuse prevention.',
        '• Database Engineering & Data Integrity: Designing relational schemas, writing performant SQL, and solving N+1 query problems using indexes. Managing atomic transactions, concurrency issues (lost updates, check-then-act traps), and cursor-based pagination.',
        '• System Reliability & Performance: Implementing caching strategies (handling invalidation and thundering herds), background job queues, and structured logging/metrics for observability.',
        '• DevOps & Deployment: Managing environment configurations, secrets, safe schema migrations (expand-migrate-contract), and deploying consistent builds across environments.',
        '• Professional Practices: Conducting peer code reviews, writing developer-friendly documentation, and contributing to a collaborative engineering team.'
      ]
    },
    {
      date: 'Oct 2026 – Present',
      title: 'Frontend Engineering Intern | DevConnect',
      descriptions: [
        'Currently applying a rigorous, assessment-based frontend engineering foundation in a real-world production environment at DevConnect. I bring a deep understanding of the full frontend lifecycle—from semantic document structure and responsive layout design to state management, API integration, and deployment—to build accessible, performant, and production-ready user interfaces.',
        '• Modern Layout & Architecture: Implementing semantic HTML and advanced CSS (Flexbox, Grid, positioning) to build responsive, cross-device layouts.',
        '• TypeScript at the Boundary: Applying TypeScript where it adds value, enforcing types at API boundaries, and avoiding the pitfalls of any.',
        '• Accessibility & UX: Building layouts that work for everyone, including keyboard navigation, focus indicators, and responsive behavior. Writing forms with proper labels, validation, and helpful error messages.',
        '• State Management & API Integration: Distinguishing and handling the three core states (loading, error, empty). Managing API failure, implementing retries, and preventing race conditions.',
        '• React & JavaScript Fundamentals: Optimizing React re-renders (keys, dependency arrays, effects) and mastering JavaScript semantics (closures, array mutations, equality checks) to write bug-free code.',
        '• Testing & Team Workflows: Writing meaningful tests with solid assertions, conducting pull requests and peer reviews, and building a verifiable GitHub contribution history.',
        '• Deployment & DevOps: Managing environment variables, preventing secrets from reaching the browser, and ensuring deployments survive build vs. runtime differences.'
      ]
    },
    {
      date: 'May 2026 - Present',
      title: 'Open Source Contributor — Social Summer of Code 2026',
      descriptions: [
        '43 merged PRs (Counted) I\'m actively contributing to AnthropicBots/ptet-web as a Collaborator, a vibrant open-source project focused on building intelligent, scalable solutions.',
        'My contributions span backend APIs, full-stack features, and UI enhancements. I\'ve worked on authentication systems, database optimization, and interactive frontend components that improve user experience.'
      ]
    },
    {
      date: 'March 2026 - April 2026',
      title: 'Full Stack Development Intern',
      descriptions: [
        'Completed an immersive 2-month internship focused on the MERN Stack: MongoDB for databases, Express.js for backend APIs, React for frontend interfaces, and Node.js for server-side logic.',
        'Built several full-featured projects covering everything from state management to responsive design and API integration.'
      ]
    },
    {
      date: 'May 2025 - Jan 2026',
      title: 'Intern — Sri Lanka Institute of Architects',
      descriptions: [
        'Designed and developed a comprehensive SQLite database system to manage records for 700+ members of the institute.',
        'Processed member updates, maintained data integrity, and coordinated communications between Members and departments.'
      ]
    }
  ],
  values: [
    { icon: Zap, title: 'Move Fast, Stay Stable', desc: 'Iterate quickly without compromising quality.' },
    { icon: Globe2, title: 'Open Source First', desc: 'Believe in the power of community-driven development.' },
    { icon: HeartHandshake, title: 'User-Centric', desc: 'Build products that people actually love to use.' },
    { icon: TrendingUp, title: 'Continuous Growth', desc: 'Always learning, always improving.' }
  ]
}

export default function AboutPage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const monogramVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.12,
        delayChildren: 0.12
      }
    }
  }

  const letterVariants = {
    hidden: (direction: number) => ({ opacity: 0, y: 26, x: 0, rotate: direction === -1 ? -18 : 18, filter: 'blur(6px)' }),
    show: (direction: number) => ({
      opacity: 1,
      y: 0,
      x: direction * 14,
      rotate: direction * 3,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    })
  }

  return (
    <section className="section-padding" style={{ paddingTop: '120px' }}>
      <div className="container">

        {/* About Hero */}
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="about-image"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              minWidth: 0,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              minHeight: '320px',
              background: 'linear-gradient(145deg, rgba(12, 18, 24, 0.96), rgba(17, 24, 39, 0.92) 52%, rgba(15, 23, 42, 0.98))'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at top left, rgba(45, 212, 191, 0.18), transparent 42%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.18), transparent 38%)'
              }}
            />
            <motion.div
              variants={monogramVariants}
              initial="hidden"
              animate="show"
              style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '32px' }}
            >
              <div style={{ position: 'absolute', inset: 'auto 12% 18% 12%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.02em', fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.08em' }}>
                <motion.span
                  custom={-1}
                  variants={letterVariants}
                  style={{
                    fontSize: 'clamp(4.5rem, 15vw, 10rem)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 38%, #22d3ee 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 12px 40px rgba(0,0,0,0.35)'
                  }}
                >
                  S
                </motion.span>
                <motion.span
                  custom={1}
                  variants={letterVariants}
                  style={{
                    fontSize: 'clamp(4.5rem, 15vw, 10rem)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 38%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 12px 40px rgba(0,0,0,0.35)'
                  }}
                >
                  M
                </motion.span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                style={{
                  marginTop: '18px',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.72)',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  maxWidth: '90%',
                  marginInline: 'auto'
                }}
              >
                Engineering intuitive digital solutions.
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="about-text"
          >
            <motion.span variants={itemVariants} className="hero-badge">About Me</motion.span>
            <motion.h1 variants={itemVariants} className="section-title" style={{ marginBottom: '16px', lineHeight: 1.2 }}>
              Engineer, <span className="gradient-text">Builder</span>, Lifelong Learner.
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              I'm <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Shanaya Mahendran</span>, an undergraduate in Information Technology
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

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: '80px' }}>
          <h2 className="section-title">My <span className="gradient-text">Experience</span></h2>
          <p className="section-subtitle">Roles and the path I've travelled.</p>
        </motion.div>

        <div className="timeline-wrapper" style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px dashed var(--border-color)', marginTop: '40px' }}>
          {DATA.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
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
          ))}
        </div>

        {/* Values */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h2 className="section-title">Values &amp; <span className="gradient-text">Philosophy</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {DATA.values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass-panel"
              style={{ padding: '32px 24px', textAlign: 'center' }}
            >
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
          <p className="section-subtitle" style={{ marginBottom: 0 }}>When I'm not building software, I'm exploring the world.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--accent)' }}><BookOpen size={32} /></span>
            <div><h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Reading</h4><p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tech, sci-fi, philosophy</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--accent)' }}><Music size={32} /></span>
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
