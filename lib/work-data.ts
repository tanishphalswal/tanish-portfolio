import { projects } from "./data.ts";

export type Media = { src: string; alt: string; width: number; height: number };
export type WorkCategory = "webapps" | "marketing" | "uiux" | "websites" | "graphic";
export type WorkItem = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  cover?: string;
  images?: Media[];
  liveUrl?: string;
  status?: "Live" | "In progress";
  contribution?: string;
};

export const categories: { id: WorkCategory; label: string; description: string }[] = [
  { id: "webapps", label: "Web Apps", description: "Products, dashboards, and business workflows." },
  { id: "marketing", label: "Digital Marketing", description: "Campaigns, search visibility, and content work." },
  { id: "uiux", label: "UI/UX", description: "Application interfaces and design systems." },
  { id: "websites", label: "Website Development", description: "Responsive websites and live experiences." },
  { id: "graphic", label: "Graphic Design", description: "Brand, campaign, and print visuals." },
];

export const webApps: WorkItem[] = projects.map((project) => ({
    id: project.slug,
    title: project.name,
    summary: project.description,
    tags: project.stack,
    status: project.status === "Production" ? "Live" as const : project.status,
    contribution: project.highlights[0],
  }));

export const websites: WorkItem[] = [
  {
    id: "cross-learning", title: "Cross Learning",
    summary: "Education and school robotics website covering programs, ATL labs, and enquiries.",
    tags: ["Website", "Education", "SEO"], status: "Live",
    cover: "/portfolio/websites/cross-learning/home.jpg", liveUrl: "https://crosslearning.in/",
  },
  {
    id: "calance-training", title: "Calance Training",
    summary: "Course discovery and enquiry experience for professional training.",
    tags: ["Website", "Training", "SEO"], status: "Live",
    cover: "/portfolio/websites/calance-training/home.jpg", liveUrl: "https://calancetraining.com/",
  },
  {
    id: "reality-vue", title: "Realty Vue",
    summary: "A property discovery website with listing, detail, and lead enquiry journeys.",
    tags: ["Real Estate", "Responsive UI"], status: "In progress",
  },
  {
    id: "cut-edge-technology", title: "Cut Edge Technology",
    summary: "Company website presenting software products and development services.",
    tags: ["Website", "Software", "Business"], status: "Live",
    cover: "/portfolio/websites/cut-edge-technology/home.jpg", liveUrl: "https://cutedgetechnology.com/",
  },
];

export const uiUxWork: WorkItem[] = [
  { id: "reality-vue", title: "Reality Vue", summary: "Property discovery and sales management interfaces.", tags: ["Real Estate", "Web App"], images: [] },
  { id: "random-it-solution", title: "Random IT Solution", summary: "Application interface design.", tags: ["Application", "UI/UX"], images: [] },
  { id: "leecots", title: "Leecots", summary: "Product interface design.", tags: ["Application", "UI/UX"], images: [] },
  { id: "mukherjee-global", title: "Mukherjee Global", summary: "Business interface design.", tags: ["Application", "UI/UX"], images: [] },
  { id: "hrms", title: "HRMS", summary: "Employee and admin workflow interface design.", tags: ["Dashboard", "HRMS"], images: [] },
];

export const marketingWork: WorkItem[] = [
  { id: "meta-lead-campaigns", title: "Meta Lead Campaigns", summary: "Offer creatives, audience planning, and lead-generation campaign setup for IT services.", tags: ["Meta Ads", "Lead Generation"], images: [] },
  { id: "search-visibility", title: "Search Visibility", summary: "Technical and on-page SEO work across education and training websites.", tags: ["SEO", "Local Search"], images: [] },
];

// Add approved artwork here with its original pixel dimensions. The gallery
// preserves each image's aspect ratio and only loads full media when opened.
export const graphicWork: WorkItem[] = [];
