export type RoleTag = "Built" | "Designed" | "Deployed" | "AI-assisted" | "Led";

export type CaseStudy = {
  id: string;
  title: string;
  tagline: string;
  thumb: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  roles: RoleTag[];
  figmaEmbed?: string;
  liveUrl?: string;
  year: string;
};

export const webApps: CaseStudy[] = [
  {
    id: "manetor",
    title: "Manetor CRM",
    tagline: "WhatsApp-native CRM used by 50+ Indian SMBs daily",
    thumb: "#0d1829",
    problem: "Indian SMBs were managing leads over WhatsApp manually â€” no tracking, no automation, no unified view.",
    solution: "Multi-tenant CRM with WhatsApp Cloud API: live chat, bulk messaging, campaign tracking, invoicing, automated lead workflows. Socket.io real-time. AWS production stack.",
    result: "50+ active tenants. Lead response time reduced ~60%. WhatsApp as primary channel.",
    stack: ["React.js", "Node.js", "MongoDB", "Socket.io", "AWS", "WhatsApp Cloud API"],
    roles: ["Built", "Deployed", "AI-assisted"],
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_MANETOR",
    year: "2023",
  },
  {
    id: "trackops",
    title: "TrackOps / Devora",
    tagline: "Multi-tenant QA & bug-tracking platform â€” 13-phase backend",
    thumb: "#0d0d1f",
    problem: "No affordable multi-tenant QA + bug tracking for small dev teams. Jira too heavy; spreadsheets too loose.",
    solution: "13-phase backend build: auth, tenant isolation, assign workflows, bulk assignment, RBAC. Audited and fixed a Cursor AI frontend â€” caught 23 integration bugs before launch.",
    result: "Fully operational. Clean tenant data isolation. 23 bugs caught pre-launch.",
    stack: ["Node.js", "Express", "MongoDB", "React", "Tailwind"],
    roles: ["Built", "Deployed", "AI-assisted", "Led"],
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_TRACKOPS",
    year: "2024",
  },
  {
    id: "setlup",
    title: "Setlup B2B Marketplace",
    tagline: "B2B lead & profile platform â€” AWS infra owned end-to-end",
    thumb: "#0d1a0d",
    problem: "B2B buyers had no central place to find verified business profiles. Manual outreach, no lead tracking.",
    solution: "Dynamic business-profile dashboards, authentication, lead-interaction flows. Responsive. Full AWS deployment (EC2, S3, Route 53) managed.",
    result: "Live with active supplier profiles. Zero downtime since launch.",
    stack: ["React.js", "Node.js", "MongoDB", "AWS EC2", "S3", "Route 53"],
    roles: ["Built", "Deployed", "AI-assisted"],
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_SETLUP",
    year: "2023",
  },
  {
    id: "erp",
    title: "Internal ERP System",
    tagline: "Company-wide ERP â€” HR, inventory & billing unified",
    thumb: "#1a150d",
    problem: "Cut Edge Technology managed HR, inventory, and billing across 6 spreadsheets and disconnected tools.",
    solution: "ERP with employee management, attendance, inventory control, invoicing, and reporting dashboard. Role-based access: admin/manager/staff.",
    result: "Replaced 6 spreadsheets. Billing cycle cut from 3 days to same-day. 15+ daily users.",
    stack: ["React.js", "Node.js", "MongoDB", "AWS", "Redux"],
    roles: ["Built", "Deployed", "AI-assisted", "Led"],
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_ERP",
    year: "2024",
  },
];

export type FigmaWork = {
  id: string;
  title: string;
  tagline: string;
  figmaEmbed: string;
  screens: number;
  type: "Dashboard" | "Mobile App" | "Landing Page" | "Design System" | "Prototype";
  year: string;
};

export const figmaWork: FigmaWork[] = [
  { id: "manetor-ui", title: "Manetor CRM â€” UI Design", tagline: "Dashboard, live chat, and campaign screens", figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_MANETOR_UI", screens: 24, type: "Dashboard", year: "2023" },
  { id: "trackops-ui", title: "TrackOps â€” Design System", tagline: "Component library + bug tracker interface", figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_TRACKOPS_UI", screens: 18, type: "Design System", year: "2024" },
  { id: "erp-ui", title: "ERP Dashboard Design", tagline: "HR, inventory and billing UI flows", figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_ERP_UI", screens: 32, type: "Dashboard", year: "2024" },
  { id: "setlup-ui", title: "Setlup Marketplace UI", tagline: "B2B profile and lead interaction screens", figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/REPLACE_SETLUP_UI", screens: 14, type: "Landing Page", year: "2023" },
];

export type GraphicWork = {
  id: string;
  title: string;
  tagline: string;
  category: "Logo" | "Social Media" | "Poster" | "Brand Identity" | "Banner";
  color: string;
  imagePath?: string;
  year: string;
};

export const graphicWork: GraphicWork[] = [
  { id: "cutedge-brand", title: "Cut Edge Technology â€” Brand Kit", tagline: "Logo, color palette, and typography system", category: "Brand Identity", color: "#0d1829", year: "2023" },
  { id: "manetor-social", title: "Manetor CRM â€” Social Media Pack", tagline: "LinkedIn + Instagram launch creatives", category: "Social Media", color: "#0d1829", year: "2023" },
  { id: "devora-logo", title: "Devora / TrackOps â€” Logo Design", tagline: "Brand identity for the QA platform", category: "Logo", color: "#150d29", year: "2024" },
  { id: "erp-poster", title: "ERP Launch â€” Internal Poster", tagline: "Internal product launch announcement creative", category: "Poster", color: "#1a150d", year: "2024" },
];

export const websites: CaseStudy[] = [
  {
    id: "suppkart",
    title: "Suppkart E-Commerce",
    tagline: "SEO-first Next.js store â€” organic traffic from day 1",
    thumb: "#0d1a0d",
    problem: "Client needed a store ranking on Google without paid ads. Previous site was slow PHP with no SEO.",
    solution: "Rebuilt on Next.js with SSG, dynamic routing, image optimization, structured data. PHP backend via REST API. Hostinger VPS.",
    result: "Page speed 91+. Indexed in 48 hours. Organic sessions from month 1.",
    stack: ["Next.js", "JavaScript", "PHP", "Hostinger VPS"],
    roles: ["Built", "Deployed"],
    liveUrl: "https://suppkart.com",
    year: "2023",
  },
  {
    id: "pal-trading",
    title: "Pal Trading Co.",
    tagline: "Professional business site â€” built and shipped in 2 days",
    thumb: "#111111",
    problem: "Local trading business needed web presence â€” contact info, product list, location map.",
    solution: "Responsive single-page site: product showcase, WhatsApp CTA, Google Maps embed, mobile-first.",
    result: "Delivered in 2 days. WhatsApp link handles 80% of client inbound inquiries.",
    stack: ["HTML", "CSS", "JavaScript"],
    roles: ["Built", "Designed", "Deployed"],
    year: "2023",
  },
];
