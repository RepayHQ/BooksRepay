import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BF5FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span className="text-lg font-bold">Books<span style={{color:'#BF5FFF'}}>Repay</span></span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Books always repay you. The world's largest free audiobook library — 43,000+ titles across every genre.
            </p>
            <p className="text-xs text-white/20 mt-4">Part of the Repay Media family</p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Browse</h4>
            <div className="flex flex-col gap-2">
              {['Self Development', 'Philosophy', 'Business', 'Fiction', 'Classics', 'Science'].map(cat => (
                <Link key={cat} href={`/category/${cat.toLowerCase().replace(' ', '-')}`}
                  className="text-sm text-white/50 hover:text-white transition-colors">
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Empire */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Repay Universe</h4>
            <div className="flex flex-col gap-3">
              <a href="https://booksrepay.com" className="group">
                <div className="text-sm font-medium" style={{color:'#BF5FFF'}}>BooksRepay</div>
                <div className="text-xs text-white/30">You are here</div>
              </a>
              <a href="https://ideasrepay.com" target="_blank" rel="noopener noreferrer" className="group">
                <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">IdeasRepay</div>
                <div className="text-xs text-white/30">Blueprints to build income</div>
              </a>
              <a href="https://adsrepay.com" target="_blank" rel="noopener noreferrer" className="group">
                <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">AdsRepay</div>
                <div className="text-xs text-white/30">Earn while you browse</div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">© 2026 Repay Media. All rights reserved.</p>
          <p className="text-xs text-white/20">Books always repay you.</p>
        </div>
      </div>
    </footer>
  );
}
