import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dengyie.github.io'),
  title: {
    default: 'Little Lighthouse',
    template: '%s | Little Lighthouse',
  },
  description: 'A handcrafted technical field journal for systems, code, and careful notes.',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  openGraph: {
    title: 'Little Lighthouse',
    description: 'A handcrafted technical field journal for systems, code, and careful notes.',
    url: 'https://dengyie.github.io',
    siteName: 'Little Lighthouse',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#121212',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
