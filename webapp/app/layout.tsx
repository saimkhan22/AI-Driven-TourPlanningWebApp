import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/auth/AuthProvider';
import ProfessionalAIChatbot from '@/components/chat/ProfessionalAIChatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SMM Travel - AI-Powered Tour Planning',
  description: 'Plan your perfect trip across Pakistan with AI-powered recommendations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <ProfessionalAIChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
