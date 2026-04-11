#!/usr/bin/env node
/**
 * Add breadcrumb trail to all SEO pages (visible + JSON-LD structured data).
 * Breadcrumb placement: after nav, before h1.
 *
 * Usage: node scripts/add-breadcrumbs.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const PUBLIC = '/mnt/c/code/MobileApps/flamingua-web/public';

// Page slug → breadcrumb structure
const BREADCRUMB_MAP = {
  // German Grammar
  'german-articles': { parent: 'grammar', label: 'German Articles' },
  'german-dative-case': { parent: 'grammar', label: 'German Dative Case' },
  'german-accusative-case': { parent: 'grammar', label: 'German Accusative Case' },
  'german-word-order': { parent: 'grammar', label: 'German Word Order' },
  'german-negation': { parent: 'grammar', label: 'German Negation' },
  'german-modal-verbs': { parent: 'grammar', label: 'German Modal Verbs' },
  'german-separable-verbs': { parent: 'grammar', label: 'German Separable Verbs' },

  // French Grammar
  'french-basic-verbs': { parent: 'grammar', label: 'French Basic Verbs' },
  'french-negation': { parent: 'grammar', label: 'French Negation' },
  'french-partitive-articles': { parent: 'grammar', label: 'French Partitive Articles' },
  'french-near-future': { parent: 'grammar', label: 'French Near Future' },

  // Exam Prep
  'pass-goethe-a1': { parent: 'guides', label: 'Pass Goethe A1' },
  'goethe-a1-study-plan': { parent: 'guides', label: 'Goethe A1 Study Plan' },
  'goethe-a1-exam-guide': { parent: 'guides', label: 'Goethe A1 Exam Guide' },
  'goethe-a1-speaking-practice': { parent: 'guides', label: 'Goethe A1 Speaking' },
  'pass-delf-a1': { parent: 'guides', label: 'Pass DELF A1' },
  'delf-a1-study-plan': { parent: 'guides', label: 'DELF A1 Study Plan' },
  'delf-a1-speaking-practice': { parent: 'guides', label: 'DELF A1 Speaking' },
  'swiss-residence-permit-german': { parent: 'guides', label: 'Swiss Permit German' },

  // Problem-driven & timeline (direct children of home)
  'why-you-cant-speak-german-a1': { parent: 'home', label: 'Why You Can\'t Speak German' },
  'why-you-cant-speak-french-a1': { parent: 'home', label: 'Why You Can\'t Speak French' },
  'german-a1-how-long': { parent: 'home', label: 'How Long: German A1' },
  'french-a1-how-long': { parent: 'home', label: 'How Long: French A1' },
};

const PARENT_LABELS = {
  'home': 'Home',
  'grammar': 'Grammar',
  'guides': 'Exam Prep',
};

function buildBreadcrumbHTML(slug, config) {
  const parentUrl = config.parent === 'home' ? '/' : `/${config.parent}`;
  const parentLabel = PARENT_LABELS[config.parent];

  return `
        <nav aria-label="Breadcrumb" style="margin:16px 0;font-size:0.875rem;">
            <a href="/" style="color:#6B8E6F;text-decoration:none;">Home</a>
            ${config.parent !== 'home' ? `<span style="margin:0 8px;color:#999;">›</span><a href="${parentUrl}" style="color:#6B8E6F;text-decoration:none;">${parentLabel}</a>` : ''}
            <span style="margin:0 8px;color:#999;">›</span>
            <span style="color:#999;">${config.label}</span>
        </nav>`;
}

function buildBreadcrumbJSONLD(slug, config) {
  const parentUrl = config.parent === 'home' ? '/' : `/${config.parent}`;
  const parentLabel = PARENT_LABELS[config.parent];

  const items = [
    { position: 1, name: 'Home', item: 'https://flamingua.com/' },
  ];

  if (config.parent !== 'home') {
    items.push({
      position: 2,
      name: parentLabel,
      item: `https://flamingua.com${parentUrl}`,
    });
  }

  items.push({
    position: items.length + 1,
    name: config.label,
    item: `https://flamingua.com/${slug}`,
  });

  return `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": ${JSON.stringify(items.map((item, i) => ({
        "@type": "ListItem",
        "position": item.position,
        "name": item.name,
        "item": item.item,
      })))}
    }
    </script>`;
}

function addBreadcrumbs(filePath, slug) {
  const config = BREADCRUMB_MAP[slug];
  if (!config) return false; // No breadcrumb for this page

  let html = readFileSync(filePath, 'utf-8');

  // Skip if already has breadcrumb
  if (html.includes('aria-label="Breadcrumb"')) {
    return false;
  }

  // Add visible breadcrumb after </nav> and before <div class="container">
  const containerMatch = html.match(/<div class="container">/);
  if (containerMatch) {
    const insertPos = containerMatch.index;
    const breadcrumbHTML = buildBreadcrumbHTML(slug, config);
    html = html.slice(0, insertPos) + `<div class="container">${breadcrumbHTML}\n` + html.slice(insertPos + 22);
  }

  // Add JSON-LD before </head>
  const headMatch = html.match(/<\/head>/);
  if (headMatch) {
    const insertPos = headMatch.index;
    const jsonLD = buildBreadcrumbJSONLD(slug, config);
    html = html.slice(0, insertPos) + jsonLD + '\n' + html.slice(insertPos);
  }

  writeFileSync(filePath, html);
  return true;
}

console.log('Adding breadcrumbs to SEO pages...\n');

let updated = 0;
let skipped = 0;

for (const [slug, config] of Object.entries(BREADCRUMB_MAP)) {
  const filePath = path.join(PUBLIC, slug, 'index.html');
  try {
    if (addBreadcrumbs(filePath, slug)) {
      console.log(`  ✓ ${slug}`);
      updated++;
    } else {
      console.log(`  - ${slug} (already has breadcrumb)`);
      skipped++;
    }
  } catch (err) {
    console.log(`  ✗ ${slug} (error: ${err.message})`);
    skipped++;
  }
}

console.log(`\nDone: ${updated} pages updated, ${skipped} skipped.`);
