#!/usr/bin/env node
/**
 * Optimize and copy mascot + course images to public/images/
 * Converts PNG/JPG → WebP at appropriate sizes, keeps JPG fallback.
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, mkdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const APP_ASSETS = '/mnt/c/code/MobileApps/learn_a1/frontend/assets/images';
const WEB_IMAGES = '/mnt/c/code/MobileApps/flamingua-web/public/images';

// Mascot images to copy — mapped from WEBSITE_PLAN.md §13
const MASCOT_IMAGES = [
  // Grammar pages (German)
  { src: 'flamingua/images/flamingua_teaching_v2.png', name: 'flamingua-teaching', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_teaching_v1.png', name: 'flamingua-teaching-v1', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_discovery_v1.png', name: 'flamingua-discovery', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_scene_detective.png', name: 'flamingua-detective', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_architect.png', name: 'flamingua-architect', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_scene_scientist.png', name: 'flamingua-scientist', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_scene_gamer.png', name: 'flamingua-gamer', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_scene_gardener.png', name: 'flamingua-gardener', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_writing_v1.png', name: 'flamingua-writing', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_globe_v1.png', name: 'flamingua-globe', maxWidth: 400 },

  // Grammar pages (French)
  { src: 'flamingua/images/flamingua_parisien_v1.png', name: 'flamingua-parisien', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_flag_scarf_v1.png', name: 'flamingua-flag-scarf', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_croissant_v1.png', name: 'flamingua-croissant', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_rocket_launch.png', name: 'flamingua-rocket', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_cafe_v1.png', name: 'flamingua-cafe', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_eiffel_tower_v1.png', name: 'flamingua-eiffel', maxWidth: 400 },

  // Problem-driven pages
  { src: 'flamingua/images/flamingua_encouraging_v2.png', name: 'flamingua-encouraging-v2', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_encouraging_v1.png', name: 'flamingua-encouraging-v1', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_listening_v1.png', name: 'flamingua-listening', maxWidth: 400 },

  // Exam prep pages
  { src: 'flamingua/images/flamingua_diploma.jpg', name: 'flamingua-diploma', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_level_a1_v1.png', name: 'flamingua-a1-level', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_scene_reader.png', name: 'flamingua-reader', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_scene_guitarist.png', name: 'flamingua-guitarist', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_eiffel_tower_v1_p.png', name: 'flamingua-eiffel-p', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_zen_master.png', name: 'flamingua-zen', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_scene_photographer.png', name: 'flamingua-photographer', maxWidth: 400 },

  // Practical pages
  { src: 'flamingua/images/flamingua_traveler_v1.png', name: 'flamingua-traveler', maxWidth: 400 },
  { src: 'flamingua/images/flamingua_cool_vibes.png', name: 'flamingua-cool', maxWidth: 400 },

  // CTA celebration images
  { src: 'flamingua/lesson_complete/flamingua_high_five.png', name: 'flamingua-high-five', maxWidth: 400 },
  { src: 'flamingua/lesson_complete/flamingua_lesson_happy_dance.png', name: 'flamingua-happy-dance', maxWidth: 400 },
  { src: 'flamingua/lesson_complete/flamingua_celebrating_v2.png', name: 'flamingua-celebrating', maxWidth: 400 },
  { src: 'flamingua/lesson_complete/flamingua_mic_drop.png', name: 'flamingua-mic-drop', maxWidth: 400 },
];

// Course grammar diagrams
const COURSE_IMAGES = [
  { src: 'de/u03/gram_negation_nicht_u03l02_de.jpg', name: 'german-negation-diagram', maxWidth: 800 },
  { src: 'de/u03/gram_modal_verbs_u03l02_de.jpg', name: 'german-modal-verbs-diagram', maxWidth: 800 },
  { src: 'de/u03/gram_separable_verbs_u03l01_de.jpg', name: 'german-separable-verbs-diagram', maxWidth: 800 },
  { src: 'de/u03/gram_prepositions_am_um_u03l01_de.jpg', name: 'german-prepositions-diagram', maxWidth: 800 },
  { src: 'de/u01/grammar_pronouns_table.jpg', name: 'german-pronouns-table', maxWidth: 800 },
  { src: 'fr/u01/conjugation_cards.jpg', name: 'french-conjugation-cards', maxWidth: 800 },
  { src: 'fr/u01/grammar_table_presentations.jpg', name: 'french-grammar-table', maxWidth: 800 },
];

async function optimizeImage({ src, name, maxWidth }) {
  const inputPath = path.join(APP_ASSETS, src);

  if (!existsSync(inputPath)) {
    console.log(`  SKIP (not found): ${src}`);
    return;
  }

  const webpPath = path.join(WEB_IMAGES, `${name}.webp`);
  const jpgPath = path.join(WEB_IMAGES, `${name}.jpg`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const needsResize = metadata.width > maxWidth;

    // WebP version (primary)
    let pipeline = sharp(inputPath);
    if (needsResize) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
    }
    await pipeline.webp({ quality: 80 }).toFile(webpPath);

    // JPG fallback
    pipeline = sharp(inputPath);
    if (needsResize) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
    }
    await pipeline.jpeg({ quality: 82 }).toFile(jpgPath);

    const { size: webpSize } = await sharp(webpPath).metadata().catch(() => ({ size: 0 }));
    const stats = await import('fs').then(fs => ({
      webp: fs.statSync(webpPath).size,
      jpg: fs.statSync(jpgPath).size,
      original: fs.statSync(inputPath).size,
    }));

    const savings = ((1 - stats.webp / stats.original) * 100).toFixed(0);
    console.log(`  OK: ${name}.webp (${(stats.webp/1024).toFixed(0)}KB, ${savings}% smaller) + .jpg fallback (${(stats.jpg/1024).toFixed(0)}KB)`);
  } catch (err) {
    console.log(`  ERROR: ${name} — ${err.message}`);
  }
}

async function main() {
  console.log('Flamingua Website Image Optimizer');
  console.log('=================================\n');

  // Ensure output directory exists
  if (!existsSync(WEB_IMAGES)) {
    await mkdir(WEB_IMAGES, { recursive: true });
  }

  console.log(`Optimizing ${MASCOT_IMAGES.length} mascot images (target: 400px, <100KB WebP)...\n`);
  for (const img of MASCOT_IMAGES) {
    await optimizeImage(img);
  }

  console.log(`\nOptimizing ${COURSE_IMAGES.length} course images (target: 800px, <80KB WebP)...\n`);
  for (const img of COURSE_IMAGES) {
    await optimizeImage(img);
  }

  console.log('\nDone! Images are in public/images/');
  console.log('Use <picture> tags with WebP + JPG fallback.');
}

main().catch(console.error);
