'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const DATA = {
  inProgressProjects: [
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
    }
  ],
  projects: [
    {
      id: 'smartpark',
      title: 'SmartPark | IEEE CS Sri Lanka R10 Summer School 2026',
      description: '3rd Place Winner — Trustworthy Smart Ecosystem Mini Ideathon. Predictive parking, fairness, and offline-first systems.',
      category: 'fullstack',
      tags: ['Smart Systems', 'IoT', 'Predictive Parking', 'IEEE CS R10', 'Offline-First'],
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&h=400&fit=crop&auto=format',
      link: '#',
      github: '#',
      detail: 'SmartPark is an intelligent parking platform developed during the IEEE Computer Society Region 10 Summer School 2026. Led team HungryBeast to 3rd place in the Trustworthy Smart Ecosystem Mini Ideathon. Architected with predictive parking algorithms, fairness-oriented spot allocation, and resilient offline-first systems.'
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
      id: 'slia-intern',
      title: 'SLIA Database Management',
      description: 'Built and maintained SQLite database for 700+ member practice registration.',
      category: 'fullstack',
      tags: ['SQLite', 'Data Management', 'Google Forms'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format',
      link: '#',
      github: '#',
      detail: 'Developed and maintained an SQLite database for member practice registration of 700+ members at Sri Lanka Institute of Architects. Processed member updates via Google Forms and coordinated communications.'
    },
    {
      id: 'day-01',
      title: 'Java Basics — Quiz Game',
      description: 'Multiple-choice questions, input validation, instant feedback, score tracking, answer summary.',
      category: 'learning',
      tags: ['Java', 'CLI', 'Input Validation'],
      image: '/images/Project01.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-01',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-01',
      detail: 'Built an interactive Java CLI quiz game featuring multiple-choice questions, input validation, real-time score tracking, instant answer feedback, and a comprehensive end-of-game performance summary.'
    },
    {
      id: 'day-02',
      title: 'Java — Library Management System',
      description: 'Add/borrow/return books, inventory tracking, input validation, exception handling, persistent session.',
      category: 'learning',
      tags: ['Java', 'HashMap', 'Data Structures', 'Exception Handling'],
      image: '/images/Project02.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-02',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-02',
      detail: 'Developed a robust Java console library management application utilizing HashMap for fast inventory lookups, supporting add/borrow/return workflows, stock tracking, and exception handling.'
    },
    {
      id: 'day-03',
      title: 'Java OOP — Student Management System',
      description: 'Add/update/view students, duplicate ID check, static data management, menu-driven interface.',
      category: 'learning',
      tags: ['Java', 'OOP', 'Encapsulation', 'Static Data'],
      image: '/images/Project03.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-03',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-03',
      detail: 'Demonstrated key object-oriented programming principles (encapsulation, abstraction) in Java by building a menu-driven student management system with duplicate ID validation and static data control.'
    },
    {
      id: 'day-04',
      title: 'Java — Stock Analysis (Arrays & ArrayLists)',
      description: 'Average price, maximum price, occurrence count, cumulative sum, both array and ArrayList implementations.',
      category: 'learning',
      tags: ['Java', 'ArrayList', 'Arrays', 'Data Structures'],
      image: '/images/Project04.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-04',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-04',
      detail: 'Implemented financial stock price analysis algorithms comparing fixed-size Java primitive arrays against dynamic ArrayLists, computing average price, max price, occurrence count, and cumulative totals.'
    },
    {
      id: 'day-05',
      title: 'Java — University Enrollment & Grade System',
      description: 'Add courses/students, enroll with capacity check, assign grades (0–100), overall average calculation.',
      category: 'learning',
      tags: ['Java', 'OOP', 'Data Validation', 'Collections'],
      image: '/images/Project05.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-05',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-05',
      detail: 'Created a multi-entity Java university enrollment system allowing student course registration with strict capacity enforcement, grade assignments (0-100), static counter tracking, and GPA calculations.'
    },
    {
      id: 'day-06',
      title: 'Java — Car Rental Agency System',
      description: 'Add cars/motorcycles/trucks, type-specific attributes (doors, wheels, cargo), robust input validation.',
      category: 'learning',
      tags: ['Java', 'Interfaces', 'Polymorphism', 'OOP'],
      image: '/images/Project06.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-06',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-06',
      detail: 'Built a polymorphic Java vehicle rental engine leveraging interfaces and class inheritance to manage diverse vehicle types (cars, motorcycles, trucks) with custom attributes and inventory reporting.'
    },
    {
      id: 'day-07',
      title: 'Java Swing GUI — Student Management System',
      description: 'Tabbed interface (students, enrollments, grades), CRUD operations, auto-generated IDs, grade scale 0.0–4.0.',
      category: 'learning',
      tags: ['Java', 'Java Swing', 'GUI', 'CRUD'],
      image: '/images/Project07.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-07',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-07',
      detail: 'Designed a tabbed Java Swing desktop application featuring full CRUD capabilities for student records, automated student ID generation, grade point average calculation (0.0-4.0), and dynamic table views.'
    },
    {
      id: 'day-08',
      title: 'Python — CLI & GUI Calculator Suite',
      description: 'Basic arithmetic, division/modulo by zero handling, Tkinter dark-theme GUI, button layout.',
      category: 'learning',
      tags: ['Python', 'Tkinter', 'GUI', 'CLI'],
      image: '/images/Project08.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-08',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-08',
      detail: 'Developed a dual-mode calculator in Python featuring both a CLI version and a sleek Tkinter dark-mode desktop GUI with division-by-zero protection and real-time expression evaluation.'
    },
    {
      id: 'day-09',
      title: 'Java Swing GUI — Library Management System',
      description: 'Add/delete/update books, borrow/return with quantity control, search/filter, persistent file storage.',
      category: 'learning',
      tags: ['Java', 'Java Swing', 'GUI', 'File I/O', 'Serialization'],
      image: '/images/Project09.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-09',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-09',
      detail: 'Created an advanced Java Swing library app with persistent object serialization, live text filtering by title/author, stock quantity control, timestamped transaction logs, and status bar feedback.'
    },
    {
      id: 'day-10',
      title: 'Java Swing GUI — Car Rental Agency System',
      description: 'Tabbed interface (add car/motorcycle/truck), type-specific attributes, polymorphic storage.',
      category: 'learning',
      tags: ['Java', 'Java Swing', 'Polymorphism', 'GUI'],
      image: '/images/Project10.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-10',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-10',
      detail: 'Constructed a graphical desktop interface for car rentals in Java Swing, utilizing polymorphic collection storage for cars, motorcycles, and trucks with custom form validation and instant refresh.'
    },
    {
      id: 'day-11',
      title: 'Python — TaskFlow Pro To-Do List',
      description: 'Modern dark/light mode UI, add/complete/delete tasks, persistent storage (tasks.txt), status bar.',
      category: 'learning',
      tags: ['Python', 'CustomTkinter', 'GUI', 'File I/O'],
      image: '/images/Project11.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-11',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-11',
      detail: 'Engineered a modern productivity desktop app in Python using CustomTkinter, featuring persistent text storage, theme toggles, status counters (total/completed/pending), and smooth scrolling lists.'
    },
    {
      id: 'day-12',
      title: 'Java — Functional Programming & Stream API',
      description: 'Lambda expressions, stream mapping/filtering/averaging/grouping, parallel stream benchmark, top earners.',
      category: 'learning',
      tags: ['Java', 'Stream API', 'Functional Programming', 'Lambdas'],
      image: '/images/Project12.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-12',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-12',
      detail: 'Deep dive into modern Java functional programming concepts: Stream API pipelines, collectors, method references, Optional safety, parallel stream performance benchmarks, and department analytics.'
    },
    {
      id: 'day-13',
      title: 'Python — Number Guessing Game',
      description: 'Random secret number (1–100), input validation, hints (too low/high), attempt counter, Enter key support.',
      category: 'learning',
      tags: ['Python', 'Tkinter', 'GUI', 'Game'],
      image: '/images/Project13.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-13',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-13',
      detail: 'Built an interactive Python Tkinter number guessing game with automatic range checking, adaptive hint system, attempt counting, keyboard shortcuts (Enter key), and winner modal dialogs.'
    },
    {
      id: 'day-14',
      title: 'Python — Secure Password Generator',
      description: 'Cryptographically secure passwords (secrets module), length slider (8–50), clipboard copy, dark GUI.',
      category: 'learning',
      tags: ['Python', 'CustomTkinter', 'Security', 'GUI'],
      image: '/images/Project14.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-14',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-14',
      detail: 'Built a security utility in Python using the `secrets` module for cryptographically strong random generation with length sliders (8-50), character set selection, and 1-click clipboard copying.'
    },
    {
      id: 'day-15',
      title: 'Python — Rock Paper Scissors Game',
      description: 'Three move buttons, computer random choice, real-time score tracking, color-coded winner announcement.',
      category: 'learning',
      tags: ['Python', 'CustomTkinter', 'GUI', 'Game'],
      image: '/images/Project15.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-15',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-15',
      detail: 'Created a desktop arcade game in Python CustomTkinter with animated move buttons, AI move selection, color-coded victory banners, score state persistence, and OS-matched dark/light themes.'
    },
    {
      id: 'day-16',
      title: 'Java — Text Analysis Tool',
      description: 'Character/word counts, most common character/word, frequency analysis, unique word count, case-insensitive.',
      category: 'learning',
      tags: ['Java', 'Collections', 'HashMap', 'Text Processing'],
      image: '/images/Project16.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-16',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-16',
      detail: 'Developed a high-efficiency Java text processing tool analyzing character and word frequencies using HashMaps/HashSets, sentence stats, punctuation stripping, and top-frequency reporting.'
    },
    {
      id: 'day-17',
      title: 'Python — Weather App (Open-Meteo API)',
      description: 'City search with geocoding, real-time weather display, WMO code mapping with emojis, Open-Meteo API.',
      category: 'learning',
      tags: ['Python', 'CustomTkinter', 'API', 'GUI', 'JSON'],
      image: '/images/Project17.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-17',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-17',
      detail: 'Built a live desktop weather forecasting app in Python using Open-Meteo REST API, featuring geocoding city lookup, WMO weather code mapping to visual emojis, and CustomTkinter aesthetics.'
    },
    {
      id: 'day-18',
      title: 'Java Swing GUI — Generic Library Catalog System',
      description: 'Generic Catalog<T> and LibraryItem<T> classes, type-safe operations, Book/DVD/Magazine types, CardLayout.',
      category: 'learning',
      tags: ['Java', 'Java Swing', 'Generics', 'GUI', 'OOP'],
      image: '/images/Project18.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-18',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-18',
      detail: 'Created a generic Java Swing catalog desktop app demonstrating type-safe collection management (`Catalog<T>`), dynamic item type switching (Book, DVD, Magazine), search filtering, and CardLayout navigation.'
    },
    {
      id: 'day-19',
      title: 'Java — Multi-threaded Bank Account Simulation',
      description: 'Bank account with deposit/withdraw, multiple threads, synchronization, deadlocks prevention, transaction log.',
      category: 'learning',
      tags: ['Java', 'Multithreading', 'Synchronization', 'Concurrency'],
      image: '/images/Project19.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-19',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-19',
      detail: 'Engineered a concurrent Java bank simulation testing thread safety with synchronized deposit/withdraw routines, reentrant locking, race condition mitigation, and detailed transaction logs.'
    },
    {
      id: 'day-20',
      title: 'Java Swing GUI — Note Taking Application',
      description: 'Rich text area, file I/O (open/save/new), word & character count status bar, dark/light theme toggle.',
      category: 'learning',
      tags: ['Java', 'Java Swing', 'GUI', 'OOP', 'E-Commerce'],
      image: '/images/Project20.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-20',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-20',
      detail: 'Designed a complete Java Swing desktop e-commerce app with dynamic product inventory, shopping cart management, automatic stock reduction on checkout, order status pipelines, and split-pane layout.'
    },
    {
      id: 'day-21',
      title: 'Java — Online Chat Application (Socket Programming)',
      description: 'Multi-client support, message broadcasting, join/leave notifications, multithreaded client handlers, TCP sockets.',
      category: 'learning',
      tags: ['Java', 'Java Swing', 'Socket Programming', 'Multithreading', 'Networking'],
      image: '/images/Project21.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-21',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-21',
      detail: 'Built a real-time TCP socket chat server and Swing client in Java supporting multiple concurrent clients, multi-threaded client socket handlers, user join/leave alerts, and auto-scrolling chat logs.'
    },
    {
      id: 'day-22',
      title: 'Java Swing — Weather Application',
      description: 'Real-time weather & 5-day forecast, city search history, dynamic time-of-day backgrounds, OpenWeatherMap API.',
      category: 'learning',
      tags: ['Java', 'Java Swing', 'API', 'Gson', 'MVC', 'GUI'],
      image: '/images/Project22.webp',
      link: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-22',
      github: 'https://github.com/shanaya-mahendran/My-Learning-Journal/tree/main/Day-22',
      detail: 'Created an MVC Java Swing weather forecasting app integrated with OpenWeatherMap API and Gson JSON parser, featuring 5-day weather predictions, search history, dynamic background colors, and unit toggles.'
    }
  ]
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all')
  const [projectList, setProjectList] = useState(DATA.projects)
  const [modalData, setModalData] = useState<typeof DATA.projects[0] | null>(null)

  useEffect(() => {
    fetch('/api/projects/public')
      .then(res => res.json())
      .then(data => {
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          const dbProjects = data.projects.map((p: any) => {
            let tagsArr = []
            try {
              tagsArr = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags
            } catch {
              tagsArr = [p.category]
            }
            return {
              id: p.slug,
              title: p.title,
              description: p.description,
              category: p.category,
              tags: Array.isArray(tagsArr) ? tagsArr : [p.category],
              image: p.image,
              link: p.link || '#',
              github: p.github || '#',
              detail: p.detail
            }
          })
          const learning = DATA.projects.filter(p => p.category === 'learning')
          setProjectList([...dbProjects, ...learning])
        }
      })
      .catch(() => {})
  }, [])
  
  const filteredProjects = filter === 'all'
    ? projectList.filter(p => p.category !== 'learning')
    : projectList.filter(p => p.category === filter)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    document.querySelectorAll('.project-grid-item').forEach(el => {
      observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [filter])

  return (
    <>
      <section className="section-padding" style={{ paddingTop: '140px' }}>
        <div className="container">

          {/* THINGS I'VE SHIPPED */}
          <h1 className="section-title">Things I've <span className="accent-text">Shipped</span></h1>
          <p className="section-subtitle">From web apps to open source — completed projects and contributions.</p>

          <div className="filter-bar" id="filterBar">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`} onClick={() => setFilter('fullstack')}>Full-Stack</button>
            <button className={`filter-btn ${filter === 'web' ? 'active' : ''}`} onClick={() => setFilter('web')}>Web Apps</button>
            <button className={`filter-btn ${filter === 'opensource' ? 'active' : ''}`} onClick={() => setFilter('opensource')}>Open Source</button>
            <button className={`filter-btn ${filter === 'learning' ? 'active' : ''}`} onClick={() => setFilter('learning')}>Learning Journal</button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((p, i) => (
              <div
                key={`${p.id}-${filter}`}
                className="project-grid-item"
                style={{ transitionDelay: `${i * 60}ms` }}
                onClick={() => setModalData(p)}
              >
                {p.category !== 'learning' && p.image && (
                  <div className="thumb" style={{ position: 'relative' }}><Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} /></div>
                )}
                <div className="info">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                    <div className="card-actions" onClick={e => e.stopPropagation()}>
                      {p.github && p.github !== '#' && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-btn card-btn-ghost" aria-label="GitHub">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                          GitHub
                        </a>
                      )}
                      {p.link && p.link !== '#' && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="card-btn card-btn-accent" aria-label="Live Demo">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* PROJECTS UNDER PROGRESS */}
          <div style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid rgba(181, 136, 211, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(139, 69, 186, 0.22)',
                color: 'var(--accent)',
                border: '1px solid rgba(139, 69, 186, 0.4)',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                Active Development
              </span>
            </div>
            <h2 className="section-title">Projects Under <span className="gradient-text">Progress</span></h2>
            <p className="section-subtitle">Platforms and software systems currently being engineered and refined.</p>

            <div className="projects-grid" style={{ paddingBottom: '0', marginTop: '36px' }}>
              {DATA.inProgressProjects.map((p) => (
                <div
                  key={p.id}
                  className="project-grid-item visible"
                  onClick={() => setModalData(p)}
                >
                  <div className="thumb" style={{ position: 'relative' }}>
                    <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                    <span style={{
                      position: 'absolute', top: 14, right: 14,
                      padding: '4px 14px', borderRadius: '20px',
                      fontSize: '0.72rem', fontWeight: 700,
                      background: 'rgba(14, 7, 19, 0.85)',
                      color: 'var(--accent)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(181, 136, 211, 0.35)',
                      letterSpacing: '0.5px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ⏳ Under Progress
                    </span>
                  </div>
                  <div className="info">
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                      <div className="card-actions" onClick={e => e.stopPropagation()}>
                        {p.github && p.github !== '#' && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-btn card-btn-ghost" aria-label="GitHub">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                          </a>
                        )}
                        {p.link && p.link !== '#' && (
                          <a href={p.link} target="_blank" rel="noopener noreferrer" className="card-btn card-btn-accent" aria-label="Live Demo">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      <div className={`modal-overlay ${modalData ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setModalData(null) }}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => setModalData(null)} aria-label="Close modal">✕</button>
          
          {modalData && (
            <div id="modalBody">
              {modalData.category !== 'learning' && modalData.image && (
                <div className="thumb" style={{ position: 'relative', margin: '-40px -40px 24px -40px', height: '280px', width: 'calc(100% + 80px)', borderRadius: 0 }}><Image src={modalData.image} alt={modalData.title} fill sizes="100vw" style={{ objectFit: 'cover' }} /></div>
              )}
              <h2>{modalData.title}</h2>
              <div className="meta">{modalData.category} · {modalData.tags.join(' · ')}</div>
              <p className="desc">{modalData.detail || modalData.description}</p>
              <div className="tech-list">{modalData.tags.map(t => <span key={t}>{t}</span>)}</div>
              <div className="links">
                  {modalData.link && modalData.link !== '#' && <a href={modalData.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">🔗 Live Site</a>}
                  {modalData.github && modalData.github !== '#' && <a href={modalData.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">🐙 GitHub</a>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
