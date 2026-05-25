'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import { Book, CATEGORY_CONFIG, CATEGORIES } from '@/lib/books';

const MOODS = [
  { label: 'Motivated', icon: 'ti-flame', color: '#FFB800', cat: 'self-development' },
  { label: 'Calm', icon: 'ti-moon', color: '#7F77DD', cat: 'sleep' },
  { label: 'Inspired', icon: 'ti-bulb', color: '#00FF9D', cat: 'philosophy' },
  { label: 'Build', icon: 'ti-rocket', color: '#00C9FF', cat: 'business' },
  { label: 'Escape', icon: 'ti-wand', color: '#FF6B00', cat: 'fiction' },
  { label: 'Grow', icon: 'ti-heart', color: '#FF4E6A', cat: 'psychology' },
];

const CAT_ROW_ORDER = ['Self Development','Philosophy','Spirituality','Fiction','Classics','History','Science','Biography','Psychology','Health','Sleep'];

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/books_final.json').then(r => r.json()).then((data: Book[]) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const trending = books.slice(0, 10);
  const filtered = activeCategory === 'All' ? books.slice(0, 10) : books.filter(b => b.category === activeCategory).slice(0, 10);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #BF5FFF', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Loading your library...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ padding: '48px 24px 32px', position: 'relative', overflow: 'hidden', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: '#BF5FFF', top: '-100px', right: '-60px', opacity: 0.07, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: '#7F35CC', bottom: '-50px', left: '0', opacity: 0.09, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '20px', background: '#BF5FFF' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>43,000+ Free Audiobooks</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '16px', fontFamily: "'Playfair Display', serif", color: '#fff' }}>
            One book can<br />change <span style={{ color: '#BF5FFF' }}>everything.</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '24px', maxWidth: '460px', lineHeight: 1.7 }}>
            Stream from <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>YouTube</strong> — completely free. Every genre, every era, every idea that ever mattered.
          </p>
          <div style={{ maxWidth: '480px', marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <i className="ti ti-search" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: 'rgba(255,255,255,0.3)' }} />
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '28px', padding: '14px 20px 14px 44px', fontSize: '13px', color: '#fff', outline: 'none', fontFamily: 'inherit' }}
                onKeyDown={e => { if (e.key === 'Enter') { const v = (e.target as HTMLInputElement).value; if (v) window.location.href = `/search?q=${encodeURIComponent(v)}`; }}}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '28px' }}>
            {[{ n: '43K+', l: 'Audiobooks' }, { n: '13', l: 'Categories' }, { n: 'Free', l: 'Always & forever' }].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#BF5FFF' }}>{s.n}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. CATEGORIES */}
      <section style={{ padding: '0 24px 16px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['All', ...CATEGORIES].map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            const active = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '5px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                cursor: 'pointer', border: active ? 'none' : `0.5px solid ${cfg ? cfg.color + '44' : 'rgba(255,255,255,0.2)'}`,
                background: active ? (cfg ? cfg.color : '#BF5FFF') : 'transparent',
                color: active ? '#000' : (cfg ? cfg.color : 'rgba(255,255,255,0.6)'),
                fontFamily: 'inherit', transition: 'all 0.15s'
              }}>
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. MOOD */}
      <section style={{ padding: '8px 24px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>— or browse by mood</span>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.07)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
          {MOODS.map(m => (
            <Link key={m.label} href={`/category/${m.cat}`} style={{ textDecoration: 'none' }}>
              <div style={{ borderRadius: '10px', padding: '12px 8px', textAlign: 'center', background: `${m.color}0d`, border: `0.5px solid ${m.color}22`, cursor: 'pointer' }}>
                <i className={`ti ${m.icon}`} style={{ fontSize: '18px', color: m.color, display: 'block', marginBottom: '6px' }} />
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{m.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENDING */}
      <section style={{ padding: '0 24px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            {activeCategory === 'All' ? 'Trending this week' : activeCategory}
          </span>
          <Link href="/library" style={{ fontSize: '11px', color: '#BF5FFF', textDecoration: 'none' }}>View all →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {filtered.slice(0, 5).map((b, i) => <BookCard key={b.videoId} book={b} index={i} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {filtered.slice(5, 10).map((b, i) => <BookCard key={b.videoId} book={b} index={i + 5} />)}
          </div>
        </div>
      </section>

      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.05)', margin: '8px 24px 24px' }} />

      {/* 4. EMPIRE */}
      <section style={{ padding: '0 24px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>Repay Media Universe</div>
          <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Explore the Empire</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { name: 'BooksRepay', url: '#', color: '#BF5FFF', icon: 'ti-book', desc: '43,000+ free audiobooks from YouTube. Stream anything, anytime.', sub: 'You are here' },
            { name: 'IdeasRepay', url: 'https://ideasrepay.com', color: '#FFB800', icon: 'ti-bolt', desc: 'Blueprints to build online income. Turn what you learn into what you earn.', sub: 'ideasrepay.com ↗' },
            { name: 'AdsRepay', url: 'https://adsrepay.com', color: '#00FF9D', icon: 'ti-trending-up', desc: 'Earn while you learn. Make money online through surveys and tasks.', sub: 'adsrepay.com ↗' },
          ].map(e => (
            <a key={e.name} href={e.url} target={e.url === '#' ? undefined : '_blank'} rel="noopener noreferrer"
              style={{ borderRadius: '14px', padding: '18px', border: `0.5px solid ${e.url === '#' ? e.color + '33' : 'rgba(255,255,255,0.07)'}`, background: '#0d0d1a', textDecoration: 'none', display: 'block' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `${e.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <i className={`ti ${e.icon}`} style={{ fontSize: '16px', color: e.color }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: e.url === '#' ? '#fff' : 'rgba(255,255,255,0.85)', marginBottom: '3px' }}>{e.name}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>{e.sub}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{e.desc}</div>
            </a>
          ))}
        </div>
      </section>

      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.05)', margin: '0 24px 24px' }} />

      {/* 5. CATEGORY ROWS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {CAT_ROW_ORDER.map(cat => {
          const catBooks = books.filter(b => b.category === cat).slice(0, 5);
          if (catBooks.length < 3) return null;
          const cfg = CATEGORY_CONFIG[cat];
          const slug = cat.toLowerCase().replace(/\s+/g, '-');
          return (
            <section key={cat} style={{ padding: '0 24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <i className={`ti ${cfg?.icon}`} style={{ fontSize: '16px', color: cfg?.color }} />
                <span style={{ fontSize: '15px', fontWeight: 700 }}>{cat}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{books.filter(b => b.category === cat).length.toLocaleString()} books</span>
                <Link href={`/category/${slug}`} style={{ fontSize: '11px', color: cfg?.color, textDecoration: 'none', marginLeft: 'auto' }}>See all →</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {catBooks.map((b, i) => <BookCard key={b.videoId} book={b} index={i} />)}
              </div>
              <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.05)', marginTop: '24px' }} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
