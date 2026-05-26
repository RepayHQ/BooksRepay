'use client';
import Link from 'next/link';
import { Book, CATEGORY_CONFIG } from '@/lib/books';

interface Props { book: Book; index?: number; }

export default function BookCard({ book, index = 0 }: Props) {
  const cat = CATEGORY_CONFIG[book.category] || CATEGORY_CONFIG['Uncategorized'];
  const score = book.viewCount > 5000000 ? 9.5 : book.viewCount > 1000000 ? 9.0 : book.viewCount > 500000 ? 8.5 : book.viewCount > 100000 ? 8.0 : 7.5;
  const pct = Math.min(92, (book.viewCount / 200000) * 100);
  const title = book.bookTitle?.length > 28 ? book.bookTitle.substring(0, 28) + '...' : book.bookTitle;
  const catLine1 = book.category.split(' ')[0] || '';
  const catLine2 = book.category.split(' ').slice(1).join(' ') || '';

  return (
    <Link href={`/book/${book.videoId}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: cat.bgColor,
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        height: '220px',
        cursor: 'pointer',
        border: `0.5px solid ${cat.color}22`,
        transition: 'transform 0.2s ease',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${cat.color}, transparent)`, borderRadius: '14px 14px 0 0' }} />
        <div style={{ position: 'absolute', width: '90px', height: '90px', borderRadius: '50%', background: cat.color, top: '-20px', right: '-20px', opacity: 0.25, filter: 'blur(28px)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '14px 14px 12px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em', marginBottom: '3px' }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: cat.color, lineHeight: 1.4 }}>
              {catLine1}{catLine2 ? <><br />{catLine2}</> : ''}
            </div>
          </div>
          <div style={{ height: '28px', display: 'flex', alignItems: 'center' }}>
            <i className={`ti ${cat.icon}`} style={{ fontSize: '22px', color: cat.color, opacity: 0.8 }} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', lineHeight: 1.25, marginBottom: '5px' }}>
              {title}
            </div>
            {book.author && (
              <div style={{ fontSize: '11px', color: cat.color, marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {book.author}
              </div>
            )}
            <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '8px' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: cat.color, borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>★ {score} · {book.duration || '--'}</span>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${cat.color}22`, border: `0.5px solid ${cat.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ti ti-player-play" style={{ fontSize: '11px', color: cat.color }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
