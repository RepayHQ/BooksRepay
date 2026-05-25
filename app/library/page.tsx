'use client';
import { useState, useEffect, useMemo } from 'react';
import BookCard from '@/components/BookCard';
import { Book, CATEGORY_CONFIG, CATEGORIES } from '@/lib/books';
import Link from 'next/link';

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
      b.bookTitle?.toLowerCase().includes(query.toLowerCase()) ||
      b.author?.toLowerCase().includes(query.toLowerCase())
    );
    if (category !== 'All') result = result.filter(b => b.category === category);
    if (sort === 'views') result.sort((a, b) => b.viewCount - a.viewCount);
    if (sort === 'newest') result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (sort === 'az') result.sort((a, b) => a.bookTitle?.localeCompare(b.bookTitle || '') || 0);
    return result;
  }, [books, query, category, sort, duration]);

  const paginated = filtered.slice(0, page * PER_PAGE);

  const selectStyle = {
    background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#fff',
    outline: 'none', fontFamily: 'inherit', cursor: 'pointer'
  };

  return (
    <div style={{ minHeight: '100vh', padding: '28px 32px', maxWidth: '1164px', margin: '0 auto' }}>

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '24px' }}>
        <i className="ti ti-arrow-left" style={{ fontSize: '16px' }} /> Back to home
      </Link>

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '6px', fontFamily: "'Playfair Display', serif" }}>
          The Library
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>{books.length.toLocaleString()} audiobooks and counting</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <i className="ti ti-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: 'rgba(255,255,255,0.3)' }} />
          <input type="text" placeholder="Search titles, authors..."
            style={{ ...selectStyle, width: '100%', paddingLeft: '40px' }}
            value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} />
        </div>
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} style={selectStyle}>
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={selectStyle}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select value={duration} onChange={e => setDuration(e.target.value)} style={selectStyle}>
          {DURATION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>
        Showing {Math.min(paginated.length, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()} results
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #BF5FFF', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {paginated.map((book, i) => <BookCard key={book.videoId} book={book} index={i} />)}
          </div>
          {paginated.length < filtered.length && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => setPage(p => p + 1)} style={{
                padding: '12px 32px', borderRadius: '28px', fontSize: '14px', fontWeight: 600,
                color: '#000', background: '#BF5FFF', border: 'none', cursor: 'pointer', fontFamily: 'inherit'
              }}>
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
