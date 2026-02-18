/**
 * Root Layout
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trustie - Verify AI with Real Sources',
  description: 'Stop blindly trusting AI. Verify AI-generated content against trusted sources in seconds.',
  keywords: ['AI verification', 'fact checking', 'trust', 'AI hallucinations', 'source verification'],
  authors: [{ name: 'Trustie' }],
  openGraph: {
    title: 'Trustie - Verify AI with Real Sources',
    description: 'Stop blindly trusting AI. Verify AI-generated content against trusted sources in seconds.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
