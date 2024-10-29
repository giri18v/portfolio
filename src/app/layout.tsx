import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Giridharan Veeran - Senior Java Backend Engineer',
  description: 'Personal portfolio of Giridharan Veeran, a Senior Java Backend Engineer with expertise in Microservices, Cloud Platforms, and Database Optimization.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
