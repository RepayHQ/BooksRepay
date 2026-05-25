'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BF5FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          <span className="text-[22px] font-bold tracking-tight" style={{fontFamily:"'DM Sans',sans-serif"}}>
            Books<span style={{color:'#BF5FFF'}}>Repay</span>
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
            <input
              type="text"
              placeholder="Search 43,000+ audiobooks..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && query && (window.location.href = `/search?q=${encodeURIComponent(query)}`)}
            />
          </div>
        </div>

        {/* Empire links — always visible */}
        <div className="hidden md:flex items-center gap-1 flex-shrink-0">
          <span className="text-xs text-white/30 mr-2">Also:</span>
          <a href="https://adsrepay.com" target="_blank" rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-purple-500/50 transition-all">
            AdsRepay
          </a>
          <a href="https://ideasrepay.com" target="_blank" rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-purple-500/50 transition-all">
            IdeasRepay
          </a>
        </div>

        {/* Mobile search + menu */}
        <div className="flex items-center gap-2 ml-auto md:hidden">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-white/60 hover:text-white">
            <Search size={18} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-white/60 hover:text-white">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-white/5">
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
            <input
              type="text"
              placeholder="Search audiobooks..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:outline-none"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && query && (window.location.href = `/search?q=${encodeURIComponent(query)}`)}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-white/5 flex flex-col gap-2 mt-2">
          <a href="https://adsrepay.com" target="_blank" className="text-sm text-white/60 hover:text-white py-2">AdsRepay ↗</a>
          <a href="https://ideasrepay.com" target="_blank" className="text-sm text-white/60 hover:text-white py-2">IdeasRepay ↗</a>
        </div>
      )}
    </nav>
  );
}
