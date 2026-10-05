export const profile = {
  name: "Tanish Phalswal",
  role: "Full-Stack Developer & DevOps Engineer",
  location: "Gurugram, Haryana, India",
  email: "tanishphalswal1@gmail.com",
  phone: "+91 98702 45774",
  linkedin: "https://linkedin.com/in/tanish-phalswal",
  summary:
    "I build production web products with React and Next.js, then deploy and operate them myself — AWS, Nginx, PM2, CI/CD, the whole pipeline. My work spans business applications, education platforms, websites, and design.",
};

export const stack = {
  Frontend: ["React.js", "Next.js", "JavaScript", "Redux", "Redux Saga", "HTML5 / CSS3"],
  "Backend & Realtime": ["Node.js / Express", "MongoDB", "Socket.io", "REST APIs", "Axios"],
  "Cloud & DevOps": ["AWS (EC2, S3, Route 53)", "GCP", "Nginx", "PM2", "GitHub Actions", "CI/CD", "Linux"],
  "Quality & Security": ["Manual & Regression Testing", "Burp Suite", "API Debugging", "Postman"],
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  status: "Production" | "Live";
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "manetor",
    name: "Manetor CRM",
    tagline: "WhatsApp-native CRM for Indian SMBs",
    stack: ["React.js", "Node.js", "MongoDB", "Socket.io", "AWS"],
    status: "Production",
    description:
      "A multi-tenant CRM platform built around WhatsApp as the primary channel — lead management, campaign tracking, invoicing, and quotations, with live chat and bulk messaging running through Meta's Cloud API.",
    highlights: [
      "Integrated WhatsApp Cloud API for live chat, bulk messaging, and automated workflows",
      "Built real-time updates with Socket.io across leads, chat, and dashboards",
      "Unified multiple lead sources — Meta Ads, IndiaMART, Justdial — into one pipeline",
      "Deployed and maintains the full AWS production stack (EC2, S3, Route 53, Nginx, PM2)",
    ],
    metrics: [
      { label: "role", value: "build + ship" },
      { label: "stack", value: "MERN" },
      { label: "status", value: "live" },
    ],
  },
  {
    slug: "trackops",
    name: "TrackOps (Devora)",
    tagline: "Multi-tenant QA, bug tracking & cybersecurity platform",
    stack: ["Node.js", "Express", "MongoDB", "React"],
    status: "Production",
    description:
      "A multi-tenant QA, bug-tracking, and cybersecurity platform built backend-first across 13 phases, then paired with a fully audited and corrected frontend — assign workflows, bulk assignment, and tenant isolation included.",
    highlights: [
      "Built the entire backend in 13 phases — multi-tenant architecture, auth, and data isolation",
      "Audited and corrected a Cursor AI-generated frontend — enum mismatches, payload errors, Tailwind conflicts",
      "Designed an assign workflow with bulk assignment for QA and bug-tracking teams",
      "Owns the full deployment and tenant-level data architecture",
    ],
    metrics: [
      { label: "role", value: "build + ship" },
      { label: "stack", value: "MERN" },
      { label: "status", value: "live" },
    ],
  },
  {
    slug: "setlup",
    name: "Setlup",
    tagline: "B2B marketplace & lead platform",
    stack: ["React.js", "Node.js", "MongoDB", "AWS"],
    status: "Production",
    description:
      "A B2B marketplace with dynamic business-profile dashboards, authentication, and lead-interaction flows, built responsive across devices and deployed on AWS infrastructure managed end-to-end.",
    highlights: [
      "Built dynamic dashboards and business profile systems from scratch",
      "Implemented authentication and lead-interaction features over REST APIs",
      "Responsive UI tested for cross-device consistency",
      "Owns deployment and hosting on AWS EC2, S3, and Route 53",
    ],
    metrics: [
      { label: "role", value: "build + ship" },
      { label: "stack", value: "MERN" },
      { label: "status", value: "live" },
    ],
  },
  {
    slug: "suppkart",
    name: "Suppkart",
    tagline: "SEO-first e-commerce frontend",
    stack: ["Next.js", "JavaScript", "PHP"],
    status: "Live",
    description:
      "An e-commerce frontend built on Next.js for SEO performance — dynamic routing, optimized page speed, and a PHP backend integration, hosted on a self-managed VPS.",
    highlights: [
      "Built SEO-friendly frontend with Next.js, optimizing for organic discovery",
      "Implemented dynamic routing and a fully responsive UI",
      "Integrated backend APIs and tuned page-speed performance",
      "Manages deployment on Hostinger VPS",
    ],
    metrics: [
      { label: "role", value: "frontend" },
      { label: "stack", value: "Next.js" },
      { label: "status", value: "live" },
    ],
  },
  {
    slug: "erp",
    name: "Internal ERP",
    tagline: "Business operations in one workspace",
    stack: ["React.js", "Node.js", "MongoDB"],
    status: "Production",
    description:
      "An internal ERP workspace for connected operational workflows, dashboards, and reporting.",
    highlights: [
      "Built application workflows and connected operational views",
      "Integrated frontend screens with backend APIs and business data",
      "Supported deployment and ongoing product changes",
    ],
    metrics: [
      { label: "role", value: "full-stack" },
      { label: "stack", value: "MERN" },
      { label: "scope", value: "internal" },
    ],
  },
];

export const experience = [
  {
    company: "Calance",
    role: "MERN Stack Developer",
    location: "Gurugram, India",
    website: "https://www.calanceus.com/",
    period: "Sep 2026 — Present",
    points: [
      "Building and improving MERN applications for business and training workflows",
      "Working across frontend, APIs, integrations, and deployment support",
    ],
  },
  {
    company: "Cross Learning",
    role: "MERN Stack Developer",
    location: "Gurugram, India",
    website: "https://crosslearning.in/",
    period: "Jul 2026 — Sep 2026",
    points: [
      "Developed web experiences and integrations for the education platform",
      "Supported production updates across programs, school solutions, and website workflows",
    ],
  },
  {
    company: "Cut Edge Technology Pvt. Ltd.",
    role: "Full-Stack Developer & DevOps Engineer",
    location: "Gurgaon, India",
    website: "https://cutedgetechnology.com/",
    period: "Nov 2022 — Jul 2026",
    points: [
      "Built scalable CRM and SaaS platforms in React.js — dashboards, lead management, business workflows",
      "Designed CI/CD pipelines with GitHub Actions and configured Nginx + PM2 for production hosting",
      "Owned AWS infrastructure (EC2, S3, Route 53) including DNS, subdomains, and SSL across client projects",
      "Built real-time features — live chat, lead tracking — with Socket.io, backed by Redux/Redux Saga state",
      "Performed manual, regression, and basic security testing (Burp Suite) before releases",
      "Automated server maintenance with cron jobs and resolved production issues via log analysis",
    ],
  },
];

export const certifications = [
  { name: "DevOps Engineer", issuer: "Core x Tech" },
  { name: "UI/UX Design", issuer: "SSDN Technologies" },
  { name: "Advance Excel", issuer: "SSDN Technologies" },
  { name: "Cyber Smart", issuer: "WNS Cares Foundation" },
];

export const buildWorkflow = [
  {
    step: "Design",
    tool: "Figma",
    detail: "Wireframes, layout, and design tokens mapped out before a single line of code exists.",
  },
  {
    step: "Build",
    tool: "Claude + Codex",
    detail: "AI agents write the first pass of every feature — components, API routes, schemas. I direct, review, and correct every line before it merges.",
  },
  {
    step: "Verify",
    tool: "Manual QA + Burp Suite",
    detail: "Functional pass, regression check, and a basic security sweep before anything touches production.",
  },
  {
    step: "Ship",
    tool: "GitHub Actions → AWS",
    detail: "CI/CD pipeline builds, tests, and deploys — then PM2 and Nginx keep it alive.",
  },
];

export const aiWorkflowStat = {
  headline: "This workflow doesn't run without AI",
  description:
    "Claude and Codex aren't autocomplete here — they're the agents that draft architecture, write the bulk of the implementation, debug production issues, and review their own output before I sign off. I set the direction and catch what's wrong; the agents do the heavy typing. That's how one person ships what used to take a small team.",
  multiplier: "10x",
  multiplierLabel: "faster shipping",
  before: [
    "Every feature hand-typed line by line",
    "Days lost to boilerplate and repetitive setup",
    "Debugging alone, one stack trace at a time",
  ],
  after: [
    "Claude + Codex draft, I architect and review",
    "Boilerplate generated in minutes, not days",
    "AI-assisted debugging across the whole stack",
  ],
};

export const deployLog = [
  { text: "$ git push origin main", tone: "muted" },
  { text: "✓ build passed — 12.4s", tone: "green" },
  { text: "$ pm2 restart manetor-api", tone: "muted" },
  { text: "✓ nginx reloaded", tone: "green" },
  { text: "✓ ssl certificate valid", tone: "green" },
  { text: "● manetor-crm — production — live", tone: "amber" },
];
