import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,

  baseURL: "https://api.groq.com/openai/v1",
});

export async function generatePageAIReport(page) {
  try {
    // OPTIMIZED ISSUES
    const optimizedIssues = {
      performance: (page.issues?.performance || []).slice(0, 5),
      accessibility: (page.issues?.accessibility || []).slice(0, 5),
      seo: (page.issues?.seo || []).slice(0, 5),
      practices: (page.issues?.practices || []).slice(0, 5),
    };

    // DETECT STACK
    const possibleStack = detectFramework(page);

    const prompt = `
You are a senior website optimization engineer and Lighthouse auditing expert.

Your task is to generate a highly professional, detailed, production-level AI optimization report for a website page audit.

The report MUST be extremely easy to understand for beginners while still providing advanced professional recommendations for developers.

==================================================
REPORT REQUIREMENTS
==================================================

1. Use professional markdown formatting

2. Use:
- H1, H2, H3 headings
- Bullet points
- Tables where useful
- Code blocks
- Step-by-step sections
- Proper spacing

3. DO NOT:
- Use emojis
- Use casual tone
- Use motivational sentences
- Use unnecessary filler text

4. The report MUST include:
- Executive summary
- Lighthouse score analysis
- Core Web Vitals analysis
- Detailed issue explanations
- Root cause analysis
- Real-world impact
- SEO impact
- Accessibility impact
- Performance impact
- User experience impact
- Step-by-step fixes
- Production-level optimization advice
- Code examples
- Before vs after examples
- Best practices
- Final optimization checklist
- Estimated performance improvements

5. ALL issues MUST use proper numeric ordered markdown lists.

Example:

1. Issue Name
2. Issue Name
3. Issue Name

NOT bullet points.

==================================================
FRAMEWORK DETECTION
==================================================

Detected Framework/Platform:
${possibleStack}

Provide framework-specific fixes whenever possible.

Supported Frameworks:
- Next.js
- React
- Vue
- Angular
- WordPress
- Shopify
- Laravel
- PHP
- HTML/CSS/JS

==================================================
VERY IMPORTANT INSTRUCTIONS
==================================================

For EVERY issue:

1. Explain:
- What the issue means
- Why it happens
- Where the issue actually exists
- What files/components usually cause it
- How it affects performance/SEO/accessibility

2. Provide:
- Step-by-step fix instructions
- Real production examples
- Correct code examples
- Incorrect code examples when useful

3. If issue is related to:
- Images
- Fonts
- CLS
- LCP
- JavaScript
- CSS
- React rendering
- Next.js optimization
- SEO metadata
- Accessibility
- Caching
- Lazy loading
- Third-party scripts

Then provide:
- Exact optimization approach
- Exact implementation guidance
- Code snippets
- Recommended libraries/APIs
- Modern best practices

4. Whenever possible:
- Mention exact files/components where issue usually occurs
- Mention likely developer mistakes
- Mention optimization priority:
  - Critical
  - High
  - Medium
  - Low

IMPORTANT:
DO NOT skip any issue from the provided Lighthouse data.

You MUST analyze EVERY issue from:
- performance
- seo
- accessibility
- practices

Even if issues are repetitive or similar.

==================================================
CODE EXAMPLE REQUIREMENTS
==================================================

For all relevant fixes include:

- BEFORE code example
- AFTER optimized code example

Examples should include:
- React
- Next.js
- HTML/CSS
- JavaScript

Use production-quality code.

==================================================
PAGE INFORMATION
==================================================

PAGE URL:
${page.url}

==================================================
LIGHTHOUSE SCORES
==================================================

Performance: ${page.performance}/100
SEO: ${page.seo}/100
Accessibility: ${page.accessibility}/100
Best Practices: ${page.bestPractices}/100

==================================================
CORE WEB VITALS / METRICS
==================================================

${JSON.stringify(page.metrics, null, 2)}

==================================================
DETECTED ISSUES
==================================================

${JSON.stringify(optimizedIssues, null, 2)}

==================================================
FINAL REPORT STRUCTURE
==================================================

Generate the report in this exact structure:

# AI Website Optimization Report

## Executive Summary

## Lighthouse Score Analysis

## Core Web Vitals Analysis

## Detailed Issue Analysis

For EACH issue include:

### Issue Title

#### Problem Explanation

#### Why This Happens

#### Where The Issue Usually Exists

#### Impact Analysis
- Performance
- SEO
- Accessibility
- User Experience

#### Step-by-Step Solution

#### Bad Example

#### Optimized Example

#### Additional Professional Recommendations

#### Estimated Improvement

Use numbered issue sections like:

## Detailed Issue Analysis

### 1. Eliminate Render Blocking Resources

### 2. Reduce Unused JavaScript

### 3. Optimize Image Delivery

==================================================
FINAL SECTIONS
==================================================

## Priority Based Action Plan

## Production Optimization Checklist

## Estimated Overall Improvements

## Final Technical Recommendations

The report must feel like a premium SaaS AI audit platform report.

Generate the complete report now.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are a world-class senior website performance engineer, Lighthouse expert, Core Web Vitals specialist, SEO optimization expert and frontend architecture consultant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.5,

      max_tokens: 8000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);

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
