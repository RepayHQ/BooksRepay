'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import { Book, CATEGORY_CONFIG, CATEGORIES } from '@/lib/books';

const COLLECTIONS = [
  { label: 'Under 1 Hour', icon: 'ti-clock-hour-3', color: '#00C9FF', filter: (b: Book) => { const dur = b.duration || ''; const hrs = dur.includes('h') ? parseInt(dur) : 0; const mins = dur.includes('m') ? parseInt(dur.split('h').pop() || dur) : 0; return hrs === 0 && mins < 60 && mins > 0; } },
  { label: 'Hidden Gems', icon: 'ti-diamond', color: '#BF5FFF', filter: (b: Book) => b.viewCount < 50000 && b.viewCount > 1000 },
  { label: 'Morning Boost', icon: 'ti-sun', color: '#FFB800', filter: (b: Book) => ['Self Development', 'Philosophy', 'Business'].includes(b.category) },
  { label: 'Wind Down', icon: 'ti-moon', color: '#7F77DD', filter: (b: Book) => ['Sleep', 'Spirituality'].includes(b.category) },
  { label: 'Learn Something', icon: 'ti-telescope', color: '#00FF9D', filter: (b: Book) => ['Science', 'History', 'Biography'].includes(b.category) },
  { label: 'Pure Escape', icon: 'ti-wand', color: '#FF6B00', filter: (b: Book) => ['Fiction', 'Classics'].includes(b.category) },
];

const CAT_ROW_ORDER = ['Self Development','Philosophy','Spirituality','Fiction','Classics','History','Science','Biography','Psychology','Health','Sleep'];

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCollection, setActiveCollection] = useState('');

  useEffect(() => {
    fetch('/books_final.json').then(r => r.json()).then((data: Book[]) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const getFiltered = () => {
    if (activeCollection) {
      const col = COLLECTIONS.find(c => c.label === activeCollection);
      return col ? books.filter(col.filter).slice(0, 10) : books.slice(0, 10);
    }
    if (activeCategory !== 'All') return books.filter(b => b.category === activeCategory).slice(0, 10);
    return books.slice(0, 10);
  };

  const filtered = getFiltered();
  const trendingLabel = activeCollection || (activeCategory === 'All' ? 'Trending this week' : activeCategory);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #BF5FFF', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontFamily: 'inherit' }}>Loading your library...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>

      {/* HERO */}
      <section className="dot-grid" style={{ padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 32px) clamp(24px, 4vw, 40px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: '#BF5FFF', top: '-100px', right: '-60px', opacity: 0.07, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '20px', background: '#BF5FFF' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>43,000+ Free Audiobooks</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '16px', fontFamily: "'Playfair Display', serif", color: '#ffffff' }}>
            One book can<br />change <span style={{ color: '#BF5FFF' }}>everything.</span>
          </h1>
          <p style={{ fontSize: 'clamp(13px, 2vw, 16px)', color: 'rgba(255,255,255,0.45)', marginBottom: '20px', maxWidth: '460px', lineHeight: 1.7 }}>
            Stream from <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>YouTube</strong> — completely free. Every genre, every era.
          </p>
          <div style={{ maxWidth: '500px', marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <i className="ti ti-search" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: 'rgba(255,255,255,0.3)' }} />
              <input type="text" placeholder="Search by title, author, or category..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '28px', padding: '14px 20px 14px 44px', fontSize: '14px', color: '#fff', outline: 'none', fontFamily: 'inherit' }}
                onKeyDown={e => { if (e.key === 'Enter') { const v = (e.target as HTMLInputElement).value; if (v) window.location.href = `/search?q=${encodeURIComponent(v)}`; }}} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[{ n: '43K+', l: 'Audiobooks' }, { n: '13', l: 'Categories' }, { n: 'Free', l: 'Always & forever' }].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 700, color: '#BF5FFF' }}>{s.n}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. CATEGORIES */}
      <section className="page-pad" style={{ paddingBottom: '16px', paddingTop: '0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['All', ...CATEGORIES].map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            const active = activeCategory === cat && !activeCollection;
            return (
              <button key={cat} onClick={() => { setActiveCategory(cat); setActiveCollection(''); }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.border = `0.5px solid ${cfg ? cfg.color : 'rgba(255,255,255,0.6)'}`; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.border = `0.5px solid ${cfg ? cfg.color + '44' : 'rgba(255,255,255,0.2)'}`; }}
                style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', border: active ? 'none' : `0.5px solid ${cfg ? cfg.color + '44' : 'rgba(255,255,255,0.2)'}`,
                background: active ? (cfg ? cfg.color : '#BF5FFF') : 'transparent',
                color: active ? '#000' : (cfg ? cfg.color : 'rgba(255,255,255,0.6)'),
                fontFamily: 'inherit', transition: 'all 0.2s ease'
              }}>
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. COLLECTIONS */}
      <section className="page-pad" style={{ paddingBottom: '24px', paddingTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>— or explore a collection</span>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
        </div>
        <div className="grid-6">
          {COLLECTIONS.map(c => (
            <button key={c.label} onClick={() => { setActiveCollection(c.label === activeCollection ? '' : c.label); setActiveCategory('All'); }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.border = `0.5px solid ${c.color}`; e.currentTarget.style.background = `${c.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = `0.5px solid ${activeCollection === c.label ? c.color : c.color + '22'}`; e.currentTarget.style.background = activeCollection === c.label ? `${c.color}22` : `${c.color}0d`; }}
              style={{ borderRadius: '12px', padding: '12px 8px', textAlign: 'center', background: activeCollection === c.label ? `${c.color}22` : `${c.color}0d`, border: `0.5px solid ${activeCollection === c.label ? c.color : c.color + '22'}`, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease' }}>
              <i className={`ti ${c.icon}`} style={{ fontSize: '20px', color: c.color, display: 'block', marginBottom: '6px' }} />
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', fontWeight: 500, lineHeight: 1.3 }}>{c.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. TRENDING */}
      <section className="page-pad" style={{ paddingBottom: '28px', paddingTop: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{trendingLabel}</span>
          <Link href="/library" style={{ fontSize: '12px', color: '#BF5FFF', textDecoration: 'none' }}>View all →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="grid-5">
            {filtered.slice(0, 5).map((b, i) => <BookCard key={b.videoId} book={b} index={i} />)}
          </div>
          <div className="grid-5">
            {filtered.slice(5, 10).map((b, i) => <BookCard key={b.videoId} book={b} index={i + 5} />)}
          </div>
        </div>
      </section>

      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', margin: '0 16px 24px' }} />

      {/* 4. EMPIRE */}
      <section className="page-pad" style={{ paddingBottom: '32px', paddingTop: '0' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>Repay Media Universe</div>
          <div style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Explore the Empire</div>
        </div>
        <div className="grid-3">
          {[
            { name: 'BooksRepay', url: '#', color: '#BF5FFF', icon: 'ti-book', desc: '43,000+ free audiobooks from YouTube.', sub: 'You are here' },
            { name: 'IdeasRepay', url: 'https://ideasrepay.com', color: '#FFB800', icon: 'ti-bolt', desc: 'Blueprints to build online income.', sub: 'ideasrepay.com ↗' },
            { name: 'AdsRepay', url: 'https://adsrepay.com', color: '#00FF9D', icon: 'ti-trending-up', desc: 'Earn while you learn online.', sub: 'adsrepay.com ↗' },
          ].map(e => (
            <a key={e.name} href={e.url} target={e.url === '#' ? undefined : '_blank'} rel="noopener noreferrer"
              onMouseEnter={el => { el.currentTarget.style.transform = 'translateY(-4px)'; el.currentTarget.style.border = `0.5px solid ${e.color}`; el.currentTarget.style.background = `${e.color}0d`; }}
              onMouseLeave={el => { el.currentTarget.style.transform = 'translateY(0)'; el.currentTarget.style.border = `0.5px solid ${e.url === '#' ? e.color + '33' : 'rgba(255,255,255,0.08)'}` ; el.currentTarget.style.background = '#0d0d1a'; }}
              style={{ borderRadius: '14px', padding: '18px', border: `0.5px solid ${e.url === '#' ? e.color + '33' : 'rgba(255,255,255,0.08)'}`, background: '#0d0d1a', textDecoration: 'none', display: 'block', transition: 'all 0.2s ease' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${e.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <i className={`ti ${e.icon}`} style={{ fontSize: '16px', color: e.color }} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: e.url === '#' ? '#fff' : 'rgba(255,255,255,0.85)', marginBottom: '3px' }}>{e.name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>{e.sub}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{e.desc}</div>
            </a>
          ))}
        </div>
      </section>

      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', margin: '0 16px 24px' }} />

      {/* 5. CATEGORY ROWS */}
      <div style={{ maxWidth: '1164px', margin: '0 auto' }}>
        {CAT_ROW_ORDER.map(cat => {
          const catBooks = books.filter(b => b.category === cat).slice(0, 5);
          if (catBooks.length < 3) return null;
          const cfg = CATEGORY_CONFIG[cat];
          const slug = cat.toLowerCase().replace(/\s+/g, '-');
          return (
            <section key={cat} className="page-pad" style={{ paddingBottom: '28px', paddingTop: '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <i className={`ti ${cfg?.icon}`} style={{ fontSize: '18px', color: cfg?.color }} />
                <span style={{ fontSize: 'clamp(15px, 3vw, 18px)', fontWeight: 700 }}>{cat}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{books.filter(b => b.category === cat).length.toLocaleString()} books</span>
                <Link href={`/category/${slug}`} style={{ fontSize: '12px', color: cfg?.color, textDecoration: 'none', marginLeft: 'auto' }}>See all →</Link>
              </div>
              <div className="grid-5">
                {catBooks.map((b, i) => <BookCard key={b.videoId} book={b} index={i} />)}
              </div>
              <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', marginTop: '24px' }} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
