export function formatIssues(audits = {}) {
  const categories = {
    performance: [],
    seo: [],
    accessibility: [],
    practices: [],
  };

  // ONLY ACTIONABLE AUDITS
  const actionableAudits = [
    "render-blocking-resources",
    "unused-css-rules",
    "unused-javascript",
    "modern-image-formats",
    "offscreen-images",
    "uses-responsive-images",
    "unminified-css",
    "unminified-javascript",
    "server-response-time",
    "redirects",
    "uses-text-compression",
    "uses-optimized-images",
    "largest-contentful-paint-element",
    "bootup-time",
    "dom-size",
    "duplicated-javascript",
    "legacy-javascript",
    "meta-description",
    "document-title",
    "html-has-lang",
    "link-name",
    "image-alt",
    "color-contrast",
    "aria-allowed-attr",
    "aria-hidden-body",
    "button-name",
    "is-on-https",
    "errors-in-console",
    "no-vulnerable-libraries",
  ];

  Object.entries(audits).forEach(([auditId, audit]) => {
    // Skip passed audits
    if (
      audit.score === 1 ||
      audit.scoreDisplayMode === "notApplicable"
    ) {
      return;
    }

    // Ignore non actionable audits
    if (!actionableAudits.includes(auditId)) {
      return;
    }

    const issue = {
  id: auditId,

  title: audit.title || "Unknown Issue",

  severity:
    audit.score !== null && audit.score < 0.5
      ? "High"
      : "Medium",

  description: cleanDescription(audit.description),

  files: extractFiles(audit),

  impact: getImpact(auditId),

  solution: getSolution(auditId),

  displayValue: audit.displayValue || null,

  score: audit.score,

  numericValue: audit.numericValue || null,

  details: extractDetails(audit),
};

    // SEO
    if (
      auditId.includes("meta") ||
      auditId.includes("title") ||
      auditId.includes("html")
    ) {
      categories.seo.push(issue);
    }

    // ACCESSIBILITY
    else if (
      auditId.includes("aria") ||
      auditId.includes("contrast") ||
      auditId.includes("alt") ||
      auditId.includes("button") ||
      auditId.includes("link")
    ) {
      categories.accessibility.push(issue);
    }

    // BEST PRACTICES
    else if (
      auditId.includes("https") ||
      auditId.includes("errors") ||
      auditId.includes("vulnerable")
    ) {
      categories.practices.push(issue);
    }

    // PERFORMANCE
    else {
      categories.performance.push(issue);
    }
  });

  return categories;
}

function cleanDescription(description = "") {
  return description
    .replace(/\[Learn more.*?\]\(.*?\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFiles(audit) {
  if (!audit.details?.items) {
    return ["Website Page"];
  }

  const urls = [];

  audit.details.items.forEach((item) => {
    Object.values(item).forEach((value) => {
      if (
        typeof value === "string" &&
        (value.startsWith("http") ||
          value.includes(".js") ||
          value.includes(".css") ||
          value.includes(".png") ||
          value.includes(".jpg") ||
          value.includes(".webp"))
      ) {
        urls.push(value);
      }
    });
  });

  return urls.length
    ? [...new Set(urls)].slice(0, 5)
    : ["Website Page"];
}
function extractDetails(audit) {
  if (!audit.details?.items) {
    return [];
  }

  return audit.details.items.slice(0, 5).map((item) => {
    const cleaned = {};

    Object.entries(item).forEach(([key, value]) => {
      if (
        typeof value === "string" ||
        typeof value === "number"
      ) {
        cleaned[key] = value;
      }
    });

    return cleaned;
  });
}

function getImpact(id) {
  const impacts = {
    "render-blocking-resources":
      "Render blocking files delay page visibility and reduce loading speed.",

    "unused-css-rules":
      "Unused CSS increases page size and slows down rendering.",

    "unused-javascript":
      "Unused JavaScript increases bundle size and blocks the main thread.",

    "modern-image-formats":
      "Old image formats increase page weight and loading time.",

    "offscreen-images":
      "Loading hidden images wastes bandwidth and affects performance.",

    "uses-responsive-images":
      "Large images on small screens increase loading time.",

    "server-response-time":
      "Slow server response increases initial loading delays.",

    "meta-description":
      "Missing meta descriptions can reduce SEO rankings and CTR.",

    "document-title":
      "Missing titles reduce SEO relevance and accessibility.",

    "image-alt":
      "Images without alt text reduce accessibility for screen readers.",

    "color-contrast":
      "Low contrast text affects readability and WCAG compliance.",

    "errors-in-console":
      "Console errors can break functionality and reduce user trust.",

    "is-on-https":
      "Non-HTTPS websites are considered insecure by browsers.",
  };

  return (
    impacts[id] ||
    "This issue may negatively affect website quality and user experience."
  );
}

function getSolution(id) {
  const solutions = {
    "render-blocking-resources":
      "Defer non-critical CSS and JavaScript, preload important assets and reduce blocking resources.",

    "unused-css-rules":
      "Remove unused CSS using tools like PurgeCSS or Tailwind content optimization.",

    "unused-javascript":
      "Use code splitting, dynamic imports and remove unused libraries.",

    "modern-image-formats":
      "Convert images to WebP or AVIF for better compression and performance.",

    "offscreen-images":
      "Lazy load below-the-fold images using loading='lazy'.",

    "uses-responsive-images":
      "Serve responsive images using srcset and properly sized dimensions.",

    "unminified-css":
      "Minify CSS files before production deployment.",

    "unminified-javascript":
      "Minify JavaScript bundles to reduce transfer size.",

    "server-response-time":
      "Optimize APIs, database queries and enable caching/CDN.",

    redirects:
      "Reduce unnecessary redirects to improve loading speed.",

    "uses-text-compression":
      "Enable GZIP or Brotli compression on the server.",

    "largest-contentful-paint-element":
      "Optimize hero images, preload important assets and reduce render delays.",

    "bootup-time":
      "Reduce heavy JavaScript execution and split large bundles.",

    "dom-size":
      "Reduce excessive DOM nodes and simplify layouts.",

    "duplicated-javascript":
      "Remove duplicate JS modules and optimize dependencies.",

    "legacy-javascript":
      "Serve modern JavaScript bundles for newer browsers.",

    "meta-description":
      "Add unique keyword-focused meta descriptions for every page.",

    "document-title":
      "Add descriptive and unique title tags for all pages.",

    "html-has-lang":
      "Add a valid lang attribute to the html tag.",

    "link-name":
      "Ensure all links contain readable accessible text.",

    "image-alt":
      "Add meaningful alt text to all important images.",

    "color-contrast":
      "Increase foreground/background contrast to meet WCAG standards.",

    "aria-allowed-attr":
      "Use only valid ARIA attributes according to accessibility guidelines.",

    "aria-hidden-body":
      "Avoid hiding important body content from screen readers.",

    "button-name":
      "Provide accessible labels for all buttons.",

    "is-on-https":
      "Enable HTTPS using SSL certificates for secure communication.",

    "errors-in-console":
      "Fix browser console errors and failing scripts.",

    "no-vulnerable-libraries":
      "Update outdated libraries with known security vulnerabilities.",
  };

  return (
    solutions[id] ||
    "Review Lighthouse recommendations and optimize accordingly."
  );
}