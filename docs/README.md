# Mentorium.ai Documentation

Welcome to the technical documentation for the Mentorium.ai landing page. This directory contains guides, implementation details, and reference materials for developers and content teams.

---

## 📚 Documentation Index

### 🔍 SEO & Search Optimization

All SEO documentation is in the **[seo/](seo/)** folder:

- **[SEO Setup Checklist](seo/SEO-SETUP-CHECKLIST.md)** ⭐ **Start here for SEO setup!**
- **[SEO Implementation Summary](seo/SEO-IMPLEMENTATION-SUMMARY.md)** - Overview of what was implemented
- **[SEO Quick Reference](seo/SEO-QUICK-REFERENCE.md)** - Daily operations guide
- **[SEO Assessment & Plan](seo/SEO-ASSESSMENT-AND-PLAN.md)** - Comprehensive strategy

**See [seo/README.md](seo/README.md) for detailed SEO documentation.**

---

### 🎨 Design & Branding

- **[Branding Assets Guide](branding-assets.md)**
  - Logo and favicon implementation
  - Asset specifications
  - Design elements and guidelines

- **[Theme System](theme-system.md)**
  - Font customization
  - Color management
  - Performance optimization
  - Accessibility features

---

### 💻 Implementation & Development

- **[Landing V2 Documentation](landing-v2.md)**
  - Architecture overview
  - Component structure
  - Development workflow

- **[Implementation Summary](implementation-summary.md)**
  - Project setup
  - Key features
  - Technical decisions

- **[Optimization Plan](optimization-plan.md)**
  - Performance optimizations
  - Best practices
  - Future improvements

---

### 📄 Legacy Documentation

- **[SEO Landing Page](seo-landing-page.md)** (Legacy)
  - Original SEO documentation
  - Historical reference

---

## 🚀 Quick Start Guides

### For Developers

1. **Setting up the project:**
   - Clone repository
   - Run `npm install`
   - Copy `.env.example` to `.env.local`
   - Run `npm run dev`

2. **Understanding the codebase:**
   - Read [Landing V2 Documentation](landing-v2.md)
   - Review [Theme System](theme-system.md)
   - Check [Implementation Summary](implementation-summary.md)

3. **SEO Setup:**
   - Follow [SEO Setup Checklist](seo/SEO-SETUP-CHECKLIST.md)
   - Reference [SEO Quick Guide](seo/SEO-QUICK-REFERENCE.md)

### For Marketing/Content Teams

1. **SEO & Analytics:**
   - Start with [SEO Setup Checklist](seo/SEO-SETUP-CHECKLIST.md)
   - Set up Google Search Console
   - Set up Google Analytics
   - Monitor performance

2. **Branding:**
   - Review [Branding Assets Guide](branding-assets.md)
   - Understand brand colors and fonts
   - Follow design guidelines

---

## 📊 Current Status

### ✅ Completed Features

**SEO & Indexing**
- [x] Dynamic sitemap.xml
- [x] Robots.txt configuration
- [x] JSON-LD structured data (4 schemas)
- [x] Canonical URLs
- [x] Open Graph & Twitter Cards
- [x] Google Analytics integration (ready)
- [x] Google Search Console (ready)

**Design & Theme**
- [x] Responsive design
- [x] Dark/Light theme support
- [x] Custom font system
- [x] Brand color management
- [x] Accessibility features

**Performance**
- [x] Image optimization
- [x] Code splitting
- [x] Caching strategy
- [x] PWA manifest

### ⏳ Pending Setup

- [ ] Google Analytics measurement ID
- [ ] Google Search Console verification
- [ ] Production OG image (1200x630px)
- [ ] Submit sitemap to Google
- [ ] Google Business Profile

---

## 🔗 Important Files Reference

### Configuration Files
- `/next.config.ts` - Next.js configuration
- `/.env.example` - Environment variables template
- `/tailwind.config.ts` - Tailwind CSS configuration
- `/tsconfig.json` - TypeScript configuration

### SEO Files
- `/src/app/sitemap.ts` - Dynamic sitemap
- `/src/app/manifest.ts` - PWA manifest
- `/src/app/layout.tsx` - Root metadata
- `/public/robots.txt` - Crawler directives

### Components
- `/src/components/` - React components
- `/src/components/StructuredData.tsx` - SEO schemas
- `/src/components/GoogleAnalytics.tsx` - GA4 tracking
- `/src/components/GoogleSearchConsole.tsx` - Verification

### Styling
- `/src/app/globals.css` - Global styles
- `/src/config/colors.ts` - Color configuration
- `/src/config/fonts.ts` - Font configuration
- `/src/config/theme.ts` - Theme system

---

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run dev:debug        # Start with Node inspector

# Building
npm run build            # Production build
npm run start            # Start production server
npm run build:production # Lint + type-check + build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Analysis
npm run analyze          # Bundle size analysis
```

---

## 🧪 Testing & Verification

### SEO Testing
- **Sitemap:** https://mentorium.ai/sitemap.xml
- **Robots:** https://mentorium.ai/robots.txt
- **Rich Results:** https://search.google.com/test/rich-results
- **Mobile Friendly:** https://search.google.com/test/mobile-friendly
- **PageSpeed:** https://pagespeed.web.dev/

### Monitoring
- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com

---

## 📞 Support & Resources

### Documentation
- Full SEO guide: [seo/README.md](seo/README.md)
- Theme customization: [theme-system.md](theme-system.md)
- Branding guidelines: [branding-assets.md](branding-assets.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Search Central](https://developers.google.com/search)

---

## 📝 Document Maintenance

**Last Updated:** October 21, 2025

To update this documentation:
1. Make changes to relevant markdown files
2. Update the "Last Updated" date
3. Ensure internal links are correct
4. Test all external links

---

**Need help?** Start with the relevant section above or check the detailed guides in each documentation file.
