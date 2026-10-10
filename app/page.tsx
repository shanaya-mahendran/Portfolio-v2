'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Code, X, Flame, Rocket, Sparkles, GraduationCap, ChevronDown } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'

const DATA = {
  projects: [
    {
      id: 'smart-school',
      title: 'Smart School Management System (SSMS)',
      status: 'Under Progress',
      description: 'Enterprise-grade, multi-role School Management System built with Next.js 14, Prisma ORM, Supabase PostgreSQL, and Tailwind CSS.',
      category: 'fullstack',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
      image: '/images/Smart-School.png',
      link: '#',
      github: 'https://github.com/shanaya-mahendran/Smart-School',
      detail: 'Enterprise-grade, multi-role School Management System built with Next.js 14, Prisma ORM, Supabase PostgreSQL, and Tailwind CSS. Features 4 dedicated role-based portals (Admin, Teacher, Student, Parent), real-time timetable subscriptions, client-side PDF document generation (@react-pdf/renderer), and subject-scoped access control.'
    },
    {
      id: 'web-portfolio',
      title: 'Personal Web Portfolio 🚀',
      description: 'Modern, high-performance personal portfolio built with Next.js App Router, React, TypeScript, and Prisma.',
      category: 'fullstack',
      tags: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Framer Motion', 'Vanilla CSS'],
      image: '/images/Portfolio.png',
      link: 'https://shanaya-paul.vercel.app/',
      github: 'https://github.com/shanaya-mahendran/Portfolio',
      detail: 'Modern, high-performance personal portfolio built with Next.js (App Router), React, and TypeScript. Features Framer Motion page transitions, an interactive HTML5 Canvas hero particle networking simulation, a glassmorphism dark/light theme engine, Prisma database schema integration, and perfect 100 Lighthouse performance scores.'
    },
    {
      id: 'sara',
      title: 'Sara — Modern E-Commerce Platform',
      status: 'Under Progress',
      description: 'Full-stack e-commerce platform with FastAPI + PostgreSQL backend, Docker deployment, and vanilla JS frontend.',
      category: 'fullstack',
      tags: ['FastAPI', 'PostgreSQL', 'JavaScript', 'Docker', 'Vite', 'Vitest'],
      image: '/images/Sara.png',
      link: 'https://sara-001.vercel.app/',
      github: 'https://github.com/shanaya-mahendran/Sara',
      detail: 'Full-stack e-commerce platform featuring 32 real products, 4-column responsive grid, JWT auth, AI visual similarity search (FAISS + Transformers), real-time shared cart via WebSockets, multi-step checkout, PWA support, and 117 test files (988 unit tests) with Vitest.'
    },
    {
      id: 'cabXpert',
      title: 'CabXpert — Vehicle Reservation System',
      description: 'Online vehicle reservation system automating bookings, driver & car management, and billing.',
      category: 'fullstack',
      tags: ['Java EE', 'Jersey (JAX-RS)', 'MySQL', 'JDBC', 'Maven', 'Bootstrap'],
      image: '/images/CarXpert.png',
      link: '#',
      github: 'https://github.com/Shanaya-Mahendran',
      detail: 'Automated vehicle reservation system built for Mega City Cab using Java RESTful Web Services (Jersey) and Test-Driven Development (TDD). Ensures high reliability, scalability, driver & car scheduling, and automated billing management.'
    },
    {
      id: 'elegant-notes',
      title: 'Elegant Notes — PWA',
      description: 'Offline-first note-taking PWA with real-time cloud sync and premium editor.',
      category: 'web',
      tags: ['React', 'TypeScript', 'Supabase', 'Tiptap', 'Zustand'],
      image: '/images/Elegant-Notes.webp',
      link: 'https://elegant-notes-demo.vercel.app/',
      github: 'https://github.com/shanaya-mahendran/elegant-notes',
      detail: 'High-performance offline-first PWA with Service Workers, Supabase for real-time cloud sync, secure authentication, and a premium Tiptap editor with complex formatting.'
    },
    {
      id: 'ssoc-2026',
      title: 'PTET Web',
      description: '43 merged PRs — backend APIs, full-stack features, and UI enhancements.',
      category: 'opensource',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Social Summer of Code 2026', 'Collaborator'],
      image: '/images/ptet.png',
      link: 'https://github.com/AnthropicBots/ptet-web',
      github: 'https://github.com/AnthropicBots/ptet-web/pulls?q=is%3Apr+author%3Ashanaya-mahendran',
      detail: 'Open-source contributor with 43+ merged pull requests. Built backend APIs (Daily Tip, Study Materials CRUD, Recommendations, Bookmark), implemented full-stack features, and fixed dark/light theme support across the application.'
    },
    {
      id: 'my-educational',
      title: 'My Educational Website',
      description: 'Clean single-page portfolio built with pure HTML, CSS, and JavaScript.',
      category: 'web',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
      image: '/images/iaii.png',
      link: 'https://my-web-project-iaii.vercel.app/',
      github: 'https://github.com/shanaya-mahendran/my-web-project-iaii',
      detail: 'A clean, single-page static portfolio website built with pure HTML to showcase projects and academic work. Deployed on Vercel with a streamlined workflow.'
    }
  ],
  testimonials: [
    {
      quote: 'Shanaya is a dedicated and fast-learning developer. Her contributions to our open source project were outstanding.',
      author: 'Social Summer of Code Mentor',
      role: 'Open Source Lead'
    },
    {
      quote: 'Shanaya\'s ability to handle both frontend and backend tasks with equal proficiency is impressive. She\'s a true full-stack developer.',
      author: 'Project Collaborator',
      role: 'Senior Developer'
    },
    {
      quote: 'Working with Shanaya on the database project was a breeze. Her attention to detail and organization skills are top-notch.',
      author: 'SLIA Team Member',
      role: 'Operations Manager'
    }
  ]
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typingText, setTypingText] = useState('')
  const [modalData, setModalData] = useState<typeof DATA.projects[0] | null>(null)
  const [testimonalIndex, setTestimonialIndex] = useState(0)
  const [projectsList, setProjectsList] = useState(DATA.projects)

  // Hydrate published projects from DB
  useEffect(() => {
    fetch('/api/projects/public')
      .then(res => res.json())
      .then(data => {
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          const featured = data.projects.filter((p: any) => p.isFeatured).map((p: any) => {
            let tagsArr = []
            try { tagsArr = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags } catch { tagsArr = [p.category] }
            return {
              id: p.slug,
              title: p.title,
              description: p.description,
              category: p.category,
              tags: Array.isArray(tagsArr) ? tagsArr : [p.category],
              image: p.image,
              link: p.link || '#',
              github: p.github || '#',
              detail: p.detail,
              status: p.status === 'PUBLISHED' ? undefined : p.status
            }
          })
          if (featured.length > 0) setProjectsList(featured)
        }
      })
      .catch(() => {})
  }, [])

  // Testimonials Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % DATA.testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width: number, height: number
    const particles: Particle[] = []

    let accentRgb = '181, 136, 211'
    const updateAccent = () => {
      accentRgb = document.documentElement.getAttribute('data-theme') === 'light' 
        ? '122, 60, 163' 
        : '181, 136, 211'
    }
    updateAccent()
    const themeObserver = new MutationObserver(updateAccent)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let canvasRect = canvas.getBoundingClientRect()
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        width = canvas.width = rect.width
        height = canvas.height = rect.height
        canvasRect = canvas.getBoundingClientRect()
      }
    }

    class Particle {
      x: number = 0; y: number = 0; vx: number = 0; vy: number = 0; radius: number = 0;
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.6
        this.vy = (Math.random() - 0.5) * 0.6
        this.radius = Math.random() * 2 + 1.5
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }
      draw(mx: number, my: number) {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        const alpha = 0.5 + 0.3 * Math.sin(Date.now() / 2000 + this.x)
        ctx!.fillStyle = `rgba(${accentRgb}, ${alpha})`
        ctx!.fill()
      }
    }

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < 80; i++) particles.push(new Particle())
    }

    let mouseX = -1000, mouseY = -1000
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach(p => {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80 && dist > 0) {
          const force = 1.2 / (dist + 1)
          p.x += dx * force
          p.y += dy * force
        }

        p.update()
        p.draw(mouseX, mouseY)
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const alpha = 1 - (dist / 120)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha * 0.3})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - canvasRect.left
      mouseY = e.clientY - canvasRect.top
    }

    resize()
    initParticles()
    animate()

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000 })
    window.addEventListener('resize', () => { resize(); initParticles() })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      themeObserver.disconnect()
    }
  }, [])

  // Typing Effect
  useEffect(() => {
    const phrases = [
      "Hi, I'm Shanaya Mahendran.",
      'Full-Stack Developer.',
      'Tech Enthusiast.',
      'Open Source Contributor.'
    ]

    let active = true
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let timeoutId: number | null = null

    const tick = () => {
      if (!active) return

      const phrase = phrases[phraseIndex]
      const nextText = deleting
        ? phrase.slice(0, Math.max(0, charIndex - 1))
        : phrase.slice(0, Math.min(phrase.length, charIndex + 1))

      setTypingText(nextText)
      charIndex = deleting ? charIndex - 1 : charIndex + 1

      let delay = deleting ? 48 : 72

      if (!deleting && charIndex >= phrase.length) {
        deleting = true
        delay = 1700
      } else if (deleting && charIndex <= 0) {
        deleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        delay = 350
      }

      timeoutId = window.setTimeout(tick, delay) as unknown as number
    }

    tick()

    return () => {
      active = false
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <>
      <section id="hero" style={{ position: 'relative' }}>
        <canvas id="hero-canvas" ref={canvasRef}></canvas>
        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="hero-content">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="hero-badge"
            >
              ✦ Open Source Contributor
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-title"
            >
              <span className="typing-shell">
                <span className="typing" aria-label={typingText}>{typingText}</span>
                <span className="typing-cursor" aria-hidden="true">|</span>
              </span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-sub" style={{ animation: 'none', opacity: 1 }}
            >
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Full-Stack Developer | Tech Enthusiast | Changemaker
              </p>
              <p style={{ marginBottom: '12px' }}>
                Building products that make a difference. One line of code at a time.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                I believe the best technology is the one that serves people, not the other way around. Let's create something that matters.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero-actions" style={{ animation: 'none', opacity: 1 }}
            >
              <Link href="/projects" className="btn btn-primary">View My Work</Link>
              <Link href="/contact" className="btn btn-outline">Let's Talk</Link>
            </motion.div>
          </div>
        </div>
        <div className="scroll-down" aria-hidden="true" onClick={() => window.scrollTo(0, window.innerHeight)}><ChevronDown /></div>
      </section>

      <div className="container">
        {/* STATS */}
        <motion.div 
          className="stats-bar glass" 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: '-50px' }}
          style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', margin: '40px 0 80px', padding: '40px 24px' }}
        >
          <motion.div variants={itemVariants} className="stat-item">
            <div className="stat-icon" style={{ color: 'var(--accent)' }}><Flame size={28} strokeWidth={2.1} /></div>
            <AnimatedCounter target={1} className="stat-number gradient-text" />
            <div className="stat-label">Years Experience</div>
          </motion.div>
          <motion.div variants={itemVariants} className="stat-item">
            <div className="stat-icon" style={{ color: 'var(--accent)' }}><Rocket size={28} strokeWidth={2.1} /></div>
            <AnimatedCounter target={6} className="stat-number gradient-text" />
            <div className="stat-label">Projects Launched</div>
          </motion.div>
          <motion.div variants={itemVariants} className="stat-item">
            <div className="stat-icon" style={{ color: 'var(--accent)' }}><Sparkles size={28} strokeWidth={2.1} /></div>
            <AnimatedCounter target={43} className="stat-number gradient-text" />
            <div className="stat-label">Open Source PRs</div>
          </motion.div>
          <motion.div variants={itemVariants} className="stat-item">
            <div className="stat-icon" style={{ color: 'var(--accent)' }}><GraduationCap size={28} strokeWidth={2.1} /></div>
            <AnimatedCounter target={2} className="stat-number gradient-text" />
            <div className="stat-label">Degrees in Progress</div>
          </motion.div>
        </motion.div>

        {/* PROJECTS */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">A selection of work I'm proud of — from full-stack apps to open source contributions.</p>
        </motion.div>
        
        <div className="carousel-wrap infinite-scroll-wrapper" id="featuredCarousel" style={{ paddingBottom: '32px', width: '100%' }}>
          <div className="infinite-scroll-container">
            {projectsList.map((p, index) => (
              <motion.div 
                key={`${p.id}-${index}`} 
                whileHover={{ y: -8 }}
                className="project-card glass-panel" 
                onClick={() => setModalData(p)}
                style={{ overflow: 'hidden', minWidth: '320px', flexShrink: 0, cursor: 'pointer' }}
              >
                <div className="thumb" style={{ position: 'relative' }}>
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                  {p.status && (
                    <span style={{
                      position: 'absolute', top: 12, right: 12, zIndex: 2,
                      padding: '4px 12px', borderRadius: '20px',
                      fontSize: '0.72rem', fontWeight: 700,
                      background: 'rgba(14, 7, 19, 0.85)', color: 'var(--accent)',
                      backdropFilter: 'blur(8px)', border: '1px solid rgba(181, 136, 211, 0.35)',
                      letterSpacing: '0.5px'
                    }}>
                      ⏳ {p.status}
                    </span>
                  )}
                </div>
                <div className="card-body">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                </div>
                <div className="overlay"><span>View Case Study</span></div>
              </motion.div>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll-left-to-right {
            0% { transform: translateX(calc(-50% - 12px)); }
            100% { transform: translateX(0); }
          }
          .infinite-scroll-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
          .infinite-scroll-container {
            display: flex;
            gap: 24px;
            width: max-content;
            animation: scroll-left-to-right 30s linear infinite;
          }
          .infinite-scroll-wrapper:hover .infinite-scroll-container,
          .infinite-scroll-wrapper:active .infinite-scroll-container {
            animation-play-state: paused;
          }
          @media (max-width: 768px) {
            .infinite-scroll-container {
               animation: none;
            }
          }
        `}} />

        {/* TESTIMONIALS */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginTop: '40px' }}>
          <h2 className="section-title">Kind <span className="gradient-text">Words</span></h2>
          <p className="section-subtitle">What collaborators and mentors say about working with me.</p>
        </motion.div>
        
        <div id="testimonialContainer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '260px', overflow: 'hidden', position: 'relative', background: 'var(--bg-surface-light)', borderRadius: 'var(--radius-lg)', padding: '48px 24px' }} className="glass-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonalIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="testimonial-slide"
              style={{ padding: 0, width: '100%', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
            >
              <div className="quote" style={{ animation: 'none', fontSize: '3rem', lineHeight: 1, margin: '0 0 12px 0' }}>“</div>
              <blockquote style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '24px' }}>{DATA.testimonials[testimonalIndex].quote}</blockquote>
              <div className="author" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>— {DATA.testimonials[testimonalIndex].author}</div>
              <div className="role" style={{ color: 'var(--accent)', fontSize: '0.9rem', marginTop: '4px' }}>{DATA.testimonials[testimonalIndex].role}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
          className="glass-panel"
          style={{ marginTop: '80px', padding: '56px 32px', textAlign: 'center' }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Explore More <span className="gradient-text">About Me</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '16px auto 32px', fontSize: '1.1rem' }}>Learn about my journey, skills, and the projects I've built.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Link href="/about" className="btn btn-primary">About Me</Link>
            <Link href="/projects" className="btn btn-outline">All Projects</Link>
            <Link href="/skills" className="btn btn-outline">Tech Stack</Link>
          </div>
        </motion.div>
      </div>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {modalData && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="modal-overlay open" 
            onClick={(e) => { if (e.target === e.currentTarget) setModalData(null) }}
            style={{ backdropFilter: 'blur(12px)', visibility: 'visible', opacity: 1 }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="modal-content glass" 
              style={{ transform: 'none', position: 'relative' }}
            >
              <button 
                onClick={() => setModalData(null)}
                aria-label="Close modal"
                style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', color: 'var(--text-primary)', zIndex: 10 }}
              >
                <X size={20} />
              </button>
              
              <div id="modalBody">
                <div className="thumb" style={{ position: 'relative', height: '280px', marginBottom: '24px' }}><Image src={modalData.image} alt={modalData.title} fill sizes="100vw" style={{ objectFit: 'cover' }} /></div>
                <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{modalData.title}</h2>
                <div className="meta" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--accent)', fontWeight: 600 }}>{modalData.category}</span>
                </div>
                <p className="desc" style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{modalData.detail || modalData.description}</p>
                
                <h4 style={{ marginTop: '24px', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>Technologies Used</h4>
                <div className="tech-list" style={{ marginBottom: '32px' }}>
                  {modalData.tags.map(t => <span key={t} style={{ background: 'rgba(45, 212, 191, 0.1)', color: 'var(--accent)', borderColor: 'rgba(45, 212, 191, 0.2)' }}>{t}</span>)}
                </div>
                
                <div className="links" style={{ display: 'flex', gap: '16px' }}>
                  {modalData.link && modalData.link !== '#' && (
                    <a href={modalData.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                      <ExternalLink size={18} /> Live Site
                    </a>
                  )}
                  {modalData.github && modalData.github !== '#' && (
                    <a href={modalData.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                      <Code size={18} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
