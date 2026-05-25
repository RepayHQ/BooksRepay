'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard';
import { Book } from '@/lib/books';
import { Search } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [books, setBooks] = useState<Book[]>([]);
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/books_final.json').then(r => r.json()).then((data: Book[]) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!q || !books.length) return;
    const lower = q.toLowerCase();
    setResults(books.filter(b =>
      b.bookTitle.toLowerCase().includes(lower) ||
      b.author.toLowerCase().includes(lower) ||
      b.category.toLowerCase().includes(lower) ||
      b.channelName.toLowerCase().includes(lower)
    ).slice(0, 100));
  }, [q, books]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          {q ? `Results for "${q}"` : 'Search'}
        </h1>
        {!loading && q && (
          <p className="text-white/40 text-sm">{results.length} audiobooks found</p>
        )}
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {results.map((book, i) => <BookCard key={book.videoId} book={book} index={i} />)}
        </div>
      ) : q ? (
        <div className="text-center py-20 text-white/30">
          <Search size={40} className="mx-auto mb-4 opacity-20" />
          <p>No results found for "{q}"</p>
          <p className="text-sm mt-2">Try a different search term</p>
        </div>
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" /></div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
