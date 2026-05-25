'use client';
import { useState, useEffect, useMemo } from 'react';
import BookCard from '@/components/BookCard';
import { Book, CATEGORY_CONFIG, CATEGORIES } from '@/lib/books';
import { Search, SlidersHorizontal } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Most Viewed', value: 'views' },
  { label: 'Newest', value: 'newest' },
  { label: 'A-Z', value: 'az' },
];

const DURATION_OPTIONS = [
  { label: 'Any length', value: 'all' },
  { label: 'Under 1hr', value: 'short' },
  { label: '1-3 hrs', value: 'medium' },
  { label: '3hrs+', value: 'long' },
];

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('views');
  const [duration, setDuration] = useState('all');
  const [page, setPage] = useState(1);
  const PER_PAGE = 40;

  useEffect(() => {
    fetch('/books_final.json').then(r => r.json()).then((data: Book[]) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...books];
    if (query) result = result.filter(b =>
      b.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
    );
    if (category !== 'All') result = result.filter(b => b.category === category);
    if (duration === 'short') result = result.filter(b => b.duration && parseInt(b.duration) < 60);
    if (duration === 'medium') result = result.filter(b => b.duration && parseInt(b.duration) >= 60 && parseInt(b.duration) < 180);
    if (duration === 'long') result = result.filter(b => b.duration && parseInt(b.duration) >= 180);
    if (sort === 'views') result.sort((a, b) => b.viewCount - a.viewCount);
    if (sort === 'newest') result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (sort === 'az') result.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
    return result;
  }, [books, query, category, sort, duration]);

  const paginated = filtered.slice(0, page * PER_PAGE);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Library
          </h1>
          <p className="text-white/40 text-sm">{books.length.toLocaleString()} audiobooks and counting</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
            <input type="text" placeholder="Search titles, authors..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
              value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} />
          </div>
          <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none">
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none">
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={duration} onChange={e => setDuration(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none">
            {DURATION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Results count */}
        <div className="text-xs text-white/30 mb-4">
          Showing {Math.min(paginated.length, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()} results
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
              {paginated.map((book, i) => <BookCard key={book.videoId} book={book} index={i} />)}
            </div>
            {paginated.length < filtered.length && (
              <div className="text-center">
                <button onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 rounded-full text-sm font-semibold text-black transition-transform hover:scale-105"
                  style={{ background: '#BF5FFF' }}>
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
