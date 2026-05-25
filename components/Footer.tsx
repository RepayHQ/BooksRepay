import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', marginTop: '40px', padding: '40px 24px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '40px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
              <i className="ti ti-book" style={{ fontSize: '18px', color: '#BF5FFF' }} />
              <span style={{ fontSize: '16px', fontWeight: 700 }}>Books<span style={{ color: '#BF5FFF' }}>Repay</span></span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '280px' }}>
              One book can change everything. The world's largest free audiobook library — 43,000+ titles from YouTube.
            </p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '12px' }}>Part of the Repay Media family</p>
          </div>
          <div>
            <h4 style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Browse</h4>
            {['Self Development', 'Philosophy', 'Fiction', 'Classics', 'Spirituality', 'Science'].map(cat => (
              <Link key={cat} href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '8px' }}>
                {cat}
              </Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Repay Universe</h4>
            {[
              { name: 'BooksRepay', url: '/', sub: 'You are here', color: '#BF5FFF' },
              { name: 'IdeasRepay', url: 'https://ideasrepay.com', sub: 'Build online income', color: 'rgba(255,255,255,0.7)' },
              { name: 'AdsRepay', url: 'https://adsrepay.com', sub: 'Earn while you browse', color: 'rgba(255,255,255,0.7)' },
            ].map(e => (
              <a key={e.name} href={e.url} style={{ display: 'block', marginBottom: '14px', textDecoration: 'none' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: e.color }}>{e.name}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{e.sub}</div>
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>© 2026 Repay Media. All rights reserved.</p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>One book can change everything.</p>
        </div>
      </div>
    </footer>
  );
}
