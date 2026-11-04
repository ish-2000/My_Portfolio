import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const distDir = path.join(projectRoot, "dist");
const indexHtmlPath = path.join(distDir, "index.html");
const publicOgImagePath = path.join(publicDir, "og-image.png");
const distOgImagePath = path.join(distDir, "og-image.png");

const homepageMetadata = {
  title: "Ishara Udayanga | Full Stack Developer & Designer",
  description:
    "Explore the portfolio of Ishara Udayanga, a full-stack developer and product designer based in Sri Lanka. Discover web applications, UI/UX design and projects.",
  canonical: "https://ishara.live/",
  ogType: "website",
  ogSiteName: "Ishara Udayanga",
  ogTitle: "Ishara Udayanga | Full Stack Developer & Designer",
  ogDescription:
    "Explore the portfolio of Ishara Udayanga, a full-stack developer and product designer based in Sri Lanka. Discover web applications, UI/UX design and projects.",
  ogUrl: "https://ishara.live/",
  ogImage: "https://ishara.live/og-image.png",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  ogImageAlt: "Ishara Udayanga — Full Stack Developer & Designer",
  twitterCard: "summary_large_image",
  twitterTitle: "Ishara Udayanga | Full Stack Developer & Designer",
  twitterDescription:
    "Explore my full-stack development, design and digital product projects.",
  twitterImage: "https://ishara.live/og-image.png",
  twitterImageAlt: "Ishara Udayanga — Full Stack Developer & Designer",
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ishara.live/#person",
      "name": "Ishara Udayanga",
      "url": "https://ishara.live/",
      "image": "https://ishara.live/og-image.png",
      "jobTitle": "Full Stack Developer & Designer",
      "description":
        "Full-stack developer and product designer based in Sri Lanka.",
      "sameAs": [
        "https://github.com/ish-2000",
        "https://www.linkedin.com/in/ishara-athapaththu-548840320",
        "https://www.instagram.com/ish_ar_a",
      ],
      "knowsAbout": [
        "Web Development",
        "User Interface Design",
        "User Experience Design",
        "Full-Stack Development",
        "React",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Figma",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ishara.live/#website",
      "url": "https://ishara.live/",
      "name": "Ishara Udayanga",
      "description": "Personal portfolio of Ishara Udayanga.",
      "publisher": {
        "@id": "https://ishara.live/#person",
      },
    },
  ],
};

const contactMetadata = {
  title: "Contact Ishara Udayanga | Web Developer & Designer",
  description:
    "Get in touch with Ishara Udayanga for web development, digital product design and collaboration opportunities.",
  canonical: "https://ishara.live/lets-talk",
  ogType: "website",
  ogSiteName: "Ishara Udayanga",
  ogTitle: "Contact Ishara Udayanga | Web Developer & Designer",
  ogDescription:
    "Get in touch with Ishara Udayanga for web development, digital product design and collaboration opportunities.",
  ogUrl: "https://ishara.live/lets-talk",
  ogImage: "https://ishara.live/og-image.png",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  ogImageAlt: "Ishara Udayanga — Full Stack Developer & Designer",
  twitterCard: "summary_large_image",
  twitterTitle: "Contact Ishara Udayanga | Web Developer & Designer",
  twitterDescription:
    "Let's connect and discuss web development, digital products, and collaboration opportunities.",
  twitterImage: "https://ishara.live/og-image.png",
  twitterImageAlt: "Ishara Udayanga — Full Stack Developer & Designer",
};

const letsTalkSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://ishara.live/lets-talk#webpage",
      "url": "https://ishara.live/lets-talk",
      "name": "Contact Ishara Udayanga",
      "description":
        "Get in touch for web development, digital product design, and collaboration opportunities.",
      "isPartOf": {
        "@id": "https://ishara.live/#website",
      },
      "about": {
        "@id": "https://ishara.live/#person",
      },
    },
  ],
};

function readPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  const isPng =
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a;
  if (!isPng) {
    throw new Error(`File at ${filePath} is not a valid PNG image.`);
  }
  // IHDR width at offset 16, height at offset 20 (big-endian 32-bit unsigned integers)
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

function countMatches(str, regex) {
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

function prerenderSEO() {
  console.log(
    "[SEO Prerender] Starting lightweight HTML shell generation with Social & JSON-LD Structured Data...",
  );

  // 1. Verify OG preview image exists in public and dist
  if (!fs.existsSync(publicOgImagePath)) {
    console.error(
      `[SEO Prerender Error] Required OG image missing at: ${publicOgImagePath}`,
    );
    process.exit(1);
  }

  const { width: ogWidth, height: ogHeight } =
    readPngDimensions(publicOgImagePath);
  const ogStats = fs.statSync(publicOgImagePath);
  console.log(
    `[SEO Prerender] public/og-image.png verified: ${ogWidth}x${ogHeight} px, ${(ogStats.size / 1024).toFixed(1)} KB`,
  );

  if (!fs.existsSync(distOgImagePath)) {
    console.warn(
      `[SEO Prerender] dist/og-image.png not found. Copying from public...`,
    );
    fs.copyFileSync(publicOgImagePath, distOgImagePath);
  }

  // 2. Verify dist/index.html exists
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(
      `[SEO Prerender Error] dist/index.html not found at: ${indexHtmlPath}`,
    );
    process.exit(1);
  }

  const html = fs.readFileSync(indexHtmlPath, "utf8");

  // 3. Validate essential elements in the template
  if (!html.includes('id="root"')) {
    console.error(
      '[SEO Prerender Error] Root mounting container (<div id="root">) not found in index.html.',
    );
    process.exit(1);
  }

  // Verify Vite JS & CSS bundles are preserved
  if (
    !html.includes('<script type="module"') ||
    !html.includes('rel="stylesheet"')
  ) {
    console.error(
      "[SEO Prerender Error] Vite script or stylesheet references missing from dist/index.html.",
    );
    process.exit(1);
  }

  // Verify assets are root-relative (no relative ./assets paths)
  if (/(src|href)=["']\.\/assets\//i.test(html)) {
    console.error(
      "[SEO Prerender Error] Relative asset reference (./assets/) detected in template HTML. Assets must be root-relative.",
    );
    process.exit(1);
  }

  // Verify Favicon MIME type is correctly image/png
  if (html.includes('type="image/svg+xml"')) {
    console.error(
      '[SEO Prerender Error] Favicon declares incorrect MIME type "image/svg+xml" for a PNG asset. Must be "image/png".',
    );
    process.exit(1);
  }
  const faviconRegex = /<link\s+[^>]*?rel=["']icon["'][^>]*?type=["']image\/png["'][^>]*?>/i;
  if (!faviconRegex.test(html)) {
    console.error(
      '[SEO Prerender Error] Favicon with type="image/png" not found in dist/index.html.',
    );
    process.exit(1);
  }

  // Regex patterns supporting any attribute order, multiline spacing and quotes
  const titleRegex = /<title>[\s\S]*?<\/title>/i;
  const descRegex = /<meta\s+[^>]*?name=["']description["'][^>]*?>/i;
  const canonicalRegex = /<link\s+[^>]*?rel=["']canonical["'][^>]*?>/i;

  const ogTypeRegex = /<meta\s+[^>]*?property=["']og:type["'][^>]*?>/i;
  const ogSiteNameRegex = /<meta\s+[^>]*?property=["']og:site_name["'][^>]*?>/i;
  const ogTitleRegex = /<meta\s+[^>]*?property=["']og:title["'][^>]*?>/i;
  const ogDescRegex = /<meta\s+[^>]*?property=["']og:description["'][^>]*?>/i;
  const ogUrlRegex = /<meta\s+[^>]*?property=["']og:url["'][^>]*?>/i;
  const ogImageRegex = /<meta\s+[^>]*?property=["']og:image["'][^>]*?>/i;
  const ogImageWidthRegex =
    /<meta\s+[^>]*?property=["']og:image:width["'][^>]*?>/i;
  const ogImageHeightRegex =
    /<meta\s+[^>]*?property=["']og:image:height["'][^>]*?>/i;
  const ogImageAltRegex =
    /<meta\s+[^>]*?property=["']og:image:alt["'][^>]*?>/i;

  const twitterCardRegex = /<meta\s+[^>]*?name=["']twitter:card["'][^>]*?>/i;
  const twitterTitleRegex = /<meta\s+[^>]*?name=["']twitter:title["'][^>]*?>/i;
  const twitterDescRegex =
    /<meta\s+[^>]*?name=["']twitter:description["'][^>]*?>/i;
  const twitterImageRegex = /<meta\s+[^>]*?name=["']twitter:image["'][^>]*?>/i;
  const twitterImageAltRegex =
    /<meta\s+[^>]*?name=["']twitter:image:alt["'][^>]*?>/i;

  const jsonLdRegex =
    /<script\s+[^>]*?type=["']application\/ld\+json["'][^>]*?>([\s\S]*?)<\/script>/i;

  const requiredRegexes = [
    { name: "<title>", regex: titleRegex },
    { name: "meta description", regex: descRegex },
    { name: "link canonical", regex: canonicalRegex },
    { name: "og:type", regex: ogTypeRegex },
    { name: "og:site_name", regex: ogSiteNameRegex },
    { name: "og:title", regex: ogTitleRegex },
    { name: "og:description", regex: ogDescRegex },
    { name: "og:url", regex: ogUrlRegex },
    { name: "og:image", regex: ogImageRegex },
    { name: "og:image:width", regex: ogImageWidthRegex },
    { name: "og:image:height", regex: ogImageHeightRegex },
    { name: "og:image:alt", regex: ogImageAltRegex },
    { name: "twitter:card", regex: twitterCardRegex },
    { name: "twitter:title", regex: twitterTitleRegex },
    { name: "twitter:description", regex: twitterDescRegex },
    { name: "twitter:image", regex: twitterImageRegex },
    { name: "twitter:image:alt", regex: twitterImageAltRegex },
    { name: "JSON-LD structured data script", regex: jsonLdRegex },
  ];

  // 4. Validate homepage template tags exist and have zero duplicates
  for (const item of requiredRegexes) {
    const count = countMatches(html, new RegExp(item.regex.source, "gi"));
    if (count !== 1) {
      console.error(
        `[SEO Prerender Error] Template index.html must have exactly 1 ${item.name}, found ${count}.`,
      );
      process.exit(1);
    }
  }

  // Validate homepage JSON-LD parses correctly and has Person & WebSite
  const homeJsonLdMatch = html.match(jsonLdRegex);
  try {
    const parsedHomeJsonLd = JSON.parse(homeJsonLdMatch[1]);
    const graph = parsedHomeJsonLd["@graph"] || [parsedHomeJsonLd];
    const hasPerson = graph.some((item) => item["@type"] === "Person");
    const hasWebSite = graph.some((item) => item["@type"] === "WebSite");
    if (!hasPerson || !hasWebSite) {
      console.error(
        "[SEO Prerender Error] Homepage JSON-LD must contain both Person and WebSite entities.",
      );
      process.exit(1);
    }
    console.log(
      "[SEO Prerender] Homepage JSON-LD verified: Person and WebSite entities present and valid.",
    );
  } catch (err) {
    console.error(
      "[SEO Prerender Error] Homepage JSON-LD is not valid JSON:",
      err.message,
    );
    process.exit(1);
  }

  // 5. Generate Contact page HTML shell
  let contactHtml = html;

  contactHtml = contactHtml.replace(
    titleRegex,
    `<title>${contactMetadata.title}</title>`,
  );

  contactHtml = contactHtml.replace(
    descRegex,
    `<meta name="description" content="${contactMetadata.description}" />`,
  );

  contactHtml = contactHtml.replace(
    canonicalRegex,
    `<link rel="canonical" href="${contactMetadata.canonical}" />`,
  );

  contactHtml = contactHtml.replace(
    ogTitleRegex,
    `<meta property="og:title" content="${contactMetadata.ogTitle}" />`,
  );

  contactHtml = contactHtml.replace(
    ogDescRegex,
    `<meta property="og:description" content="${contactMetadata.ogDescription}" />`,
  );

  contactHtml = contactHtml.replace(
    ogUrlRegex,
    `<meta property="og:url" content="${contactMetadata.ogUrl}" />`,
  );

  contactHtml = contactHtml.replace(
    twitterTitleRegex,
    `<meta name="twitter:title" content="${contactMetadata.twitterTitle}" />`,
  );

  contactHtml = contactHtml.replace(
    twitterDescRegex,
    `<meta name="twitter:description" content="${contactMetadata.twitterDescription}" />`,
  );

  // Replace Homepage JSON-LD with ContactPage JSON-LD
  const contactJsonLdString = JSON.stringify(letsTalkSchema, null, 2);
  contactHtml = contactHtml.replace(
    jsonLdRegex,
    `<script type="application/ld+json" id="schema-jsonld">\n${contactJsonLdString}\n    </script>`,
  );

  // 6. Verify Contact HTML tags exist and have zero duplicates
  for (const item of requiredRegexes) {
    const count = countMatches(
      contactHtml,
      new RegExp(item.regex.source, "gi"),
    );
    if (count !== 1) {
      console.error(
        `[SEO Prerender Error] Generated contact HTML must have exactly 1 ${item.name}, found ${count}.`,
      );
      process.exit(1);
    }
  }

  // Validate ContactPage JSON-LD parses correctly and has ContactPage
  const contactJsonLdMatch = contactHtml.match(jsonLdRegex);
  try {
    const parsedContactJsonLd = JSON.parse(contactJsonLdMatch[1]);
    const graph = parsedContactJsonLd["@graph"] || [parsedContactJsonLd];
    const contactEntity = graph.find(
      (item) => item["@type"] === "ContactPage",
    );
    if (!contactEntity) {
      console.error(
        "[SEO Prerender Error] ContactPage JSON-LD must contain ContactPage entity.",
      );
      process.exit(1);
    }
    if (
      contactEntity.isPartOf?.["@id"] !== "https://ishara.live/#website" ||
      contactEntity.about?.["@id"] !== "https://ishara.live/#person"
    ) {
      console.error(
        "[SEO Prerender Error] ContactPage entity references are invalid or missing.",
      );
      process.exit(1);
    }
    console.log(
      "[SEO Prerender] ContactPage JSON-LD verified: ContactPage entity present with valid references.",
    );
  } catch (err) {
    console.error(
      "[SEO Prerender Error] ContactPage JSON-LD is not valid JSON:",
      err.message,
    );
    process.exit(1);
  }

  // 7. Verify contact metadata values are actually present in contactHtml
  if (
    !contactHtml.includes(contactMetadata.title) ||
    !contactHtml.includes(contactMetadata.description) ||
    !contactHtml.includes(contactMetadata.canonical) ||
    !contactHtml.includes(contactMetadata.ogTitle) ||
    !contactHtml.includes(contactMetadata.ogDescription) ||
    !contactHtml.includes(contactMetadata.ogUrl) ||
    !contactHtml.includes(contactMetadata.twitterTitle) ||
    !contactHtml.includes(contactMetadata.twitterDescription)
  ) {
    console.error(
      "[SEO Prerender Error] Generated contact HTML does not contain all expected metadata values.",
    );
    process.exit(1);
  }

  // 8. Write to dist/lets-talk/index.html (directory index shell)
  const letsTalkDir = path.join(distDir, "lets-talk");
  if (!fs.existsSync(letsTalkDir)) {
    fs.mkdirSync(letsTalkDir, { recursive: true });
  }

  const letsTalkIndexPath = path.join(letsTalkDir, "index.html");
  fs.writeFileSync(letsTalkIndexPath, contactHtml, "utf8");
  console.log(
    `[SEO Prerender] Successfully generated: dist/lets-talk/index.html`,
  );

  // 9. Also write to dist/lets-talk.html (clean URL direct match fallback)
  const letsTalkCleanPath = path.join(distDir, "lets-talk.html");
  fs.writeFileSync(letsTalkCleanPath, contactHtml, "utf8");
  console.log(`[SEO Prerender] Successfully generated: dist/lets-talk.html`);

  console.log(
    "[SEO Prerender] All Open Graph, Twitter Card, Favicon, and JSON-LD Structured Data successfully validated and emitted.",
  );
}

prerenderSEO();
