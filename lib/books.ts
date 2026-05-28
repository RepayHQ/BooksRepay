export interface Book {
  videoId: string;
  bookTitle: string;
  author: string;
  category: string;
  channelName: string;
  youtubeUrl: string;
  embedUrl: string;
  thumbnail: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  publishedAt: string;
  cardColor: string;
  cardBgColor: string;
  cardIcon: string;
  coverImage: string | null;
}

export const CATEGORY_CONFIG: Record<string, { color: string; bgColor: string; icon: string; emoji: string }> = {
  "Self Development": { color: "#FFB800", bgColor: "#07091c", icon: "ti-flame", emoji: "🔥" },
  "Philosophy": { color: "#BF5FFF", bgColor: "#0c0818", icon: "ti-infinity", emoji: "♾️" },
  "Business": { color: "#00FF9D", bgColor: "#03100a", icon: "ti-rocket", emoji: "🚀" },
  "Fiction": { color: "#FF6B00", bgColor: "#100800", icon: "ti-wand", emoji: "🪄" },
  "Psychology": { color: "#FF4E6A", bgColor: "#0f0018", icon: "ti-heart", emoji: "❤️" },
  "Spirituality": { color: "#00C9FF", bgColor: "#00091a", icon: "ti-sparkles", emoji: "✨" },
  "Finance": { color: "#00D68F", bgColor: "#001a0d", icon: "ti-chart-bar", emoji: "📈" },
  "Science": { color: "#00B4CC", bgColor: "#000d1a", icon: "ti-atom", emoji: "⚛️" },
  "History": { color: "#EF9F27", bgColor: "#1a0f00", icon: "ti-clock", emoji: "🏛️" },
  "Biography": { color: "#5DCAA5", bgColor: "#031a12", icon: "ti-user", emoji: "👤" },
  "Classics": { color: "#B5D4F4", bgColor: "#050d1a", icon: "ti-feather", emoji: "📖" },
  "Health": { color: "#97C459", bgColor: "#0a1200", icon: "ti-heart-rate-monitor", emoji: "💚" },
  "Sleep": { color: "#7F77DD", bgColor: "#0a0820", icon: "ti-moon", emoji: "🌙" },
  "Mixed": { color: "#888780", bgColor: "#0d0d0d", icon: "ti-book", emoji: "📚" },
  "Uncategorized": { color: "#888780", bgColor: "#0d0d0d", icon: "ti-book", emoji: "📚" },
};

export const CATEGORIES = Object.keys(CATEGORY_CONFIG).filter(c => !["Mixed", "Uncategorized"].includes(c));

let booksCache: Book[] | null = null;

export async function getAllBooks(): Promise<Book[]> {
  if (booksCache) return booksCache;
  const res = await fetch('/books_final.json');
  booksCache = await res.json();
  return booksCache!;
}

export function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return views.toString();
}

export function repayScore(views: number, likes: number): number {
  let score = 6.0;
  if (views > 1000000) score = 9.5;
  else if (views > 500000) score = 9.0;
  else if (views > 100000) score = 8.5;
  else if (views > 50000) score = 8.0;
  else if (views > 10000) score = 7.5;
  else if (views > 5000) score = 7.0;
  else if (views > 1000) score = 6.5;
  if (likes > 0 && views > 0 && likes / views > 0.05) score = Math.min(10, score + 0.5);
  return Math.round(score * 10) / 10;
}

export function getBookSlug(book: Book): string {
  const lowerTitle = book.bookTitle.toLowerCase();
  const lowerAuthor = book.author ? book.author.toLowerCase() : '';
  const combined = (lowerAuthor && !lowerTitle.includes(lowerAuthor))
    ? lowerTitle + ' ' + lowerAuthor
    : lowerTitle;
  let textSlug = combined
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (textSlug.length > 80) {
    textSlug = textSlug.slice(0, 80).replace(/-+$/, '');
  }
  return `${textSlug}-${book.videoId}`;
}

export function getVideoIdFromSlug(slug: string): string {
  if (slug.length === 11) return slug;
  return slug.slice(-11);
}
