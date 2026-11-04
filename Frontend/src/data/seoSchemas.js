export const homeSchema = {
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

export const letsTalkSchema = {
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

