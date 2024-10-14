// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

// Set the metadata for the document
export const metadata = {
  title: 'Link Scraper',  // Change this to the title you want
  icons: {
    icon: '/favicon.ico',  // Path to the favicon in the public directory
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Link Scraper</title>
        <link rel="icon" href="/favicon.ico" /> {/* Fallback for favicon */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
