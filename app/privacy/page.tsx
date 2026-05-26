import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — BooksRepay',
  description: 'Privacy Policy for BooksRepay.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', marginTop: '0' }}>{title}</h2>
    {children}
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: '12px' }}>{children}</p>
);

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 32px)' }}>
      <div style={{ height: '1px', width: '32px', background: '#BF5FFF', marginBottom: '20px' }} />
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, letterSpacing: '-1px', color: '#fff', marginBottom: '8px', lineHeight: 1.1 }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '40px' }}>Last updated: May 2026</p>

      <Section title="Overview">
        <P>BooksRepay ("we", "us", or "our") is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data when you use BooksRepay.</P>
      </Section>

      <Section title="Information We Collect">
        <P>We do not require you to create an account or provide personal information to use BooksRepay. However, certain information is collected automatically when you visit the site:</P>
        <P><strong style={{ color: 'rgba(255,255,255,0.8)' }}>Usage data:</strong> Pages visited, time spent, referring URLs, browser type, and device type — collected via Google Analytics.</P>
        <P><strong style={{ color: 'rgba(255,255,255,0.8)' }}>Cookies:</strong> Small text files stored on your device by your browser. These are used by Google Analytics and Google AdSense to understand site usage and serve relevant advertisements.</P>
      </Section>

      <Section title="How We Use Your Information">
        <P>The information collected is used solely to improve the BooksRepay experience — understanding which content is popular, how users navigate the site, and where we can make improvements. We do not sell, rent, or share your personal data with third parties for marketing purposes.</P>
      </Section>

      <Section title="Third-Party Services">
        <P><strong style={{ color: 'rgba(255,255,255,0.8)' }}>Google Analytics:</strong> We use Google Analytics to collect anonymised usage statistics. Google may use this data in accordance with their own privacy policy. You can opt out via the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#BF5FFF', textDecoration: 'none' }}>Google Analytics opt-out browser add-on</a>.</P>
        <P><strong style={{ color: 'rgba(255,255,255,0.8)' }}>Google AdSense:</strong> We display advertisements served by Google AdSense. Google uses cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#BF5FFF', textDecoration: 'none' }}>Google Ads Settings</a>.</P>
        <P><strong style={{ color: 'rgba(255,255,255,0.8)' }}>YouTube embeds:</strong> Audiobooks on BooksRepay are streamed via YouTube. When you play an audiobook, YouTube may set its own cookies and collect data in accordance with <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#BF5FFF', textDecoration: 'none' }}>Google's Privacy Policy</a>.</P>
      </Section>

      <Section title="Cookies">
        <P>By continuing to use BooksRepay, you consent to the use of cookies as described in this policy. You can control or disable cookies through your browser settings, though doing so may affect site functionality.</P>
      </Section>

      <Section title="Your Rights">
        <P>You have the right to access, correct, or request deletion of any personal data we hold about you. As BooksRepay collects minimal data and does not require registration, most data is anonymised and not attributable to a specific individual.</P>
      </Section>

      <Section title="Changes to This Policy">
        <P>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</P>
      </Section>

      <Section title="Contact">
        <P>For privacy questions, contact us at{' '}
          <a href="mailto:info.gamesrepay@gmail.com" style={{ color: '#BF5FFF', textDecoration: 'none' }}>info.gamesrepay@gmail.com</a>.
        </P>
      </Section>
    </div>
  );
}
