export function formatIssues(audits = {}, categoryRefs = {}) {
  const categories = {
    performance: [],
    seo: [],
    accessibility: [],
    practices: [],
  };

  const categoryNames = ["performance", "seo", "accessibility", "practices"];

  const issuesById = {};

  Object.entries(audits).forEach(([auditId, audit]) => {
    if (
      !audit ||
      audit.score === 1 ||
      audit.scoreDisplayMode === "notApplicable" ||
      audit.score == null
    ) {
      return;
    }

    const description = cleanDescription(audit.description || "");

    issuesById[auditId] = {
      id: audit.id || auditId,
      title: audit.title || auditId,
      severity: getSeverity(audit.score),
      description,

      impact: getImpact(audit),
      whyItMatters: "",
      solution: "",

      files: extractFiles(audit, auditId),
      elements: extractAffectedElements(audit),
      details: extractDetails(audit),

      consoleErrors:
        auditId === "errors-in-console" ? extractConsoleErrors(audit) : [],

      displayValue: audit.displayValue || null,
      score: audit.score,
      scoreDisplayMode: audit.scoreDisplayMode || null,
      numericValue: audit.numericValue ?? null,
      lighthouseDetails: audit.details || null,
      warnings: audit.warnings || [],

      metricSavings: {
        overallSavingsMs: audit.details?.overallSavingsMs ?? null,
        overallSavingsBytes: audit.details?.overallSavingsBytes ?? null,
      },
    };
  });

  // Use Lighthouse's category references, not audit ID keywords.
  categoryNames.forEach((category) => {
    const refs = categoryRefs[category] || [];

    refs.forEach((ref) => {
      const issue = issuesById[ref.id];

      if (issue) {
        categories[category].push(issue);
      }
    });
  });

  return categories;
}

function getSeverity(score) {
  if (score <= 0.49) return "High";
  if (score < 0.9) return "Medium";
  return "Low";
}

function getImpact(audit) {
  const details = audit?.details || {};
  const parts = [];

  if (details.overallSavingsMs != null) {
    parts.push(`${details.overallSavingsMs} ms potential time savings`);
  }

  if (details.overallSavingsBytes != null) {
    const bytes = details.overallSavingsBytes;
    const formattedBytes =
      bytes >= 1024 * 1024
        ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
        : bytes >= 1024
          ? `${(bytes / 1024).toFixed(1)} KB`
          : `${bytes} bytes`;

    parts.push(`${formattedBytes} potential data savings`);
  }

  if (parts.length) {
    return parts.join(" • ");
  }

  // Lighthouse does not provide a separate impact field
  // for every audit. Preserve its actual display value.
  if (audit?.displayValue) {
    return audit.displayValue;
  }

  return audit?.description
    ? cleanDescription(audit.description)
    : "Lighthouse identified an issue with this audit.";
}

function cleanDescription(description = "") {
  return String(description)
    .replace(/\[Learn more.*?\]\(.*?\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getAuditItems(audit) {
  const items = audit?.details?.items;
  return Array.isArray(items) ? items : [];
}

function extractFiles(audit, auditId) {
  const items = getAuditItems(audit);

  // These audits report resources, not DOM selectors.
  const resourceAudits = new Set([
    "render-blocking-resources",
    "unused-css-rules",
    "unused-javascript",
    "modern-image-formats",
    "offscreen-images",
    "uses-responsive-images",
    "unminified-css",
    "unminified-javascript",
    "uses-optimized-images",
    "duplicated-javascript",
    "legacy-javascript",
  ]);

  const files = items
    .map((item) => {
      const url =
        item?.url ||
        item?.request?.url ||
        item?.sourceLocation?.url ||
        item?.source?.url ||
        "";

      if (!url || typeof url !== "string") return "";

      // Console errors can contain network/source references,
      // but they should not be presented as affected files here.
      if (auditId === "errors-in-console") return "";

      // Resource audits can report URLs directly.
      if (resourceAudits.has(auditId)) {
        return isResourceUrl(url) ? url : "";
      }

      // For other audits, only accept recognizable file paths/URLs.
      return isResourceUrl(url) ? url : "";
    })
    .filter(Boolean);

  return [...new Set(files)].slice(0, 10);
}

function isResourceUrl(value) {
  if (typeof value !== "string") return false;

  const path = value.trim();

  if (!path || path === "network") return false;

  // Accept URLs only when they look like resources, not page selectors.
  if (/^https?:\/\//i.test(path)) {
    try {
      const parsed = new URL(path);
      return (
        /\.(css|js|mjs|cjs|ts|tsx|jsx|html?|json|svg|png|jpe?g|webp|gif|woff2?|ttf|otf)(?:$|[?#])/i.test(
          parsed.pathname,
        ) || /\/_next\/static\//i.test(parsed.pathname)
      );
    } catch {
      return false;
    }
  }

  return /(?:^|[/\\])[^/\\]+\.(css|js|mjs|cjs|ts|tsx|jsx|html?|json|svg|png|jpe?g|webp|gif|woff2?|ttf|otf)(?:$|[?#])/i.test(
    path,
  );
}

function extractAffectedElements(audit) {
  return getAuditItems(audit)
    .filter((item) => {
      const node = item?.node;
      return Boolean(
        node &&
        typeof node === "object" &&
        (node.nodeLabel ||
          node.selector ||
          node.snippet ||
          node.path ||
          node.nodePath ||
          node.boundingRect),
      );
    })
    .map((item) => {
      const node = item.node;

      return {
        nodeLabel: node.nodeLabel || "",
        selector: node.selector || "",
        snippet: node.snippet || "",
        nodePath: node.path || node.nodePath || "",
        boundingRect: node.boundingRect || null,
        explanation: node.explanation || item.explanation || "",
      };
    })
    .filter((item) => item.nodeLabel || item.selector || item.snippet)
    .slice(0, 10);
}

function extractDetails(audit) {
  return getAuditItems(audit)
    .slice(0, 10)
    .map((item) => {
      const node = item?.node || {};

      return {
        // Original Lighthouse item, including resource and metric data.
        raw: item,

        // DOM information, when Lighthouse provides it.
        nodeLabel: node.nodeLabel || item.nodeLabel || "",
        selector: node.selector || item.selector || "",
        snippet: node.snippet || item.snippet || "",
        nodePath: node.path || node.nodePath || "",
        boundingRect: node.boundingRect || null,
        explanation: node.explanation || item.explanation || "",

        // Accessibility diagnostic values.
        fgColor: item.fgColor || node.fgColor || "",
        bgColor: item.bgColor || node.bgColor || "",
        contrastRatio: item.contrastRatio ?? node.contrastRatio ?? null,
        expectedContrastRatio:
          item.expectedContrastRatio ?? node.expectedContrastRatio ?? null,

        // Resource and performance values.
        url:
          item.url ||
          item.request?.url ||
          item.sourceLocation?.url ||
          item.source?.url ||
          "",
        wastedMs: item.wastedMs ?? null,
        wastedBytes: item.wastedBytes ?? null,
        totalBytes: item.totalBytes ?? null,
        transferSize: item.transferSize ?? null,
      };
    });
}

function extractConsoleErrors(audit) {
  return getAuditItems(audit)
    .map((item) => {
      const sourceLocation = item?.sourceLocation || {};

      const message =
        item?.description ||
        item?.message ||
        item?.text ||
        item?.label ||
        item?.errorMessage ||
        "";

      const source =
        sourceLocation.url ||
        item?.url ||
        item?.source ||
        item?.request?.url ||
        "";

      const line = sourceLocation.lineNumber ?? item?.lineNumber ?? null;

      const column = sourceLocation.columnNumber ?? item?.columnNumber ?? null;

      const type = item?.type || item?.category || item?.code || "";

      // Ignore empty diagnostic records.
      if (!message && !source && !type) return null;

      return {
        message: String(message || "Console error details unavailable"),
        source: typeof source === "string" ? source : "",
        type: String(type || ""),
        line,
        column,
      };
    })
    .filter(Boolean)
    .slice(0, 10);
}
