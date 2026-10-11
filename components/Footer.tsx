'use client'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <div className="footer">
      <div className="container">
        © 2026 Shanaya Mahendran · Built with <span className="accent">❤️</span>
      </div>
    </div>
  )
}
