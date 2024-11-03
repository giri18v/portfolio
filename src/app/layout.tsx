import './globals.css';

export const metadata = {
  title: 'Giridharan Veeran - Portfolio',
  description: 'Senior Java Backend Engineer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
