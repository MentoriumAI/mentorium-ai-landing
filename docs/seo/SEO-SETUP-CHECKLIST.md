# SEO Setup Checklist for Mentorium.ai

Use this checklist to complete the SEO setup after deployment.

---

## 🚀 Pre-Deployment

- [x] All SEO code implemented
- [x] TypeScript compilation verified
- [x] Documentation created
- [ ] Create professional OG image (1200x630px)
- [ ] Review all content for typos
- [ ] Test locally with `npm run dev`

---

## 📤 Deployment

- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Site accessible at https://mentorium.ai

---

## 🔍 Post-Deployment Verification

### Test Core Files
- [ ] Visit https://mentorium.ai/sitemap.xml (should show XML)
- [ ] Visit https://mentorium.ai/robots.txt (should show directives)
- [ ] Visit https://mentorium.ai/manifest.webmanifest (should show JSON)

### Test Rich Results
- [ ] Go to https://search.google.com/test/rich-results
- [ ] Enter: https://mentorium.ai
- [ ] Verify 4 schemas detected:
  - [ ] EducationalOrganization
  - [ ] WebSite
  - [ ] SoftwareApplication
  - [ ] BreadcrumbList

### Test Mobile Friendly
- [ ] Go to https://search.google.com/test/mobile-friendly
- [ ] Enter: https://mentorium.ai
- [ ] Verify "Page is mobile-friendly"

### Test Page Speed
- [ ] Go to https://pagespeed.web.dev/
- [ ] Test: https://mentorium.ai
- [ ] Check scores (target: >90)
  - [ ] Mobile score: _____
  - [ ] Desktop score: _____

---

## 🔧 Google Search Console Setup

- [ ] Go to https://search.google.com/search-console
- [ ] Click "Add Property"
- [ ] Choose "URL prefix"
- [ ] Enter: https://mentorium.ai
- [ ] Select verification method: "HTML tag"
- [ ] Copy the content value from meta tag
- [ ] Create `.env.local` file (copy from `.env.example`)
- [ ] Add: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=paste_code_here`
- [ ] Redeploy site
- [ ] Return to Search Console and click "Verify"
- [ ] Verification successful: [ ]

### Submit Sitemap
- [ ] In Search Console, go to "Sitemaps"
- [ ] Enter: `sitemap.xml`
- [ ] Click "Submit"
- [ ] Status should be "Success": [ ]

---

## 📊 Google Analytics Setup

- [ ] Go to https://analytics.google.com
- [ ] Click "Admin" (gear icon)
- [ ] Under "Account", click "Create Account"
- [ ] Account name: Mentorium
- [ ] Under "Property", click "Create Property"
- [ ] Property name: mentorium.ai
- [ ] Choose timezone: (UTC-05:00) Peru Time
- [ ] Choose currency: PEN - Peruvian Sol
- [ ] Click "Next"
- [ ] Select industry: Education
- [ ] Select business size: Small
- [ ] Click "Create"
- [ ] Accept Terms of Service
- [ ] Choose platform: "Web"
- [ ] Enter website URL: https://mentorium.ai
- [ ] Stream name: mentorium.ai
- [ ] Copy Measurement ID (format: G-XXXXXXXXXX)
- [ ] Add to `.env.local`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
- [ ] Redeploy site
- [ ] Return to GA, wait 5 minutes
- [ ] Check "Realtime" report for activity: [ ]

---

## 🖼️ Social Media Testing

### Facebook/Meta
- [ ] Go to https://developers.facebook.com/tools/debug/
- [ ] Enter: https://mentorium.ai
- [ ] Click "Debug"
- [ ] Verify:
  - [ ] Image shows (1200x630)
  - [ ] Title correct
  - [ ] Description correct
- [ ] Click "Scrape Again" to refresh cache

### Twitter/X
- [ ] Go to https://cards-dev.twitter.com/validator
- [ ] Enter: https://mentorium.ai
- [ ] Verify:
  - [ ] Card preview shows
  - [ ] Image displays
  - [ ] Title and description correct

### LinkedIn
- [ ] Go to https://www.linkedin.com/post-inspector/
- [ ] Enter: https://mentorium.ai
- [ ] Verify preview looks good
- [ ] Click "Inspect" to refresh

---

## 📱 Google Business Profile (Optional but Recommended)

- [ ] Go to https://www.google.com/business/
- [ ] Sign in with Google account
- [ ] Click "Manage now"
- [ ] Enter business name: Mentorium
- [ ] Choose category: Educational Services
- [ ] Add location: Lima, Peru (or your office)
- [ ] Add phone: (+51) 953 719 060
- [ ] Add website: https://mentorium.ai
- [ ] Verify business (choose method)
- [ ] Complete profile:
  - [ ] Add business hours
  - [ ] Add description
  - [ ] Upload photos
  - [ ] Add services

---

## 📈 Monitoring Setup

### Week 1 Checks
- [ ] Day 1: Verify Google started crawling (Search Console)
- [ ] Day 3: Check first impressions appear
- [ ] Day 7: Review initial analytics data
- [ ] Day 7: Check for any crawl errors

### Month 1 Goals
- [ ] At least 50 daily impressions
- [ ] Pages indexed in Google
- [ ] Rich snippets appearing
- [ ] No critical errors

---

## 🎯 Optional Enhancements

### Content Additions
- [ ] Add FAQ section with FAQ schema
- [ ] Create blog for educational content
- [ ] Add customer testimonials with Review schema
- [ ] Create case studies

### Technical Enhancements
- [ ] Set up Google Tag Manager (advanced tracking)
- [ ] Add WhatsApp Business integration
- [ ] Create email newsletter signup
- [ ] Add live chat widget

### Link Building
- [ ] Submit to educational directories
- [ ] Reach out to partner schools
- [ ] Guest post on education blogs
- [ ] Submit to startup directories

---

## 📝 Notes Section

Use this space for notes, questions, or issues:

```
Date: __________
Note: ________________________________________
________________________________________
________________________________________

Date: __________
Note: ________________________________________
________________________________________
________________________________________

Date: __________
Note: ________________________________________
________________________________________
________________________________________
```

---

## ✅ Final Verification

Once everything is checked above:

- [ ] All core functionality working
- [ ] Google Search Console verified and sitemap submitted
- [ ] Google Analytics tracking active
- [ ] Social media previews working
- [ ] No critical errors in Search Console
- [ ] Documentation reviewed by team
- [ ] Monitoring schedule set up

---

## 🎉 Launch Announcement

After completing this checklist:

- [ ] Announce to team
- [ ] Share on social media
- [ ] Email customers/partners
- [ ] Monitor performance

---

**Checklist Version:** 1.0
**Last Updated:** October 21, 2025

**Pro Tip:** Print this checklist or copy it to your project management tool for easy tracking!
