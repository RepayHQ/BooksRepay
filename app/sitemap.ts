import { MetadataRoute } from 'next';
import { getBookSlug } from '@/lib/books';

const baseUrl = 'https://booksrepay.com';
const CHUNK_SIZE = 5000;

let _sortedBooks: any[] | null = null;

function getSortedBooks(): any[] {
  if (!_sortedBooks) {
    // require resolves relative to this file, not process.cwd() — safe in all Vercel build contexts
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const raw: any[] = require('../public/books_final.json');
    _sortedBooks = raw.slice().sort((a: any, b: any) => b.viewCount - a.viewCount);
  }
  return _sortedBooks;
}

export async function generateSitemaps() {
  const books = getSortedBooks();
  const count = Math.ceil(books.length / CHUNK_SIZE);
  return Array.from({ length: count }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const books = getSortedBooks();
  const n = Number(id);
  const bookChunk = books.slice(n * CHUNK_SIZE, (n + 1) * CHUNK_SIZE);

  const bookPages: MetadataRoute.Sitemap = bookChunk.map((book: any) => ({
    url: `${baseUrl}/book/${getBookSlug(book)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  if (n === 0) {
    const categories = [
      'self-development', 'philosophy', 'business', 'fiction', 'psychology',
      'spirituality', 'finance', 'science', 'history', 'biography',
      'classics', 'health', 'sleep',
    ];
    const staticPages: MetadataRoute.Sitemap = [
      { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${baseUrl}/library`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      ...categories.map(cat => ({
        url: `${baseUrl}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
    ];
    return [...staticPages, ...bookPages];
  }

  return bookPages;
}
