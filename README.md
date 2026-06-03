# 🚀 SitePulse - Website Audit & Performance Analysis Platform

SitePulse is a modern full-stack website auditing platform that helps developers, businesses, and website owners analyze their websites for performance, SEO, accessibility, and best practices. It provides detailed page-level insights, real-time scanning logs, AI-powered audit reports, and actionable recommendations to improve website quality.

---

## ✨ Features

### 🔍 Website Analysis

- Analyze any public website by entering its URL.
- Automatic website crawling and page discovery.
- Real-time audit progress tracking.
- Live scanning logs with detailed sub-analysis logs.

### 📊 Performance Insights

- Performance score analysis.
- SEO score evaluation.
- Accessibility auditing.
- Best Practices assessment.
- Core Web Vitals monitoring.

### 📄 Detailed Reports

- Overall website audit report.
- Page-by-page audit breakdown.
- Individual page performance metrics.
- Detailed issue reporting and recommendations.

### 🤖 AI-Powered Report Generation

- Generate comprehensive AI audit reports.
- Powered by Groq AI.
- Easy-to-understand explanations.
- Actionable optimization suggestions.
- Technical and non-technical recommendations.

### ⚡ Real-Time Monitoring Experience

- Live analysis logs.
- Scan progress tracking.
- Page scanning status updates.
- Crawl progress visualization.

### 🎨 Modern User Experience

- Responsive design.
- Clean and professional interface.
- Mobile-friendly layout.
- Fast and intuitive navigation.

---

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- React.js
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend

- Next.js API Routes
- Node.js

### Database

- MongoDB
- Mongoose

### APIs & Services

- Google PageSpeed Insights API
- Groq AI API

---

## 🌐 Pages

### Home Page

- Platform overview
- Key features
- Call-to-action sections

### About Page

- Project information
- Mission and vision

### Features Page

- Complete feature showcase
- Platform capabilities

### Analyze Page

- Website URL input
- Start audit process
- Real-time progress tracking
- Live scan logs

### Report Page

`/report/[scanId]`

Displays:

- Overall Website Score
- Performance Score
- SEO Score
- Accessibility Score
- Best Practices Score
- Website Summary
- All Scanned Pages

### Individual Page Report

`/report/[scanId]/page/[pageId]`

Displays:

- Page-specific metrics
- Performance data
- SEO insights
- Accessibility issues
- Optimization recommendations

### AI Report Page

`/report/[scanId]/page/[pageId]/ai`

Displays:

- AI-generated audit report
- Improvement suggestions
- Performance recommendations
- SEO optimization guidance
- Accessibility improvements
- Best practice recommendations

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/pawantech12/sitepulse.git
cd sitepulse
```

### Install Dependencies

```bash
pnpm install
```

### Setup Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string

PAGESPEED_API_KEY=your_google_pagespeed_api_key

GROQ_API_KEY=your_groq_api_key
```

### Run Development Server

```bash
pnpm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🔄 Audit Workflow

1. User enters website URL.
2. SitePulse crawls website pages.
3. Internal pages are discovered.
4. Google PageSpeed Insights API analyzes each page.
5. Audit data is stored in MongoDB.
6. Real-time logs are displayed.
7. Final report is generated.
8. User can explore page-level reports.
9. AI-generated insights can be created using Groq AI.

---

## 📈 Metrics Analyzed

### Performance

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Speed Index
- Cumulative Layout Shift (CLS)

### SEO

- Meta tags
- Page indexing
- Structured data
- Mobile friendliness
- Search optimization factors

### Accessibility

- Contrast issues
- ARIA attributes
- Screen reader compatibility
- Keyboard navigation support

### Best Practices

- HTTPS usage
- Security checks
- Browser compatibility
- Modern web standards

---

## 🎯 Future Enhancements

- Scheduled website monitoring
- Historical scan reports
- Multi-user authentication
- Team dashboards
- Email notifications
- Competitor comparison
- White-label reports
- Advanced AI recommendations

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Create a Pull Request

---

## 👨‍💻 Author

Developed with ❤️ using Next.js, MongoDB, Google PageSpeed Insights API, and Groq AI.

**Pawan Kumavat** — Full Stack Developer.
