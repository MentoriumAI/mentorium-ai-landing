# SEO Quick Reference Guide

Quick reference for maintaining and improving SEO on Mentorium.ai

---

## 🚀 Getting Started

### 1. Environment Setup

Copy `.env.example` to `.env.local` and add your credentials:

```bash
cp .env.example .env.local
```

Required variables:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

### 2. Verify Implementation

After deploying, check these URLs:
- ✅ https://mentorium.ai/sitemap.xml
- ✅ https://mentorium.ai/robots.txt
- ✅ https://mentorium.ai/manifest.webmanifest

---

## 📊 Google Tools Setup

### Google Search Console
1. Visit: https://search.google.com/search-console
2. Add property: `mentorium.ai`
3. Verify with HTML tag method
4. Submit sitemap: `https://mentorium.ai/sitemap.xml`

### Google Analytics 4
1. Visit: https://analytics.google.com
2. Create GA4 property
3. Copy Measurement ID (G-XXXXXXXXXX)
4. Add to `.env.local`

---

## 🔍 Testing Tools

| Tool | Purpose | URL |
|------|---------|-----|
| Rich Results Test | Verify structured data | https://search.google.com/test/rich-results |
| Mobile-Friendly Test | Check mobile compatibility | https://search.google.com/test/mobile-friendly |
| PageSpeed Insights | Performance analysis | https://pagespeed.web.dev/ |
| OG Debugger (Facebook) | Test social sharing | https://developers.facebook.com/tools/debug/ |
| Twitter Card Validator | Test Twitter cards | https://cards-dev.twitter.com/validator |

---

## 📝 Adding New Pages

When creating a new page, ensure:

1. **Add to sitemap** ([src/app/sitemap.ts](../src/app/sitemap.ts)):
   ```typescript
   {
     url: `${baseUrl}/new-page`,
     lastModified: new Date(),
     changeFrequency: 'weekly',
     priority: 0.8,
   }
   ```

2. **Add metadata** to the page:
   ```typescript
   export const metadata: Metadata = {
     title: 'Page Title',
     description: 'Page description (150-160 chars)',
     alternates: {
       canonical: 'https://mentorium.ai/new-page',
     },
   }
   ```

3. **Add structured data** if applicable (FAQs, Articles, etc.)

---

## 🎨 Image Optimization

### OG Images
- **Size:** 1200x630px
- **Format:** PNG or JPG
- **File size:** < 100KB
- **Location:** `/public/og-image.png`

### General Images
- Use Next.js Image component
- Add descriptive alt text
- Optimize file size
- Use WebP format when possible

---

## 📈 Monitoring Checklist

### Weekly
- [ ] Check Search Console for errors
- [ ] Review top queries and pages
- [ ] Monitor site health

### Monthly
- [ ] Analyze GA4 traffic trends
- [ ] Review keyword rankings
- [ ] Check for broken links
- [ ] Update sitemap if needed

### Quarterly
- [ ] Full SEO audit
- [ ] Content gap analysis
- [ ] Competitor analysis
- [ ] Update structured data

---

## 🎯 Key Metrics to Track

### Search Console
- **Impressions:** How often site appears in search
- **Clicks:** Actual clicks from search results
- **CTR:** Click-through rate (target: >3%)
- **Average Position:** Ranking position (target: <20)

### Google Analytics
- **Organic Traffic:** Visitors from search engines
- **Bounce Rate:** Single-page sessions (target: <60%)
- **Session Duration:** Time on site (target: >2 min)
- **Pages/Session:** Engagement level (target: >2)

### PageSpeed
- **LCP:** Largest Contentful Paint (<2.5s)
- **FID:** First Input Delay (<100ms)
- **CLS:** Cumulative Layout Shift (<0.1)

---

## ⚠️ Common Issues & Fixes

### Pages Not Indexed
1. Check `robots.txt` isn't blocking
2. Verify sitemap is submitted
3. Check for noindex tags
4. Request indexing in Search Console

### Low Rankings
1. Improve content quality
2. Add relevant keywords naturally
3. Build quality backlinks
4. Improve page speed
5. Enhance user experience

### Poor CTR
1. Improve title tags
2. Write compelling meta descriptions
3. Use rich snippets
4. Add FAQ schema

### Slow Performance
1. Optimize images
2. Enable caching
3. Minimize JavaScript
4. Use CDN
5. Enable compression

---

## 🛠️ Files Reference

### Core SEO Files
- [src/app/sitemap.ts](../src/app/sitemap.ts) - Dynamic sitemap
- [src/app/manifest.ts](../src/app/manifest.ts) - PWA manifest
- [src/app/layout.tsx](../src/app/layout.tsx) - Root metadata
- [public/robots.txt](../public/robots.txt) - Crawler directives

### Components
- [src/components/StructuredData.tsx](../src/components/StructuredData.tsx) - JSON-LD schemas
- [src/components/GoogleAnalytics.tsx](../src/components/GoogleAnalytics.tsx) - GA4 tracking
- [src/components/GoogleSearchConsole.tsx](../src/components/GoogleSearchConsole.tsx) - GSC verification

---

## 🎓 Learning Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Next.js SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev Performance Guide](https://web.dev/learn/)

---

## 📞 Quick Links

- **Search Console:** https://search.google.com/search-console?resource_id=sc-domain:mentorium.ai
- **Analytics:** https://analytics.google.com/
- **Sitemap:** https://mentorium.ai/sitemap.xml
- **Robots:** https://mentorium.ai/robots.txt

---

**Last Updated:** October 21, 2025
