import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BooksRepay — 43,000+ Free Audiobooks",
  description: "Stream 43,000+ free audiobooks from YouTube. Self development, philosophy, fiction, classics, spirituality and more. One book can change everything.",
  keywords: "free audiobooks, audiobooks online, listen to books free, audiobooks youtube, classics audiobooks, self development audiobooks",
  openGraph: {
    title: "BooksRepay — Free Audiobooks",
    description: "One book can change everything. 43,000+ free audiobooks.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
        />
      </head>
      <body>
        <Navbar />
        <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
