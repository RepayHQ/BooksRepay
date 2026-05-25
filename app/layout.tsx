import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BooksRepay — Free Audiobooks, 43,000+ Titles",
  description: "The world's largest free audiobook library. Stream 43,000+ audiobooks across every genre — self development, philosophy, fiction, classics and more. Books always repay you.",
  keywords: "free audiobooks, audiobooks online, listen to books free, full audiobooks, classics audiobooks",
  openGraph: {
    title: "BooksRepay — Free Audiobooks",
    description: "43,000+ free audiobooks. Books always repay you.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
      </head>
      <body>
        <Navbar />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
