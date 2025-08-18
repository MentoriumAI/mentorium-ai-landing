# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static landing page for Mentorium.ai, an educational SaaS platform. The project is a simple HTML/CSS/Python setup designed for easy deployment to cloud platforms like Google Cloud Run.

## Development Commands

### Local Development
```bash
# Start the development server (default port 8000)
python server.py

# Access the site at http://localhost:8000
```

### Docker Development
```bash
# Build Docker image
docker build -t mentoriumai-landing .

# Run container locally
docker run -p 8000:8000 mentoriumai-landing
```

### Cloud Deployment
```bash
# Build and push to Google Cloud Artifact Registry
gcloud builds submit \
  --substitutions=_REGION=us-central1,_REPOSITORY=web,_IMAGE=mentoriumai-landing,_TAG=latest \
  --project=$PROJECT_ID

# Deploy to Cloud Run (example)
gcloud run deploy mentoriumai-landing \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/web/mentoriumai-landing:latest \
  --platform managed \
  --region us-central1
```

## Project Architecture

### File Structure
- `index.html` - Single-page application with semantic HTML structure
- `static/css/styles.css` - Comprehensive CSS with CSS variables for theming
- `server.py` - Simple Python HTTP server for local development
- `Dockerfile` - Container configuration for cloud deployment
- `cloudbuild.yaml` - Google Cloud Build configuration

### Design System
- Uses CSS custom properties (variables) for comprehensive theming
- Supports light/dark themes via `data-theme` attribute on `html` element
- Color system based on HSL values with 50-950 scale for each color family
- Responsive design with mobile-first approach
- Typography system using Inter font with defined scales

### Key Features
- **Theming**: Light/dark mode support with comprehensive CSS variables
- **Responsive**: Mobile-first design with breakpoints at 768px
- **Accessibility**: Includes reduced motion preferences and semantic HTML
- **Performance**: No external dependencies, minimal footprint
- **Internationalization**: Content is in Spanish, targeting Spanish-speaking markets

## Technical Details

### CSS Architecture
- CSS variables organized by theme (light/dark) and color families (text, background, primary, secondary, accent)
- Grid-based layouts for features, benefits, and testimonials
- Consistent spacing system using CSS custom properties
- Hover effects and smooth transitions throughout

### Server Configuration
- Python HTTP server with PORT environment variable support (for cloud deployment)
- Serves static files from project root directory
- No external Python dependencies required

### Cloud Configuration
- Optimized for Google Cloud Platform deployment
- Cloud Build configuration with parameterized substitutions
- Docker image based on Python 3.11-slim for minimal footprint
- Environment variables configured for cloud deployment

## Content Structure

The landing page is structured as a single-page application with these sections:
- Header with navigation
- Hero section with main value proposition
- Features section highlighting AI capabilities
- Benefits section focusing on time savings
- Integrations section showing LMS compatibility
- Testimonials section with user feedback
- Contact form in footer

All content is in Spanish and focuses on educational technology and AI-powered document creation.