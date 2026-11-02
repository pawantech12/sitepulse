# 🚀 SitePulse – AI-Powered Website Audit & Performance Analysis Platform

**SitePulse** is a full-stack website auditing platform that helps developers, businesses, and website owners analyze and improve their websites. It evaluates performance, SEO, accessibility, and best practices using Google PageSpeed Insights API, while providing detailed audit reports, real-time scanning logs, and AI-powered recommendations.

The platform has been redesigned and enhanced with user authentication, personalized dashboards, scan history, an improved audit workflow, and detailed AI-generated reports with downloadable PDF support.

---

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login.
- Secure session-based authentication.
- Personalized user profiles.
- Protected dashboard and scanning functionality.
- User-specific scan history and reports.

### 🔍 Advanced Website Analysis
- Analyze public websites by entering their URL.
- Automatic website crawling and page discovery.
- Multi-page website auditing.
- Real-time audit progress tracking.
- Live scanning logs with detailed sub-analysis updates.
- Improved audit workflow for generating comprehensive website insights.

### 📊 Performance & Quality Insights
- Performance score analysis.
- SEO score evaluation.
- Accessibility auditing.
- Best Practices assessment.
- Core Web Vitals monitoring.
- Page-level performance metrics and issue detection.

### 📈 Personalized Dashboard
- Overview of website scans and audit statistics.
- Track completed, active, and failed scans.
- View overall website scores and scan progress.
- Access recent analyses.
- Navigate to detailed reports.
- Dedicated scan history management.

### 📄 Detailed Website Audit Reports
- Overall website audit summary.
- Page-by-page audit breakdown.
- Individual page performance metrics.
- Detailed issue descriptions.
- SEO, accessibility, and best-practice findings.
- Actionable optimization recommendations.

### 🤖 AI-Powered Audit Intelligence
- Generate comprehensive AI-powered audit reports.
- Powered by Groq AI.
- Understand identified issues through detailed explanations.
- Get practical solutions and optimization recommendations.
- Understand the potential impact of website issues.
- Receive performance, SEO, accessibility, and best-practice improvement guidance.
- Present technical findings in an easier-to-understand format.

### 📑 Enhanced AI Page Reports
- More detailed AI-generated page-level reports.
- Structured issue analysis and explanations.
- Recommended solutions and implementation guidance.
- Potential impact of identified issues.
- Improved report organization and readability.
- Downloadable PDF reports.

### ⚡ Real-Time Scanning Experience
- Live analysis logs.
- Scan progress tracking.
- Page scanning status updates.
- Crawl progress visualization.
- Automatic scan status updates.

### 🎨 Modern & Responsive UI
- Completely redesigned website interface.
- Clean and professional visual design.
- Responsive layouts across desktop, tablet, and mobile.
- Improved navigation and user experience.
- Dedicated pages for authentication, dashboard, profile, scanning, and reports.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React.js
- Tailwind CSS
- Axios
- React Hook Form
- Lucide React Icons

### Backend
- Next.js API Routes
- Node.js
- JWT-based session authentication
- bcryptjs for password hashing

### Database
- MongoDB
- Mongoose

### APIs & AI Services
- Google PageSpeed Insights API
- Groq AI API

### Other Tools
- Puppeteer for PDF generation
- Git & GitHub
- pnpm

---

## 🌐 Application Pages

### 🏠 Home Page
- Platform overview.
- Key features and capabilities.
- Project introduction.
- Call-to-action sections.

### ℹ️ About Page
- Project information.
- Mission and vision.
- Platform overview.

### ✨ Features Page
- Detailed feature showcase.
- Website auditing capabilities.
- AI-powered functionality.

### 🔐 Login & Registration
- User registration.
- Secure login.
- Session-based authentication.
- Protected application access.

### 📊 Dashboard – `/dashboard`
- Website scan statistics.
- Overall scan overview.
- Recent website analyses.
- Scan progress and status.
- Quick access to detailed reports.

### 🔍 Analyze Page – `/analyze`
- Website URL input.
- Start website audit.
- Automatic page discovery.
- Real-time scanning progress.
- Live audit logs.
- Detailed analysis workflow.

### 📚 Scan History – `/scans`
- View previous website scans.
- Search and filter scan records.
- Sort scan history.
- Track scan statuses.
- Access individual reports.

### 👤 Profile – `/profile`
- View authenticated user information.
- Access account details.
- View personal scanning activity.

### 📄 Website Report – `/report/[scanId]`
Displays:
- Overall Website Score.
- Performance Score.
- SEO Score.
- Accessibility Score.
- Best Practices Score.
- Website Summary.
- All Scanned Pages.
- Individual page audit results.

### 📋 Individual Page Report
Displays:
- Page-specific metrics.
- Performance data.
- SEO insights.
- Accessibility issues.
- Best-practice findings.
- Optimization recommendations.

### 🤖 AI Page Report
- AI-generated page audit report.
- Detailed explanations of detected issues.
- Recommended solutions.
- Potential impact analysis.
- Performance optimization guidance.
- SEO improvement recommendations.
- Accessibility enhancements.
- Best-practice recommendations.
- PDF report download.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pawantech12/sitepulse.git
cd sitepulse
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_jwt_secret

PAGESPEED_API_KEY=your_google_pagespeed_api_key

GROQ_API_KEY=your_groq_api_key
```

Use a strong JWT secret and keep all API keys private. Never commit `.env.local` to GitHub.

### 4. Start the Development Server

```bash
pnpm run dev
```

Open your browser:

```text
http://localhost:3000
```

---

## 🔄 Website Audit Workflow

1. User enters a website URL.
2. SitePulse checks authentication before allowing the scan.
3. The website URL is submitted to the scanning API.
4. SitePulse crawls the website and discovers internal pages.
5. Google PageSpeed Insights API analyzes discovered pages.
6. Performance, SEO, accessibility, and best-practice audit data is collected.
7. Scan progress and detailed logs are updated.
8. Audit results are stored in MongoDB.
9. A comprehensive website report is generated.
10. Users can explore individual page-level audit results.
11. AI can generate detailed explanations, potential impact, and practical solutions.
12. Enhanced AI reports can be downloaded in PDF format.

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

- Scheduled website monitoring.
- Historical scan comparisons.
- Email notifications.
- Team dashboards and collaboration.
- Competitor website comparison.
- White-label PDF reports.
- Advanced AI-powered recommendations.
- More detailed website performance analytics.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/new-feature
```

3. Commit your changes:

```bash
git commit -m "Add new feature"
```

4. Push your branch:

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

## 👨‍💻 Author

**Pawan Kumavat**  
Full Stack Developer

Built with ❤️ using Next.js, React, MongoDB, Google PageSpeed Insights API, and Groq AI.

If you find SitePulse useful, consider giving the repository a ⭐ on GitHub!

**GitHub:** https://github.com/pawantech12/sitepulse
