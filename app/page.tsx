'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import { Book, CATEGORY_CONFIG, CATEGORIES } from '@/lib/books';

const MOODS = [
  { label: 'Motivated', icon: 'ti-flame', color: '#FFB800', cat: 'Self Development' },
  { label: 'Calm', icon: 'ti-moon', color: '#7F77DD', cat: 'Sleep' },
  { label: 'Inspired', icon: 'ti-bulb', color: '#00FF9D', cat: 'Philosophy' },
  { label: 'Build', icon: 'ti-rocket', color: '#00C9FF', cat: 'Business' },
  { label: 'Escape', icon: 'ti-wand', color: '#FF6B00', cat: 'Fiction' },
  { label: 'Grow', icon: 'ti-heart', color: '#FF4E6A', cat: 'Psychology' },
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

  const filtered = activeCategory === 'All' ? books.slice(0, 10) : books.filter(b => b.category === activeCategory).slice(0, 10);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #BF5FFF', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontFamily: 'inherit' }}>Loading your library...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ padding: '56px 32px 40px', position: 'relative', overflow: 'hidden', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: '#BF5FFF', top: '-150px', right: '-80px', opacity: 0.07, filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: '#7F35CC', bottom: '-80px', left: '-30px', opacity: 0.08, filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ height: '1px', width: '24px', background: '#BF5FFF' }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>43,000+ Free Audiobooks</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '20px', fontFamily: "'Playfair Display', serif", color: '#ffffff' }}>
            One book can<br />change <span style={{ color: '#BF5FFF' }}>everything.</span>
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', marginBottom: '28px', maxWidth: '500px', lineHeight: 1.7 }}>
            Stream from <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>YouTube</strong> — completely free. Every genre, every era, every idea that ever mattered.
          </p>
          <div style={{ maxWidth: '520px', marginBottom: '28px' }}>
            <div style={{ position: 'relative' }}>
              <i className="ti ti-search" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: 'rgba(255,255,255,0.3)' }} />
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '32px', padding: '16px 24px 16px 48px', fontSize: '15px', color: '#fff', outline: 'none', fontFamily: 'inherit' }}
                onKeyDown={e => { if (e.key === 'Enter') { const v = (e.target as HTMLInputElement).value; if (v) window.location.href = `/search?q=${encodeURIComponent(v)}`; }}}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '36px' }}>
            {[{ n: '43K+', l: 'Audiobooks' }, { n: '13', l: 'Categories' }, { n: 'Free', l: 'Always & forever' }].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#BF5FFF' }}>{s.n}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. CATEGORIES */}
      <section style={{ padding: '0 32px 20px', maxWidth: '1164px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['All', ...CATEGORIES].map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            const active = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '7px 18px', borderRadius: '24px', fontSize: '13px', fontWeight: 600,
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
      <section style={{ padding: '0 32px 28px', maxWidth: '1164px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>— or browse by mood</span>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
          {MOODS.map(m => (
            <Link key={m.label} href={`/category/${m.cat.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
              <div style={{ borderRadius: '12px', padding: '16px 10px', textAlign: 'center', background: `${m.color}0d`, border: `0.5px solid ${m.color}22`, cursor: 'pointer', transition: 'transform 0.15s' }}>
                <i className={`ti ${m.icon}`} style={{ fontSize: '22px', color: m.color, display: 'block', marginBottom: '8px' }} />
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{m.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENDING — 2 rows */}
      <section style={{ padding: '0 32px 32px', maxWidth: '1164px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            {activeCategory === 'All' ? 'Trending this week' : activeCategory}
          </span>
          <Link href="/library" style={{ fontSize: '13px', color: '#BF5FFF', textDecoration: 'none' }}>View all →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            {filtered.slice(0, 5).map((b, i) => <BookCard key={b.videoId} book={b} index={i} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            {filtered.slice(5, 10).map((b, i) => <BookCard key={b.videoId} book={b} index={i + 5} />)}
          </div>
        </div>
      </section>

      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', margin: '8px 32px 32px' }} />

      {/* 4. EMPIRE */}
      <section style={{ padding: '0 32px 40px', maxWidth: '1164px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '10px' }}>Repay Media Universe</div>
          <div style={{ fontSize: '26px', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Explore the Empire</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { name: 'BooksRepay', url: '#', color: '#BF5FFF', icon: 'ti-book', desc: '43,000+ free audiobooks from YouTube. Stream anything, anytime, forever.', sub: 'You are here' },
            { name: 'IdeasRepay', url: 'https://ideasrepay.com', color: '#FFB800', icon: 'ti-bolt', desc: 'Blueprints to build online income. Turn what you learn into what you earn.', sub: 'ideasrepay.com ↗' },
            { name: 'AdsRepay', url: 'https://adsrepay.com', color: '#00FF9D', icon: 'ti-trending-up', desc: 'Earn while you learn. Make money online through surveys and tasks.', sub: 'adsrepay.com ↗' },
          ].map(e => (
            <a key={e.name} href={e.url} target={e.url === '#' ? undefined : '_blank'} rel="noopener noreferrer"
              style={{ borderRadius: '16px', padding: '22px', border: `0.5px solid ${e.url === '#' ? e.color + '33' : 'rgba(255,255,255,0.08)'}`, background: '#0d0d1a', textDecoration: 'none', display: 'block' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: `${e.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <i className={`ti ${e.icon}`} style={{ fontSize: '18px', color: e.color }} />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: e.url === '#' ? '#fff' : 'rgba(255,255,255,0.85)', marginBottom: '4px' }}>{e.name}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>{e.sub}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{e.desc}</div>
            </a>
          ))}
        </div>
      </section>

      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', margin: '0 32px 32px' }} />

      {/* 5. CATEGORY ROWS */}
      <div style={{ maxWidth: '1164px', margin: '0 auto' }}>
        {CAT_ROW_ORDER.map(cat => {
          const catBooks = books.filter(b => b.category === cat).slice(0, 5);
          if (catBooks.length < 3) return null;
          const cfg = CATEGORY_CONFIG[cat];
          const slug = cat.toLowerCase().replace(/\s+/g, '-');
          return (
            <section key={cat} style={{ padding: '0 32px 36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <i className={`ti ${cfg?.icon}`} style={{ fontSize: '20px', color: cfg?.color }} />
                <span style={{ fontSize: '18px', fontWeight: 700 }}>{cat}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{books.filter(b => b.category === cat).length.toLocaleString()} books</span>
                <Link href={`/category/${slug}`} style={{ fontSize: '13px', color: cfg?.color, textDecoration: 'none', marginLeft: 'auto' }}>See all →</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                {catBooks.map((b, i) => <BookCard key={b.videoId} book={b} index={i} />)}
              </div>
              <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', marginTop: '32px' }} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
