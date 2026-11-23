import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrailerModal from '@/components/TrailerModal';

export const metadata: Metadata = {
  title: 'Kino uz — Eng sara filmlar, seriallar va AI kino maslahatchisi',
  description:
    "O'zbekistonning zamonaviy va aqlli kino, serial va anime platformasi. To'liq HD filmlar, AI tavsiyalar, rasmiy treylerlar va premyeralar.",
  keywords: [
    'kino uz',
    'kinouz',
    'kino uzbek',
    'uzbekcha kinolar',
    'yangi kinolar 2024',
    'tarjima kinolar',
    'seriallar',
    'anime uzbekcha',
    'hd kinolar',
    'kino tomosha qilish',
    'filmlar',
    'ai kino',
  ],
  authors: [{ name: 'Sardor Qarshiyev' }],
  creator: 'Sardor Qarshiyev',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://kino-uz-rho.vercel.app',
    title: 'Kino uz — Eng sara filmlar va seriallar platformasi',
    description: "To'liq HD kinolar, yangi premyeralar va AI kino maslahatchisi.",
    siteName: 'Kino uz',
  },
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
