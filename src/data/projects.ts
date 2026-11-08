export interface Project {
  slug: string; name: string; tagline: string; tier: 'flagship' | 'featured' | 'archive'
  summary: string; problem: string; goals: string[]; solution: string; features: string[]
  workflow?: { step: string; detail: string }[]
  stack: { group: string; items: string[] }[]
  contribution: { mine: string[]; team?: string[] }
  status: string; github?: string; demoNote?: string; hasCaseStudy: boolean
  challenges?: string[]; acknowledgements?: { role: string; names: string }[]; teamSize?: string
  verifiedFrom: string
}

export const projects: Project[] = [
  {
    slug: 'zyntra', name: 'ZYNTRA', tagline: 'From Dreams to Admissions', tier: 'flagship', hasCaseStudy: true, teamSize: 'Team of four',
    summary: 'An intelligent university admissions and career guidance platform that helps students explore opportunities and navigate the application process.',
    problem: 'Students applying to universities juggle scattered information: which universities fit their profile, whether they are eligible, which scholarships exist, how to write a strong statement of purpose, and where each application stands.',
    goals: ['Give students personalised university and career guidance in one place', 'Support the writing and improvement of statements of purpose', 'Make application progress visible and trackable', 'Reduce repetitive form entry through a browser extension'],
    solution: 'ZYNTRA brings recommendations, eligibility checks, profile gap analysis, SOP tools, scholarship exploration and an application tracking dashboard into a single platform, with a Chrome extension for intelligent form autofill.',
    features: ['AI-powered university recommendations', 'Career guidance', 'SOP generation', 'SOP improvement', 'Student profile gap analysis', 'Eligibility checking', 'University exploration', 'Scholarship exploration', 'Application tracking dashboard', 'Chrome extension for intelligent form autofill'],
    workflow: [
      { step: 'Profile', detail: 'The student builds a profile.' },
      { step: 'Guidance', detail: 'Recommendations, eligibility checks and gap analysis.' },
      { step: 'Prepare', detail: 'Scholarships exploration and SOP generation / improvement.' },
      { step: 'Apply & track', detail: 'Application dashboard, with extension-assisted form autofill.' },
    ],
    stack: [
      { group: 'Frontend (per repository README)', items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'React Hook Form'] },
      { group: 'Other repository components', items: ['Chromium browser extension', 'Separate backend with PostgreSQL, Redis and Prisma (referenced in README)'] },
    ],
    contribution: {
      mine: ['Frontend development', 'Project coordination and management activities', 'Jira workflow management', 'Slack project coordination'],
      team: ['ZYNTRA was built by a team of four. Saman contributed to the frontend and project coordination; she did not build the whole platform alone.', 'Backend, data and AI components are team work and are not claimed as individual work here.'],
    },
    acknowledgements: [{ role: 'Supervisor', names: 'Mr. Waqar Ashiq' }, { role: 'Mentors', names: 'Hammad and Shehroz' }],
    status: 'Team project · repository public · no public demo link available', github: 'https://github.com/SamanNadeem123/zyntra',
    verifiedFrom: 'Repository README (frontend) and project brief',
  },
  {
    slug: 'simuloom', name: 'SimuLoom', tagline: 'Fairness-Aware Queue Experimentation Lab', tier: 'featured', hasCaseStudy: true,
    summary: 'A simulation-driven system for studying queue behaviour, service efficiency, waiting times and fairness in a university service centre.',
    problem: 'Queue policies that look efficient can quietly disadvantage some groups of visitors. A university service centre needs a way to compare scheduling policies on identical workloads and judge fairness, not just average wait.',
    goals: ['Compare queue policies on identical, seeded workloads', 'Measure waiting time, service efficiency and fairness', 'Evaluate user-defined fairness constraints', 'Report honestly when evidence is insufficient'],
    solution: 'A SimPy discrete-event simulation of a service centre (counters, visitor groups, impatience, no-shows) with a policy layer, a metrics layer and constraint evaluation, exposed through an API and a React experimentation UI.',
    features: ['Deterministic discrete-event engine on SimPy', 'Policies: FCFS, static priority, aging priority and a custom fairness-aware policy', 'Metrics: waits (mean, median, p95), SLA attainment, abandonment, utilisation, queue length, per-group metrics', 'Six fairness-constraint types with SATISFIED / VIOLATED / NOT_EVALUABLE outcomes', 'Replications with confidence intervals', 'Reproducibility: stored seeds, config hashes, CSV/JSON exports and Markdown report', 'API and React dashboards for scenarios, runs and comparison'],
    workflow: [
      { step: 'Scenario', detail: 'Define counters, visitor groups and constraints.' },
      { step: 'Workload', detail: 'Seeded workloads generated once and shared by every policy.' },
      { step: 'Simulate', detail: 'SimPy engine runs each policy over replications.' },
      { step: 'Evaluate', detail: 'Metrics and fairness constraints computed per run.' },
      { step: 'Compare', detail: 'Paired policy comparison with confidence intervals.' },
    ],
    stack: [
      { group: 'Simulation & backend', items: ['Python', 'SimPy', 'FastAPI', 'Pydantic', 'SQLAlchemy', 'Alembic', 'PostgreSQL'] },
      { group: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Recharts'] },
      { group: 'Delivery', items: ['Docker Compose', 'GitHub Actions CI'] },
    ],
    contribution: { mine: ['Graduate-level software engineering project demonstrating simulation design, algorithmic thinking, backend engineering and system-level problem-solving.'] },
    challenges: ['Keeping runs deterministic so that every policy sees exactly the same visitors', 'Designing fairness constraints that state "not evaluable" instead of guessing when samples are small', 'Treating policy weights and thresholds as labelled assumptions rather than tuned results'],
    status: 'Implemented per README; limitations documented (no authentication, no PDF export, Docker images not run in the original development environment). Results describe simulated scenarios, not real services.',
    github: 'https://github.com/SamanNadeem123/SimuLoom', verifiedFrom: 'Repository README',
  },
  {
    slug: 'dastkaar-interiors', name: 'Dastkaar Interiors', tagline: 'Full-stack furniture e-commerce platform', tier: 'featured', hasCaseStudy: true,
    summary: 'A full-stack furniture e-commerce platform with a customer storefront, an admin dashboard and a shared Flask API backed by a database.',
    problem: 'A furniture showroom needs customers to browse detailed products and order easily, while staff need one place to manage catalogue, stock, orders, delivery and customers.',
    goals: ['Provide a clear browsing and ordering experience', 'Give admins control of products, orders, delivery and settings', 'Keep pricing and totals trustworthy by calculating them on the server', 'Make the whole stack easy to run locally with Docker'],
    solution: 'A React storefront and admin dashboard share one Flask REST API and database. The backend recalculates prices, discounts and delivery totals itself and deducts inventory when orders are placed.',
    features: ['Product catalogue with detail pages, multiple images, dimensions, materials and availability', 'Category and product management', 'Guest and signed-in cart', 'Orders and delivery management', 'Customer management', 'Product reviews with moderation', 'Gallery and store settings', 'WhatsApp contact integration', 'Real-time admin order notifications (Socket.IO)', 'Docker-based setup'],
    workflow: [
      { step: 'Browse', detail: 'Customers search, filter and view products.' },
      { step: 'Cart & order', detail: 'Cart and checkout; server recalculates totals.' },
      { step: 'API', detail: 'Flask REST API persists data in the database.' },
      { step: 'Admin', detail: 'Admins manage orders, stock and delivery.' },
    ],
    stack: [
      { group: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'TanStack Query', 'Zustand'] },
      { group: 'Backend', items: ['Flask', 'SQLAlchemy', 'Flask-Migrate', 'JWT authentication', 'Socket.IO'] },
      { group: 'Data & delivery', items: ['PostgreSQL', 'Docker Compose'] },
    ],
    contribution: { mine: ['Developed and worked on the project across the storefront, admin dashboard and backend API', 'Focus on full-stack development, product management and customer workflows'] },
    status: 'Runs locally with Docker · repository public · live demo not yet available (coming soon)',
    demoNote: 'Live demo coming soon — no public deployment yet.', github: 'https://github.com/SamanNadeem123/Dastkaar-Interiors', verifiedFrom: 'Repository README',
  },
  {
    slug: 'ai-hospital-simulation', name: 'AI Hospital Emergency Simulation & Waiting Time Prediction', tagline: 'Academic simulation project', tier: 'archive', hasCaseStudy: false,
    summary: 'An AI-based emergency-room simulation that models patient flow, studies bottlenecks and resource allocation, and applies predictive modelling to estimate patient waiting times.',
    problem: 'Emergency rooms face crowding and unpredictable waits; operational decisions are hard to test on a live department.',
    goals: ['Model ER patient flow', 'Identify operational bottlenecks', 'Investigate resource allocation', 'Estimate waiting times with predictive modelling'],
    solution: 'A simulation engine for ER patient flow combined with predictive modelling of waiting times.',
    features: ['Simulation engine for ER patient flow', 'Bottleneck and resource-allocation analysis', 'Predictive waiting-time estimation'],
    stack: [{ group: 'Concepts', items: ['Simulation design', 'Predictive modeling', 'AI/ML'] }],
    contribution: { mine: ['Designed the simulation engine and applied predictive modelling'] },
    status: 'Academic / technical project · no public repository or demo', verifiedFrom: 'Resume',
  },
  {
    slug: 'quickfix', name: 'QuickFix', tagline: 'Home Troubleshooting Desktop App', tier: 'archive', hasCaseStudy: false,
    summary: 'A cross-platform desktop application with a Tkinter GUI and a Flask REST API backend for home troubleshooting.',
    problem: 'Everyday household problems need quick, structured guidance.',
    goals: ['Deliver a usable desktop app', 'Separate GUI and backend through a REST API'],
    solution: 'A Tkinter desktop client talking to a Flask REST API backend.',
    features: ['Cross-platform desktop GUI (Tkinter)', 'Flask REST API backend'],
    stack: [{ group: 'Stack', items: ['Python', 'Tkinter', 'Flask'] }],
    contribution: { mine: ['Independently owned the full lifecycle: requirements gathering, design, implementation and testing'] },
    status: 'Independent project · repository link not yet verified', verifiedFrom: 'Resume',
  },
  {
    slug: 'academic-systems', name: 'Academic Management Systems', tagline: 'Library · University · Bank', tier: 'archive', hasCaseStudy: false,
    summary: 'A collection of three academic systems — Library, University and Bank Management — built to practise object-oriented design and database-backed CRUD applications.',
    problem: 'Coursework projects to practise structuring real-world domains in code.',
    goals: ['Apply object-oriented programming', 'Build CRUD operations over relational data'],
    solution: 'Three database-backed systems built around OOP and relational schema design.',
    features: ['Library Management System', 'University Management System', 'Bank Management System'],
    stack: [{ group: 'Concepts', items: ['Object-Oriented Programming', 'CRUD operations', 'Relational database design'] }],
    contribution: { mine: ['Designed and implemented the systems as academic work'] },
    status: 'Academic project collection · no repository links', verifiedFrom: 'Resume',
  },
]
export const featured = projects.filter((p) => p.hasCaseStudy)
export const archive = projects.filter((p) => !p.hasCaseStudy)
