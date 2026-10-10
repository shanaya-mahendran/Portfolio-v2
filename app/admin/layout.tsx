import React from 'react'
import Link from 'next/link'
import { getAuthenticatedAdmin } from '@/lib/auth'
import AdminNav from './AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getAuthenticatedAdmin()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {admin && <AdminNav adminName={admin.name} />}
      <main style={{ padding: admin ? '24px 0 60px' : '0' }}>
        {children}
      </main>
    </div>
  )
}
