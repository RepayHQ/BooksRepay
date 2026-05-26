import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — BooksRepay',
  description: 'Terms of Service for BooksRepay.',
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

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 32px)' }}>
      <div style={{ height: '1px', width: '32px', background: '#BF5FFF', marginBottom: '20px' }} />
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, letterSpacing: '-1px', color: '#fff', marginBottom: '8px', lineHeight: 1.1 }}>
        Terms of Service
      </h1>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '40px' }}>Last updated: May 2026</p>

      <Section title="Acceptance of Terms">
        <P>By accessing or using BooksRepay ("the Site"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Site.</P>
      </Section>

      <Section title="Description of Service">
        <P>BooksRepay is a free audiobook discovery and browsing platform. We aggregate and organise publicly available audiobook content from YouTube, making it easier to find and enjoy. Access to all content is provided free of charge and on an as-is basis.</P>
        <P>We reserve the right to modify, suspend, or discontinue any aspect of the Site at any time without notice.</P>
      </Section>

      <Section title="Content and YouTube Embeds">
        <P>All audiobooks available on BooksRepay are embedded directly from YouTube. BooksRepay does not host, store, upload, or distribute any audio files. All audio content is streamed from YouTube via their standard embedding functionality in accordance with YouTube's Terms of Service.</P>
        <P>All audiobooks remain the property of their respective owners and original uploaders on YouTube. BooksRepay claims no ownership over any audio content displayed on the Site.</P>
      </Section>

      <Section title="Intellectual Property">
        <P>The BooksRepay name, logo, and site design are the property of Repay Media. The audiobook content embedded on the Site belongs to its respective copyright holders.</P>
        <P>If you believe content displayed on BooksRepay infringes your copyright, please contact the original YouTube uploader directly or submit a copyright complaint to YouTube. You may also contact us and we will promptly remove the listing.</P>
      </Section>

      <Section title="User Conduct">
        <P>You agree to use BooksRepay only for lawful purposes and in a way that does not infringe the rights of others. You may not attempt to scrape, copy, or reproduce the Site's catalogue or structure without permission.</P>
      </Section>

      <Section title="Limitation of Liability">
        <P>BooksRepay is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or availability of any content. To the fullest extent permitted by law, Repay Media shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site.</P>
      </Section>

      <Section title="Third-Party Links">
        <P>The Site contains links to third-party websites including YouTube, IdeasRepay, and AdsRepay. We are not responsible for the content or practices of those sites.</P>
      </Section>

      <Section title="Changes to These Terms">
        <P>We may update these Terms of Service from time to time. Continued use of the Site after any changes constitutes acceptance of the new terms.</P>
      </Section>

      <Section title="Contact">
        <P>For questions about these terms, contact us at{' '}
          <a href="mailto:info.gamesrepay@gmail.com" style={{ color: '#BF5FFF', textDecoration: 'none' }}>info.gamesrepay@gmail.com</a>.
        </P>
      </Section>
    </div>
  );
}
