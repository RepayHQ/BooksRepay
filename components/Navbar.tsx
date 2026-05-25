'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [showDrop, setShowDrop] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/books_final.json').then(r => r.json()).then(setBooks);
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) { setResults([]); setShowDrop(false); return; }
    const q = query.toLowerCase();
    const found = books.filter(b =>
      b.bookTitle?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q)
    ).slice(0, 6);
    setResults(found);
    setShowDrop(found.length > 0);
  }, [query, books]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowDrop(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const CAT_COLORS: Record<string, string> = {
    "Self Development": "#FFB800", "Philosophy": "#BF5FFF", "Business": "#00FF9D",
    "Fiction": "#FF6B00", "Psychology": "#FF4E6A", "Spirituality": "#00C9FF",
    "Finance": "#00D68F", "Science": "#00B4CC", "History": "#EF9F27",
    "Biography": "#5DCAA5", "Classics": "#B5D4F4", "Health": "#97C459", "Sleep": "#7F77DD",
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(7,7,15,0.95)', borderBottom: '0.5px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(20px)', height: '56px',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px'
    }}>

      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', flexShrink: 0 }}>
        <i className="ti ti-book" style={{ fontSize: '18px', color: '#BF5FFF' }} />
        <span style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 700, letterSpacing: '-0.5px', color: '#fff' }}>
          Books<span style={{ color: '#BF5FFF' }}>Repay</span>
        </span>
      </Link>

      <div ref={ref} style={{ flex: 1, position: 'relative', maxWidth: '400px' }}>
        <i className="ti ti-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: 'rgba(255,255,255,0.3)', zIndex: 1 }} />
        <input type="text" placeholder="Search audiobooks..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && query) { window.location.href = `/search?q=${encodeURIComponent(query)}`; setShowDrop(false); }}}
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '7px 12px 7px 32px', fontSize: '12px', color: '#fff', outline: 'none', fontFamily: 'inherit' }}
        />
        {showDrop && results.length > 0 && (
          <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#0d0d1a', border: '0.5px solid rgba(191,95,255,0.25)', borderRadius: '12px', overflow: 'hidden', zIndex: 200 }}>
            {results.map(b => (
              <Link key={b.videoId} href={`/book/${b.videoId}`}
                onClick={() => { setShowDrop(false); setQuery(''); }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', textDecoration: 'none', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: CAT_COLORS[b.category] || '#888', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#fff' }}>{b.bookTitle?.substring(0, 45)}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{b.author} · {b.category}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Empire links - hidden on small mobile */}
      <div className="empire-nav" style={{ display: 'flex', gap: '6px', marginLeft: 'auto', flexShrink: 0 }}>
        <a href="https://ideasrepay.com" target="_blank" rel="noopener noreferrer"
          style={{ padding: '4px 10px', borderRadius: '8px', border: '0.5px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#FFB800' }}>IdeasRepay</div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)' }}>Build online income</div>
        </a>
        <a href="https://adsrepay.com" target="_blank" rel="noopener noreferrer"
          style={{ padding: '4px 10px', borderRadius: '8px', border: '0.5px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#00FF9D' }}>AdsRepay</div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)' }}>Earn while you browse</div>
        </a>
      </div>
    </nav>
  );
}
