'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/education', label: 'Education' },
    { href: '/projects', label: 'Projects' },
    { href: '/arena', label: 'The Arena' },
    { href: '/skills', label: 'Skills' },
    // { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  const closeMobile = () => {
    setIsMobileOpen(false)
    document.body.style.overflow = ''
  }

  const openMobile = () => {
    setIsMobileOpen(true)
    document.body.style.overflow = 'hidden'
  }
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`} id="navbar" style={{ padding: isScrolled ? '12px 0' : '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" className="nav-logo" onClick={closeMobile} style={{ fontSize: '1.5rem', fontWeight: 700, zIndex: 1001 }}>
            Shanaya<span className="accent-text">.</span>
          </Link>
          
          {/* Desktop Nav */}
          <ul className="nav-links desktop-only" style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0 }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href} style={{ position: 'relative' }}>
                  <Link
                    href={link.href}
                    style={{
                      padding: '8px 12px',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'color 0.2s ease',
                      display: 'block'
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: '10%',
                          right: '10%',
                          height: 2,
                          background: 'var(--accent)',
                          borderRadius: 4,
                          boxShadow: '0 0 10px var(--accent-glow-strong)'
                        }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
          
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1001 }}>
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid var(--border-color)', 
                padding: '8px', 
                borderRadius: '50%',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
            <button 
              className="mobile-only"
              onClick={() => isMobileOpen ? closeMobile() : openMobile()}
              aria-expanded={isMobileOpen}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '8px' }}
            >
              {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', 
              backdropFilter: 'blur(4px)', zIndex: 999
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass-panel"
            style={{ 
              position: 'fixed', top: 0, right: 0, bottom: 0, 
              width: '80%', maxWidth: '300px', zIndex: 1000, 
              display: 'flex', flexDirection: 'column', 
              padding: '80px 32px', gap: '12px',
              borderLeft: '1px solid var(--border-color)',
              background: 'var(--bg-surface)'
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link 
                  href={link.href}
                  onClick={closeMobile}
                  style={{ 
                    display: 'block', padding: '12px 0', fontSize: '1.2rem', 
                    color: pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: pathname === link.href ? 600 : 500,
                    borderBottom: '1px solid var(--border-color)',
                    textDecoration: 'none'
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
