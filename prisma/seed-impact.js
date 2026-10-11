// seed-impact.js — Seeds the 4 SDG initiatives into the database
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Impact & SDG initiatives...')

  const initiatives = [
    {
      slug: 'community-smart-waste-network',
      title: 'Community-Driven Smart Waste Network',
      tagline: 'Coordinating recycling and waste collection through community-level digital infrastructure.',
      sdgs: JSON.stringify([11, 12]),
      primaryObjective: 'Improve recycling coordination and waste collection efficiency in Sri Lankan communities.',
      phase: 'Exploring',
      icon: '♻️',
      coverColor: '#10b981',
      problem: 'Sri Lanka generates significant quantities of solid waste daily, yet coordination between households, collectors, and recycling centres remains fragmented. Many communities lack real-time visibility into collection schedules, leading to missed pickups, uncollected waste, and low recycling participation. This is a systemic coordination problem, not simply a technology gap — any solution must account for the behaviour of collectors, households, and recycling partners as a system.\n\nNote: Specific statistics (recycling rates, volumes) are being verified against credible recent sources before publication.',
      targetCommunity: 'Urban and peri-urban households in Sri Lanka — particularly in areas with informal waste collection — along with local recycling partners, waste-collection workers, and municipal authorities who coordinate collection logistics.',
      proposedSolution: 'A community-level platform enabling households to report waste readiness, track scheduled pickups, and connect with verified recycling points. Collectors would use a lightweight mobile interface to manage their routes. The system would prioritise offline functionality for areas with intermittent connectivity. Critically, the platform is designed around multi-stakeholder participation: it only creates value if collectors, households, and recycling centres all engage — making community onboarding and trust-building as important as the technical build.',
      architecture: 'Progressive Web App (PWA) for household and collector interfaces. Offline-first data sync using background sync. Real-time status updates via WebSocket or Server-Sent Events. Lightweight REST API backend. Community coordinator dashboard for route management. QR-code drop-point verification for recycling centres.',
      successCriteria: JSON.stringify([
        '500+ households actively using the platform in a pilot community',
        'Measurable improvement in collection scheduling adherence (target: ≥30% reduction in missed pickups)',
        'Verified engagement from at least 3 recycling partner organisations',
        'User retention above 60% at 3-month post-launch',
        'Collector feedback confirms workflow improvement'
      ]),
      disclaimer: 'This is a proposed initiative. The problem statement is based on general knowledge of Sri Lanka\'s waste management landscape; specific statistics are being verified. The proposed technical solution addresses coordination — not the full systemic complexity of waste collection, which requires genuine participation from collectors, households, and recycling partners to generate real-world impact.',
      sortOrder: 1,
      visibility: 'PUBLISHED'
    },
    {
      slug: 'public-service-reporting-dashboard',
      title: 'Public Service Reporting Dashboard',
      tagline: 'Making civic issues easier to report, track, and resolve.',
      sdgs: JSON.stringify([16]),
      primaryObjective: 'Make civic issues easier to report and track, improving public-service accountability and responsiveness.',
      phase: 'Planned',
      icon: '🏛️',
      coverColor: '#3b82f6',
      problem: 'Citizens across Sri Lanka frequently encounter unresolved civic issues — road damage, broken street lighting, water supply failures, and uncollected public waste — with no clear channel to report them or track resolution. Reporting typically relies on in-person visits, phone calls, or informal social media posts, creating fragmented information and no accountability loop. This opacity erodes public trust in institutions and leaves persistent problems unaddressed.\n\nSDG 16 calls for accountable, transparent, and inclusive institutions. A structured digital reporting system represents a practical step toward that goal.',
      targetCommunity: 'Residents of Sri Lankan municipalities who encounter unresolved civic issues, and the local government officers responsible for resolving them. Designed to be accessible to citizens with basic smartphone literacy, including support for Sinhala and Tamil.',
      proposedSolution: 'A bilingual (Sinhala/Tamil/English) civic reporting platform allowing citizens to submit geotagged reports with photo evidence. Reports are automatically routed to the relevant department, and citizens can track status updates. A public transparency dashboard shows resolution rates and response times by category and area. Officials access a case management interface to update status and communicate with reporters.\n\nThis is the most implementable MVP among the four initiatives: the workflow is clear, the scope is bounded, and a functional prototype can demonstrate value without requiring complex multi-party coordination.',
      architecture: 'Next.js web app with React Native companion. PostgreSQL for structured case data. File storage for photo evidence. Geolocation + map integration (Leaflet or Google Maps). Role-based access: citizen reporter, department officer, public transparency viewer. Email and SMS notification system for status updates.',
      successCriteria: JSON.stringify([
        'Pilot deployment with 1–2 municipalities',
        '200+ civic reports submitted in first 3 months',
        'Average resolution time tracked and publicly visible',
        'At least 1 government partner actively using the officer interface',
        '70%+ of submitted issues receive a status update within 7 days'
      ]),
      disclaimer: 'This is a proposed initiative currently in the planning phase. Deployment requires formal partnership with at least one municipality or local authority. Resolution outcomes depend on government engagement — the platform creates accountability infrastructure, but institutional will to act on reports is outside the scope of the technology itself.',
      sortOrder: 2,
      visibility: 'PUBLISHED'
    },
    {
      slug: 'digital-marketplace-informal-workers',
      title: 'Digital Marketplace for Informal Workers',
      tagline: 'Expanding access to work opportunities for Sri Lanka\'s informal economy.',
      sdgs: JSON.stringify([8, 10]),
      primaryObjective: 'Expand access to work opportunities and economic visibility for informal workers in Sri Lanka.',
      phase: 'Exploring',
      icon: '💼',
      coverColor: '#f59e0b',
      problem: 'A significant portion of Sri Lanka\'s workforce operates informally — domestic workers, handypeople, freelance craftspeople, and day labourers — without access to formal employment channels, digital payment infrastructure, or professional visibility. Clients seeking these services rely on word-of-mouth, while workers depend on informal networks that limit their reach and income stability. This structural inequality suppresses both income and economic mobility.\n\nNote: Specific data on Sri Lanka\'s informal workforce will be cited against official sources before publication.',
      targetCommunity: 'Informal workers providing household, craft, and skilled labour services in Sri Lanka — particularly those without existing digital presence. Also: clients seeking reliable, fairly priced local services. This is a two-sided marketplace, meaning both supply and demand must reach critical mass for the platform to be useful.',
      proposedSolution: 'A verified digital marketplace enabling informal workers to create profiles, list services, and receive bookings. Clients can search, review, and book with transparent pricing. A lightweight verification process (community vouching + ID) builds trust without requiring formal credentials. Mobile-first design with support for low-end devices and offline profile viewing.\n\nImportant caveat: this is the most operationally complex initiative of the four. Trust, verification, critical mass on both sides of the marketplace, and dispute resolution are all hard problems. A narrowly scoped pilot targeting one service category (e.g. home repair) in one area would reduce these risks significantly.',
      architecture: 'Mobile-first PWA. Profile system with service categories and verification status. Booking and scheduling flow. Integrated lightweight payment or payment-on-delivery acknowledgement. Review and rating system. Worker earnings dashboard. Geo-based search for local services.',
      successCriteria: JSON.stringify([
        '100+ verified worker profiles in pilot area',
        '50+ successful bookings completed in first 6 months',
        'Measurable income increase reported by participating workers (survey)',
        'Worker retention: >50% active after 3 months',
        'Zero verified fraud or impersonation incidents in pilot period'
      ]),
      disclaimer: 'This is a proposed initiative in early exploration. A two-sided marketplace only creates value when both workers and clients participate in sufficient numbers. Worker verification, trust mechanisms, and dispute resolution are complex to implement well. This initiative will require careful scoping, community engagement, and possibly partnership with an existing worker organisation before development begins.',
      sortOrder: 3,
      visibility: 'PUBLISHED'
    },
    {
      slug: 'offline-first-digital-literacy-hub',
      title: 'Offline-First Digital Literacy Hub',
      tagline: 'Bringing foundational digital skills to communities beyond the connectivity gap.',
      sdgs: JSON.stringify([4, 10]),
      primaryObjective: 'Improve access to digital education for Sri Lankans in low-connectivity and rural areas.',
      phase: 'Planned',
      icon: '📚',
      coverColor: '#8b5cf6',
      problem: 'Sri Lanka\'s digital divide is not simply a device gap — it is a skills gap. Many citizens, particularly in rural and estate communities, lack foundational digital literacy: the ability to use smartphones for banking, health information, government services, or employment. Without these skills, digital infrastructure investments fail to reach those who need them most.\n\nSDGs 4 (Quality Education) and 10 (Reduced Inequalities) converge here: digital literacy is increasingly a prerequisite for economic and civic participation.\n\nNote: Specific statistics on Sri Lanka\'s digital literacy rates are being verified against recent credible sources.',
      targetCommunity: 'Adults and youth in rural, estate, and low-connectivity communities in Sri Lanka — particularly those who own basic smartphones but lack the skills to use them for productive purposes. Community facilitators, teachers, and NGO workers who deliver training in these areas.',
      proposedSolution: 'A Progressive Web App delivering modular digital literacy content — covering smartphone basics, internet safety, mobile banking, government e-services, and job-seeking — that works fully offline after initial sync. Content is available in Sinhala, Tamil, and English. Community facilitators can download content packs for offline delivery. Progress is tracked locally and synced when connectivity is available.\n\nStrong alignment with my interest in reducing Sri Lanka\'s digital divide, and one of the two initiatives best suited for an initial demonstrable MVP.',
      architecture: 'Offline-first PWA using Service Workers and IndexedDB for content caching. Content management system for administrators to create and publish modules. Facilitator mode for community-led training sessions without internet. Lightweight progress tracking with local-first sync. Printable QR codes for content sharing in zero-connectivity environments.',
      successCriteria: JSON.stringify([
        '3+ offline content modules covering core digital literacy competencies',
        'Pilot delivery with 2 community facilitators in a low-connectivity area',
        '50+ learners completing at least one module in pilot',
        'Pre/post assessment showing measurable skill improvement',
        'Content available in all three languages (Sinhala, Tamil, English)'
      ]),
      disclaimer: 'This is a proposed initiative. Learning outcomes depend heavily on facilitator engagement and community trust — technology alone cannot deliver digital literacy. The platform is a tool; the human relationship between facilitators and learners is what creates lasting change. Pilot design will prioritise working with existing trusted community organisations rather than deploying technology in isolation.',
      sortOrder: 4,
      visibility: 'PUBLISHED'
    }
  ]

  for (const init of initiatives) {
    const existing = await prisma.initiative.findUnique({ where: { slug: init.slug } })
    if (existing) {
      await prisma.initiative.update({ where: { slug: init.slug }, data: init })
      console.log(`  ↺ Updated: ${init.title}`)
    } else {
      await prisma.initiative.create({ data: init })
      console.log(`  ✓ Created: ${init.title}`)
    }
  }

  // Add some initial milestones for the more advanced initiatives
  const reportingDashboard = await prisma.initiative.findUnique({ where: { slug: 'public-service-reporting-dashboard' } })
  if (reportingDashboard) {
    const existing = await prisma.milestone.count({ where: { initiativeId: reportingDashboard.id } })
    if (existing === 0) {
      await prisma.milestone.createMany({
        data: [
          { initiativeId: reportingDashboard.id, title: 'Problem validation — interviews with 10 citizens and 3 local officers', description: 'Verify the problem is felt, understand current workarounds, and map the institutional structure.', targetDate: 'Q4 2026', isCompleted: false, sortOrder: 1 },
          { initiativeId: reportingDashboard.id, title: 'Identify 1–2 willing municipal pilot partners', description: 'Secure informal agreement from a local authority to trial the officer-side interface.', targetDate: 'Q4 2026', isCompleted: false, sortOrder: 2 },
          { initiativeId: reportingDashboard.id, title: 'Design wireframes and user flows', description: 'Citizen reporting flow, officer dashboard, and public transparency view.', targetDate: 'Q1 2027', isCompleted: false, sortOrder: 3 },
          { initiativeId: reportingDashboard.id, title: 'Build and launch MVP', description: 'Functional bilingual reporting with basic case tracking.', targetDate: 'Q2 2027', isCompleted: false, sortOrder: 4 },
          { initiativeId: reportingDashboard.id, title: 'Pilot with real users — collect data', targetDate: 'Q3 2027', isCompleted: false, sortOrder: 5 },
        ]
      })
      console.log('  ✓ Milestones added for: Public Service Reporting Dashboard')
    }
  }

  const literacyHub = await prisma.initiative.findUnique({ where: { slug: 'offline-first-digital-literacy-hub' } })
  if (literacyHub) {
    const existing = await prisma.milestone.count({ where: { initiativeId: literacyHub.id } })
    if (existing === 0) {
      await prisma.milestone.createMany({
        data: [
          { initiativeId: literacyHub.id, title: 'Community needs assessment with 2 rural facilitators', description: 'Understand what skills are most needed and how existing training happens.', targetDate: 'Q4 2026', isCompleted: false, sortOrder: 1 },
          { initiativeId: literacyHub.id, title: 'Define content curriculum — 3 core modules', description: 'Smartphone basics, mobile banking, and e-government services.', targetDate: 'Q4 2026', isCompleted: false, sortOrder: 2 },
          { initiativeId: literacyHub.id, title: 'Build offline-first PWA prototype', description: 'Service Worker caching, IndexedDB content storage, and facilitator mode.', targetDate: 'Q1 2027', isCompleted: false, sortOrder: 3 },
          { initiativeId: literacyHub.id, title: 'Translate content to Sinhala and Tamil', targetDate: 'Q2 2027', isCompleted: false, sortOrder: 4 },
          { initiativeId: literacyHub.id, title: 'Pilot delivery in 1 community', description: 'Measure pre/post skill improvement with 50+ learners.', targetDate: 'Q3 2027', isCompleted: false, sortOrder: 5 },
        ]
      })
      console.log('  ✓ Milestones added for: Offline-First Digital Literacy Hub')
    }
  }

  console.log('\n✅ Impact & SDG initiatives seeded successfully.')
}

main()
  .catch(e => { console.error('Seed failed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
