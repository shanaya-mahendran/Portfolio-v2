export interface FallbackEvidenceLink {
  id: string
  title: string
  url: string
  type: string
}

export interface FallbackCompetition {
  id: string
  name: string
  organizer: string
  year: number
  category: string
}

export interface FallbackCaseStudySection {
  id: string
  title: string
  content: string
  sectionOrder: number
}

export interface FallbackArenaEntry {
  id: string
  slug: string
  title: string
  arenaCategory: 'PODIUM' | 'ATTEMPT' | 'LAB'
  outcome: string
  resultDetail: string
  awardTitle?: string | null
  placement?: string | null
  role: string
  teamName?: string | null
  teamMembers?: string | null
  challengeSummary: string
  problemStatement: string
  constraints?: string | null
  personalContribution: string
  technicalSolution: string
  architectureDetails?: string | null
  retrospective: string
  lessonsLearned: string
  coverImage?: string | null
  status: string
  sortOrder: number
  competition: FallbackCompetition
  project?: { id: string; title: string; slug: string } | null
  evidenceLinks: FallbackEvidenceLink[]
  sections?: FallbackCaseStudySection[]
}

export const FALLBACK_ARENA_ENTRIES: FallbackArenaEntry[] = [
  {
    id: 'entry-smartpark',
    slug: 'smartpark',
    title: 'SmartPark | IEEE CS Sri Lanka R10 Summer School 2026',
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
    sortOrder: 1,
    competition: {
      id: 'comp-ieee-r10',
      name: 'IEEE CS Sri Lanka R10 Summer School 2026',
      organizer: 'IEEE Computer Society Sri Lanka Section & Region 10',
      year: 2026,
      category: 'Ideathon & Hackathon'
    },
    project: {
      id: 'proj-smartpark',
      title: 'SmartPark',
      slug: 'smartpark-project'
    },
    evidenceLinks: [
      {
        id: 'link-1',
        title: 'IEEE CS R10 Mini Ideathon Certificate & Standing',
        url: 'https://ieee.org',
        type: 'CERTIFICATE'
      },
      {
        id: 'link-2',
        title: 'Architecture Deck & Presentation Slides',
        url: '#',
        type: 'PRESENTATION'
      }
    ],
    sections: [
      {
        id: 'sec-1',
        title: 'Problem Framing & User Empathy',
        content: 'Drivers spend on average 14 minutes searching for parking in congested city blocks, generating up to 30% of downtown traffic congestion.',
        sectionOrder: 1
      },
      {
        id: 'sec-2',
        title: 'System Architecture & Edge Redundancy',
        content: 'Decentralized edge nodes maintain short-lived leases on parking slots. If internet connectivity drops, local BLE beacons verify reservations cryptographically.',
        sectionOrder: 2
      }
    ]
  },
  {
    id: 'entry-smart-travel',
    slug: 'smart-travel',
    title: 'Smart Travel | Cre8X Oracle Challenge 2026',
    arenaCategory: 'ATTEMPT',
    outcome: 'DID_NOT_ADVANCE',
    resultDetail: 'Submitted challenge solution; did not advance to the final round',
    awardTitle: null,
    placement: 'Submitted Entry',
    role: 'Lead Architect & Developer',
    teamName: 'Independent Submission',
    teamMembers: 'Shanaya Mahendran',
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
    sortOrder: 2,
    competition: {
      id: 'comp-cre8x',
      name: 'Cre8X Oracle Challenge 2026',
      organizer: 'Oracle & Cre8X Platform',
      year: 2026,
      category: 'Product Design & Technical Challenge'
    },
    project: null,
    evidenceLinks: [
      {
        id: 'link-3',
        title: 'Challenge Submission Specification & Repository',
        url: 'https://github.com/shanaya-mahendran',
        type: 'GITHUB'
      }
    ],
    sections: [
      {
        id: 'sec-3',
        title: 'Hazard Telemetry Architecture',
        content: 'Aggregating crowd-sourced road condition reports, weather alerts, and official transit advisories into a single weighted danger index per route segment.',
        sectionOrder: 1
      }
    ]
  },
  {
    id: 'entry-agentic-neural-router',
    slug: 'agentic-neural-router',
    title: 'Autonomous Multi-Agent Workflow Engine',
    arenaCategory: 'LAB',
    outcome: 'PROTOTYPE',
    resultDetail: 'Active prototype exploring local LLM agent tool calling & state graphs',
    awardTitle: null,
    placement: 'Experimental Prototype',
    role: 'Creator & Researcher',
    teamName: 'Research & Development',
    teamMembers: 'Shanaya Mahendran',
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
    sortOrder: 3,
    competition: {
      id: 'comp-ieee-r10',
      name: 'IEEE CS Sri Lanka R10 Summer School 2026',
      organizer: 'IEEE Computer Society Sri Lanka Section & Region 10',
      year: 2026,
      category: 'Ideathon & Hackathon'
    },
    project: null,
    evidenceLinks: [],
    sections: [
      {
        id: 'sec-4',
        title: 'State Graph Design & Reversible Transactions',
        content: 'Every agent tool call records an atomic undo payload before mutating system state, allowing rollbacks if downstream steps trigger validation errors.',
        sectionOrder: 1
      }
    ]
  }
]

export const FALLBACK_INITIATIVES = [
  {
    id: 'init-1',
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
    visibility: 'PUBLISHED',
    milestones: [
      { id: 'm1-1', title: 'Problem definition & stakeholder discovery', description: 'Interviews with community households, waste workers, and informal collectors in Colombo area.', targetDate: 'Q2 2026', completedDate: null, isCompleted: true, sortOrder: 1 },
      { id: 'm1-2', title: 'Low-fidelity workflow prototype', description: 'Wireframing collector route view and household notification interaction.', targetDate: 'Q3 2026', completedDate: null, isCompleted: false, sortOrder: 2 },
      { id: 'm1-3', title: 'Pilot community deployment', description: 'Testing with 50 households and 2 local collection routes.', targetDate: 'Q4 2026', completedDate: null, isCompleted: false, sortOrder: 3 },
    ]
  },
  {
    id: 'init-2',
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
    visibility: 'PUBLISHED',
    milestones: [
      { id: 'm2-1', title: 'Civic workflow architecture & UI mocks', description: 'Specification of multi-language intake forms and municipal triage queues.', targetDate: 'Q3 2026', completedDate: null, isCompleted: true, sortOrder: 1 },
      { id: 'm2-2', title: 'Functional prototype build', description: 'Next.js interface with geotagged photo submission and map pin placement.', targetDate: 'Q4 2026', completedDate: null, isCompleted: false, sortOrder: 2 },
      { id: 'm2-3', title: 'Municipal outreach & demonstration', description: 'Demonstrating transparency dashboard to municipal council representatives.', targetDate: 'Q1 2027', completedDate: null, isCompleted: false, sortOrder: 3 }
    ]
  },
  {
    id: 'init-3',
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
    visibility: 'PUBLISHED',
    milestones: [
      { id: 'm3-1', title: 'Informal sector field interviews', description: 'Surveys with tradespeople, day laborers, and home service providers on digital comfort.', targetDate: 'Q2 2026', completedDate: null, isCompleted: true, sortOrder: 1 },
      { id: 'm3-2', title: 'Trust & vouching framework specification', description: 'Designing non-burdensome verification that does not exclude informal workers.', targetDate: 'Q4 2026', completedDate: null, isCompleted: false, sortOrder: 2 },
      { id: 'm3-3', title: 'Scoped trade pilot (single vertical)', description: 'Launch restricted pilot for home repairs in high-density suburban node.', targetDate: 'Q2 2027', completedDate: null, isCompleted: false, sortOrder: 3 }
    ]
  },
  {
    id: 'init-4',
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
    disclaimer: 'This is a proposed initiative in the planning phase. Educational content must be developed and validated in all three languages with input from educators. Effective distribution depends on community partnerships — technology facilitates offline access, but learning outcomes require trusted facilitation in the field.',
    sortOrder: 4,
    visibility: 'PUBLISHED',
    milestones: [
      { id: 'm4-1', title: 'Curriculum design & competency mapping', description: 'Defined 3 introductory modules: Essential Phone Safety, Mobile Banking, and E-Gov Portals.', targetDate: 'Q2 2026', completedDate: null, isCompleted: true, sortOrder: 1 },
      { id: 'm4-2', title: 'Offline-first PWA core development', description: 'ServiceWorker offline caching engine and multilingual translation manifest.', targetDate: 'Q3 2026', completedDate: null, isCompleted: false, sortOrder: 2 },
      { id: 'm4-3', title: 'Grassroots NGO facilitator pilot', description: 'Partner with local community centre in low-bandwidth rural district.', targetDate: 'Q1 2027', completedDate: null, isCompleted: false, sortOrder: 3 }
    ]
  }
]
