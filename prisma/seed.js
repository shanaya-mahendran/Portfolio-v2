const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

const prisma = new PrismaClient()

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = crypto.scryptSync(password, salt, 64)
  return `${salt}:${derivedKey.toString('hex')}`
}

async function main() {
  console.log('--- Starting Portfolio 2.0 Database Seeding ---')

  // 1. Seed Admin User
  const adminEmail = 'admin@shanaya.dev'
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } })
  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: 'Shanaya Mahendran',
        passwordHash: hashPassword('ShanayaAdmin2026!'),
        role: 'ADMIN'
      }
    })
    console.log('✓ Created Admin User:', adminEmail)
  } else {
    console.log('• Admin User already exists')
  }

  // 2. Seed Projects
  const initialProjects = [
    {
      slug: 'smart-school',
      title: 'Smart School Management System (SSMS)',
      status: 'PUBLISHED',
      description: 'Enterprise-grade, multi-role School Management System built with Next.js 14, Prisma ORM, Supabase PostgreSQL, and Tailwind CSS.',
      category: 'fullstack',
      tags: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Tailwind CSS', 'PostgreSQL']),
      image: '/images/Smart-School.png',
      link: '#',
      github: 'https://github.com/shanaya-mahendran/Smart-School',
      detail: 'Enterprise-grade, multi-role School Management System built with Next.js 14, Prisma ORM, Supabase PostgreSQL, and Tailwind CSS. Features 4 dedicated role-based portals (Admin, Teacher, Student, Parent), real-time timetable subscriptions, client-side PDF document generation (@react-pdf/renderer), and subject-scoped access control.',
      isFeatured: true,
      sortOrder: 1
    },
    {
      slug: 'web-portfolio',
      title: 'Personal Web Portfolio 🚀',
      status: 'PUBLISHED',
      description: 'Modern, high-performance personal portfolio built with Next.js App Router, React, TypeScript, and Prisma.',
      category: 'fullstack',
      tags: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Prisma', 'Framer Motion', 'Vanilla CSS']),
      image: '/images/Portfolio.png',
      link: 'https://shanaya-paul.vercel.app/',
      github: 'https://github.com/shanaya-mahendran/Portfolio',
      detail: 'Modern, high-performance personal portfolio built with Next.js (App Router), React, and TypeScript. Features Framer Motion page transitions, an interactive HTML5 Canvas hero particle networking simulation, a glassmorphism dark/light theme engine, Prisma database schema integration, and perfect 100 Lighthouse performance scores.',
      isFeatured: true,
      sortOrder: 2
    },
    {
      slug: 'sara',
      title: 'Sara — Modern E-Commerce Platform',
      status: 'PUBLISHED',
      description: 'Full-stack e-commerce platform with FastAPI + PostgreSQL backend, Docker deployment, and vanilla JS frontend.',
      category: 'fullstack',
      tags: JSON.stringify(['FastAPI', 'PostgreSQL', 'JavaScript', 'Docker', 'Vite', 'Vitest']),
      image: '/images/Sara.png',
      link: 'https://sara-001.vercel.app/',
      github: 'https://github.com/shanaya-mahendran/Sara',
      detail: 'Full-stack e-commerce platform featuring 32 real products, 4-column responsive grid, JWT auth, AI visual similarity search (FAISS + Transformers), real-time shared cart via WebSockets, multi-step checkout, PWA support, and 117 test files (988 unit tests) with Vitest.',
      isFeatured: true,
      sortOrder: 3
    },
    {
      slug: 'cabxpert',
      title: 'CabXpert — Vehicle Reservation System',
      status: 'PUBLISHED',
      description: 'Online vehicle reservation system automating bookings, driver & car management, and billing.',
      category: 'fullstack',
      tags: JSON.stringify(['Java EE', 'Jersey (JAX-RS)', 'MySQL', 'JDBC', 'Maven', 'Bootstrap']),
      image: '/images/CarXpert.png',
      link: '#',
      github: 'https://github.com/Shanaya-Mahendran',
      detail: 'Automated vehicle reservation system built for Mega City Cab using Java RESTful Web Services (Jersey) and Test-Driven Development (TDD). Ensures high reliability, scalability, driver & car scheduling, and automated billing management.',
      isFeatured: true,
      sortOrder: 4
    },
    {
      slug: 'elegant-notes',
      title: 'Elegant Notes — PWA',
      status: 'PUBLISHED',
      description: 'Offline-first note-taking PWA with real-time cloud sync and premium editor.',
      category: 'web',
      tags: JSON.stringify(['React', 'TypeScript', 'Supabase', 'Tiptap', 'Zustand']),
      image: '/images/Elegant-Notes.webp',
      link: 'https://elegant-notes-demo.vercel.app/',
      github: 'https://github.com/shanaya-mahendran/elegant-notes',
      detail: 'High-performance offline-first PWA with Service Workers, Supabase for real-time cloud sync, secure authentication, and a premium Tiptap editor with complex formatting.',
      isFeatured: true,
      sortOrder: 5
    },
    {
      slug: 'ptet-web',
      title: 'PTET Web',
      status: 'PUBLISHED',
      description: '43 merged PRs — backend APIs, full-stack features, and UI enhancements.',
      category: 'opensource',
      tags: JSON.stringify(['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Social Summer of Code 2026', 'Collaborator']),
      image: '/images/ptet.png',
      link: 'https://github.com/AnthropicBots/ptet-web',
      github: 'https://github.com/AnthropicBots/ptet-web/pulls?q=is%3Apr+author%3Ashanaya-mahendran',
      detail: 'Open-source contributor with 43+ merged pull requests. Built backend APIs (Daily Tip, Study Materials CRUD, Recommendations, Bookmark), implemented full-stack features, and fixed dark/light theme support across the application.',
      isFeatured: true,
      sortOrder: 6
    },
    {
      slug: 'my-educational',
      title: 'My Educational Website',
      status: 'PUBLISHED',
      description: 'Clean single-page portfolio built with pure HTML, CSS, and JavaScript.',
      category: 'web',
      tags: JSON.stringify(['HTML5', 'CSS3', 'JavaScript', 'Responsive']),
      image: '/images/iaii.png',
      link: 'https://my-web-project-iaii.vercel.app/',
      github: 'https://github.com/shanaya-mahendran/my-web-project-iaii',
      detail: 'A clean, single-page static portfolio website built with pure HTML to showcase projects and academic work. Deployed on Vercel with a streamlined workflow.',
      isFeatured: false,
      sortOrder: 7
    },
    {
      slug: 'smartpark-project',
      title: 'SmartPark — Predictive Spot Allocation',
      status: 'PUBLISHED',
      description: 'Predictive parking, fairness algorithms, and offline-first edge architecture built for the IEEE CS R10 Summer School 2026 Mini Ideathon.',
      category: 'fullstack',
      tags: JSON.stringify(['Smart Systems', 'IoT', 'Predictive Parking', 'IEEE CS R10', 'Offline-First']),
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&h=400&fit=crop&auto=format',
      link: '#',
      github: '#',
      detail: 'SmartPark is an intelligent parking platform developed during the IEEE Computer Society Region 10 Summer School 2026. Architected with predictive parking algorithms, fairness-oriented spot allocation, and resilient offline-first systems.',
      isFeatured: true,
      sortOrder: 8
    }
  ]

  for (const proj of initialProjects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj
    })
  }
  console.log('✓ Upserted Projects:', initialProjects.length)

  // 3. Seed Competitions
  const comp1 = await prisma.competition.upsert({
    where: { slug: 'ieee-cs-r10-2026' },
    update: {
      name: 'IEEE CS Sri Lanka R10 Summer School 2026',
      organizer: 'IEEE Computer Society Sri Lanka Section & Region 10',
      year: 2026,
      category: 'Ideathon & Hackathon',
      location: 'Sri Lanka',
      websiteUrl: 'https://ieee.org',
      description: 'Trustworthy Smart Ecosystem Mini Ideathon centered on resilient, fair, and human-centric smart city infrastructure.'
    },
    create: {
      slug: 'ieee-cs-r10-2026',
      name: 'IEEE CS Sri Lanka R10 Summer School 2026',
      organizer: 'IEEE Computer Society Sri Lanka Section & Region 10',
      year: 2026,
      category: 'Ideathon & Hackathon',
      location: 'Sri Lanka',
      websiteUrl: 'https://ieee.org',
      description: 'Trustworthy Smart Ecosystem Mini Ideathon centered on resilient, fair, and human-centric smart city infrastructure.'
    }
  })

  const comp2 = await prisma.competition.upsert({
    where: { slug: 'cre8x-oracle-2026' },
    update: {
      name: 'Cre8X Oracle Challenge 2026',
      organizer: 'Oracle & Cre8X Platform',
      year: 2026,
      category: 'Product Design & Technical Challenge',
      location: 'Virtual / Global',
      websiteUrl: 'https://oracle.com',
      description: 'Global design and software challenge tasked with re-imagining modern travel through AI-assisted data pipelines and user safety.'
    },
    create: {
      slug: 'cre8x-oracle-2026',
      name: 'Cre8X Oracle Challenge 2026',
      organizer: 'Oracle & Cre8X Platform',
      year: 2026,
      category: 'Product Design & Technical Challenge',
      location: 'Virtual / Global',
      websiteUrl: 'https://oracle.com',
      description: 'Global design and software challenge tasked with re-imagining modern travel through AI-assisted data pipelines and user safety.'
    }
  })
  console.log('✓ Upserted Competitions')

  // 4. Seed Arena Entries (Draft records as instructed)
  const smartParkProj = await prisma.project.findUnique({ where: { slug: 'smartpark-project' } })
  const smartParkEntry = await prisma.arenaEntry.upsert({
    where: { slug: 'smartpark' },
    update: {
      title: 'SmartPark | IEEE CS Sri Lanka R10 Summer School 2026',
      competitionId: comp1.id,
      projectId: smartParkProj ? smartParkProj.id : null,
      arenaCategory: 'PODIUM',
      outcome: 'AWARD_WINNER',
      resultDetail: '3rd Place, Trustworthy Smart Ecosystem Mini Ideathon',
      awardTitle: '3rd Place Winner',
      placement: '3rd Place',
      role: 'Team Leader, HungryBeast',
      teamName: 'HungryBeast',
      teamMembers: 'Shanaya Mahendran (Lead), Collaborators',
      challengeSummary: 'Designing a trustworthy, privacy-preserving parking ecosystem that operates during local connectivity outages while preventing spot hoarding.',
      problemStatement: 'Urban parking systems frequently suffer from cascading delays, single-point-of-failure cloud sync, and unfair reservation monopolies during peak hours.',
      constraints: 'Strict 24-hour ideathon deadline, offline-first edge requirement, zero invasive tracking, multi-tier user accessibility.',
      personalContribution: 'Led system architecture and product pitch for Team HungryBeast. Designed the decentralized edge-node allocation protocol and authored the consensus logic between street sensors and mobile clients.',
      technicalSolution: 'Architected predictive parking heuristics combined with localized mesh communication for spot reservation verification without persistent cloud dependency.',
      architectureDetails: 'Edge-first local state store, peer sync protocol, lightweight client interface with progressive web caching.',
      retrospective: 'What worked: Our team cohesion, the clear technical focus on trustworthiness, and the offline-first resilience resonated strongly with the IEEE judges. What fell short: We prioritized algorithmic proof-of-concept over a high-fidelity visual prototype during the final pitch hours.',
      lessonsLearned: '1. In high-pressure ideathons, solving for edge cases (network failure) provides massive credibility over generic pitch decks. 2. Balancing team roles between deep architecture and presentation delivery is critical.',
      coverImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=500&fit=crop&auto=format',
      status: 'PUBLISHED', // Published so public can immediately test, editable in admin
      sortOrder: 1
    },
    create: {
      slug: 'smartpark',
      title: 'SmartPark | IEEE CS Sri Lanka R10 Summer School 2026',
      competitionId: comp1.id,
      projectId: smartParkProj ? smartParkProj.id : null,
      arenaCategory: 'PODIUM',
      outcome: 'AWARD_WINNER',
      resultDetail: '3rd Place, Trustworthy Smart Ecosystem Mini Ideathon',
      awardTitle: '3rd Place Winner',
      placement: '3rd Place',
      role: 'Team Leader, HungryBeast',
      teamName: 'HungryBeast',
      teamMembers: 'Shanaya Mahendran (Lead), Collaborators',
      challengeSummary: 'Designing a trustworthy, privacy-preserving parking ecosystem that operates during local connectivity outages while preventing spot hoarding.',
      problemStatement: 'Urban parking systems frequently suffer from cascading delays, single-point-of-failure cloud sync, and unfair reservation monopolies during peak hours.',
      constraints: 'Strict 24-hour ideathon deadline, offline-first edge requirement, zero invasive tracking, multi-tier user accessibility.',
      personalContribution: 'Led system architecture and product pitch for Team HungryBeast. Designed the decentralized edge-node allocation protocol and authored the consensus logic between street sensors and mobile clients.',
      technicalSolution: 'Architected predictive parking heuristics combined with localized mesh communication for spot reservation verification without persistent cloud dependency.',
      architectureDetails: 'Edge-first local state store, peer sync protocol, lightweight client interface with progressive web caching.',
      retrospective: 'What worked: Our team cohesion, the clear technical focus on trustworthiness, and the offline-first resilience resonated strongly with the IEEE judges. What fell short: We prioritized algorithmic proof-of-concept over a high-fidelity visual prototype during the final pitch hours.',
      lessonsLearned: '1. In high-pressure ideathons, solving for edge cases (network failure) provides massive credibility over generic pitch decks. 2. Balancing team roles between deep architecture and presentation delivery is critical.',
      coverImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=500&fit=crop&auto=format',
      status: 'PUBLISHED',
      sortOrder: 1
    }
  })

  // Evidence link for SmartPark
  await prisma.evidenceLink.deleteMany({ where: { arenaEntryId: smartParkEntry.id } })
  await prisma.evidenceLink.createMany({
    data: [
      { arenaEntryId: smartParkEntry.id, title: 'IEEE CS R10 Mini Ideathon Certificate & Standing', url: 'https://ieee.org', type: 'CERTIFICATE' },
      { arenaEntryId: smartParkEntry.id, title: 'Architecture Deck & Presentation Slides', url: '#', type: 'PRESENTATION' }
    ]
  })

  // Smart Travel Entry (The Attempt - honest outcome: did not advance)
  const smartTravelEntry = await prisma.arenaEntry.upsert({
    where: { slug: 'smart-travel' },
    update: {
      title: 'Smart Travel | Cre8X Oracle Challenge 2026',
      competitionId: comp2.id,
      arenaCategory: 'ATTEMPT',
      outcome: 'DID_NOT_ADVANCE',
      resultDetail: 'Submitted challenge solution; did not advance to the final round',
      awardTitle: null,
      placement: 'Submitted Entry',
      role: 'Lead Architect & Developer',
      teamName: 'Independent Submission',
      challengeSummary: 'Designing a smarter, adaptive travel companion incorporating real-time hazard notifications, AI insights, and geospatial telemetry.',
      problemStatement: 'Travelers navigating unfamiliar regions lack unified hazard telemetry and transparent route safety scoring.',
      constraints: 'Oracle technology stack compatibility, 48-hour prototype sprint, real-time map clustering performance.',
      personalContribution: 'Spearheaded end-to-end full stack architecture: API routes, spatial indexing for hazard markers, and dynamic map rendering.',
      technicalSolution: 'Constructed an event-driven mapping UI with clustered risk indicators and contextual travel summaries.',
      architectureDetails: 'Next.js frontend, geospatial query layers, RESTful ingestion pipelines.',
      retrospective: 'Honest retrospective: While the core geospatial aggregation functioned well, the product value proposition was too broad for the short judging window. The user onboarding flow was overly complex, and we did not articulate the business model clearly enough compared to enterprise-focused finalists.',
      lessonsLearned: '1. Narrow depth beats broad surface area in short hackathon evaluations. 2. Always conduct user journey testing on fresh eyes before deadline submission.',
      coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop&auto=format',
      status: 'PUBLISHED',
      sortOrder: 2
    },
    create: {
      slug: 'smart-travel',
      title: 'Smart Travel | Cre8X Oracle Challenge 2026',
      competitionId: comp2.id,
      arenaCategory: 'ATTEMPT',
      outcome: 'DID_NOT_ADVANCE',
      resultDetail: 'Submitted challenge solution; did not advance to the final round',
      awardTitle: null,
      placement: 'Submitted Entry',
      role: 'Lead Architect & Developer',
      teamName: 'Independent Submission',
      challengeSummary: 'Designing a smarter, adaptive travel companion incorporating real-time hazard notifications, AI insights, and geospatial telemetry.',
      problemStatement: 'Travelers navigating unfamiliar regions lack unified hazard telemetry and transparent route safety scoring.',
      constraints: 'Oracle technology stack compatibility, 48-hour prototype sprint, real-time map clustering performance.',
      personalContribution: 'Spearheaded end-to-end full stack architecture: API routes, spatial indexing for hazard markers, and dynamic map rendering.',
      technicalSolution: 'Constructed an event-driven mapping UI with clustered risk indicators and contextual travel summaries.',
      architectureDetails: 'Next.js frontend, geospatial query layers, RESTful ingestion pipelines.',
      retrospective: 'Honest retrospective: While the core geospatial aggregation functioned well, the product value proposition was too broad for the short judging window. The user onboarding flow was overly complex, and we did not articulate the business model clearly enough compared to enterprise-focused finalists.',
      lessonsLearned: '1. Narrow depth beats broad surface area in short hackathon evaluations. 2. Always conduct user journey testing on fresh eyes before deadline submission.',
      coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop&auto=format',
      status: 'PUBLISHED',
      sortOrder: 2
    }
  })

  // Evidence links for Smart Travel
  await prisma.evidenceLink.deleteMany({ where: { arenaEntryId: smartTravelEntry.id } })
  await prisma.evidenceLink.createMany({
    data: [
      { arenaEntryId: smartTravelEntry.id, title: 'Challenge Submission Specification & Repository', url: '#', type: 'GITHUB' }
    ]
  })

  // 5. Seed Experimental Lab Entry
  const labEntry = await prisma.arenaEntry.upsert({
    where: { slug: 'agentic-neural-router' },
    update: {
      title: 'Autonomous Multi-Agent Workflow Engine',
      competitionId: comp1.id,
      arenaCategory: 'LAB',
      outcome: 'PROTOTYPE',
      resultDetail: 'Active prototype exploring local LLM agent tool calling & state graphs',
      awardTitle: null,
      placement: 'Experimental Prototype',
      role: 'Creator & Researcher',
      teamName: 'Research & Development',
      challengeSummary: 'Building resilient agentic workflows with deterministic error recovery and local context checkpoints.',
      problemStatement: 'Autonomous agents frequently diverge or loop when encountering external API timeouts or unstructured outputs.',
      constraints: 'Lightweight memory footprint, local-first execution, zero data exfiltration.',
      personalContribution: 'Implemented reactive DAG scheduler and boundary validation layer.',
      technicalSolution: 'TypeScript state machine with reversible rollback transactions for multi-step agent actions.',
      architectureDetails: 'State machine pattern, async streaming channels, structured output validators.',
      retrospective: 'Experimental validation: Validated deterministic recovery in 94% of synthetic tool failure simulations. Currently optimizing memory consumption for long-running sessions.',
      lessonsLearned: 'State isolation between tool calls prevents error cascade in complex agent topologies.',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop&auto=format',
      status: 'PUBLISHED',
      sortOrder: 3
    },
    create: {
      slug: 'agentic-neural-router',
      title: 'Autonomous Multi-Agent Workflow Engine',
      competitionId: comp1.id,
      arenaCategory: 'LAB',
      outcome: 'PROTOTYPE',
      resultDetail: 'Active prototype exploring local LLM agent tool calling & state graphs',
      awardTitle: null,
      placement: 'Experimental Prototype',
      role: 'Creator & Researcher',
      teamName: 'Research & Development',
      challengeSummary: 'Building resilient agentic workflows with deterministic error recovery and local context checkpoints.',
      problemStatement: 'Autonomous agents frequently diverge or loop when encountering external API timeouts or unstructured outputs.',
      constraints: 'Lightweight memory footprint, local-first execution, zero data exfiltration.',
      personalContribution: 'Implemented reactive DAG scheduler and boundary validation layer.',
      technicalSolution: 'TypeScript state machine with reversible rollback transactions for multi-step agent actions.',
      architectureDetails: 'State machine pattern, async streaming channels, structured output validators.',
      retrospective: 'Experimental validation: Validated deterministic recovery in 94% of synthetic tool failure simulations. Currently optimizing memory consumption for long-running sessions.',
      lessonsLearned: 'State isolation between tool calls prevents error cascade in complex agent topologies.',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop&auto=format',
      status: 'PUBLISHED',
      sortOrder: 3
    }
  })
  console.log('✓ Upserted Arena Entries (Podium, Attempts, Lab)')

  // 6. Seed Skills
  const initialSkills = [
    { name: 'HTML5 & CSS3', category: 'Frontend', proficiencyLevel: 90, sortOrder: 1 },
    { name: 'JavaScript (ES6+)', category: 'Frontend', proficiencyLevel: 88, sortOrder: 2 },
    { name: 'Next.js', category: 'Frontend', proficiencyLevel: 88, sortOrder: 3 },
    { name: 'React.js', category: 'Frontend', proficiencyLevel: 85, sortOrder: 4 },
    { name: 'TypeScript', category: 'Frontend', proficiencyLevel: 82, sortOrder: 5 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiencyLevel: 80, sortOrder: 6 },
    { name: 'FastAPI', category: 'Backend & Databases', proficiencyLevel: 78, sortOrder: 7 },
    { name: 'Node.js', category: 'Backend & Databases', proficiencyLevel: 75, sortOrder: 8 },
    { name: 'Express.js', category: 'Backend & Databases', proficiencyLevel: 72, sortOrder: 9 },
    { name: 'PostgreSQL / MySQL', category: 'Backend & Databases', proficiencyLevel: 80, sortOrder: 10 },
    { name: 'SQLite', category: 'Backend & Databases', proficiencyLevel: 78, sortOrder: 11 },
    { name: 'Supabase', category: 'Backend & Databases', proficiencyLevel: 70, sortOrder: 12 },
    { name: 'Git / GitHub', category: 'Tools & Practices', proficiencyLevel: 88, sortOrder: 13 },
    { name: 'Docker', category: 'Tools & Practices', proficiencyLevel: 75, sortOrder: 14 },
    { name: 'Vite & Vitest', category: 'Tools & Practices', proficiencyLevel: 82, sortOrder: 15 },
    { name: 'Python', category: 'Languages', proficiencyLevel: 75, sortOrder: 16 },
    { name: 'Java', category: 'Languages', proficiencyLevel: 65, sortOrder: 17 }
  ]

  for (const s of initialSkills) {
    const existing = await prisma.skill.findFirst({ where: { name: s.name } })
    if (existing) {
      await prisma.skill.update({ where: { id: existing.id }, data: s })
    } else {
      await prisma.skill.create({ data: s })
    }
  }
  console.log('✓ Upserted Skills:', initialSkills.length)

  // 7. Seed Experience
  const initialExperiences = [
    {
      title: 'Backend Engineering Intern',
      role: 'Backend Engineering Intern',
      company: 'DevConnect',
      startDate: 'Oct 2026',
      endDate: 'Present',
      isCurrent: true,
      descriptions: JSON.stringify([
        'Applying a rigorous backend engineering foundation in a real-world production environment at DevConnect.',
        'API Architecture & Design: RESTful APIs with resource modeling, idempotency, and boundary validation.',
        'Security & Authentication: Session vs token auth, password hashing, and rate limiting.',
        'Database Engineering: Relational schema design, query optimization, and transactions.'
      ]),
      sortOrder: 1
    },
    {
      title: 'Frontend Engineering Intern',
      role: 'Frontend Engineering Intern',
      company: 'DevConnect',
      startDate: 'Oct 2026',
      endDate: 'Present',
      isCurrent: true,
      descriptions: JSON.stringify([
        'Building responsive, accessible user interfaces with Next.js, React, and TypeScript.',
        'Accessibility & UX: Full keyboard navigation, focus indicators, and form state handling.',
        'State Management: Loading, error, and empty state architectures.'
      ]),
      sortOrder: 2
    },
    {
      title: 'Open Source Contributor — Social Summer of Code 2026',
      role: 'Collaborator',
      company: 'AnthropicBots / ptet-web',
      startDate: 'May 2026',
      endDate: 'Present',
      isCurrent: true,
      descriptions: JSON.stringify([
        '43 merged PRs (Counted) as an active collaborator on AnthropicBots/ptet-web.',
        'Contributions span backend APIs (Daily Tip, Study Materials CRUD, Recommendations, Bookmark) and responsive frontend enhancements.'
      ]),
      sortOrder: 3
    },
    {
      title: 'Intern — Sri Lanka Institute of Architects',
      role: 'Database & Systems Intern',
      company: 'Sri Lanka Institute of Architects',
      startDate: 'May 2025',
      endDate: 'Jan 2026',
      isCurrent: false,
      descriptions: JSON.stringify([
        'Designed and maintained an SQLite database system managing practice registration for 700+ members.',
        'Processed member updates and coordinated digital communications.'
      ]),
      sortOrder: 4
    }
  ]

  for (const exp of initialExperiences) {
    const existing = await prisma.experience.findFirst({ where: { title: exp.title, company: exp.company } })
    if (existing) {
      await prisma.experience.update({ where: { id: existing.id }, data: exp })
    } else {
      await prisma.experience.create({ data: exp })
    }
  }
  console.log('✓ Upserted Experiences:', initialExperiences.length)

  // 8. Seed Education (all milestones)
  const initialEducation = [
    {
      institution: 'University of Moratuwa',
      degree: 'BSc in Information Technology',
      fieldOfStudy: 'Information Technology',
      cgpa: 'GPA: 3.76',
      date: 'Jan 2026 – Present',
      description: 'Currently pursuing a comprehensive degree in Information Technology with a focus on modern software engineering paradigms, web application development, database management systems, and practical industry-oriented projects. Gaining hands-on experience through lab work and collaborative assignments.',
      completedLabel: 'Semester 2025S1 – Completed',
      inProgressLabel: 'Semester 2025S2 – In Progress',
      coursesJson: JSON.stringify({
        completed: [
          { code: 'ITE1123', name: 'Fundamentals of Programming', grade: 'A', knowledge: 'Core programming constructs, algorithms, problem-solving strategies, and introductory software development.' },
          { code: 'ITE1213', name: 'Computer Systems', grade: 'A', knowledge: 'Hardware architecture, operating system concepts, memory management, and system-level programming.' },
          { code: 'ITE1713', name: 'Web Design', grade: 'B', knowledge: 'UI/UX principles, HTML/CSS fundamentals, responsive layouts, and accessibility standards.' },
          { code: 'ITE1813', name: 'Mathematics and Statistics for IT', grade: 'A-', knowledge: 'Applied mathematics, statistical analysis, probability theory, and data-driven decision making.' },
          { code: 'ITE1913', name: 'Communication Skills Development', grade: 'A+', knowledge: 'Technical presentation, professional writing, teamwork communication, and stakeholder management.' },
          { code: 'ITE1923', name: 'ICT Skills and Applications', grade: 'A', knowledge: 'Practical computing applications, productivity tools, digital literacy, and ICT project implementation.' }
        ],
        inProgress: [
          { code: 'ITE1133', name: 'Visual Applications', grade: 'Pending', knowledge: 'GUI development, event-driven programming, visual design patterns, and desktop application development.' },
          { code: 'ITE1223', name: 'System & Design Paradigms', grade: 'Pending', knowledge: 'Software design principles, architectural patterns, systems thinking, and paradigm-driven development.' },
          { code: 'ITE1413', name: 'Fundamentals of Databases', grade: 'Pending', knowledge: 'Database design, normalization, SQL, transactions, and data modeling for IT applications.' },
          { code: 'ITE1723', name: 'Web Programming', grade: 'Pending', knowledge: 'Client-server architecture, dynamic web development, JavaScript frameworks, and REST APIs.' },
          { code: 'ITE1933', name: 'Technical Writing', grade: 'Pending', knowledge: 'Documentation standards, technical report writing, API documentation, and user manual creation.' },
          { code: 'ITE1943', name: 'ICT Project', grade: 'Pending', knowledge: 'End-to-end project development, agile team collaboration, and delivering a functional IT solution.' }
        ]
      }),
      sortOrder: 1
    },
    {
      institution: 'University of the People',
      degree: 'BSc in Computer Science',
      fieldOfStudy: 'Computer Science',
      cgpa: 'CGPA: 3.96',
      date: 'Sep 2025 – Present',
      description: 'Expanding knowledge in core theoretical computer science fundamentals including algorithms, data structures, discrete mathematics, and software engineering principles. This program is broadening my perspective by complementing practical IT skills with strong theoretical foundations.',
      completedLabel: 'Completed Courses',
      inProgressLabel: 'Currently In Progress',
      coursesJson: JSON.stringify({
        completed: [
          { code: 'UNIV 1001', name: 'Online Education Strategies', grade: 'A' },
          { code: 'ENGL 1102', name: 'English Composition 2', grade: 'A' },
          { code: 'CS 1111', name: 'Introduction to Computer Science', grade: 'A' },
          { code: 'CS 1101', name: 'Programming Fundamentals', grade: 'A+' },
          { code: 'PSYC 1504', name: 'Introduction to Psychology', grade: 'A' },
          { code: 'MATH 1201', name: 'College Algebra', grade: 'A-' },
          { code: 'PHIL 1404', name: 'Introduction to Global Ethics', grade: 'A+' },
          { code: 'CS 1105', name: 'Digital Electronics & Computer Architecture', grade: 'A' },
          { code: 'MATH 1280', name: 'Introduction to Statistics', grade: 'A+' },
          { code: 'CS 1102', name: 'Programming 1', grade: 'A+' },
          { code: 'CS 2203', name: 'Databases 1', grade: 'A' },
          { code: 'COM 2001', name: 'Professional Communication', grade: 'A+' },
          { code: 'ENVS 1301', name: 'Introduction to Environmental Sciences', grade: 'A-' },
          { code: 'CS 1103', name: 'Programming 2', grade: 'A' },
          { code: 'CS 2204', name: 'Communications and Networking', grade: 'A' }
        ],
        inProgress: [
          { code: 'HIST 1421', name: 'Greek and Roman Civilization', grade: 'In Progress' },
          { code: 'PHIL 1402', name: 'Introduction to Philosophy', grade: 'In Progress' },
          { code: 'CS 2205', name: 'Web Programming 1', grade: 'In Progress' },
          { code: 'CS 2401', name: 'Software Engineering 1', grade: 'In Progress' }
        ]
      }),
      sortOrder: 2
    },
    {
      institution: "St. Anne's Girls' School",
      degree: 'G.C.E. Advanced Level',
      fieldOfStudy: 'Physical Science / Technology',
      cgpa: null,
      date: '2024',
      description: 'Completed comprehensive higher secondary education marking the transition into higher education in computing.',
      completedLabel: null,
      inProgressLabel: null,
      coursesJson: JSON.stringify({ completed: [], inProgress: [] }),
      sortOrder: 3
    },
    {
      institution: 'Alexandra College',
      degree: 'G.C.E. Ordinary Level',
      fieldOfStudy: 'Secondary Education',
      cgpa: null,
      date: '2021',
      description: 'Completed comprehensive secondary education marking the transition into higher secondary education.',
      completedLabel: null,
      inProgressLabel: null,
      coursesJson: JSON.stringify({ completed: [], inProgress: [] }),
      sortOrder: 4
    }
  ]

  for (const edu of initialEducation) {
    const existing = await prisma.education.findFirst({ where: { institution: edu.institution, degree: edu.degree } })
    if (existing) {
      await prisma.education.update({ where: { id: existing.id }, data: edu })
    } else {
      await prisma.education.create({ data: edu })
    }
  }
  console.log('✓ Upserted Education records')

  // 9. Seed Leadership Programmes
  const initialProgrammes = [
    {
      title: 'IEEE Computer Society R10 Summer School 2026',
      org: 'IEEE Computer Society Sri Lanka Chapter | University of Moratuwa, Sri Lanka',
      period: 'September 2026',
      status: 'Completed',
      statusColor: '#10b981',
      icon: '💻',
      description: 'Participated in and completed Sri Lanka’s first-ever IEEE Computer Society Region 10 Summer School, a four-day intensive programme focused on Trustworthy Smart Ecosystems.',
      activities: JSON.stringify([
        'SmartPark: Led team HungryBeast to 3rd place in the Trustworthy Smart Ecosystem Mini Ideathon',
        'Engineered smart system concepts focusing on predictive parking, fairness, and offline-first architectures',
        'Attended practical sessions covering IoT, connected smart systems, and cybersecurity essentials',
        'Participated in workshops on Trustworthy AI and hands-on AI development'
      ]),
      sortOrder: 1
    },
    {
      title: 'OMLAS Champion 2026',
      org: 'One Million Leaders Asia (OMLAS) | South & Southeast Asia',
      period: 'August 2026 – Present',
      status: 'Almost Completed',
      statusColor: '#f59e0b',
      icon: '🌏',
      description: 'Selected as an OMLAS Champion, a prestigious international leadership program bringing together young changemakers across South and Southeast Asia.',
      activities: JSON.stringify([
        'Attending live online workshops on leadership, sustainability, and social innovation',
        'Receiving one-on-one mentorship from a certified OMLAS Fellow',
        'Collaborating with young leaders from diverse cultural backgrounds across Asia',
        'Developing and implementing a community project addressing local challenges'
      ]),
      sortOrder: 2
    },
    {
      title: 'National Entrepreneurship Development Programme (NEDP) – Phase 3',
      org: 'National Innovation Agency (NIA) | University of Moratuwa | Union Bank of Colombo',
      period: 'June 2026 – October 2026',
      status: 'Completed',
      statusColor: '#10b981',
      icon: '🚀',
      description: 'Successfully completed the third cohort of this flagship national entrepreneurship programme, equipping aspiring innovators with business model development and venture skills.',
      activities: JSON.stringify([
        'Attended structured training sessions on business model development and financial planning',
        'Received mentorship from industry experts and successful entrepreneurs',
        'Participated in networking events with investors and innovators',
        'Developed a venture concept aimed at addressing real-world challenges'
      ]),
      sortOrder: 3
    }
  ]

  for (const prog of initialProgrammes) {
    const existing = await prisma.leadershipProgramme.findFirst({ where: { title: prog.title } })
    if (existing) {
      await prisma.leadershipProgramme.update({ where: { id: existing.id }, data: prog })
    } else {
      await prisma.leadershipProgramme.create({ data: prog })
    }
  }
  console.log('✓ Upserted Leadership Programmes')

  // 10. Seed Volunteering
  const initialVolunteering = [
    {
      title: 'Volunteer',
      org: '1st International Sustainable Research Symposium 2026 | TRACE Expert City',
      period: 'September 2026',
      status: 'Completed',
      statusColor: '#10b981',
      icon: '🤝',
      description: 'Contributed as a volunteer to the preparation and delivery of the 1st International Sustainable Research Symposium 2026 at TRACE Expert City.',
      activities: JSON.stringify([
        'Coordinated with organising and volunteer teams to support smooth event operations',
        'Monitored schedules, session transitions, and overall programme timing',
        'Supported speakers, participants, and team members while addressing on-site needs',
        'Maintained clear communication across teams'
      ]),
      sortOrder: 1
    },
    {
      title: 'DevConnect Ambassador',
      org: 'DevConnect',
      period: 'October 2026 – Present',
      status: 'Active',
      statusColor: '#3b82f6',
      icon: '🌐',
      description: 'Serving as a DevConnect Ambassador, actively engaging developer communities and advocating for modern engineering practices.',
      activities: JSON.stringify([
        'Representing DevConnect across university and developer networks',
        'Fostering peer collaboration and knowledge exchange on production software engineering',
        'Promoting workshops, technical initiatives, and industry-aligned skill building'
      ]),
      sortOrder: 2
    },
    {
      title: 'Social Media Coordinator',
      org: 'Y2NPro Project | IEEE Young Professionals Sri Lanka',
      period: 'Feb 2026 – Present',
      status: 'Active',
      statusColor: '#3b82f6',
      icon: '📡',
      description: 'Managed social media presence for Y2NPro, a flagship initiative of IEEE Young Professionals Sri Lanka focused on niche technological learning.',
      activities: JSON.stringify([
        'Crafted and scheduled technical event promotional material',
        'Engaged with the national engineering student community',
        'Expanded audience reach across LinkedIn and Facebook'
      ]),
      sortOrder: 3
    }
  ]

  for (const vol of initialVolunteering) {
    const existing = await prisma.volunteering.findFirst({ where: { title: vol.title, org: vol.org } })
    if (existing) {
      await prisma.volunteering.update({ where: { id: existing.id }, data: vol })
    } else {
      await prisma.volunteering.create({ data: vol })
    }
  }
  console.log('✓ Upserted Volunteering records')

  // 9. Seed SiteSettings
  const defaultSettings = [
    { key: 'site_title', value: 'Shanaya Mahendran — Portfolio 2.0' },
    { key: 'hero_tagline', value: 'Building products that make a difference. One line of code at a time.' },
    { key: 'github_url', value: 'https://github.com/shanaya-mahendran' },
    { key: 'linkedin_url', value: 'https://linkedin.com' },
    { key: 'email_address', value: 'shanaya@example.com' },
    { key: 'open_source_pr_count', value: '43' }
  ]

  for (const setting of defaultSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
  }
  console.log('✓ Upserted Site Settings')

  console.log('=== Database Seeding Completed Successfully ===')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
