import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import LayoutProvider from '@/components/LayoutProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlogHub - Premium Modern Blogging Platform',
  description:
    'A stunning, production-ready blogging platform with beautiful UI, smooth animations, and powerful features for writers.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['blog', 'platform', 'writing', 'content', 'articles', 'community'],
  authors: [{ name: 'BlogHub Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen gradient-bg">
          <LayoutProvider>{children}</LayoutProvider>
        </div>
      </body>
    </html>
  );
}
