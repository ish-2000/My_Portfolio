import { useEffect } from "react";

function setMetaTag(attrName, attrVal, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

/**
 * Custom lightweight hook to manage route-specific metadata (title, meta description, canonical link,
 * Open Graph, Twitter Card tags, and JSON-LD structured data) without external dependencies.
 *
 * It updates existing head elements in place to prevent duplicate tags during client-side navigation.
 */
export default function usePageSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema,
}) {
  useEffect(() => {
    // Document Title
    if (title) {
      document.title = title;
    }

    // Standard Meta Description
    if (description) {
      setMetaTag("name", "description", description);
    }

    // Canonical Link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // Open Graph Tags
    setMetaTag("property", "og:title", ogTitle || title);
    setMetaTag("property", "og:description", ogDescription || description);
    setMetaTag("property", "og:url", ogUrl || canonical);
    if (ogImage) {
      setMetaTag("property", "og:image", ogImage);
    }

    // Twitter Card Tags
    setMetaTag("name", "twitter:title", twitterTitle || ogTitle || title);
    setMetaTag("name", "twitter:description", twitterDescription || ogDescription || description);
    if (twitterImage || ogImage) {
      setMetaTag("name", "twitter:image", twitterImage || ogImage);
    }

    // JSON-LD Structured Data
    if (schema) {
      let script = document.getElementById("schema-jsonld");
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("id", "schema-jsonld");
        document.head.appendChild(script);
      }
      const jsonString =
        typeof schema === "string" ? schema : JSON.stringify(schema, null, 2);
      script.textContent = jsonString;
    }
  }, [
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    schema,
  ]);
}
