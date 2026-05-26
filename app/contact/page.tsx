import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — BooksRepay',
  description: 'Get in touch with the BooksRepay team.',
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 32px)' }}>
      <div style={{ height: '1px', width: '32px', background: '#BF5FFF', marginBottom: '20px' }} />
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, letterSpacing: '-1px', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
        Get in Touch
      </h1>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '40px', maxWidth: '520px' }}>
        Have a question, suggestion, or found a broken link? We'd love to hear from you.
      </p>

      <div style={{ background: 'rgba(191,95,255,0.07)', border: '0.5px solid rgba(191,95,255,0.25)', borderRadius: '14px', padding: '24px 28px', marginBottom: '40px', display: 'inline-block' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>Email us at</div>
        <a href="mailto:info.gamesrepay@gmail.com" style={{ fontSize: '18px', fontWeight: 700, color: '#BF5FFF', textDecoration: 'none', letterSpacing: '-0.3px' }}>
          info.gamesrepay@gmail.com
        </a>
      </div>

      <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: '32px' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
          Part of the{' '}
          <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Repay Media</span>
          {' '}family —{' '}
          <a href="https://ideasrepay.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FFB800', textDecoration: 'none' }}>IdeasRepay</a>
          {' '}·{' '}
          <a href="https://adsrepay.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00FF9D', textDecoration: 'none' }}>AdsRepay</a>
          {' '}·{' '}
          <span style={{ color: '#BF5FFF' }}>BooksRepay</span>
        </p>
      </div>
    </div>
  );
}
