import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Clock3, Github } from 'lucide-react'
import '../../blog.css'

export const metadata: Metadata = {
  title: 'Day 1 — My Notes on Singleton Design Pattern in Java | Giridharan Veeran',
  description: 'My first Path to Java Architect learning note: lazy Singleton, synchronized method, DCL, volatile, 100-thread experiment and Spring Boot.',
  alternates: { canonical: '/blog/singleton-design-pattern-java' },
  openGraph: {
    title: 'Day 1 — My Notes on Singleton Design Pattern in Java',
    description: 'My notes while learning Singleton with Java code and thread safety examples.',
    type: 'article',
    url: 'https://www.giridharanveeran.in/blog/singleton-design-pattern-java',
  },
}

function Code({ children }: { children: string }) {
  return <pre className="note-code"><code>{children.trim()}</code></pre>
}
function Insight({ children }: { children: React.ReactNode }) {
  return <aside className="note-insight"><span className="note-insight-icon">↳</span><div>{children}</div></aside>
}
const lazy = `public class LazySingleton {

    private static LazySingleton instance;

    private LazySingleton() {}

    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}`
const synchronizedMethod = `public static synchronized SingletonMultithreaded getInstance() {

    if (instance == null) {
        instance = new SingletonMultithreaded();
    }

    return instance;
}`
const dcl = `public class SingletonWithDCL {

    private static volatile SingletonWithDCL instance;

    private SingletonWithDCL() {}

    public static SingletonWithDCL getInstance() {

        if (instance == null) {
            synchronized (SingletonWithDCL.class) {
                if (instance == null) {
                    instance = new SingletonWithDCL();
                }
            }
        }

        return instance;
    }
}`
const config = `@ConfigurationProperties(prefix = "payment")
public record PaymentSettings(
        int timeoutSeconds,
        int maxRetries
) {}`
const toc = [
  {id:'what',label:'What is Singleton?'},
  {id:'lazy',label:'1. Lazy Singleton'},
  {id:'synchronized',label:'2. Using synchronized'},
  {id:'dcl',label:'3. Double-Checked Locking'},
  {id:'threads',label:'4. Trying 100 threads'},
  {id:'spring',label:'5. Singleton in Spring Boot'},
  {id:'takeaways',label:'My takeaways'},
]

export default function SingletonArticle() {
  return <main className="blog-shell">
    <div className="blog-topbar"><Link href="/" className="blog-brand">g<span>.</span> / notes</Link><Link href="/blog" className="blog-back"><ArrowLeft size={16}/> All notes</Link></div>
    <div className="blog-container">
      <header className="note-hero">
        <div className="blog-kicker"><span className="blog-dot"/> PATH TO JAVA ARCHITECT / DAY 01</div>
        <div className="note-meta"><span>DESIGN PATTERNS</span><span><Clock3 size={14}/> 8–10 MIN READ</span><span>JAVA · GRADLE</span></div>
        <h1>My notes on the <em>Singleton</em> Design Pattern in Java.</h1>
        <p className="blog-lead">I started revisiting Java design patterns. For Day 1, I wanted to understand Singleton properly, especially what happens when multiple threads try to create the same object.</p>
        <div className="note-hero-footer"><div className="note-author"><span className="note-avatar">GV</span><div><strong>Giridharan Veeran</strong><small>Learning, trying and writing it down</small></div></div><a href="https://github.com/giri18v/path-to-java-architect" target="_blank" rel="noopener noreferrer" className="note-github"><Github size={17}/> Source code on GitHub <ArrowUpRight size={14}/></a></div>
      </header>
      <div className="note-layout">
        <article className="note-content">
          <section id="what"><div className="note-section-number">00 / STARTING POINT</div><h2>What is Singleton?</h2>
            <p>As part of my Path to Java Architect journey, I&apos;ve started revisiting Java design patterns.</p>
            <p>I&apos;m planning to study each pattern, implement it myself, test it, and document what I learn along the way.</p>
            <p>Starting with the Singleton Design Pattern.</p>
            <p>From what I understood, Singleton is used when we want only one instance of a class and a common way to access it.</p>
            <p>For example, in a payment application, different services might need to read the same configuration. Instead of creating multiple configuration manager objects, we can create one and share it.</p>
            <p>The basic idea is simple. But when multiple threads are involved, we need to be a little careful.</p>
            <div className="singleton-shared"><span className="singleton-shared-label">ONE INSTANCE, MULTIPLE CALLERS</span><div className="singleton-shared-flow"><div className="singleton-callers"><span>Payment Service</span><span>Refund Service</span><span>Audit Service</span></div><div className="singleton-connector" aria-hidden="true">→</div><div className="singleton-single"><small>Shared object</small><strong>PaymentConfig</strong><span>ONE INSTANCE</span></div></div></div>
          </section>
          <section id="lazy"><div className="note-section-number">01 / MY FIRST IMPLEMENTATION</div><h2>Lazy Singleton</h2>
            <p>I started with the simplest implementation.</p><Code>{lazy}</Code>
            <p>A few things I noted:</p>
            <ul><li>The constructor is private, so other classes cannot directly create an object.</li><li>The instance is stored in a static variable.</li><li>The object is created only when <code>getInstance()</code> is called for the first time.</li><li>Subsequent calls return the same object.</li></ul>
            <p>This looks fine in a single-threaded application.</p>
            <h3>But what happens if two threads call it at the same time?</h3>
            <p>Let&apos;s say T1 checks <code>instance == null</code> and finds it true. Before T1 creates the object, T2 also checks and finds it null. Now both threads can create separate objects.</p>
            <div className="singleton-race"><div className="singleton-race-row"><span>Step</span><strong>Thread T1</strong><strong>Thread T2</strong></div><div className="singleton-race-row"><span>1</span><div>Sees <code>null</code></div><div>—</div></div><div className="singleton-race-row"><span>2</span><div>—</div><div>Sees <code>null</code></div></div><div className="singleton-race-row"><span>3</span><div>Creates object A</div><div>Creates object B</div></div><div className="singleton-race-result">Two objects may be created. That breaks the Singleton idea.</div></div>
            <p>That&apos;s the problem with this implementation. It doesn&apos;t guarantee a single instance when multiple threads access it concurrently.</p>
          </section>
          <section id="synchronized"><div className="note-section-number">02 / MAKING IT THREAD-SAFE</div><h2>Using synchronized</h2>
            <p>To solve this, I tried adding <code>synchronized</code> to the method.</p><Code>{synchronizedMethod}</Code>
            <p>Here, only one thread can enter the method at a time.</p>
            <ul><li>T1 enters the method and acquires the lock.</li><li>T2 tries to enter but has to wait.</li><li>T1 creates the object and releases the lock.</li><li>T2 enters, finds the object already created, and returns the same instance.</li></ul>
            <p>This solves the problem of creating multiple objects.</p>
            <Insight><strong>But I noticed another problem.</strong> Even after the object has been created, every thread still needs to acquire the lock just to get the instance.</Insight>
            <p>Let&apos;s say 100 threads are trying to access it. They all have to acquire the lock one by one.</p>
            <p>The method is thread-safe, but this can introduce unnecessary locking overhead.</p>
            <p>This is what led me to Double-Checked Locking.</p>
          </section>
          <section id="dcl"><div className="note-section-number">03 / NEXT IMPLEMENTATION</div><h2>Double-Checked Locking (DCL)</h2>
            <p>Here is the implementation I tried.</p><Code>{dcl}</Code>
            <p>Initially, I was confused about why we need two null checks and the <code>volatile</code> keyword.</p>
            <p>After going through the execution step by step, this is what I understood.</p>
            <div className="singleton-steps"><div><span>01</span><strong>First null check</strong><p>Check if the object already exists. If it does, return it without taking the lock.</p></div><div><span>02</span><strong>Synchronized block</strong><p>If it doesn&apos;t exist, try to acquire the class lock. Only one thread can enter at a time.</p></div><div><span>03</span><strong>Second null check</strong><p>T1 might have created the object while T2 was waiting. The second check prevents T2 creating another one.</p></div><div><span>04</span><strong>volatile</strong><p>Threads that skip the lock still need to safely see the fully initialised object.</p></div></div>
            <h3>Why check twice?</h3>
            <p>Imagine T1 and T2 both passed the first null check. T1 acquires the lock and creates the object. T2 waits.</p>
            <p>When T2 finally acquires the lock, the object already exists. The second check prevents T2 from creating another one.</p>
            <h3>Why volatile?</h3>
            <p>This was the part I spent more time understanding.</p>
            <p>In DCL, some threads can return the instance without entering the synchronized block.</p>
            <p>Without <code>volatile</code>, Java doesn&apos;t guarantee that those threads will see the object&apos;s fully initialised state.</p>
            <p><code>volatile</code> provides the memory visibility and ordering guarantees needed to publish the object safely.</p>
            <Insight><strong>My understanding:</strong> <code>synchronized</code> prevents multiple threads creating the instance; the second check prevents duplicate creation after waiting; <code>volatile</code> ensures safe publication; and the first check avoids repeated locking after initialisation.</Insight>
          </section>
          <section id="threads"><div className="note-section-number">04 / MY SMALL EXPERIMENT</div><h2>Trying it with 100 threads</h2>
            <p>After understanding the implementations, I wanted to try them with multiple threads.</p>
            <p>I created a simple payment configuration example using two classes:</p>
            <ul><li><code>PaymentConfig</code> — using a synchronized method.</li><li><code>PaymentConfigWithDCL</code> — using Double-Checked Locking.</li></ul>
            <p>I used <code>Executors.newFixedThreadPool(100)</code> to submit 100 tasks and call the Singleton methods.</p>
            <p>My idea was to compare the time taken by both approaches. I used <code>System.nanoTime()</code> to measure the execution time.</p>
            <p>One thing I understood from this experiment is that <strong>the execution time doesn&apos;t depend only on synchronization.</strong> It also includes thread scheduling and executor overhead.</p>
            <p>So running 100 tasks once doesn&apos;t prove how much faster DCL is.</p>
            <p>What I can say from the implementation is that DCL avoids acquiring the lock on every call after the instance is created.</p>
            <p>I still need to explore JMH to measure the actual performance difference properly.</p>
          </section>
          <section id="spring"><div className="note-section-number">05 / WHAT ABOUT SPRING BOOT?</div><h2>Do we really need Singleton in Spring Boot?</h2>
            <p>While learning this, another question came to mind: in Spring Boot, do we really need to create Singleton classes manually?</p>
            <p>In most cases, we don&apos;t. Spring manages beans with singleton scope by default.</p>
            <p>For example, for payment configuration, we can use:</p><Code>{config}</Code>
            <p>With configuration-properties scanning or explicit registration enabled, Spring creates and manages this configuration bean.</p>
            <p>Other services can simply inject it through constructor injection.</p>
            <p>This approach is cleaner than writing a manual Singleton with <code>getInstance()</code>.</p>
            <p>One thing to remember is that a Spring singleton bean is shared within its application context. It isn&apos;t a single object shared across multiple application instances or Kubernetes pods.</p>
          </section>
          <section id="takeaways"><div className="note-section-number">06 / WRAPPING UP DAY 1</div><h2>My takeaways from Day 1</h2>
            <p>These are the main things I learned:</p>
            <ol className="takeaways"><li>Singleton is used to control object creation and provide a shared instance.</li><li>Lazy Singleton is simple, but it isn&apos;t thread-safe.</li><li>Adding <code>synchronized</code> prevents multiple threads from creating different instances.</li><li>Synchronizing the entire getter means every call still needs to acquire a lock.</li><li>Double-Checked Locking avoids repeated locking after initialisation.</li><li><code>volatile</code> is important for safe publication in DCL.</li><li>Even if Singleton creation is thread-safe, its mutable fields and methods may not be.</li><li>In Spring Boot, I would usually prefer Spring-managed beans instead of manually implementing Singleton.</li></ol>
            <p>The main thing I learned today wasn&apos;t just how to write a Singleton class.</p>
            <p>It was understanding why synchronization is needed, what problem it solves, and why DCL uses <code>volatile</code>.</p>
            <p>I also realised that just because a design pattern solves a problem doesn&apos;t mean we need to use it everywhere.</p>
            <p>I&apos;ve committed my implementations to GitHub as part of this learning journey.</p>
            <p>These are my personal learning notes, which I&apos;m sharing here in case they&apos;re useful to anyone revisiting Java design patterns.</p>
            <div className="note-end"><div><span className="note-section-number">NEXT TOPIC</span><strong>Volatile and AtomicInteger in Java</strong><p>Continue with Day 2: my payment worker and atomic counter examples.</p></div><a href="https://github.com/giri18v/path-to-java-architect" target="_blank" rel="noopener noreferrer"><Github size={16}/> View code <ArrowUpRight size={14}/></a></div>
            <p className="singleton-tags">#PathToJavaArchitect &nbsp; #Java &nbsp; #DesignPatterns &nbsp; #Multithreading</p>
          </section>
        </article>
        <aside className="note-sidebar"><span>ON THIS PAGE</span>{toc.map(item=><a key={item.id} href={'#'+item.id}>{item.label}</a>)}<div className="sidebar-repo"><Github size={20}/><p>I&apos;m keeping my Java examples in one GitHub repository as I learn.</p><a href="https://github.com/giri18v/path-to-java-architect" target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={13}/></a></div></aside>
      </div>
    </div>
    <footer className="blog-footer"><span>© Giridharan Veeran · My Path to Java Architect notes</span><Link href="/blog">All notes <ArrowUpRight size={14}/></Link></footer>
  </main>
}
