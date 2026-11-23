import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Clock3, Github } from 'lucide-react'
import '../../blog.css'

export const metadata: Metadata = {
  title: 'Day 2 — My Notes on Volatile and AtomicInteger in Java | Giridharan Veeran',
  description: 'My Java concurrency notes using a payment worker and payment counter: visibility, atomicity, lost updates, CAS and lessons from running the code.',
  alternates: { canonical: '/blog/volatile-and-atomicinteger-java' },
  openGraph: {
    title: 'Day 2 — My Notes on Volatile and AtomicInteger in Java',
    description: 'What I learned about volatile and atomic increments using simple payment-processing examples.',
    type: 'article',
    url: 'https://www.giridharanveeran.in/blog/volatile-and-atomicinteger-java',
  },
}
const worker = `public class PaymentWorker implements Runnable {
    private final BlockingQueue<String> paymentsQueue;
    private volatile boolean running = true;

    public PaymentWorker(BlockingQueue<String> paymentsQueue) {
        this.paymentsQueue = paymentsQueue;
    }

    @Override
    public void run() {
        log.info("Payment worker started");
        while (running) {
            try {
                String paymentId = paymentsQueue.poll(
                    500, TimeUnit.MILLISECONDS);
                if (paymentId != null) {
                    processPayment(paymentId);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.warn("Payment worker interrupted", e);
                break;
            }
        }
        log.info("Payment worker finished");
    }

    public void shutdown() {
        running = false;
        log.info("Payment worker shutdown requested");
    }
}`
const counter = `import java.util.concurrent.atomic.AtomicInteger;

public class PaymentCounter {
    private final AtomicInteger counter = new AtomicInteger(0);

    public int paymentCompleted() {
        return counter.incrementAndGet();
    }

    public int getSuccessfulPayment() {
        return counter.get();
    }
}`
const demo = `PaymentCounter counter = new PaymentCounter();

try (var executor = Executors.newFixedThreadPool(5)) {
    for (int i = 0; i < 100; i++) {
        executor.submit(counter::paymentCompleted);
    }
}

log.info("Total payments completed: {}",
        counter.getSuccessfulPayment());`
const toc = [
  { id: 'start', label: 'Why I picked this topic' },
  { id: 'visibility', label: '1. Visibility vs atomicity' },
  { id: 'volatile', label: '2. Volatile payment worker' },
  { id: 'counter', label: '3. The lost-update problem' },
  { id: 'atomic', label: '4. AtomicInteger example' },
  { id: 'experiment', label: '5. Trying multiple threads' },
  { id: 'cas', label: '6. A note on CAS' },
  { id: 'takeaways', label: 'My Day 2 takeaways' },
]
const Code = ({ children }: { children: string }) => <pre className="note-code"><code>{children.trim()}</code></pre>
const Insight = ({ children }: { children: React.ReactNode }) => <aside className="note-insight"><span className="note-insight-icon">↳</span><div>{children}</div></aside>
export default function ConcurrencyNotes() {
  return <main className="blog-shell">
    <div className="blog-topbar"><Link href="/" className="blog-brand">g<span>.</span> / notes</Link><Link href="/blog" className="blog-back"><ArrowLeft size={16}/> All notes</Link></div>
    <div className="blog-container">
      <header className="note-hero">
        <div className="blog-kicker"><span className="blog-dot"/> PATH TO JAVA ARCHITECT / DAY 02</div>
        <div className="note-meta"><span>JAVA CONCURRENCY</span><span><Clock3 size={14}/> 7–9 MIN READ</span><span>JAVA · GRADLE</span></div>
        <h1>My notes on <em>Volatile</em> and AtomicInteger in Java.</h1>
        <p className="blog-lead">After learning Double-Checked Locking on Day 1, I wanted to better understand what volatile really does and why we need atomic variables when multiple threads update shared data.</p>
        <div className="note-hero-footer"><div className="note-author"><span className="note-avatar">GV</span><div><strong>Giridharan Veeran</strong><small>Learning, trying and writing it down</small></div></div><a href="https://github.com/giri18v/path-to-java-architect" target="_blank" rel="noopener noreferrer" className="note-github"><Github size={17}/> Java examples on GitHub <ArrowUpRight size={14}/></a></div>
      </header>
      <div className="note-layout"><article className="note-content">
        <section id="start"><div className="note-section-number">00 / WHERE I STARTED</div><h2>Why I picked this topic</h2>
          <p>Continuing my Path to Java Architect journey.</p>
          <p>On Day 1, I revisited Singleton and spent some time understanding why Double-Checked Locking uses <code>synchronized</code> and <code>volatile</code>.</p>
          <p>That made me curious about what happens when multiple threads read and update the same variable. So for Day 2, I tried two small payment-processing examples: a worker that needs to stop, and a counter that tracks completed payments.</p>
          <p>These are my notes from implementing and testing them.</p>
        </section>
        <section id="visibility"><div className="note-section-number">01 / TWO DIFFERENT PROBLEMS</div><h2>Visibility and atomicity</h2>
          <p>I found it helpful to separate these two ideas before writing the code.</p>
          <div className="note-definition-grid"><div><span>VISIBILITY</span><strong>Can another thread see the change?</strong><p>One thread updates a shutdown flag. Another thread needs to observe it.</p></div><div><span>ATOMICITY</span><strong>Can two updates interfere?</strong><p>Two threads increment a shared counter at the same time. Neither increment should be lost.</p></div></div>
          <Insight><strong>What clicked for me:</strong> seeing an updated value and safely updating a value are not the same thing.</Insight>
        </section>
        <section id="volatile"><div className="note-section-number">02 / MY FIRST EXAMPLE</div><h2>Volatile — stopping a payment worker</h2>
          <p>I created a <code>PaymentWorker</code> that reads payment IDs from a <code>BlockingQueue</code>. It processes one payment at a time, while the main thread can request a shutdown.</p>
          <p>The important field is <code>private volatile boolean running = true;</code>. The worker checks it in a loop. Another thread sets it to <code>false</code> in <code>shutdown()</code>.</p>
          <Code>{worker}</Code>
          <div className="day2-worker-diagram"><span className="day2-label">A SHUTDOWN SIGNAL BETWEEN THREADS</span><div className="day2-lanes"><div><small>WORKER THREAD</small><strong>Processes Payment 1</strong><span>Checks running between payments</span><strong className="day2-good">Reads false → exits loop</strong></div><div className="day2-signal"><span>volatile running</span><b>true → false</b><span>shared flag</span></div><div><small>MAIN THREAD</small><strong>Starts worker</strong><span>Requests shutdown</span><strong>Calls shutdown()</strong></div></div></div>
          <p>I added three payments to the queue. In my experiment, the first payment finished, then the worker stopped and two payments remained queued.</p>
          <p>That helped me understand something important: <strong>volatile doesn't interrupt work already in progress.</strong> It makes the shutdown signal visible when the worker reads the variable again.</p>
          <p>It also doesn't recover a failed payment. If the JVM crashes, an in-memory queue won't preserve the remaining messages. Real payment processing needs durable messaging, reliable state tracking and idempotency.</p>
        </section>
        <section id="counter"><div className="note-section-number">03 / ANOTHER CONCURRENCY PROBLEM</div><h2>What goes wrong with counter++?</h2>
          <p>Next, I wanted to count successfully completed payments. My first thought was to use a shared <code>int</code>.</p>
          <Code>{`private volatile int counter = 0;

public void paymentCompleted() {
    counter++;
}`}</Code>
          <p>Even with <code>volatile</code>, this is unsafe when multiple threads increment together. The increment has three logical steps: read the old value, add one, and write the new value.</p>
          <p>Two threads can both read zero, calculate one and write one. Two payments were completed, but the counter only shows one.</p>
          <div className="day2-race"><span className="day2-label">HOW ONE UPDATE GETS LOST</span><div className="day2-race-head"><span>STEP</span><span>THREAD 1</span><span>THREAD 2</span><span>COUNT</span></div><div className="day2-race-row"><b>01</b><span>Reads 0</span><span>Reads 0</span><strong>0</strong></div><div className="day2-race-row"><b>02</b><span>Calculates 1</span><span>Calculates 1</span><strong>0</strong></div><div className="day2-race-row"><b>03</b><span>Writes 1</span><span>Writes 1</span><strong>1</strong></div><div className="day2-race-outcome"><span>Expected: <strong>2</strong></span><span>Possible actual result: <strong>1</strong></span></div></div>
          <Insight>This is a <strong>lost update</strong>. Volatile helps with visibility, but doesn't make the whole read-add-write sequence atomic.</Insight>
        </section>
        <section id="atomic"><div className="note-section-number">04 / MAKING THE INCREMENT SAFE</div><h2>Using AtomicInteger</h2>
          <p>I created a small <code>PaymentCounter</code> class with <code>AtomicInteger</code>.</p><Code>{counter}</Code>
          <p><code>new AtomicInteger(0)</code> starts the counter at zero. <code>incrementAndGet()</code> increments it atomically and returns the new value. <code>get()</code> reads the current value.</p>
          <p>Multiple threads can call <code>paymentCompleted()</code> and the increments won't be lost.</p>
          <div className="note-compare"><div className="note-compare-head"><span>WHAT I NEED</span><span>VOLATILE INT</span><span>ATOMICINTEGER</span></div><div><span>Other threads see updates</span><span className="note-yes">Yes</span><span className="note-yes">Yes</span></div><div><span>Safe count++ / increment</span><span className="note-no">No</span><span className="note-yes">Yes, with incrementAndGet()</span></div><div><span>Good example</span><span>Shutdown flag*</span><span>Local concurrent counter</span></div></div>
          <p><small>*For a shutdown flag I'd use <code>volatile boolean</code>, rather than a volatile integer.</small></p>
        </section>
        <section id="experiment"><div className="note-section-number">05 / RUNNING THE CODE</div><h2>Trying it with multiple threads</h2>
          <p>I used <code>Executors.newFixedThreadPool(5)</code> to run 100 counter updates. The example below is a shorter version of the idea.</p><Code>{demo}</Code>
          <p>Once the executor has finished all tasks successfully, I expect a count of 100.</p>
          <p>I actually made a mistake during my first experiment: I called <code>paymentCompleted()</code> while printing the total. That incremented the counter again! I changed the log to use <code>getSuccessfulPayment()</code> instead.</p>
          <p>It was a useful reminder: <strong>AtomicInteger prevents lost increments, but it doesn't fix mistakes in business logic.</strong> I also added tests so I can revisit the examples later.</p>
          <Insight>In a real application, a JVM-local counter is useful for operational information. I wouldn't treat it as the authoritative number of financial transactions.</Insight>
        </section>
        <section id="cas"><div className="note-section-number">06 / SOMETHING I WANT TO LEARN MORE ABOUT</div><h2>Compare-And-Set (CAS)</h2>
          <p>While looking at <code>AtomicInteger</code>, I came across CAS. The simple idea is: update a value only if it still matches the value I read before.</p>
          <p>If two threads both read 5, one might successfully change it to 6. The other thread's attempt to change 5 to 6 fails because the value is already 6. It can read the new value and retry.</p>
          <div className="day2-cas"><span className="day2-label">A SIMPLE CAS RETRY EXAMPLE</span><div><span>Counter = 5</span><strong>→</strong><span>T1: CAS(5, 6) ✓</span></div><div><span>Counter = 6</span><strong>→</strong><span>T2: CAS(5, 6) ✕</span></div><div><span>T2 reads 6</span><strong>→</strong><span>T2: CAS(6, 7) ✓</span></div></div>
          <p>This is a useful way to understand CAS-based atomic updates. The JVM may also use other supported atomic instructions for operations such as increment.</p>
          <p>I want to explore CAS further, especially contention and the ABA problem.</p>
        </section>
        <section id="takeaways"><div className="note-section-number">07 / WRAPPING UP</div><h2>My takeaways from Day 2</h2>
          <ol className="takeaways"><li>Volatile and AtomicInteger solve different concurrency problems.</li><li>Volatile is useful when one thread needs to observe another thread's update.</li><li>Volatile doesn't make <code>counter++</code> atomic.</li><li>AtomicInteger provides atomic methods such as <code>incrementAndGet()</code>.</li><li>CAS helped me understand conditional atomic updates.</li><li>Thread-safe operations don't automatically make an entire payment process thread-safe.</li><li>Neither mechanism automatically coordinates counters across multiple JVMs or Kubernetes pods.</li><li>For actual payments, we still need reliable persistence, recovery and idempotency.</li></ol>
          <p>My main takeaway was learning the difference between <strong>visibility and atomicity</strong>. Writing these examples made the distinction much clearer than just reading the definitions.</p>
          <p>These are personal learning notes I'm sharing in case they're useful to anyone else revisiting Java concurrency.</p>
          <div className="note-end"><div><span className="note-section-number">PREVIOUS ARTICLE</span><strong>Day 1 — Singleton Design Pattern</strong><p>Where I first came across volatile in Double-Checked Locking.</p></div><Link href="/blog/singleton-design-pattern-java">Read Day 1 <ArrowUpRight size={14}/></Link></div>
          <p className="singleton-tags">#PathToJavaArchitect &nbsp; #Java &nbsp; #Multithreading &nbsp; #Concurrency &nbsp; #AtomicInteger</p>
        </section>
      </article><aside className="note-sidebar"><span>ON THIS PAGE</span>{toc.map(item => <a key={item.id} href={'#'+item.id}>{item.label}</a>)}<div className="sidebar-repo"><Github size={20}/><p>I keep these Java examples and tests in my learning repository.</p><a href="https://github.com/giri18v/path-to-java-architect" target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={13}/></a></div></aside></div>
    </div><footer className="blog-footer"><span>© Giridharan Veeran · My Path to Java Architect notes</span><Link href="/blog">All notes <ArrowUpRight size={14}/></Link></footer>
  </main>
}
