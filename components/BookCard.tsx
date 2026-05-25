'use client';
import Link from 'next/link';
import { Book, CATEGORY_CONFIG } from '@/lib/books';

interface Props { book: Book; index?: number; }

export default function BookCard({ book, index = 0 }: Props) {
  const cat = CATEGORY_CONFIG[book.category] || CATEGORY_CONFIG['Uncategorized'];
  const score = book.viewCount > 5000000 ? 9.5 : book.viewCount > 1000000 ? 9.0 : book.viewCount > 500000 ? 8.5 : book.viewCount > 100000 ? 8.0 : book.viewCount > 10000 ? 7.5 : 7.0;
  const pct = Math.min(92, (book.viewCount / 200000) * 100);
  const title = book.bookTitle?.length > 38 ? book.bookTitle.substring(0, 38) + '...' : book.bookTitle;
  const catParts = book.category.split(' ');
  const catDisplay = catParts.length > 1 ? catParts[0] + '\n' + catParts.slice(1).join(' ') : book.category;

  return (
    <Link href={`/book/${book.videoId}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="book-card" style={{
        background: cat.bgColor, borderRadius: '10px', overflow: 'hidden',
        position: 'relative', height: '160px', cursor: 'pointer'
      }}>
        {/* Top line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
        {/* Orb */}
        <div style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', background: cat.color, top: '-15px', right: '-15px', opacity: 0.28, filter: 'blur(20px)' }} />
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, padding: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', marginBottom: '2px' }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: cat.color, lineHeight: 1.4 }}>
              {catDisplay}
            </div>
          </div>
          <div>
            <div style={{ height: '22px', display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
              <i className={`ti ${cat.icon}`} style={{ fontSize: '16px', color: cat.color, opacity: 0.75 }} />
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '2px' }}>{title}</div>
            {book.author && <div style={{ fontSize: '8px', color: cat.color, marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.author}</div>}
            <div style={{ height: '1.5px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '4px' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: cat.color, borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)' }}>★ {score} · {book.duration || '--'}</span>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: `${cat.color}22`, border: `0.5px solid ${cat.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ti ti-player-play" style={{ fontSize: '8px', color: cat.color }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
