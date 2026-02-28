import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trustie - AI-Powered Fact Verification',
  description: 'Verify any claim with AI-powered multi-source verification. Stop resume fraud, catch lies, and build trust. Used by HR teams, recruiters, and compliance officers.',
  keywords: 'fact checking, resume verification, AI verification, credential verification, background check, claim verification, HR technology',
  authors: [{ name: 'Trustie' }],
  openGraph: {
    title: 'Trustie - Verify Any Claim with AI',
    description: 'AI-powered fact verification that cross-checks claims across multiple sources and AI models. Stop fraud. Build trust.',
    url: 'https://trustieapp.com',
    siteName: 'Trustie',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trustie - AI-Powered Fact Verification',
    description: 'Verify any claim with multi-source AI verification.',
    creator: '@UseTrustie',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
