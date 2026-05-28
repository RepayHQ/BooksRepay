'use client';
import { useState, useEffect, use } from 'react';
import { CATEGORY_CONFIG, getVideoIdFromSlug, getBookSlug } from '@/lib/books';
import Link from 'next/link';

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const videoId = getVideoIdFromSlug(id);
  const [book, setBook] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;
    fetch('/books_final.json')
      .then(r => r.json())
      .then((books: any[]) => {
        const found = books.find((b: any) => b.videoId === videoId);
        if (found) {
          setBook(found);
          setRelated(books.filter((b: any) => b.category === found.category && b.videoId !== found.videoId).slice(0, 6));
        }
        setLoading(false);
      }).catch(() => setLoading(false));
  }, [videoId]);

  useEffect(() => {
    if (!book) return;
    const canonicalUrl = `https://booksrepay.com/book/${getBookSlug(book)}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (link) {
      link.href = canonicalUrl;
    } else {
      link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }
    return () => {
      const el = document.querySelector('link[rel="canonical"]');
      if (el) el.remove();
    };
  }, [book]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #BF5FFF', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Loading...</p>
    </div>
  );

  if (!book) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>Book not found</p>
      <Link href="/" style={{ color: '#BF5FFF', fontSize: '15px', textDecoration: 'none' }}>← Back to library</Link>
    </div>
  );

  const cat = CATEGORY_CONFIG[book.category] || CATEGORY_CONFIG['Uncategorized'];
  const score = book.viewCount > 5000000 ? 9.5 : book.viewCount > 1000000 ? 9.0 : book.viewCount > 500000 ? 8.5 : book.viewCount > 100000 ? 8.0 : 7.5;
  const views = book.viewCount > 1000000 ? `${(book.viewCount / 1000000).toFixed(1)}M` : book.viewCount > 1000 ? `${Math.round(book.viewCount / 1000)}K` : String(book.viewCount);

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(16px, 3vw, 28px) clamp(16px, 3vw, 32px)', maxWidth: '1164px', margin: '0 auto' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '20px' }}>
        <i className="ti ti-arrow-left" style={{ fontSize: '15px' }} /> Back to library
      </Link>

      <div className="grid-2-detail">
        {/* Left */}
        <div>
          {/* Video */}
          <div style={{ borderRadius: '14px', overflow: 'hidden', background: '#0d0d1a', marginBottom: '20px', aspectRatio: '16/9', position: 'relative' }}>
            {playing ? (
              <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media" allowFullScreen />
            ) : (
              <div style={{ position: 'relative', width: '100%', height: '100%', background: cat.bgColor }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                {book.thumbnail && <img src={book.thumbnail} alt={book.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, position: 'absolute', inset: 0 }} />}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button onClick={() => setPlaying(true)} style={{ width: '64px', height: '64px', borderRadius: '50%', background: cat.color, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-player-play" style={{ fontSize: '26px', color: '#000' }} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: '20px', background: `${cat.color}18`, color: cat.color, border: `0.5px solid ${cat.color}44`, marginBottom: '10px' }}>
            {book.category}
          </div>
          <h1 className="book-detail-title" style={{ fontSize: 'clamp(20px, 4vw, 30px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '8px', fontFamily: "'Playfair Display', serif" }}>
            {book.bookTitle}
          </h1>
          {book.author && <p className="book-detail-author" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: cat.color, marginBottom: '16px' }}>{book.author}</p>}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            {[
              { icon: 'ti-eye', text: `${views} views` },
              { icon: 'ti-clock', text: book.duration || '--' },
              { icon: 'ti-star', text: `${score} Repay Score`, color: cat.color },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: item.color || 'rgba(255,255,255,0.45)' }}>
                <i className={`ti ${item.icon}`} style={{ fontSize: '14px' }} />
                {item.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => setPlaying(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 22px', borderRadius: '28px', background: cat.color, border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, color: '#000', fontFamily: 'inherit' }}>
              <i className="ti ti-player-play" style={{ fontSize: '16px' }} /> Listen Now
            </button>
            <a href={book.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderRadius: '28px', border: '0.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', fontSize: '14px', textDecoration: 'none', fontFamily: 'inherit' }}>
              <i className="ti ti-brand-youtube" style={{ fontSize: '16px' }} /> YouTube
            </a>
          </div>
        </div>

        {/* Right - Related */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>More like this</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {related.map(b => {
              const c = CATEGORY_CONFIG[b.category] || CATEGORY_CONFIG['Uncategorized'];
              return (
                <Link key={b.videoId} href={`/book/${getBookSlug(b)}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#0d0d1a', border: '0.5px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: c.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `0.5px solid ${c.color}33` }}>
                      <i className={`ti ${c.icon}`} style={{ fontSize: '18px', color: c.color }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.bookTitle?.substring(0, 40)}</div>
                      <div style={{ fontSize: '11px', color: c.color }}>{b.author}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{b.duration}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
