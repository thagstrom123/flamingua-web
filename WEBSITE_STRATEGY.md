# Flamingua Website Strategy

## Purpose

Landing page for the community-based GTM sprint. Converts visitors who search "Flamingua" after seeing forum mentions into app downloads.

## Role in Funnel

```
Forum post (Reddit, Toytown, etc.)
  → User searches "Flamingua"
    → Lands on website OR app store listing
      → Downloads the app
```

The website serves visitors who want more information before committing to a download. It answers: "What is this?", "Is it legit?", "How much does it cost?", "Will it actually help me pass?"

## Target URL

`https://flamingua.com`

Deployed via `gh-pages` npm package to GitHub Pages with custom domain. Run `npm run deploy` to publish.

## Target Audience

- **Permit applicants** — Need A1 certification for residence permits (Switzerland, Germany, Austria, France)
- **Exam re-takers** — Failed Goethe/DELF A1 and need a structured study plan
- **Relocating professionals** — Moving to DACH/France region, need basic language skills fast
- **Budget-conscious learners** — Can't afford CHF 2,500+ language school courses

## Messaging Angles

1. **Cost** — 98% cheaper than language schools (€4.99/mo vs CHF 2,500+)
2. **Exam alignment** — Content mapped to Goethe A1 and DELF A1 requirements
3. **Speaking practice** — AI-powered pronunciation feedback (competitor gap)
4. **Flexibility** — Learn at your own pace, works offline, no fixed schedule

## Current Sections

1. **Hero** — Core value proposition + store badges
2. **Pain Points** — Addresses cost, schedule, and exam-alignment problems
3. **Features** — 6-card grid of key capabilities
4. **How It Works** — 3-step onboarding flow
5. **Pricing** — Comparison table + Free/Premium cards
6. **Founder Story** — Personal credibility and motivation
7. **Starter Pack** — Lead magnet placeholder (coming soon)
8. **FAQ** — Objection handling
9. **Footer** — Legal links + store badges

## Analytics & Tracking

**✅ Google Analytics 4 Setup (Complete)**
- **Property:** flamingua-web
- **URL:** https://flamingua.com
- **Stream ID:** 14251513966
- **Measurement ID:** G-541NYLDKYD
- **Dashboard:** https://analytics.google.com/analytics/web/#/p14251513966/

**✅ Channel Tracking URLs (Complete)**
Traffic source tracking via redirect pages:
- `flamingua.com/r` → Reddit traffic (redirects to `/?src=reddit`)
- `flamingua.com/sf` → Swiss Forum traffic (redirects to `/?src=forum`)
- `flamingua.com/yt` → YouTube traffic (redirects to `/?src=youtube`)
- `flamingua.com/qr` → Quora traffic (redirects to `/?src=quora`)
- `flamingua.com/french-a1` → Google Ads - French campaign (redirects to `/?src=google-french-a1`)
- `flamingua.com/german-a1` → Google Ads - German campaign (redirects to `/?src=google-german-a1`)

**How it works:**
1. User clicks tracking URL (e.g., `flamingua.com/r`)
2. Redirects to homepage with source parameter (`/?src=reddit`)
3. Source stored in localStorage (`flamingua_source`)
4. When user clicks store buttons, tracking parameters are added:
   - **App Store:** `?ct=reddit&mt=8` (Apple's campaign tracking)
   - **Google Play:** `&utm_source=reddit&utm_medium=web` (Google's tracking)
5. View analytics in:
   - **App Store Connect** → Analytics → Campaigns
   - **Google Play Console** → Statistics → Acquisition → UTM
   - **Google Analytics** → Realtime / Acquisition reports

**Pending:**
- Button click event tracking (track store button clicks in GA4)
- Conversion tracking (track successful app installs)

## SEO Optimization

**✅ Technical SEO (March 2026)**
- Structured data (JSON-LD) for MobileApplication
- robots.txt for search engine crawling
- sitemap.xml with all pages
- Canonical URLs
- Enhanced Open Graph and Twitter Card tags
- Keywords meta tags
- Theme color for mobile browsers

**✅ Content SEO (March 2026)**
Six high-intent landing pages targeting bottom-of-funnel keywords:
1. `/pass-goethe-a1` — "Pass Goethe A1 exam" (500-800 words)
2. `/pass-delf-a1` — "Pass DELF A1 exam" (500-800 words)
3. `/goethe-a1-speaking-practice` — "Goethe A1 speaking practice" (600-800 words)
4. `/delf-a1-speaking-practice` — "DELF A1 speaking practice" (600-800 words)
5. `/goethe-a1-exam-guide` — "Goethe A1 exam format" (700-800 words)
6. `/swiss-residence-permit-german` — "Swiss residence permit German requirement" (800-900 words)

**Distribution strategy:**
- Share pages in Reddit comments (r/German, r/French, expat subreddits)
- Answer Quora questions with page links
- Drop in Facebook expat groups
- Use as Google Ads landing pages

**Verification:**
- robots.txt: https://flamingua.com/robots.txt
- sitemap.xml: https://flamingua.com/sitemap.xml
- Structured data: https://validator.schema.org/ (paste site URL)

**Google Search Console:**
- Submit sitemap after deployment
- Monitor indexing status and search performance
- Track which pages rank for target keywords

## Future Additions

- **Starter Pack PDF** — Free downloadable study guide as lead magnet
- **Testimonials** — User reviews and success stories
- **App screenshots** — Visual preview of the learning experience
- **Blog/SEO pages** — "How to pass Goethe A1" type content for organic search
- **Button click tracking** — Track store button clicks in Google Analytics

## Maintenance

Low-touch site. Update when:
- Pricing changes
- New testimonials or reviews come in
- Starter Pack PDF is ready
- App screenshots need refreshing
- Legal pages get formal versions

## Tech Notes

- React + Vite + TypeScript, CSS Modules
- No router (single page), no UI library, no icon library
- GitHub Pages deployment via `gh-pages` package
- Custom domain: `flamingua.com` (via CNAME file)
- Google Analytics 4 tracking (gtag.js)
- Source tracking via localStorage
- SEO: JSON-LD structured data, sitemap, robots.txt
