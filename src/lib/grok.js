import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// =======================================
// AI MODEL FALLBACK CONFIGURATION
// =======================================

const AI_MODELS = [
  "openai/gpt-oss-120b", // Primary model
  "openai/gpt-oss-20b", // Fallback model
];

function prepareIssuesForAI(page) {
  const categories = ["performance", "seo", "accessibility", "practices"];

  const result = {};

  for (const category of categories) {
    result[category] = (page.issues?.[category] || []).map((issue) => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      score: issue.score,
      severity: issue.severity,
      displayValue: issue.displayValue,
      impact: issue.impact,
      whyItMatters: issue.whyItMatters,
      solution: issue.solution,
      priority: issue.priority,

      files: (issue.files || []).slice(0, 5),

      elements: (issue.elements || []).slice(0, 5).map((element) => ({
        nodeLabel: element.nodeLabel,
        selector: element.selector,
        snippet: element.snippet,
        explanation: element.explanation,
      })),

      details: (issue.details || []).slice(0, 3).map((detail) => ({
        selector: detail.selector,
        snippet: detail.snippet,
        explanation: detail.explanation,
        url: detail.url,
        wastedMs: detail.wastedMs,
        wastedBytes: detail.wastedBytes,
        contrastRatio: detail.contrastRatio,
        expectedContrastRatio: detail.expectedContrastRatio,
      })),

      metricSavings: issue.metricSavings,
    }));
  }

  return result;
}

async function generateIssueAnalysis(category, issues, framework) {
  if (!issues.length) {
    return `No failed ${category} audits were detected.`;
  }

  const batchSize = 3;
  const results = [];

  for (let i = 0; i < issues.length; i += batchSize) {
    const batch = issues.slice(i, i + batchSize);

    const prompt = `
You are a senior website optimization engineer.

Analyze the following Lighthouse issues.

FRAMEWORK:
${framework}

CATEGORY:
${category}

ISSUES:
${JSON.stringify(batch, null, 2)}

For EVERY issue, use this structure:

### Issue Title

#### Problem Explanation
Explain exactly what Lighthouse detected.

#### Root Cause
Explain the technical reason behind the issue.

#### Where the Issue Exists
Mention only supplied files, URLs, selectors, or elements.
If unavailable, explain what needs inspection.

#### Technical Impact
Explain the direct technical consequence.
Do not discuss general business or user impact here.

#### Why It Matters
Explain the specific consequence for visitors, accessibility,
search visibility, or website reliability.

#### Step-by-Step Solution
Give practical steps to fix this particular issue.

#### Bad Example
Provide a relevant incorrect example when useful.

#### Optimized Example
Provide a corrected framework-specific example.

#### Additional Recommendations
Include only useful recommendations not already covered
in the solution.

#### Estimated Improvement
Describe the expected direction of improvement.
Do not invent numerical savings or guarantee results.

STRICT ANTI-REPETITION RULES:

1. Do not repeat the same explanation in multiple sections.
2. Problem Explanation describes WHAT Lighthouse detected.
3. Root Cause explains WHY it happens technically.
4. Technical Impact explains the direct technical consequence.
5. Why It Matters explains the real-world consequence.
6. Solution explains HOW to fix it.
7. Additional Recommendations must add genuinely new information.
8. Do not repeat the same fix for different issues.
9. If two issues share a root cause, explain the shared cause briefly
   and focus each solution on its unique requirement.
10. Do not repeat Lighthouse descriptions word for word.
11. Do not invent files, selectors, metrics, or measurements.
12. Do not skip any supplied issue.

Use concise, professional Markdown.
Return only this batch's issue analysis.
`;

    const response = await generateCompletion(prompt, {
      maxTokens: 2500,
      temperature: 0.2,
    });

    results.push(response);
  }

  return results.join("\n\n");
}

// =======================================
// GENERATE COMPLETION WITH FALLBACK
// =======================================

async function generateCompletion(prompt, options = {}) {
  let lastError;

  for (const model of AI_MODELS) {
    try {
      console.log(`Trying AI model: ${model}`);

      const completion = await groq.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a senior website performance engineer, Lighthouse expert, Core Web Vitals specialist, SEO optimization expert, and frontend architecture consultant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 3000,
        ...(options.json ? { response_format: { type: "json_object" } } : {}),
      });

      const content = completion.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error(`${model} returned an empty response.`);
      }

      console.log(`AI report generated using ${model}`);

      return content;
    } catch (error) {
      lastError = error;

      console.error(`${model} failed:`, error.message);

      // A 413 means the request itself is too large.
      // Do not retry the same oversized request.
      if (error.status === 413) {
        throw new Error(
          "AI request exceeded the model token limit. Reduce the prompt size or split the report into smaller requests.",
        );
      }

      const shouldFallback =
        error.status === 404 ||
        error.code === "model_not_found" ||
        error.status === 429 ||
        error.status >= 500;

      if (!shouldFallback) {
        throw error;
      }
    }
  }

  throw new Error(
    `All configured AI models failed. Last error: ${
      lastError?.message || "Unknown error"
    }`,
  );
}

// =======================================
// GENERATE PAGE AI REPORT
// =======================================

export async function generatePageAIReport(page) {
  try {
    const framework = detectFramework(page);
    const issues = prepareIssuesForAI(page);

    console.log("Generating non-repetitive AI report...");

    const scores = {
      performance: page.performance,
      seo: page.seo,
      accessibility: page.accessibility,
      bestPractices: page.bestPractices,
    };

    const issueCounts = {
      performance: issues.performance.length,
      seo: issues.seo.length,
      accessibility: issues.accessibility.length,
      practices: issues.practices.length,
    };

    const metrics = page.metrics || {};

    // -----------------------------------
    // 1. EXECUTIVE SUMMARY
    // -----------------------------------

    const summary = await generateCompletion(
      `
Create a concise executive summary for this Lighthouse audit.

PAGE: ${page.url}
FRAMEWORK: ${framework}

SCORES:
${JSON.stringify(scores)}

ISSUE COUNTS:
${JSON.stringify(issueCounts)}

METRICS:
${JSON.stringify(metrics)}

Include:
- Overall website condition.
- Strongest Lighthouse category.
- Weakest Lighthouse category.
- The two or three most important findings.
- Overall optimization direction.

RULES:
- Maximum 3 short paragraphs.
- Do not provide detailed solutions.
- Do not repeat individual issue descriptions.
- Do not include a checklist.
- Do not repeat the metric values individually.
- Do not invent findings.
`,
      { maxTokens: 900, temperature: 0.2 },
    );

    // -----------------------------------
    // 2. LIGHTHOUSE SCORE ANALYSIS
    // -----------------------------------

    const scoreAnalysis = await generateCompletion(
      `
Analyze the Lighthouse category scores.

PAGE: ${page.url}

SCORES:
${JSON.stringify(scores)}

ISSUE COUNTS:
${JSON.stringify(issueCounts)}

Explain each category separately:
- Performance
- SEO
- Accessibility
- Best Practices

For each category explain:
- What the score indicates.
- Whether the category needs attention.
- Its relative importance.

RULES:
- Focus only on category scores.
- Do not explain individual Lighthouse issues.
- Do not repeat the executive summary.
- Do not provide implementation instructions.
- Do not discuss Core Web Vitals individually.
- Do not invent findings.
`,
      { maxTokens: 1200, temperature: 0.2 },
    );

    // -----------------------------------
    // 3. CORE WEB VITALS ANALYSIS
    // -----------------------------------

    const coreWebVitals = await generateCompletion(
      `
Analyze the actual performance metrics from this Lighthouse report.

PAGE:
${page.url}

METRICS:
${JSON.stringify(metrics, null, 2)}

Explain:
- What each available metric measures.
- Whether its value is good, needs improvement, or poor,
  using established metric thresholds where applicable.
- What the supplied measurements indicate.

RULES:
- Only discuss metrics actually provided.
- Do not invent missing measurements.
- Do not repeat Lighthouse category scores.
- Do not repeat the executive summary.
- Do not reproduce the detailed issue analysis.
- Keep the discussion focused on measured performance.
`,
      { maxTokens: 1400, temperature: 0.2 },
    );

    // -----------------------------------
    // 4. DETAILED ISSUE ANALYSIS
    // -----------------------------------

    const performanceAnalysis = await generateIssueAnalysis(
      "Performance",
      issues.performance,
      framework,
    );

    const seoAnalysis = await generateIssueAnalysis(
      "SEO",
      issues.seo,
      framework,
    );

    const accessibilityAnalysis = await generateIssueAnalysis(
      "Accessibility",
      issues.accessibility,
      framework,
    );

    const practicesAnalysis = await generateIssueAnalysis(
      "Best Practices",
      issues.practices,
      framework,
    );

    // -----------------------------------
    // 5. PRIORITY ACTION PLAN
    // -----------------------------------

    const recommendations = await generateCompletion(
      `
Create a prioritized implementation plan for this website.

PAGE:
${page.url}

FRAMEWORK:
${framework}

SCORES:
${JSON.stringify(scores)}

ISSUES:
${JSON.stringify(issueCounts)}

DETAILED FIXES HAVE ALREADY BEEN PROVIDED IN THE REPORT.

Create:
1. Critical priority tasks.
2. High priority tasks.
3. Medium priority tasks.
4. Low priority tasks.

For each task provide:
- Task name.
- Priority.
- Suggested implementation order.
- Brief reason for its position.

RULES:
- This is an ACTION PLAN, not another issue analysis.
- Do not repeat issue descriptions.
- Do not reproduce code examples.
- Do not explain fixes in detail again.
- Group related tasks where appropriate.
- Do not invent issues.
- Use only tasks supported by the supplied audit.
`,
      { maxTokens: 1200, temperature: 0.2 },
    );

    // -----------------------------------
    // 6. PRODUCTION CHECKLIST
    // -----------------------------------

    const checklist = await generateCompletion(
      `
Create a concise production optimization checklist.

PAGE:
${page.url}

FRAMEWORK:
${framework}

ISSUE COUNTS:
${JSON.stringify(issueCounts)}

Create actionable checkbox items grouped into:
- Performance
- SEO
- Accessibility
- Best Practices

RULES:
- Checklist items must be short.
- Each item should describe one verifiable action.
- Do not explain the issues again.
- Do not repeat the priority action plan.
- Avoid duplicate tasks.
- Do not add recommendations unsupported by the audit.
- Return only the checklist in Markdown.
`,
      { maxTokens: 900, temperature: 0.2 },
    );

    // -----------------------------------
    // 7. ESTIMATED IMPROVEMENTS
    // -----------------------------------

    const improvements = await generateCompletion(
      `
Evaluate the potential improvements from this Lighthouse audit.

SCORES:
${JSON.stringify(scores)}

METRICS:
${JSON.stringify(metrics)}

ISSUE COUNTS:
${JSON.stringify(issueCounts)}

Explain:
- Which areas have the greatest opportunity for improvement.
- Which metrics may benefit from optimization.
- Which improvements depend on code or infrastructure changes.
- What should be measured again after implementation.

RULES:
- Do not invent percentage improvements.
- Do not guarantee score increases.
- Do not repeat the priority action plan.
- Do not repeat individual issue solutions.
- Clearly distinguish measured values from expectations.
`,
      { maxTokens: 1000, temperature: 0.2 },
    );

    // -----------------------------------
    // 8. FINAL TECHNICAL RECOMMENDATIONS
    // -----------------------------------

    const finalRecommendations = await generateCompletion(
      `
Provide final technical recommendations for this website.

FRAMEWORK:
${framework}

PAGE:
${page.url}

CATEGORY SCORES:
${JSON.stringify(scores)}

Create a short final technical conclusion covering:
- Architectural considerations.
- Long-term monitoring.
- Regression prevention.
- Testing and validation strategy.

RULES:
- Do not repeat individual Lighthouse issues.
- Do not repeat their solutions.
- Do not repeat the priority action plan.
- Do not repeat the production checklist.
- Focus on long-term engineering practices.
- Do not invent details about the website architecture.
`,
      { maxTokens: 1000, temperature: 0.2 },
    );

    // -----------------------------------
    // 9. BUILD FINAL REPORT
    // -----------------------------------

    return `
# AI Website Optimization Report

**Page:** ${page.url}

**Detected Framework:** ${framework}

---

## Executive Summary

${summary}

---

## Lighthouse Score Analysis

${scoreAnalysis}

---

## Core Web Vitals Analysis

${coreWebVitals}

---

## Detailed Issue Analysis

### Performance Issues

${performanceAnalysis}

### SEO Issues

${seoAnalysis}

### Accessibility Issues

${accessibilityAnalysis}

### Best Practices Issues

${practicesAnalysis}

---

## Priority Based Action Plan

${recommendations}

---

## Production Optimization Checklist

${checklist}

---

## Estimated Overall Improvements

${improvements}

---

## Final Technical Recommendations

${finalRecommendations}
`;
  } catch (error) {
    console.error("Error generating page AI report:", error);
    throw error;
  }
}

// =======================================
// FRAMEWORK DETECTION
// =======================================

function detectFramework(page) {
  const url = page?.url?.toLowerCase() || "";

  const issuesString = JSON.stringify(page?.issues || {}).toLowerCase();

  if (url.includes("_next") || issuesString.includes("next.js")) {
    return "Next.js";
  }

  if (issuesString.includes("react")) {
    return "React";
  }

  if (issuesString.includes("vue")) {
    return "Vue";
  }

  if (issuesString.includes("angular")) {
    return "Angular";
  }

  if (issuesString.includes("wordpress")) {
    return "WordPress";
  }

  if (issuesString.includes("shopify")) {
    return "Shopify";
  }

  if (issuesString.includes("laravel")) {
    return "Laravel";
  }

  return "HTML/CSS/JavaScript";
}
