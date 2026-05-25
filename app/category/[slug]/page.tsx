'use client';
import { useState, useEffect } from 'react';
import BookCard from '@/components/BookCard';
import { Book, CATEGORY_CONFIG } from '@/lib/books';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function slugToCategory(slug: string): string {
  return Object.keys(CATEGORY_CONFIG).find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === slug
  ) || slug;
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const PER_PAGE = 40;

  const categoryName = slugToCategory(params.slug);
  const cat = CATEGORY_CONFIG[categoryName] || CATEGORY_CONFIG['Uncategorized'];

  useEffect(() => {
    fetch('/books_final.json').then(r => r.json()).then((data: Book[]) => {
      setBooks(data.filter(b => b.category === categoryName));
      setLoading(false);
    });
  }, [categoryName]);

  const paginated = books.slice(0, page * PER_PAGE);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/library" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to library
        </Link>

        {/* Category hero */}
        <div className="relative rounded-2xl p-8 mb-10 overflow-hidden"
          style={{ background: cat.bgColor, border: `0.5px solid ${cat.color}33` }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
            style={{ background: cat.color, filter: 'blur(60px)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
          <div className="relative z-10">
            <i className={`ti ${cat.icon} text-4xl mb-4 block`} style={{ color: cat.color }} aria-hidden="true" />
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {categoryName}
            </h1>
            <p className="text-white/40">{books.length.toLocaleString()} audiobooks</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
              {paginated.map((book, i) => <BookCard key={book.videoId} book={book} index={i} />)}
            </div>
            {paginated.length < books.length && (
              <div className="text-center">
                <button onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 rounded-full text-sm font-semibold text-black"
                  style={{ background: cat.color }}>
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
