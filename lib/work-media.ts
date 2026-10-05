import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { graphicWork, marketingWork, uiUxWork, type Media, type WorkItem } from "./work-data.ts";

const IMAGE_EXTENSIONS = /\.(avif|jpe?g|png|webp)$/i;

function label(value: string) {
  if (value.toLowerCase() === "hrms") return "HRMS";
  return value
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export async function scanMedia(publicRoot: string, relativeDir: string): Promise<Media[]> {
  const folder = path.join(publicRoot, "portfolio", relativeDir);
  let entries;
  try {
    entries = await readdir(folder, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const files = entries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.test(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
  const parent = label(path.basename(relativeDir));

  const media = await Promise.all(files.map(async (file) => {
    try {
      const { width, height } = await sharp(path.join(folder, file.name)).metadata();
      if (!width || !height) return null;
      const name = label(path.parse(file.name).name);
      const src = "/portfolio/" + [...relativeDir.split("/"), file.name]
        .map(encodeURIComponent).join("/");
      return { src, alt: `${parent} — ${name}`, width, height };
    } catch {
      return null;
    }
  }));
  return media.filter((item): item is Media => item !== null);
}

export async function loadWorkMedia(publicRoot = path.join(process.cwd(), "public")): Promise<{
  uiUxWork: WorkItem[];
  marketingWork: WorkItem[];
  graphicWork: WorkItem[];
}> {
  const [ui, marketing, graphics] = await Promise.all([
    Promise.all(uiUxWork.map(async (item) => ({
      ...item, images: await scanMedia(publicRoot, `ui-ux/${item.id}`),
    }))),
    Promise.all(marketingWork.map(async (item) => ({
      ...item, images: await scanMedia(publicRoot, `digital-marketing/${item.id}`),
    }))),
    Promise.all(["branding", "social-media", "print", "other"].map(async (category) => {
      const images = await scanMedia(publicRoot, `graphic-design/${category}`);
      return images.map((image) => ({
        id: image.src,
        title: label(path.parse(decodeURIComponent(image.src)).name),
        summary: label(category),
        tags: [label(category)],
        images: [image],
      }));
    })),
  ]);

  return { uiUxWork: ui, marketingWork: marketing, graphicWork: [...graphicWork, ...graphics.flat()] };
}
