import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — BooksRepay',
  description: 'BooksRepay is a free audiobook discovery platform with 43,000+ titles from YouTube.',
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 32px)' }}>
      <div style={{ height: '1px', width: '32px', background: '#BF5FFF', marginBottom: '20px' }} />
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, letterSpacing: '-1px', color: '#fff', marginBottom: '32px', lineHeight: 1.1 }}>
        About BooksRepay
      </h1>

      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, marginBottom: '20px' }}>
        BooksRepay is a free audiobook discovery platform. Our mission is simple: make the world's best audiobooks easy to find and free to enjoy.
      </p>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, marginBottom: '20px' }}>
        Thousands of incredible audiobooks already exist on YouTube — classic literature, philosophy, self-development, science, and more — but they're scattered across countless channels with no easy way to browse or discover them. We built BooksRepay to solve that.
      </p>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, marginBottom: '20px' }}>
        We organize and categorize over 43,000 audiobooks into a clean, searchable library so you can find your next great listen in seconds. Every audiobook streams directly from its original YouTube source, meaning full credit and views go to the original creators.
      </p>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, marginBottom: '20px' }}>
        BooksRepay is part of the Repay Media family, alongside{' '}
        <a href="https://ideasrepay.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFB800', textDecoration: 'none' }}>IdeasRepay</a>
        {' '}and{' '}
        <a href="https://adsrepay.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00FF9D', textDecoration: 'none' }}>AdsRepay</a>
        . We believe knowledge should be accessible to everyone, everywhere, for free.
      </p>

      <p style={{ fontSize: '18px', fontWeight: 700, color: '#BF5FFF', marginTop: '40px', fontStyle: 'italic' }}>
        One book can change everything.
      </p>
    </div>
  );
}
