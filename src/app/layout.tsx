import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dengyie.github.io'),
  title: 'Little Lighthouse',
  description: 'A personal technical blog for notes, thoughts, and code.',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  openGraph: {
    title: 'Little Lighthouse',
    description: 'A personal technical blog for notes, thoughts, and code.',
    url: 'https://dengyie.github.io',
    siteName: 'Little Lighthouse',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
