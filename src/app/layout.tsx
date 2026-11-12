import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.giridharanveeran.in'),
  title: 'Giridharan Veeran | Java Tech Lead & Solution Architecture',
  description: 'Giridharan Veeran — Java Tech Lead in London. Explore engineering work, distributed systems, Spring Boot and the Path to Java Architect learning journey.',
  openGraph: {
    title: 'Giridharan Veeran | Java Tech Lead & Solution Architecture',
    description: 'Code with intent. Architect for impact.',
    type: 'website',
    url: 'https://www.giridharanveeran.in',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
