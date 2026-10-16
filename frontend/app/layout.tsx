import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import FloatingContact from '@/components/FloatingContact';
import PageLoader from '@/components/PageLoader';

export const metadata: Metadata = {
  title: 'Orient Energy — Industrial Supply & Engineering Solutions in Saudi Arabia',
  description: 'Reliable industrial supply and engineering solutions in Saudi Arabia for oil & gas, energy, marine, drilling, and infrastructure projects.',
  keywords: 'industrial supply, engineering solutions, Saudi Arabia, oil gas, marine, Orient Energy, OETC',
  openGraph: {
    title: 'Orient Energy — Industrial Supply & Engineering Solutions',
    description: 'Reliable industrial supply and engineering solutions in Saudi Arabia.',
    siteName: 'Orient Energy',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
