# Longyu Xu Portfolio

A bilingual (English + 中文) personal portfolio website with Coinbase-style aesthetics, featuring an Internal Audit Workpaper QC + Sampling Assistant demo tool.

## Features

- **Bilingual Support**: Route-based localization (EN/ZH) with automatic language detection
- **Coinbase-style Design**: Minimal, crisp, modern UI with light/dark mode
- **Internal Audit Tooling Demo**: Interactive workpaper quality assessment tool
- **Responsive Design**: Mobile-first approach with smooth transitions
- **SEO Optimized**: Sitemap, robots.txt, Open Graph, and Twitter cards

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- TailwindCSS
- next/font (Inter)
- ESLint + Prettier
- Vitest (Unit Testing)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint
```

### Development Server

Open [http://localhost:3000](http://localhost:3000) in your browser.

- `/en` - English version
- `/zh` - Chinese version

## Project Structure

```
├── public/
│   ├── Longyu_Xu_Resume.pdf    # Resume PDF (add your own)
│   ├── favicon.ico              # Favicon (add your own)
│   ├── og.png                   # Open Graph image (add your own)
│   └── avatar.jpg               # Profile photo (optional)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       # Locale layout with nav/footer
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx     # Projects list
│   │   │   │   └── [slug]/page.tsx  # Project detail
│   │   │   ├── resume/page.tsx  # Resume page
│   │   │   └── contact/page.tsx # Contact page
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   ├── sitemap.ts           # Dynamic sitemap
│   │   └── robots.ts            # Robots.txt
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer
│   │   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   │   ├── LanguageToggle.tsx   # EN/ZH language switcher
│   │   ├── ProjectCard.tsx      # Project card component
│   │   └── WorkpaperQcTool.tsx  # Audit tool component
│   ├── i18n/
│   │   ├── messages/
│   │   │   ├── en.json          # English translations
│   │   │   └── zh.json          # Chinese translations
│   │   ├── config.ts            # i18n configuration
│   │   └── getMessages.ts       # Message loader
│   └── lib/
│       ├── workpaperQc.ts       # Audit tool scoring logic
│       └── projects.ts          # Project metadata
└── tests/
    └── workpaperQc.test.ts      # Unit tests
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

```bash
# Build static export
npm run build

# Output will be in .next/
```

## Customization Checklist

### Required Changes

- [ ] **Resume PDF**: Replace `/public/Longyu_Xu_Resume.pdf` with your resume
- [ ] **Favicon**: Replace `/public/favicon.ico` with your favicon
- [ ] **OG Image**: Replace `/public/og.png` with your Open Graph image (1200x630px recommended)
- [ ] **LinkedIn URL**: Update in `/src/app/[locale]/contact/page.tsx` and i18n files
- [ ] **GitHub URL**: Update in `/src/app/[locale]/contact/page.tsx` and i18n files
- [ ] **Domain**: Update `baseUrl` in `/src/app/sitemap.ts` and `/src/app/robots.ts`

### Optional Changes

- [ ] **Profile Photo**: Add `/public/avatar.jpg` and update hero section
- [ ] **Project Screenshots**: Add project images to `/public/projects/`
- [ ] **Colors**: Modify primary colors in `/tailwind.config.ts`
- [ ] **Content**: Update all text in `/src/i18n/messages/en.json` and `zh.json`

### Contact Information

Update the following in the i18n files and contact page:

- Email: `longyu.xu@edhec.com`
- Phone: `+33 07 44 72 11 34`
- Location: `Paris / Luxembourg`

## Internal Audit Workpaper QC Tool

The demo tool at `/[locale]/projects/workpaper-qc` provides:

### Features
- **Quality Score (0-100)**: Evaluates workpapers against audit best practices
- **Rubric Breakdown**: Scores across 6 categories:
  - Completeness
  - Traceability
  - Sampling Rationale
  - Evidence Sufficiency
  - Conclusion Quality
  - Professional Tone
- **Findings**: Identifies issues with severity ratings
- **Suggestions**: Provides actionable improvement recommendations
- **Sampling Assistant**: Calculates suggested sample sizes
- **Export**: Download as Markdown or copy to clipboard

### Scoring Logic

The scoring algorithm in `/src/lib/workpaperQc.ts` evaluates:

1. **Completeness** (20pts): Checks mandatory fields are present with adequate detail
2. **Traceability** (20pts): Verifies risk-control-procedure alignment
3. **Sampling Rationale** (15pts): Assesses population, method, and size justification
4. **Evidence Sufficiency** (15pts): Checks evidence documentation and storage
5. **Conclusion Quality** (15pts): Evaluates 5 Cs (Criteria, Condition, Cause, Consequence, Corrective Action)
6. **Professional Tone** (15pts): Detects vague language and casual terminology

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

Tests cover:
- Vague language detection
- Field presence validation
- Risk-control alignment checking
- Procedure quality assessment
- Conclusion quality evaluation
- Sampling period alignment
- Sample size calculations
- Markdown generation

## License

MIT License - feel free to use this template for your own portfolio.

## Author

**Longyu Xu**
- Email: longyu.xu@edhec.com
- Location: Paris / Luxembourg
