import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import '../blog.css'

export const metadata: Metadata = {
  title: 'Java Learning Notes | Giridharan Veeran',
  description: 'My notes from the Path to Java Architect journey, with Java examples and things I learned while experimenting.',
}

export default function BlogPage() {
  return <main className="blog-shell">
    <div className="blog-topbar"><Link href="/" className="blog-brand">g<span>.</span> / notes</Link><Link href="/" className="blog-back"><ArrowLeft size={16}/> Back to portfolio</Link></div>
    <div className="blog-container blog-index">
      <div className="blog-kicker"><span className="blog-dot"/> PATH TO JAVA ARCHITECT / LEARNING JOURNAL</div>
      <h1>Things I learn.<br/><em>Things I build.</em></h1>
      <p className="blog-lead">I use this space to write down what I understood while learning Java, testing code and asking questions. These are my notes, shared in case they help someone else too.</p>
      <div className="blog-index-visual">
        <div className="blog-index-visual-icon">{'{ 1 }'}</div>
        <div><span>DAY 01 · DESIGN PATTERNS · JAVA</span><h2>My Notes on Singleton Design Pattern</h2><p>Lazy Singleton, synchronized and Double-Checked Locking. What I tried and what I learned.</p><Link href="/blog/singleton-design-pattern-java" className="blog-primary-link">Read my Day 1 notes <ArrowUpRight size={17}/></Link></div>
        <div className="blog-index-code" aria-hidden="true"><span>if (instance == null) {'{'}</span><span>  synchronized (...) {'{'}</span><strong>{'    // one instance'}</strong><span>  {'}'}</span><span>{'}'}</span></div>
      </div>
      <div className="blog-more"><span>NEXT / LEARNING NOTES</span><div><h3>Volatile and Atomicity in Java</h3><p>The next topic on my learning list. Article not published yet.</p></div><span className="blog-soon">NEXT TOPIC</span></div>
      <div className="blog-index-bottom"><a href="https://github.com/giri18v/path-to-java-architect" target="_blank" rel="noopener noreferrer"><Github size={17}/> Java examples on GitHub <ArrowUpRight size={15}/></a><Link href="/">Back to portfolio <ArrowUpRight size={15}/></Link></div>
    </div>
  </main>
}
