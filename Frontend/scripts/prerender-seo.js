import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const indexHtmlPath = path.join(distDir, "index.html");

const homepageMetadata = {
  title: "Ishara Udayanga | Full Stack Developer & Designer",
  canonical: "https://ishara.live/",
};

const contactMetadata = {
  title: "Contact Ishara Udayanga | Web Developer & Designer",
  description:
    "Get in touch with Ishara Udayanga for web development, digital product design and collaboration opportunities.",
  canonical: "https://ishara.live/lets-talk",
};

function prerenderSEO() {
  console.log("[SEO Prerender] Starting lightweight HTML shell generation...");

  // 1. Verify dist/index.html exists
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`[SEO Prerender Error] dist/index.html not found at: ${indexHtmlPath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(indexHtmlPath, "utf8");

  // 2. Validate essential elements in the template
  if (!html.includes('id="root"')) {
    console.error('[SEO Prerender Error] Root mounting container (<div id="root">) not found in index.html.');
    process.exit(1);
  }

  // Verify Vite JS & CSS bundles are preserved
  if (!html.includes('<script type="module"') || !html.includes('rel="stylesheet"')) {
    console.error("[SEO Prerender Error] Vite script or stylesheet references missing from dist/index.html.");
    process.exit(1);
  }

  // Verify assets are root-relative (no relative ./assets paths)
  if (/(src|href)=["']\.\/assets\//i.test(html)) {
    console.error("[SEO Prerender Error] Relative asset reference (./assets/) detected in template HTML. Assets must be root-relative.");
    process.exit(1);
  }

  // Regex patterns supporting any attribute order and whitespace/newlines
  const titleRegex = /<title>[\s\S]*?<\/title>/i;
  const descRegex = /<meta\s+[^>]*?name=["']description["'][^>]*?>/i;
  const canonicalRegex = /<link\s+[^>]*?rel=["']canonical["'][^>]*?>/i;

  if (!titleRegex.test(html)) {
    console.error("[SEO Prerender Error] <title> tag not found in template index.html.");
    process.exit(1);
  }

  if (!descRegex.test(html)) {
    console.error("[SEO Prerender Error] meta description tag not found in template index.html.");
    process.exit(1);
  }

  if (!canonicalRegex.test(html)) {
    console.error("[SEO Prerender Error] link rel=canonical tag not found in template index.html.");
    process.exit(1);
  }

  // 3. Verify Homepage metadata in template
  if (!html.includes(homepageMetadata.title)) {
    console.warn(`[SEO Prerender Warning] dist/index.html title does not match expected homepage title: "${homepageMetadata.title}"`);
  }
  if (!html.includes(homepageMetadata.canonical)) {
    console.warn(`[SEO Prerender Warning] dist/index.html canonical does not match expected homepage canonical: "${homepageMetadata.canonical}"`);
  }

  // 4. Generate Contact page HTML shell
  let contactHtml = html;

  contactHtml = contactHtml.replace(
    titleRegex,
    `<title>${contactMetadata.title}</title>`
  );

  contactHtml = contactHtml.replace(
    descRegex,
    `<meta name="description" content="${contactMetadata.description}" />`
  );

  contactHtml = contactHtml.replace(
    canonicalRegex,
    `<link rel="canonical" href="${contactMetadata.canonical}" />`
  );

  // 5. Verify no duplicate tags in generated contactHtml
  const titleMatches = contactHtml.match(/<title>[\s\S]*?<\/title>/gi) || [];
  const descMatches = contactHtml.match(/<meta\s+[^>]*?name=["']description["'][^>]*?>/gi) || [];
  const canonicalMatches = contactHtml.match(/<link\s+[^>]*?rel=["']canonical["'][^>]*?>/gi) || [];

  if (titleMatches.length !== 1) {
    console.error(`[SEO Prerender Error] Expected exactly 1 <title>, found ${titleMatches.length}.`);
    process.exit(1);
  }

  if (descMatches.length !== 1) {
    console.error(`[SEO Prerender Error] Expected exactly 1 meta description, found ${descMatches.length}.`);
    process.exit(1);
  }

  if (canonicalMatches.length !== 1) {
    console.error(`[SEO Prerender Error] Expected exactly 1 canonical link, found ${canonicalMatches.length}.`);
    process.exit(1);
  }

  // Verify contact metadata values are actually present in contactHtml
  if (!contactHtml.includes(contactMetadata.title) ||
      !contactHtml.includes(contactMetadata.description) ||
      !contactHtml.includes(contactMetadata.canonical)) {
    console.error("[SEO Prerender Error] Generated contact HTML does not contain expected metadata values.");
    process.exit(1);
  }

  // 6. Write to dist/lets-talk/index.html (directory index shell)
  const letsTalkDir = path.join(distDir, "lets-talk");
  if (!fs.existsSync(letsTalkDir)) {
    fs.mkdirSync(letsTalkDir, { recursive: true });
  }

  const letsTalkIndexPath = path.join(letsTalkDir, "index.html");
  fs.writeFileSync(letsTalkIndexPath, contactHtml, "utf8");
  console.log(`[SEO Prerender] Successfully generated: dist/lets-talk/index.html`);

  // 7. Also write to dist/lets-talk.html (clean URL direct match fallback)
  const letsTalkCleanPath = path.join(distDir, "lets-talk.html");
  fs.writeFileSync(letsTalkCleanPath, contactHtml, "utf8");
  console.log(`[SEO Prerender] Successfully generated: dist/lets-talk.html`);

  console.log("[SEO Prerender] Verification complete. Route metadata successfully emitted.");
}

prerenderSEO();
