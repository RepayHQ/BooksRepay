'use client';
import { useState, useEffect } from 'react';
import { CATEGORY_CONFIG } from '@/lib/books';
import Link from 'next/link';

export default function BookPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load only a chunk to find the book faster
    fetch('/books_final.json')
      .then(r => r.json())
      .then((books: any[]) => {
        const found = books.find((b: any) => b.videoId === params.id);
        if (found) {
          setBook(found);
          const rel = books.filter((b: any) => b.category === found.category && b.videoId !== found.videoId).slice(0, 6);
          setRelated(rel);
        }
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #BF5FFF', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Loading book...</p>
    </div>
  );

  if (!book) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>Book not found</p>
      <Link href="/" style={{ color: '#BF5FFF', fontSize: '14px' }}>← Back to library</Link>
    </div>
  );

  const cat = CATEGORY_CONFIG[book.category] || CATEGORY_CONFIG['Uncategorized'];
  const score = book.viewCount > 5000000 ? 9.5 : book.viewCount > 1000000 ? 9.0 : book.viewCount > 500000 ? 8.5 : book.viewCount > 100000 ? 8.0 : 7.5;
  const views = book.viewCount > 1000000 ? `${(book.viewCount/1000000).toFixed(1)}M` : book.viewCount > 1000 ? `${Math.round(book.viewCount/1000)}K` : book.viewCount;

  return (
    <div style={{ minHeight: '100vh', padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginBottom: '24px' }}>
        <i className="ti ti-arrow-left" style={{ fontSize: '15px' }} /> Back to library
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>

        {/* Left */}
        <div>
          {/* Player */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#0d0d1a', marginBottom: '20px', aspectRatio: '16/9', position: 'relative' }}>
            {playing ? (
              <iframe src={`https://www.youtube.com/embed/${book.videoId}?autoplay=1`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media" allowFullScreen />
            ) : (
              <div style={{ position: 'relative', width: '100%', height: '100%', background: cat.bgColor }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: cat.color, top: '-60px', right: '-40px', opacity: 0.15, filter: 'blur(60px)' }} />
                {book.thumbnail && (
                  <img src={book.thumbnail} alt={book.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, position: 'absolute', inset: 0 }} />
                )}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button onClick={() => setPlaying(true)} style={{
                    width: '72px', height: '72px', borderRadius: '50%', background: cat.color,
                    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s'
                  }}>
                    <i className="ti ti-player-play" style={{ fontSize: '28px', color: '#000' }} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: '20px', background: `${cat.color}18`, color: cat.color, border: `0.5px solid ${cat.color}44`, marginBottom: '12px' }}>
            {book.category}
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.2, marginBottom: '8px', fontFamily: "'Playfair Display', serif" }}>
            {book.bookTitle}
          </h1>
          {book.author && (
            <p style={{ fontSize: '18px', color: cat.color, marginBottom: '16px' }}>{book.author}</p>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            {[
              { icon: 'ti-eye', text: `${views} views` },
              { icon: 'ti-clock', text: book.duration || '--' },
              { icon: 'ti-star', text: `${score} Repay Score`, color: cat.color },
              { icon: 'ti-brand-youtube', text: book.channelName },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: item.color || 'rgba(255,255,255,0.45)' }}>
                <i className={`ti ${item.icon}`} style={{ fontSize: '14px' }} />
                {item.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => setPlaying(true)} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
              borderRadius: '28px', background: cat.color, border: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: 700, color: '#000', fontFamily: 'inherit'
            }}>
              <i className="ti ti-player-play" style={{ fontSize: '16px' }} /> Listen Now
            </button>
            <a href={book.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
              borderRadius: '28px', border: '0.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
              fontSize: '14px', textDecoration: 'none', fontFamily: 'inherit'
            }}>
              <i className="ti ti-brand-youtube" style={{ fontSize: '16px' }} /> YouTube
            </a>
          </div>
        </div>

        {/* Right — Related */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>
            More like this
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {related.map(b => {
              const c = CATEGORY_CONFIG[b.category] || CATEGORY_CONFIG['Uncategorized'];
              return (
                <Link key={b.videoId} href={`/book/${b.videoId}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', background: '#0d0d1a', border: `0.5px solid rgba(255,255,255,0.06)`, cursor: 'pointer' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: c.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `0.5px solid ${c.color}33` }}>
                      <i className={`ti ${c.icon}`} style={{ fontSize: '18px', color: c.color }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.bookTitle?.substring(0, 35)}
                      </div>
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
