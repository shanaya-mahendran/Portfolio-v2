'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FolderGit2,
  Trophy,
  Cpu,
  Briefcase,
  GraduationCap,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react'

export default function AdminNav({ adminName }: { adminName: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
      if (current) setTheme(current)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (e) {
      console.error('Logout error:', e)
    }
  }

  const tabs = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
    { href: '/admin/arena', label: 'The Arena', icon: Trophy },
    { href: '/admin/skills', label: 'Skills', icon: Cpu },
    { href: '/admin/experience', label: 'Experience', icon: Briefcase },
    { href: '/admin/education', label: 'Education', icon: GraduationCap },
    { href: '/admin/media', label: 'Media', icon: ImageIcon },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  // Don't render nav on login page
  if (pathname === '/admin/login') return null

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: '0 2px 10px var(--shadow-color)',
      transition: 'background var(--transition-speed) ease, border-color var(--transition-speed) ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/admin" style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textDecoration: 'none'
          }}>
            CMS <span className="gradient-text">2.0</span>
          </Link>
          <span style={{
            fontSize: '0.75rem',
            padding: '3px 10px',
            borderRadius: '12px',
            background: 'var(--accent-glow)',
            color: 'var(--accent)',
            fontWeight: 600,
            border: '1px solid var(--border-color)'
          }}>
            Admin: {adminName}
          </span>
        </div>

        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          maxWidth: '100%',
          paddingBottom: '2px'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-glow)' : 'transparent',
                  border: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </Link>
            )
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light or dark theme"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link
            href="/"
            target="_blank"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius)',
              fontSize: '0.82rem',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              textDecoration: 'none',
              background: 'var(--card-bg)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Live Site</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius)',
              fontSize: '0.82rem',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.08)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
