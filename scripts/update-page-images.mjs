#!/usr/bin/env node
/**
 * Replace same-mascot headers with unique mascot per page.
 * Uses <picture> tag with WebP + JPG fallback.
 * Mapping from WEBSITE_PLAN.md §13.
 *
 * Usage: node scripts/update-page-images.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const PUBLIC = '/mnt/c/code/MobileApps/flamingua-web/public';

// Page slug → { mascot, alt, courseImg?, courseAlt? }
const PAGE_MAP = {
  // German Grammar
  'german-articles': {
    mascot: 'flamingua-teaching',
    alt: 'Flamingua mascot teaching — German articles der, die, das guide',
  },
  'german-dative-case': {
    mascot: 'flamingua-discovery',
    alt: 'Flamingua mascot exploring — German dative case guide',
  },
  'german-accusative-case': {
    mascot: 'flamingua-detective',
    alt: 'Flamingua mascot investigating — German accusative case guide',
  },
  'german-word-order': {
    mascot: 'flamingua-architect',
    alt: 'Flamingua mascot building — German word order guide',
  },
  'german-negation': {
    mascot: 'flamingua-scientist',
    alt: 'Flamingua mascot experimenting — German negation guide',
    courseImg: 'german-negation-diagram',
    courseAlt: 'German negation placement rules: nicht position in four sentence types',
  },
  'german-modal-verbs': {
    mascot: 'flamingua-gamer',
    alt: 'Flamingua mascot gaming — German modal verbs guide',
    courseImg: 'german-modal-verbs-diagram',
    courseAlt: 'German modal verbs conjugation chart: können, wollen, müssen, dürfen, sollen',
  },
  'german-separable-verbs': {
    mascot: 'flamingua-gardener',
    alt: 'Flamingua mascot gardening — German separable verbs guide',
    courseImg: 'german-separable-verbs-diagram',
    courseAlt: 'German separable verbs: how prefixes split in main clauses',
  },

  // French Grammar
  'french-basic-verbs': {
    mascot: 'flamingua-parisien',
    alt: 'Flamingua mascot in Paris — French basic verbs guide',
    courseImg: 'french-conjugation-cards',
    courseAlt: 'French verb conjugation cards for être, avoir, aller, faire',
  },
  'french-negation': {
    mascot: 'flamingua-flag-scarf',
    alt: 'Flamingua mascot with French scarf — French negation guide',
  },
  'french-partitive-articles': {
    mascot: 'flamingua-croissant',
    alt: 'Flamingua mascot with croissant — French partitive articles guide',
  },
  'french-near-future': {
    mascot: 'flamingua-rocket',
    alt: 'Flamingua mascot on rocket — French near future tense guide',
  },

  // Problem-driven pages
  'why-you-cant-speak-german-a1': {
    mascot: 'flamingua-encouraging-v2',
    alt: 'Flamingua mascot encouraging you — why you can\'t speak German yet',
  },
  'why-you-cant-speak-french-a1': {
    mascot: 'flamingua-encouraging-v1',
    alt: 'Flamingua mascot encouraging you — why you can\'t speak French yet',
  },

  // Exam prep
  'pass-goethe-a1': {
    mascot: 'flamingua-diploma',
    alt: 'Flamingua mascot with diploma — pass the Goethe A1 exam',
  },
  'goethe-a1-study-plan': {
    mascot: 'flamingua-a1-level',
    alt: 'Flamingua mascot at A1 level — Goethe A1 study plan',
  },
  'goethe-a1-exam-guide': {
    mascot: 'flamingua-reader',
    alt: 'Flamingua mascot studying — Goethe A1 exam guide',
  },
  'goethe-a1-speaking-practice': {
    mascot: 'flamingua-guitarist',
    alt: 'Flamingua mascot performing — Goethe A1 speaking practice',
  },
  'pass-delf-a1': {
    mascot: 'flamingua-eiffel-p',
    alt: 'Flamingua mascot at Eiffel Tower — pass the DELF A1 exam',
  },
  'delf-a1-study-plan': {
    mascot: 'flamingua-zen',
    alt: 'Flamingua mascot in zen pose — DELF A1 study plan',
  },
  'delf-a1-speaking-practice': {
    mascot: 'flamingua-photographer',
    alt: 'Flamingua mascot with camera — DELF A1 speaking practice',
  },

  // Practical / Timeline
  'german-a1-how-long': {
    mascot: 'flamingua-rocket',
    alt: 'Flamingua mascot on rocket — how long to learn German A1',
  },
  'french-a1-how-long': {
    mascot: 'flamingua-traveler',
    alt: 'Flamingua mascot traveling — how long to learn French A1',
  },
  'swiss-residence-permit-german': {
    mascot: 'flamingua-traveler',
    alt: 'Flamingua mascot with passport — Swiss residence permit German requirement',
  },

  // Hub pages
  'grammar': {
    mascot: 'flamingua-teaching',
    alt: 'Flamingua mascot teaching — grammar guides hub',
  },
  'guides': {
    mascot: 'flamingua-discovery',
    alt: 'Flamingua mascot exploring — learning guides hub',
  },

  // Landing pages
  'german-a1': {
    mascot: 'flamingua-a1-level',
    alt: 'Flamingua mascot at A1 level — learn German A1',
  },
  'french-a1': {
    mascot: 'flamingua-eiffel',
    alt: 'Flamingua mascot at Eiffel Tower — learn French A1',
  },
};

function buildPictureTag(mascot, alt) {
  return `<picture>
          <source srcset="/images/${mascot}.webp" type="image/webp">
          <img src="/images/${mascot}.jpg" alt="${alt}" class="mascot" width="400" height="400" loading="lazy">
        </picture>`;
}

function buildCourseImgTag(courseImg, courseAlt) {
  return `
      <picture class="course-diagram">
        <source srcset="/images/${courseImg}.webp" type="image/webp">
        <img src="/images/${courseImg}.jpg" alt="${courseAlt}" class="course-img" width="800" loading="lazy" style="max-width:100%;border-radius:12px;margin:1.5rem auto;display:block;">
      </picture>`;
}

let updated = 0;
let skipped = 0;
let courseImgsAdded = 0;

for (const [slug, config] of Object.entries(PAGE_MAP)) {
  const filePath = path.join(PUBLIC, slug, 'index.html');

  if (!existsSync(filePath)) {
    console.log(`  SKIP (not found): ${slug}/index.html`);
    skipped++;
    continue;
  }

  let html = readFileSync(filePath, 'utf-8');

  // Replace the old <img> mascot tag with <picture> tag
  const oldImgPattern = /<img src="\/images\/flamingua-[^"]*\.(png|jpg)" alt="[^"]*" class="mascot"[^>]*>/;
  const match = html.match(oldImgPattern);

  if (match) {
    const newTag = buildPictureTag(config.mascot, config.alt);
    html = html.replace(match[0], newTag);
    console.log(`  OK: ${slug} → ${config.mascot}`);
    updated++;
  } else {
    console.log(`  NO MATCH: ${slug} (no standard mascot img found)`);
    skipped++;
  }

  // Add course diagram if specified and not already present
  if (config.courseImg && !html.includes(config.courseImg)) {
    // Insert after the first </h2> or first <p> block (after intro section)
    // Find a good insertion point: after the first section's closing
    const insertionPoints = [
      /<\/h2>\s*\n\s*<p>/,  // After first h2 + before first p
    ];

    // Simpler approach: insert before the first <h2> that isn't the main title
    const h2Matches = [...html.matchAll(/<h2[^>]*>/g)];
    if (h2Matches.length >= 2) {
      // Insert before the second h2
      const insertPos = h2Matches[1].index;
      const courseTag = buildCourseImgTag(config.courseImg, config.courseAlt);
      html = html.slice(0, insertPos) + courseTag + '\n      ' + html.slice(insertPos);
      console.log(`    + Added course diagram: ${config.courseImg}`);
      courseImgsAdded++;
    }
  }

  writeFileSync(filePath, html);
}

console.log(`\nDone: ${updated} pages updated, ${courseImgsAdded} course diagrams added, ${skipped} skipped.`);
