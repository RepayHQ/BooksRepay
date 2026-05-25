'use client';
import { useState, useEffect, use } from 'react';
import BookCard from '@/components/BookCard';
import { Book, CATEGORY_CONFIG } from '@/lib/books';
import Link from 'next/link';

function slugToCategory(slug: string): string {
  return Object.keys(CATEGORY_CONFIG).find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === slug
  ) || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const PER_PAGE = 40;

  const categoryName = slugToCategory(slug);
  const cat = CATEGORY_CONFIG[categoryName] || CATEGORY_CONFIG['Uncategorized'];

  useEffect(() => {
    fetch('/books_final.json').then(r => r.json()).then((data: Book[]) => {
      setBooks(data.filter((b: Book) => b.category === categoryName));
      setLoading(false);
    });
  }, [categoryName]);

  const paginated = books.slice(0, page * PER_PAGE);

  return (
    <div style={{ minHeight: '100vh', padding: '28px 32px', maxWidth: '1164px', margin: '0 auto' }}>

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '28px' }}>
        <i className="ti ti-arrow-left" style={{ fontSize: '16px' }} /> Back to library
      </Link>

      {/* Category hero */}
      <div style={{ borderRadius: '20px', padding: '36px', marginBottom: '32px', overflow: 'hidden', position: 'relative', background: cat.bgColor, border: `0.5px solid ${cat.color}33` }}>
        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: cat.color, top: '-50px', right: '-30px', opacity: 0.15, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${cat.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <i className={`ti ${cat.icon}`} style={{ fontSize: '40px', color: cat.color, display: 'block', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '8px', fontFamily: "'Playfair Display', serif" }}>{categoryName}</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>{books.length.toLocaleString()} audiobooks</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #BF5FFF', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.4)' }}>
          <p style={{ fontSize: '18px', marginBottom: '16px' }}>No books found in this category</p>
          <Link href="/" style={{ color: '#BF5FFF', textDecoration: 'none' }}>← Back to homepage</Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {paginated.map((book, i) => <BookCard key={book.videoId} book={book} index={i} />)}
          </div>
          {paginated.length < books.length && (
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => setPage(p => p + 1)} style={{
                padding: '12px 32px', borderRadius: '28px', fontSize: '14px', fontWeight: 600,
                color: '#000', background: cat.color, border: 'none', cursor: 'pointer', fontFamily: 'inherit'
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
