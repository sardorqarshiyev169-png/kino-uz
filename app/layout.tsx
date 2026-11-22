import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrailerModal from '@/components/TrailerModal';

export const metadata: Metadata = {
  title: 'Kino uz — Discover. Explore. Experience.',
  description:
    'O\'zbekistonning zamonaviy va aqlli kino, serial va anime kashfiyot platformasi. Rasmiy treylerlar, AI yordamchi va qonuniy ko\'rish havolalari.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="min-h-screen bg-kinodark-bg text-kinotext-main antialiased selection:bg-kinopurple-primary selection:text-white">
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <TrailerModal />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
