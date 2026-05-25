'use client';
import { useState, useEffect, use } from 'react';
import { CATEGORY_CONFIG } from '@/lib/books';
import Link from 'next/link';

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [book, setBook] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch('/books_final.json')
      .then(r => r.json())
      .then((books: any[]) => {
        const found = books.find((b: any) => b.videoId === id);
        if (found) {
          setBook(found);
          const rel = books
            .filter((b: any) => b.category === found.category && b.videoId !== found.videoId)
            .slice(0, 6);
          setRelated(rel);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #BF5FFF', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Loading book...</p>
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
    <div style={{ minHeight: '100vh', padding: '28px 32px', maxWidth: '1164px', margin: '0 auto' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: '28px', transition: 'color 0.15s' }}>
        <i className="ti ti-arrow-left" style={{ fontSize: '16px' }} /> Back to library
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px' }}>

        {/* Left */}
        <div>
          {/* Player */}
          <div style={{ borderRadius: '18px', overflow: 'hidden', background: '#0d0d1a', marginBottom: '24px', aspectRatio: '16/9', position: 'relative' }}>
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media" allowFullScreen
              />
            ) : (
              <div style={{ position: 'relative', width: '100%', height: '100%', background: cat.bgColor }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: cat.color, top: '-80px', right: '-60px', opacity: 0.12, filter: 'blur(70px)' }} />
                {book.thumbnail && (
                  <img src={book.thumbnail} alt={book.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, position: 'absolute', inset: 0 }} />
                )}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button onClick={() => setPlaying(true)} style={{
                    width: '80px', height: '80px', borderRadius: '50%', background: cat.color,
                    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <i className="ti ti-player-play" style={{ fontSize: '32px', color: '#000' }} />
                  </button>
                </div>
                <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  Click to play
                </div>
              </div>
            )}
          </div>

          {/* Category pill */}
          <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '24px', background: `${cat.color}18`, color: cat.color, border: `0.5px solid ${cat.color}44`, marginBottom: '14px' }}>
            {book.category}
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.2, marginBottom: '10px', fontFamily: "'Playfair Display', serif" }}>
            {book.bookTitle}
          </h1>
          {book.author && (
            <p style={{ fontSize: '20px', color: cat.color, marginBottom: '20px' }}>{book.author}</p>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
            {[
              { icon: 'ti-eye', text: `${views} views` },
              { icon: 'ti-clock', text: book.duration || '--' },
              { icon: 'ti-star', text: `${score} Repay Score`, color: cat.color },
              { icon: 'ti-brand-youtube', text: book.channelName },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '14px', color: item.color || 'rgba(255,255,255,0.45)' }}>
                <i className={`ti ${item.icon}`} style={{ fontSize: '16px' }} />
                {item.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => setPlaying(true)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px',
              borderRadius: '32px', background: cat.color, border: 'none', cursor: 'pointer',
              fontSize: '15px', fontWeight: 700, color: '#000', fontFamily: 'inherit'
            }}>
              <i className="ti ti-player-play" style={{ fontSize: '18px' }} /> Listen Now
            </button>
            <a href={book.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 22px',
              borderRadius: '32px', border: '0.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
              fontSize: '15px', textDecoration: 'none', fontFamily: 'inherit'
            }}>
              <i className="ti ti-brand-youtube" style={{ fontSize: '18px' }} /> YouTube
            </a>
          </div>
        </div>

        {/* Right — Related */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '16px' }}>
            More like this
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {related.map(b => {
              const c = CATEGORY_CONFIG[b.category] || CATEGORY_CONFIG['Uncategorized'];
              return (
                <Link key={b.videoId} href={`/book/${b.videoId}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: '14px', padding: '14px', borderRadius: '12px', background: '#0d0d1a', border: '0.5px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: c.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `0.5px solid ${c.color}33` }}>
                      <i className={`ti ${c.icon}`} style={{ fontSize: '20px', color: c.color }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.bookTitle?.substring(0, 38)}
                      </div>
                      <div style={{ fontSize: '12px', color: c.color, marginBottom: '2px' }}>{b.author}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{b.duration}</div>
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
