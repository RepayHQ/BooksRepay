'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import { Book, CATEGORY_CONFIG, CATEGORIES, formatViews } from '@/lib/books';
import { Search, Play, TrendingUp, BookOpen, Zap } from 'lucide-react';

const MOODS = [
  { label: 'Motivated', icon: 'ti-flame', color: '#FFB800', cat: 'Self Development' },
  { label: 'Calm', icon: 'ti-moon', color: '#7F77DD', cat: 'Sleep' },
  { label: 'Inspired', icon: 'ti-bulb', color: '#00FF9D', cat: 'Philosophy' },
  { label: 'Build', icon: 'ti-rocket', color: '#00C9FF', cat: 'Business' },
  { label: 'Escape', icon: 'ti-wand', color: '#FF6B00', cat: 'Fiction' },
  { label: 'Grow', icon: 'ti-heart', color: '#FF4E6A', cat: 'Psychology' },
];

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/books_final.json')
      .then(r => r.json())
      .then((data: Book[]) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  const featured = books.slice(0, 1)[0];
  const trending = books.slice(0, 10);
  const filtered = activeCategory === 'All'
    ? books.slice(0, 20)
    : books.filter(b => b.category === activeCategory).slice(0, 20);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm">Loading your library...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden dot-grid py-20 px-4">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: '#BF5FFF', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: '#7F35CC', filter: 'blur(60px)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6 animate-in delay-1">
              <div className="h-px w-8" style={{ background: '#BF5FFF' }} />
              <span className="text-xs tracking-widest uppercase text-white/40">43,000+ Free Audiobooks</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 animate-in delay-2"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Books always<br />
              <span style={{ color: '#BF5FFF' }}>repay you.</span>
            </h1>

            <p className="text-lg text-white/50 mb-8 max-w-lg animate-in delay-3">
              Stream the world's greatest audiobooks, completely free. Every genre, every era, every mood.
            </p>

            {/* Search */}
            <div className="relative max-w-lg animate-in delay-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && query && (window.location.href = `/search?q=${encodeURIComponent(query)}`)}
              />
              {query && (
                <button
                  onClick={() => window.location.href = `/search?q=${encodeURIComponent(query)}`}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-xs font-semibold text-black"
                  style={{ background: '#BF5FFF' }}>
                  Search
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-8 animate-in delay-4">
              {[
                { label: 'Audiobooks', value: '43K+' },
                { label: 'Categories', value: '13' },
                { label: 'Always Free', value: '100%' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-xl font-bold" style={{ color: '#BF5FFF' }}>{stat.value}</div>
                  <div className="text-xs text-white/30">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MOOD BROWSING ─────────────────────────────────── */}
      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-6">Browse by mood</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {MOODS.map(mood => (
              <Link key={mood.label} href={`/category/${mood.cat.toLowerCase().replace(' ', '-')}`}>
                <div className="rounded-xl p-4 text-center cursor-pointer hover:-translate-y-1 transition-transform"
                  style={{ background: `${mood.color}0d`, border: `0.5px solid ${mood.color}22` }}>
                  <i className={`ti ${mood.icon} text-xl mb-2 block`} style={{ color: mood.color }} aria-hidden="true" />
                  <div className="text-xs font-medium text-white/70">{mood.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY CHIPS ────────────────────────────────── */}
      <section className="px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeCategory === 'All' ? 'text-black' : 'text-white/50 hover:text-white border border-white/10'}`}
              style={activeCategory === 'All' ? { background: '#BF5FFF' } : {}}>
              All
            </button>
            {CATEGORIES.map(cat => {
              const config = CATEGORY_CONFIG[cat];
              const active = activeCategory === cat;
              return (
                <button key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${active ? '' : 'border hover:text-white'}`}
                  style={active
                    ? { background: config.color, color: '#000' }
                    : { borderColor: `${config.color}33`, color: config.color }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOOK GRID ─────────────────────────────────────── */}
      <section className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-white/40">
              {activeCategory === 'All' ? 'Trending this week' : activeCategory}
            </h2>
            <Link href="/library" className="text-xs text-white/30 hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((book, i) => (
              <BookCard key={book.videoId} book={book} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EMPIRE SECTION ────────────────────────────────── */}
      <section className="px-4 py-16 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs tracking-widest uppercase text-white/30 mb-3">Repay Media Universe</div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Explore the Empire
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="rounded-2xl p-6 border" style={{ background: '#0d0d1a', borderColor: '#BF5FFF33' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#BF5FFF22' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BF5FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm">BooksRepay</div>
                  <div className="text-xs text-white/30">You are here</div>
                </div>
              </div>
              <p className="text-sm text-white/50">43,000+ free audiobooks. Stream anything, anytime, for free.</p>
            </div>

            <a href="https://ideasrepay.com" target="_blank" rel="noopener noreferrer"
              className="rounded-2xl p-6 border hover:border-yellow-500/30 transition-colors group" style={{ background: '#0d0d1a', borderColor: '#ffffff11' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFB80022' }}>
                  <Zap size={18} color="#FFB800" />
                </div>
                <div>
                  <div className="font-bold text-sm group-hover:text-yellow-400 transition-colors">IdeasRepay</div>
                  <div className="text-xs text-white/30">ideasrepay.com ↗</div>
                </div>
              </div>
              <p className="text-sm text-white/50">Turn knowledge into income. Blueprints for building online businesses.</p>
            </a>

            <a href="https://adsrepay.com" target="_blank" rel="noopener noreferrer"
              className="rounded-2xl p-6 border hover:border-green-500/30 transition-colors group" style={{ background: '#0d0d1a', borderColor: '#ffffff11' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#00FF9D22' }}>
                  <TrendingUp size={18} color="#00FF9D" />
                </div>
                <div>
                  <div className="font-bold text-sm group-hover:text-green-400 transition-colors">AdsRepay</div>
                  <div className="text-xs text-white/30">adsrepay.com ↗</div>
                </div>
              </div>
              <p className="text-sm text-white/50">Earn while you learn. Make money online through surveys, tasks and more.</p>
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}
