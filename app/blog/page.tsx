// 'use client'
// 
// import React, { useState, useEffect } from 'react'
// 
// 
// const DATA = {
//   blogPosts: [
//     { id: 'blog-1', title: 'Building My First Full-Stack App with React and Node.js', date: 'May 15, 2026', readTime: '4 min read', excerpt: 'A deep dive into building a full-stack application from scratch, including API design, database integration, and deployment.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&auto=format', category: 'JavaScript' },
//     { id: 'blog-2', title: 'Open Source: My Journey to 43 PRs', date: 'April 28, 2026', readTime: '3 min read', excerpt: 'Reflections on contributing to open source, the lessons learned, and how it shaped my development skills.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&auto=format', category: 'Open Source' },
//     { id: 'blog-3', title: 'Mastering Dark Mode with CSS Custom Properties', date: 'April 10, 2026', readTime: '5 min read', excerpt: 'A practical guide to implementing a robust dark/light theme system using CSS custom properties and localStorage.', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop&auto=format', category: 'CSS' },
//     { id: 'blog-4', title: 'From Intern to Open Source Contributor', date: 'March 22, 2026', readTime: '3 min read', excerpt: 'How my internship at Sri Lanka Institute of Architects paved the way for my open source journey.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&auto=format', category: 'Career' }
//   ]
// }
// 
// export default function BlogPage() {
//   const [search, setSearch] = useState('')
//   const [modalData, setModalData] = useState<typeof DATA.blogPosts[0] | null>(null)
//   const [subscribing, setSubscribing] = useState(false)
// 
//   const filteredPosts = DATA.blogPosts.filter(p => 
//     p.title.toLowerCase().includes(search.toLowerCase()) || 
//     p.excerpt.toLowerCase().includes(search.toLowerCase())
//   )
// 
//   const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const formData = new FormData(e.currentTarget)
//     const email = formData.get('email') as string
//     setSubscribing(true)
//     try {
//       const res = await fetch('/api/subscribe', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       })
//       const result = await res.json()
//       
//       const tc = document.getElementById('toastContainer')
//       if (tc) {
//         const t = document.createElement('div')
//         t.className = `toast ${res.ok ? 'success' : 'error'}`
//         t.textContent = result.message || 'Subscribed successfully!'
//         tc.appendChild(t)
//         setTimeout(() => t.classList.add('show'), 100)
//         setTimeout(() => { t.classList.remove('show'); setTimeout(() => tc.removeChild(t), 400) }, 3000)
//       }
//       if (res.ok) {
//         (e.target as HTMLFormElement).reset()
//       }
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setSubscribing(false)
//     }
//   }
// 
//   return (
//     <>
//       <section className="section-padding" style={{ paddingTop: '120px' }}>
//         <div className="container">
//           <h2 className="section-title">Thoughts, Tutorials &amp; <span className="accent-text">Learnings</span></h2>
//           <p className="section-subtitle">Writing about code, startups, and the journey.</p>
// 
//           <div className="blog-search">
//             <input 
//               type="text" 
//               placeholder="Search articles..." 
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               aria-label="Search blog posts"
//             />
//           </div>
// 
//           <div className="blog-grid">
//             {filteredPosts.map(p => (
//               <div className="blog-card" key={p.id} onClick={() => setModalData(p)}>
//                 <div className="thumb"><img src={p.image} alt={p.title} loading="lazy" /></div>
//                 <div className="info">
//                     <span className="date">{p.date} · {p.readTime}</span>
//                     <h3>{p.title}</h3>
//                     <p>{p.excerpt}</p>
//                     <span className="read-more">Read More →</span>
//                 </div>
//               </div>
//             ))}
//           </div>
// 
//           {/* Newsletter CTA */}
//           <div style={{ marginTop: '60px', padding: '40px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
//             <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>📬 Stay in the Loop</h3>
//             <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '8px auto 16px' }}>Get notified when I publish new articles.</p>
//             <form onSubmit={handleSubscribe} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '440px', margin: '0 auto' }}>
//               <input type="email" name="email" placeholder="Your email" required style={{ flex: 1, minWidth: '180px', padding: '10px 18px', borderRadius: '50px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', outline: 'none' }} />
//               <button type="submit" className="btn btn-primary" disabled={subscribing}>
//                 {subscribing ? '⏳ Subscribing...' : 'Subscribe'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
// 
//       {/* MODAL */}
//       <div className={`modal-overlay ${modalData ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setModalData(null) }}>
//         <div className="modal-content">
//           <button className="modal-close" onClick={() => setModalData(null)}>✕</button>
//           
//           {modalData && (
//             <div id="modalBody">
//               <div className="thumb"><img src={modalData.image} alt={modalData.title} /></div>
//               <h2>{modalData.title}</h2>
//               <div className="meta">Blog · {modalData.category} · {modalData.readTime}</div>
//               <p className="desc">{modalData.excerpt} (Full article coming soon.)</p>
//               <div className="links">
//                   <span className="btn btn-primary" style={{ cursor: 'default' }}>📝 Read Full Article</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

export default function BlogPage() { return null; }
