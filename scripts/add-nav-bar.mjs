#!/usr/bin/env node
/**
 * Add persistent nav bar to all SEO pages.
 * Nav structure: Flamingua | Grammar | Exam Prep
 *
 * Usage: node scripts/add-nav-bar.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import path from 'path';

const PUBLIC = '/mnt/c/code/MobileApps/flamingua-web/public';

const NAV_HTML = `<nav class="site-nav">
        <div class="nav-content">
            <a href="/" class="logo">Flamingua</a>
            <div class="nav-links">
                <a href="/grammar">Grammar</a>
                <span class="nav-divider">|</span>
                <a href="/guides">Exam Prep</a>
            </div>
        </div>
    </nav>

    `;

// Find all index.html files in subdirectories
function findPages(dir) {
    const pages = [];
    const items = readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            const indexPath = path.join(fullPath, 'index.html');
            try {
                const content = readFileSync(indexPath, 'utf-8');
                // Only include pages that don't already have nav
                if (!content.includes('site-nav') && content.includes('<body>')) {
                    pages.push(indexPath);
                }
            } catch (e) {
                // No index.html in this directory, skip
            }
        }
    }

    return pages;
}

function addNavBar(filePath) {
    let html = readFileSync(filePath, 'utf-8');

    // Insert nav right after <body> tag (with optional whitespace/newline)
    const bodyMatch = html.match(/<body[^>]*>(\s*)/);
    if (!bodyMatch) {
        return false;
    }

    const insertPos = bodyMatch.index + bodyMatch[0].length;
    html = html.slice(0, insertPos) + NAV_HTML + html.slice(insertPos);

    writeFileSync(filePath, html);
    return true;
}

console.log('Adding nav bar to all SEO pages...\n');

const pages = findPages(PUBLIC);
let updated = 0;

for (const page of pages) {
    const slug = path.basename(path.dirname(page));
    if (addNavBar(page)) {
        console.log(`  ✓ ${slug}`);
        updated++;
    } else {
        console.log(`  ✗ ${slug} (no <body> tag found)`);
    }
}

console.log(`\nDone: ${updated} pages updated with nav bar.`);
