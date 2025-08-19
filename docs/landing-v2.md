# Mentorium Landing v2 — Next.js + Tailwind + TypeScript

This document outlines the migration of the current static landing (`index.html` + `static/`) to a modern stack using Next.js (App Router), Tailwind CSS, and TypeScript, plus Dockerization and Cloud Build/Cloud Run deployment notes.

## Goals

- __Performance & SEO__: Static Site Generation (SSG), optimized CSS/JS, metadata.
- __Maintainability__: Componentized UI, types, and a small design system.
- __Growth-ready__: Easy new pages, A/B tests, APIs for forms.
- __Deployment__: Containerized app compatible with Cloud Run.

## Prerequisites

- Node.js 18+ (recommended 20)
- npm or pnpm/yarn
- Docker (for container build)
- gcloud CLI configured for Artifact Registry & Cloud Run

## New project structure (key paths)

```
mentorium/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Header.tsx
    Hero.tsx
    Features.tsx
    Benefits.tsx
    Integrations.tsx
    Testimonials.tsx
    CTA.tsx
    Footer.tsx
    ContactForm.tsx
  public/
    favicon.ico  # and any images moved from static/images/
  tailwind.config.ts
  postcss.config.js
  next.config.js
  package.json
  Dockerfile
```

> Note: This lives alongside your existing repo. You can either:
> - Create it as a sibling folder (e.g., `next/`) and later promote it to the repo root, or
> - Initialize directly at the repo root (replacing the current static site).

---

## 1) Initialize Next.js with TypeScript

```bash
npx create-next-app@latest mentorium --typescript --eslint
cd mentorium
```

- When prompted, choose App Router and Tailwind = No (we add it ourselves next), or Yes (either is fine). Below assumes manual Tailwind setup for clarity.

## 2) Install and configure Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: { brand: { primary: '#0ea5e9' } },
    },
  },
  plugins: [],
}
export default config
```

`app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }
body { @apply bg-white text-slate-900 font-inter; }
.container { @apply mx-auto max-w-6xl px-4; }
.cta-button { @apply inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 transition; }
.cta-button-large { @apply px-6 py-3 text-lg; }
.section { @apply py-16; }
.section h2 { @apply text-3xl font-semibold mb-8; }
.card { @apply rounded-xl border border-slate-200 p-6 shadow-sm bg-white; }
```

## 3) App shell and metadata

`app/layout.tsx`
```tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mentorium - Reinventando la educación, un documento a la vez',
  description: 'Mentorium - Plataforma SaaS para la creación y gestión de documentos educativos. Automatiza y optimiza la creación de materiales educativos con inteligencia artificial.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

`app/page.tsx`
```tsx
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Benefits from '@/components/Benefits'
import Integrations from '@/components/Integrations'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Benefits />
        <Integrations />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
```

## 4) Components mapped from current `index.html`

Create the following in `components/` using the content already present in your current landing:

- `Header.tsx`: logo, nav links, CTA.
- `Hero.tsx`: headline, subtitle, CTA, placeholder image.
- `Features.tsx`: grid of feature cards.
- `Benefits.tsx`: grid of benefit cards.
- `Integrations.tsx`: grid of partner/tool logos.
- `Testimonials.tsx`: quotes with names/roles.
- `CTA.tsx`: secondary call-to-action section.
- `Footer.tsx`: contact form, social, legal links; imports `ContactForm.tsx`.

You can start with emoji placeholders for icons; later switch to `react-icons` for Font Awesome-like glyphs:

```bash
npm install react-icons
```

## 5) Assets

- Move images from `static/images/` to `public/`.
- Replace raw `<img>` with `next/image` progressively for responsive, optimized images.

## 6) Contact form (client-side placeholder first)

- `components/ContactForm.tsx` handles submit state locally.
- Later, add an API route:

`app/api/contact/route.ts`
```ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  // TODO: send email or store lead
  return NextResponse.json({ ok: true })
}
```

## 7) Local development

```bash
npm run dev
# open http://localhost:3000
```

---

## 8) Dockerization (Cloud Run-ready)

`Dockerfile`
```Dockerfile
# --- builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# --- runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
RUN npm pkg set scripts.start="next start -p ${PORT}"
RUN npm ci --omit=dev --no-audit --no-fund
EXPOSE 8080
CMD ["npm","start"]
```

### Notes
- Uses PORT=8080 (Cloud Run default). No need for `server.py` in v2.
- Multi-stage build keeps runtime image small.

## 9) Cloud Build (Artifact Registry + Cloud Run)

Adjust your existing `cloudbuild.yaml` to build/push the Node image and deploy. Example:

```yaml
substitutions:
  _REGION: us-central1
  _REPO: web
  _IMAGE: mentorium-landing-v2
  _TAG: latest

steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', '${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:${_TAG}', '.']

  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', '${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:${_TAG}']

  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - run
      - deploy
      - mentorium-landing-v2
      - --image=${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:${_TAG}
      - --region=${_REGION}
      - --platform=managed
      - --allow-unauthenticated
      - --port=8080
      - --memory=512Mi
      - --cpu=1
images:
  - '${_REGION}-docker.pkg.dev/$PROJECT_ID/${_REPO}/${_IMAGE}:${_TAG}'
```

> If you already have Artifact Registry repo and IAM set up (as used for your v1 Docker image), this slots in with the same substitutions. Ensure Cloud Run service name is distinct (e.g., `mentorium-landing-v2`) to run in parallel with v1 during cutover.

## 10) Cutover plan

1. Deploy v2 to a new Cloud Run service (`mentorium-landing-v2`).
2. Verify Lighthouse, SEO, and functionality (forms, nav).
3. Point DNS/traffic to v2 service (or update load balancer/backend).
4. Decommission v1 service once stable.

## 11) Optional improvements

- Swap emoji icons for `react-icons` (FA6) with tree-shaking.
- Implement real email delivery via Resend/SendGrid in `/api/contact`.
- Add `next-sitemap` for sitemap/robots.
- Add analytics (GA4/Umami) and experiment assignment via middleware.

## Appendix A — Mapping from current `index.html`

- `header.header` → `components/Header.tsx`
- `section#inicio.hero` → `components/Hero.tsx`
- `section#caracteristicas.features` → `components/Features.tsx`
- `section#beneficios.benefits` → `components/Benefits.tsx`
- `section#integraciones.integrations` → `components/Integrations.tsx`
- `section#testimonios.testimonials` → `components/Testimonials.tsx`
- `section#demo.cta-section` → `components/CTA.tsx`
- `footer#contacto.footer` (+ form) → `components/Footer.tsx` + `components/ContactForm.tsx`

## Appendix B — Scripts

- `npm run dev` — local dev
- `npm run build` — production build
- `npm start` — serve production build (used by Dockerfile)

---

If you want, we can scaffold this in a `next/` folder inside the repo and open a PR with the initial implementation and Cloud Build updates.
