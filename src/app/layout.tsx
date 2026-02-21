import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trustie - AI-Powered Resume & Credential Verification',
  description: 'Stop resume fraud before it costs you $150,000. Verify credentials, employment history, and claims in seconds with multi-AI consensus.',
  keywords: 'resume verification, credential verification, background check, AI verification, HR tools, recruitment',
  openGraph: {
    title: 'Trustie - AI-Powered Resume Verification',
    description: 'Stop resume fraud before it costs you $150,000. Verify credentials in seconds.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
