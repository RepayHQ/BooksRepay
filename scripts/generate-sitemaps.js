#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const CHUNK_SIZE = 5000;
const BASE_URL = 'https://booksrepay.com';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// --- slug logic: mirrors lib/books.ts exactly ---
function getBookSlug(book) {
  const lowerTitle = book.bookTitle.toLowerCase();
  const lowerAuthor = book.author ? book.author.toLowerCase() : '';
  const combined = (lowerAuthor && !lowerTitle.includes(lowerAuthor))
    ? lowerTitle + ' ' + lowerAuthor
    : lowerTitle;
  let textSlug = combined
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (textSlug.length > 80) {
    textSlug = textSlug.slice(0, 80).replace(/-+$/, '');
  }
  return `${textSlug}-${book.videoId}`;
}

// --- load books (DIAGNOSTIC: logs count so Vercel build log shows whether data loads) ---
const booksPath = path.join(PUBLIC_DIR, 'books_final.json');
console.log(`[generate-sitemaps] Reading: ${booksPath}`);
const allBooks = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));
console.log(`[generate-sitemaps] Loaded ${allBooks.length} books`);

const sorted = allBooks.slice().sort((a, b) => b.viewCount - a.viewCount);
const chunkCount = Math.ceil(sorted.length / CHUNK_SIZE);
console.log(`[generate-sitemaps] ${chunkCount} chunks x ${CHUNK_SIZE} — generating XML...`);

// --- helpers ---
const today = new Date().toISOString().split('T')[0];

function urlsetXml(entries) {
  const rows = entries.map(e =>
    `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>`;
}

const STATIC_PAGES = [
  { loc: BASE_URL,                       changefreq: 'daily',   priority: '1.0' },
  { loc: `${BASE_URL}/library`,          changefreq: 'daily',   priority: '0.9' },
  ...['self-development','philosophy','business','fiction','psychology',
      'spirituality','finance','science','history','biography',
      'classics','health','sleep'].map(cat => ({
    loc: `${BASE_URL}/category/${cat}`,
    changefreq: 'weekly',
    priority: '0.8',
  })),
];

// --- write per-chunk sitemaps ---
for (let i = 0; i < chunkCount; i++) {
  const bookEntries = sorted
    .slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
    .map(book => ({
      loc: `${BASE_URL}/book/${getBookSlug(book)}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7',
    }));

  const entries = i === 0
    ? [...STATIC_PAGES.map(s => ({ ...s, lastmod: today })), ...bookEntries]
    : bookEntries;

  const filename = `sitemap-${i}.xml`;
  fs.writeFileSync(path.join(PUBLIC_DIR, filename), urlsetXml(entries));
  console.log(`[generate-sitemaps] ${filename}: ${entries.length} URLs`);
}

// --- write sitemap index ---
const indexRows = Array.from({ length: chunkCount }, (_, i) =>
  `  <sitemap>\n    <loc>${BASE_URL}/sitemap-${i}.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`
).join('\n');

const indexXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexRows}\n</sitemapindex>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);
console.log(`[generate-sitemaps] sitemap.xml index: ${chunkCount} sitemaps, ${STATIC_PAGES.length + sorted.length} total URLs`);
