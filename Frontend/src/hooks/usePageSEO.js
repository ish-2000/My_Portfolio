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
 * Open Graph, and Twitter Card tags) without external dependencies.
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
  ]);
}
