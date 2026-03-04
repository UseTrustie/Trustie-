import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trustie - AI-Powered Fact Verification',
  description: 'Verify any claim with AI-powered multi-source verification. Stop resume fraud, catch lies, and build trust.',
  keywords: 'fact checking, resume verification, AI verification, credential verification, background check',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/app"
      afterSignUpUrl="/app"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#111827',
          colorInputBackground: '#1f2937',
          colorText: '#ffffff',
          colorTextSecondary: '#9ca3af',
        },
        elements: {
          formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
          card: 'bg-gray-900 border border-gray-800',
          headerTitle: 'text-white',
          headerSubtitle: 'text-gray-400',
          socialButtonsBlockButton: 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700',
          formFieldLabel: 'text-white',
          formFieldInput: 'bg-gray-800 border-gray-700 text-white',
          footerActionLink: 'text-blue-400 hover:text-blue-300',
          identityPreviewText: 'text-white',
          identityPreviewEditButton: 'text-blue-400',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
