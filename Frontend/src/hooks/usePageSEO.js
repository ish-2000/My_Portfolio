import { useEffect } from "react";

/**
 * Custom lightweight hook to manage route-specific metadata (title, meta description, and canonical link)
 * without external dependencies.
 *
 * It updates existing head elements in place to prevent duplicate tags during client-side navigation.
 */
export default function usePageSEO({ title, description, canonical }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }

    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }
  }, [title, description, canonical]);
}

