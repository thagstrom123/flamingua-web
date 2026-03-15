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

`https://[username].github.io/flamingua-web/`

Deployed via `gh-pages` npm package. Run `npm run deploy` to publish.

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

## Future Additions

- **Starter Pack PDF** — Free downloadable study guide as lead magnet
- **Testimonials** — User reviews and success stories
- **App screenshots** — Visual preview of the learning experience
- **Blog/SEO pages** — "How to pass Goethe A1" type content for organic search
- **Analytics** — Simple page view tracking (Plausible or similar)

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
- Base path: `/flamingua-web/`
