'use client';
import { useState, useEffect } from 'react';
import { Book, CATEGORY_CONFIG, formatViews, repayScore } from '@/lib/books';
import BookCard from '@/components/BookCard';
import { ArrowLeft, ExternalLink, Star, Eye, Clock, Play } from 'lucide-react';
import Link from 'next/link';

export default function BookPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Book | null>(null);
  const [related, setRelated] = useState<Book[]>([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetch('/books_final.json')
      .then(r => r.json())
      .then((books: Book[]) => {
        const found = books.find(b => b.videoId === params.id);
        setBook(found || null);
        if (found) {
          const rel = books.filter(b => b.category === found.category && b.videoId !== found.videoId).slice(0, 5);
          setRelated(rel);
        }
      });
  }, [params.id]);

  if (!book) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
    </div>
  );

  const cat = CATEGORY_CONFIG[book.category] || CATEGORY_CONFIG['Uncategorized'];
  const score = repayScore(book.viewCount, book.likeCount);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} />
          Back to library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: player */}
          <div className="lg:col-span-2">

            {/* Video player */}
            <div className="relative rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '16/9', background: '#0d0d1a' }}>
              {playing ? (
                <iframe
                  src={`${book.embedUrl}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  {book.thumbnail && (
                    <img src={book.thumbnail} alt={book.bookTitle} className="w-full h-full object-cover opacity-60" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0" style={{ background: `${cat.bgColor}cc` }} />
                    <button
                      onClick={() => setPlaying(true)}
                      className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ background: cat.color }}>
                      <Play size={32} fill="#000" color="#000" />
                    </button>
                  </div>
                  {/* Top line */}
                  <div className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                </div>
              )}
            </div>

            {/* Book info */}
            <div className="mb-2">
              <div className="cat-pill mb-3" style={{ background: `${cat.color}22`, color: cat.color, border: `0.5px solid ${cat.color}44` }}>
                {book.category}
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {book.bookTitle}
            </h1>
            {book.author && (
              <p className="text-lg mb-4" style={{ color: cat.color }}>{book.author}</p>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white/40">
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{formatViews(book.viewCount)} views</span>
              </div>
              {book.duration && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{book.duration}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star size={14} fill={cat.color} style={{ color: cat.color }} />
                <span>{score} Repay Score</span>
              </div>
              <div className="text-white/30">By {book.channelName}</div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setPlaying(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-black transition-transform hover:scale-105"
                style={{ background: cat.color }}>
                <Play size={16} fill="#000" color="#000" />
                Listen Now
              </button>
              <a href={book.youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all">
                <ExternalLink size={16} />
                YouTube
              </a>
            </div>
          </div>

          {/* Right: related */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              More like this
            </h3>
            <div className="flex flex-col gap-3">
              {related.map((b, i) => (
                <BookCard key={b.videoId} book={b} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
