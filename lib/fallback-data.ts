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
