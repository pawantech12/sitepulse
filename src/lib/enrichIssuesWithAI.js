import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const AI_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

async function generateAICompletion(prompt) {
  let lastError;

  for (const model of AI_MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: `
You are a senior Lighthouse auditor and production website optimization engineer.

Analyze Lighthouse audit evidence accurately.
Never invent measurements, affected files, selectors, or technical findings.
Keep impact, whyItMatters, and solution meaningfully different.
Return valid JSON only.
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 8000,
        response_format: { type: "json_object" },
      });

      const content = completion.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error(`${model} returned an empty response.`);
      }

      return JSON.parse(content);
    } catch (error) {
      lastError = error;

      console.error(`Groq model ${model} failed:`, error.message);

      const shouldFallback =
        error.status === 404 ||
        error.status === 429 ||
        error.status >= 500 ||
        error.code === "model_not_found";

      if (!shouldFallback) {
        throw error;
      }
    }
  }

  throw lastError || new Error("All Groq models failed.");
}

// Keep the prompt data compact and relevant.
// Raw Lighthouse details are already stored separately in MongoDB.
function prepareIssueForAI(issue) {
  return {
    id: issue.id,
    title: issue.title,
    lighthouseDescription: issue.description,
    score: issue.score,
    severity: issue.severity,
    displayValue: issue.displayValue,
    numericValue: issue.numericValue,
    metricSavings: issue.metricSavings,

    files: issue.files,
    affectedElements: issue.elements,

    details: (issue.details || []).slice(0, 5).map((item) => ({
      nodeLabel: item.nodeLabel,
      selector: item.selector,
      snippet: item.snippet,
      explanation: item.explanation,
      url: item.url,
      wastedMs: item.wastedMs,
      wastedBytes: item.wastedBytes,
      contrastRatio: item.contrastRatio,
      expectedContrastRatio: item.expectedContrastRatio,
    })),

    warnings: issue.warnings,
  };
}

async function enrichCategory(category, issues, pageUrl, framework) {
  if (!issues.length) return issues;

  // Process in small batches to avoid oversized prompts.
  const batchSize = 8;
  const enrichedIssues = [];

  for (let i = 0; i < issues.length; i += batchSize) {
    const batch = issues.slice(i, i + batchSize);

    const prompt = `
Analyze these actual Lighthouse issues.

PAGE URL:
${pageUrl}

DETECTED FRAMEWORK:
${framework || "Unknown"}

LIGHTHOUSE CATEGORY:
${category}

ISSUES:
${JSON.stringify(batch.map(prepareIssueForAI), null, 2)}

For EVERY supplied issue, return:

{
  "issues": [
    {
      "id": "exact original issue id",
      "impact": "Specific technical consequence of this issue.",
      "whyItMatters": "Explain why this matters to users, search engines, accessibility, or website quality.",
      "solution": "Practical, specific steps to fix this exact issue. Include framework-specific guidance when supported by the evidence.",
      "priority": "Critical | High | Medium | Low"
    }
  ]
}

STRICT RULES:

1. Return one result for every input issue. Do not skip issues.
2. Preserve each issue ID exactly.
3. Do not create new issues.
4. Do not combine different issues.
5. Do not repeat the Lighthouse description as the impact.
6. Do not repeat the impact as whyItMatters.
7. The solution must explain how to fix the actual issue.
8. Use affected elements and file paths when provided.
9. Never invent a file path, selector, measurement, or root cause.
10. If evidence is insufficient to identify an exact cause, clearly say what needs to be inspected.
11. Do not claim a guaranteed score improvement.
12. Return valid JSON only, without Markdown fences.
`;

    try {
      const result = await generateAICompletion(prompt);
      const aiIssues = Array.isArray(result.issues) ? result.issues : [];

      const aiById = new Map(aiIssues.map((item) => [item.id, item]));

      for (const issue of batch) {
        const ai = aiById.get(issue.id);

        if (ai) {
          enrichedIssues.push({
            ...issue,
            impact: ai.impact || issue.impact,
            whyItMatters: ai.whyItMatters || "",
            solution: ai.solution || issue.description,
            priority: ["Critical", "High", "Medium", "Low"].includes(
              ai.priority,
            )
              ? ai.priority
              : issue.severity,
          });
        } else {
          // Preserve the original Lighthouse issue if AI omits it.
          enrichedIssues.push(issue);
        }
      }
    } catch (error) {
      console.error(
        `AI enrichment failed for ${category} batch:`,
        error.message,
      );

      // Never lose scan results because AI is unavailable.
      enrichedIssues.push(...batch);
    }
  }

  return enrichedIssues;
}

export async function enrichIssuesWithAI(
  issues,
  pageUrl,
  framework = "Unknown",
) {
  const categories = ["performance", "seo", "accessibility", "practices"];

  const enriched = {};

  for (const category of categories) {
    enriched[category] = await enrichCategory(
      category,
      issues?.[category] || [],
      pageUrl,
      framework,
    );
  }

  return enriched;
}
