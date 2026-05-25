'use client';
import Link from 'next/link';
import { Book, CATEGORY_CONFIG, formatViews } from '@/lib/books';
import { Play, Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const cat = CATEGORY_CONFIG[book.category] || CATEGORY_CONFIG['Uncategorized'];
  const score = book.viewCount > 1000000 ? 9.5 : book.viewCount > 100000 ? 8.5 : book.viewCount > 10000 ? 7.5 : 6.5;

  return (
    <Link href={`/book/${book.videoId}`}>
      <div
        className="book-card relative rounded-xl overflow-hidden cursor-pointer group"
        style={{
          background: cat.bgColor,
          height: '190px',
          width: '100%',
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />

        {/* Orb atmosphere */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-40"
          style={{ background: cat.color, filter: 'blur(30px)', transform: 'translate(30%, -30%)' }} />

        {/* Content */}
        <div className="relative z-10 p-3 h-full flex flex-col justify-between">
          {/* Top: number + category */}
          <div>
            <div className="text-[9px] text-white/25 tracking-widest mb-1">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="text-[8px] font-semibold tracking-wider uppercase leading-tight"
              style={{ color: cat.color }}>
              {book.category.includes(' ') ? (
                <>{book.category.split(' ')[0]}<br />{book.category.split(' ').slice(1).join(' ')}</>
              ) : book.category}
            </div>
          </div>

          {/* Middle: icon */}
          <div className="text-[18px] opacity-70" style={{ color: cat.color }}>
            <i className={`ti ${cat.icon}`} aria-hidden="true" />
          </div>

          {/* Bottom: title, author, bar, rating */}
          <div>
            <div className="text-[11px] font-bold text-white leading-tight mb-1 line-clamp-2">
              {book.bookTitle}
            </div>
            {book.author && (
              <div className="text-[9px] mb-2 truncate" style={{ color: cat.color }}>
                {book.author}
              </div>
            )}
            {/* Progress bar */}
            <div className="h-[1.5px] bg-white/10 rounded-full mb-2">
              <div className="h-full rounded-full" style={{
                width: `${Math.min(95, (book.viewCount / 2000000) * 100)}%`,
                background: cat.color
              }} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star size={8} style={{ color: cat.color }} fill={cat.color} />
                <span className="text-[9px] text-white/40">{score}</span>
                {book.duration && (
                  <span className="text-[9px] text-white/25 ml-1">· {book.duration}</span>
                )}
              </div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `${cat.color}33`, border: `0.5px solid ${cat.color}66` }}>
                <Play size={8} style={{ color: cat.color }} fill={cat.color} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
