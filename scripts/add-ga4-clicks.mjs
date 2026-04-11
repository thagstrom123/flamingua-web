#!/usr/bin/env node
/**
 * Add GA4 click tracking to all App Store / Google Play buttons.
 * Tracks: event_category: 'download_button', event_label: page_slug, value: platform
 *
 * Usage: node scripts/add-ga4-clicks.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import path from 'path';

const PUBLIC = '/mnt/c/code/MobileApps/flamingua-web/public';

function addGA4Tracking(filePath, slug) {
  let html = readFileSync(filePath, 'utf-8');
  let modified = false;

  // Match App Store links without onclick
  const appStorePattern = /<a\s+href="https:\/\/apps\.apple\.com[^"]*"([^>]*)>/g;
  html = html.replace(appStorePattern, (match, attrs) => {
    if (match.includes('onclick=')) return match; // Already has onclick

    const onclickAttr = ` onclick="gtag('event', 'download_click', { 'event_category': 'download_button', 'event_label': '${slug}', 'platform': 'ios' })"`;
    modified = true;
    return `<a href="${match.match(/href="([^"]*)"/)[1]}"${attrs}${onclickAttr}>`;
  });

  // Match Google Play links without onclick
  const playStorePattern = /<a\s+href="https:\/\/play\.google\.com[^"]*"([^>]*)>/g;
  html = html.replace(playStorePattern, (match, attrs) => {
    if (match.includes('onclick=')) return match; // Already has onclick

    const onclickAttr = ` onclick="gtag('event', 'download_click', { 'event_category': 'download_button', 'event_label': '${slug}', 'platform': 'android' })"`;
    modified = true;
    return `<a href="${match.match(/href="([^"]*)"/)[1]}"${attrs}${onclickAttr}>`;
  });

  if (modified) {
    writeFileSync(filePath, html);
  }

  return modified;
}

// Find all index.html files
function findPages(dir) {
  const pages = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.html');
      try {
        readFileSync(indexPath, 'utf-8');
        pages.push({ path: indexPath, slug: item });
      } catch (e) {
        // No index.html
      }
    }
  }

  return pages;
}

console.log('Adding GA4 click tracking to download buttons...\n');

const pages = findPages(PUBLIC);
let updated = 0;
let skipped = 0;

for (const { path: filePath, slug } of pages) {
  if (addGA4Tracking(filePath, slug)) {
    console.log(`  ✓ ${slug}`);
    updated++;
  } else {
    skipped++;
  }
}

console.log(`\nDone: ${updated} pages updated, ${skipped} skipped (no buttons or already tracked).`);
