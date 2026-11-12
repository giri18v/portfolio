'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Braces,
  ChevronRight, Code2, Cpu, Database, Github,
  Layers3, Linkedin, Mail, MapPin, Menu, Network,
  Terminal, X
} from 'lucide-react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/giridharan-veeran-138621148/'
const GITHUB_URL = 'https://github.com/giri18v'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Writing', href: '#writing' },
]

const experience = [
  {
    company: 'Publicis Sapient',
    role: 'Senior Associate Technology',
    period: 'Nov 2022 — Present',
    context: 'ADCB Payments Platform · Lloyds Banking Group',
    description: 'Delivering banking and payments services, combining hands-on Java backend engineering with cross-team technical delivery and leadership.',
    highlights: [
      'ADCB: Implemented Java and Spring Boot microservices supporting WPS, domestic, VAT, pension and international payments.',
      'Designed Kafka-based asynchronous flows with schema validation, retries, dead-letter queues and resilience patterns.',
      'Secured APIs using Azure API Management and dynamic SpEL access controls; integrated Dataverse reference data.',
      'Lloyds Banking Group: Delivered identity verification, document submission and secure OTP-protected banking APIs.'
    ],
    technologies: ['Java', 'Spring Boot', 'Confluent Kafka', 'Azure APIM', 'SpEL', 'Dataverse'],
    current: true,
  },
  {
    company: 'Virtusa',
    role: 'Consultant',
    period: 'Jul 2017 — Nov 2022',
    context: 'BT Consumer · Oct 2020 — Nov 2022',
    description: 'Delivered microservice modernisation and partner integrations for telecommunications platforms.',
    highlights: [
      'Migrated monolithic TV, broadband and payments capabilities towards microservices.',
      'Integrated consumer services with external partners including Apple and Netflix.',
      'Implemented RabbitMQ messaging and optimised database queries while coordinating offshore delivery.'
    ],
    technologies: ['Java', 'Microservices', 'RabbitMQ', 'REST APIs', 'SQL'],
  },
  {
    company: 'Tech Mahindra',
    role: 'Software Engineer',
    period: 'Oct 2016 — Jul 2017',
    context: 'British Telecommunications · Bangalore, India',
    description: 'Software engineering role supporting the British Telecommunications account.',
    highlights: [],
    technologies: ['Software Engineering', 'Telecommunications'],
  },
]

const expertise = [
  { number: '01', icon: Code2, title: 'Backend engineering', text: 'Designing maintainable services, clean APIs and testable domain logic.', tags: ['Java', 'Spring Boot', 'REST', 'WebFlux'] },
  { number: '02', icon: Network, title: 'Distributed systems', text: 'Building for resilience, consistency and reliable asynchronous processing.', tags: ['Kafka', 'Microservices', 'Redis', 'DDD'] },
  { number: '03', icon: Layers3, title: 'Cloud & delivery', text: 'Turning architecture into deployable, observable production services.', tags: ['OpenShift', 'Kubernetes', 'Azure', 'CI/CD'] },
  { number: '04', icon: Cpu, title: 'AI & emerging tech', text: 'Exploring how AI can improve engineering workflows and learning experiences.', tags: ['Spring AI', 'LLM APIs', 'AI-assisted development'] },
]

const projects = [
  {
    label: 'LEARNING IN PUBLIC · IN DEVELOPMENT',
    name: 'Path to Java Architect',
    description: 'A hands-on series exploring Java design patterns, JVM internals, concurrency and architecture—through code, tests and documented trade-offs.',
    tags: ['Java 25', 'Gradle', 'JUnit', 'Design patterns'],
    icon: Braces,
    symbol: '01 / 30',
    href: '#writing',
    linkText: 'Explore the journey',
  },
  {
    label: 'ARCHITECTURE LAB · PLANNED',
    name: 'ArchitectPay',
    description: 'A reference payments platform for experimenting with domain boundaries, event-driven flows, reliable messaging and production-grade architecture.',
    tags: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Architecture'],
    icon: Database,
    symbol: 'SYSTEM / LAB',
    href: '#writing',
    linkText: 'See the roadmap',
  },
]

const articles = [
  { number: '01', category: 'DESIGN PATTERNS', title: 'Singleton Pattern, explained properly', detail: 'Eager, lazy, double-checked locking and enum', read: 'COMING SOON' },
  { number: '02', category: 'DESIGN PATTERNS', title: 'Factory Method in a payments application', detail: 'Reducing coupling through object creation', read: 'COMING SOON' },
  { number: '03', category: 'JAVA CONCURRENCY', title: 'Visibility, atomicity and the Java Memory Model', detail: 'From volatile to compare-and-set', read: 'COMING SOON' },
]

function BrandMark() {
  return (
    <a href="#top" aria-label="Giridharan Veeran, back to top" className="brand-mark">
      <span className="brand-icon"><span>g</span><span className="brand-dot">.</span></span>
      <span className="brand-wordmark">giridharan<span className="muted-word">/</span>veeran</span>
    </a>
  )
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="site-shell" id="top">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="site-header">
        <div className="container nav-inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="nav-social" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub"><Github size={20}/></a>
            <a className="nav-social" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><Linkedin size={20}/></a>
            <a className="nav-contact" href="mailto:giri18v@outlook.com">Let&apos;s talk <ArrowUpRight size={15}/></a>
            <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map((item) => <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16}/></a>)}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>GitHub <Github size={17}/></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn <Linkedin size={17}/></a>
            <a href="mailto:giri18v@outlook.com" onClick={() => setMenuOpen(false)}>Get in touch <ArrowUpRight size={16}/></a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot"/> ENGINEERING SYSTEMS THAT LAST <span className="eyebrow-line"/></div>
            <h1 id="hero-title">Code with intent.<br/><span className="hero-gradient">Architect for impact.</span></h1>
            <p className="hero-sub">I&apos;m <strong>Giridharan Veeran</strong> — a Java Tech Lead working at the intersection of backend engineering, distributed systems and solution architecture.</p>
            <div className="hero-actions">
              <a href="#work" className="button-primary">Explore my work <ArrowUpRight size={18}/></a>
              <a href="#about" className="button-ghost">More about me <ArrowDownRight size={17}/></a>
            </div>
            <div className="hero-social" aria-label="Social links">
              <a className="social-pill" href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><Github size={19}/> GitHub <ArrowUpRight size={14}/></a>
              <a className="social-pill social-pill-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><Linkedin size={19}/> LinkedIn <ArrowUpRight size={14}/></a>
              <span className="social-separator"/>
              <span><MapPin size={16}/> London, UK</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" aria-hidden="true"/><div className="orbit orbit-two" aria-hidden="true"/>
            <div className="profile-frame"><Image src="/profile.jpg" alt="Portrait of Giridharan Veeran" fill priority sizes="(max-width: 850px) 280px, 380px" className="profile-image"/></div>
            <div className="floating-card floating-top"><span className="float-icon"><Terminal size={17}/></span><span><small>CURRENT FOCUS</small><strong>Java & Solution Architecture</strong></span></div>
            <div className="floating-card floating-bottom"><span className="mini-signal"><span/><span/><span/><span/></span><span><small>BUILDING IN PUBLIC</small><strong>#PathToJavaArchitect</strong></span></div>
            <div className="vertical-stamp">ENGINEER / ARCHITECT / BUILDER</div>
          </div>
          <div className="hero-index"><span>01</span><span className="index-line"/><span>SCROLL TO EXPLORE</span></div>
        </section>

        <section className="ticker-strip" aria-label="Specialisations"><div className="container ticker-inner"><span>JAVA</span><span className="ticker-star">✳</span><span>SPRING BOOT</span><span className="ticker-star">✳</span><span>MICROSERVICES</span><span className="ticker-star">✳</span><span>EVENT-DRIVEN SYSTEMS</span><span className="ticker-star">✳</span><span>CLOUD ENGINEERING</span></div></section>

        <section className="section container about-grid" id="about">
          <div className="section-side"><span className="section-kicker">01 / INTRODUCTION</span><span className="side-line"/></div>
          <div className="section-main">
            <h2 className="section-heading">More than writing code.<br/><span>It&apos;s about making the right decisions.</span></h2>
            <div className="about-content"><p>I work on complex enterprise systems where reliability, performance and maintainability matter. My experience spans banking, payments, telecommunications and cloud-native backend platforms.</p><p>Today, I help translate business problems into pragmatic technical solutions—and I&apos;m documenting my journey deeper into Java architecture, design patterns and AI-enabled engineering.</p></div>
            <div className="about-highlights"><div><strong>Java & Spring</strong><span>Core engineering</span></div><div><strong>Financial systems</strong><span>Domain experience</span></div><div><strong>Hands-on leadership</strong><span>How I work</span></div></div>
          </div>
        </section>

        <section id="work" className="section work-section"><div className="container"><div className="section-top"><div><span className="section-kicker">02 / SELECTED WORK</span><h2 className="section-heading">Ideas worth <span>building.</span></h2></div><p className="section-intro">A place for experiments, reference architectures and learning projects. Honest progress, real code, clear reasoning.</p></div><div className="project-grid">{projects.map((project, index) => { const Icon = project.icon; return <article className={`project-card project-card-${index+1}`} key={project.name}><div className="project-card-top"><span className="project-label">{project.label}</span><span className="project-arrow"><ArrowUpRight size={19}/></span></div><div className="project-art" aria-hidden="true"><div className="art-grid"/><div className="art-glow"/><div className="art-glyph"><Icon size={56} strokeWidth={1.2}/></div><span className="art-caption">{project.symbol}</span></div><div className="project-body"><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map(t=><span key={t}>{t}</span>)}</div><a href={project.href} className="text-link">{project.linkText} <ArrowRight size={16}/></a></div></article>})}</div></div></section>

        <section id="experience" className="section container"><div className="section-top"><div><span className="section-kicker">03 / EXPERIENCE</span><h2 className="section-heading">Where I&apos;ve <span>worked.</span></h2></div><p className="section-intro">A progression through enterprise engineering, technical leadership and architecture-focused delivery.</p></div><div className="experience-list">{experience.map((role) => <article className="experience-item" key={role.company}><div className="experience-meta"><span>{role.period}</span>{role.current && <span className="current-label"><span/> CURRENT</span>}</div><div className="experience-core"><div className="experience-title"><h3>{role.company}</h3><span>{role.role}</span></div><span className="experience-context">{role.context}</span><p>{role.description}</p>{role.highlights.length > 0 && <ul className="experience-highlights">{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}<div className="experience-tags">{role.technologies.map(t=><span key={t}>{t}</span>)}</div></div><ChevronRight className="experience-chevron" size={21}/></article>)}</div></section>

        <section id="expertise" className="section expertise-section"><div className="container"><div className="section-top"><div><span className="section-kicker">04 / CAPABILITIES</span><h2 className="section-heading">My technical <span>toolkit.</span></h2></div><p className="section-intro">A blend of deep implementation skills and the architecture thinking that connects them.</p></div><div className="expertise-grid">{expertise.map((item) => {const Icon = item.icon; return <article className="expertise-card" key={item.title}><div className="expertise-head"><span>{item.number} / 04</span><Icon size={25} strokeWidth={1.7}/></div><h3>{item.title}</h3><p>{item.text}</p><div className="expertise-tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>})}</div></div></section>

        <section id="writing" className="section container writing-section"><div className="section-top"><div><span className="section-kicker">05 / LEARNING IN PUBLIC</span><h2 className="section-heading">Notes from <span>the journey.</span></h2></div><p className="section-intro">Short, practical deep dives on Java, patterns and system design. Code first, opinions backed by experiments.</p></div><div className="writing-feature"><div className="writing-feature-icon"><BookOpen size={25}/></div><div><span className="writing-feature-kicker">UPCOMING SERIES</span><h3>30 Days of Java Design & Architecture</h3><p>Learn the concept. Build the example. Test the trade-offs. Share what works.</p></div><span className="writing-feature-tag">ARTICLES COMING SOON</span></div><div className="article-list">{articles.map((article) => <div className="article-item" key={article.number}><span className="article-number">{article.number}</span><div className="article-details"><span className="article-category">{article.category}</span><h3>{article.title}</h3><p>{article.detail}</p></div><span className="article-status">{article.read}</span><ArrowUpRight className="article-arrow" size={19}/></div>)}</div></section>

        <section className="section contact-section" id="contact"><div className="container contact-content"><span className="section-kicker">06 / GET IN TOUCH</span><h2>Let&apos;s build<br/><span>something meaningful.</span></h2><p>Have a challenging engineering problem, an architecture opportunity, or just want to exchange ideas? My inbox is open.</p><a href="mailto:giri18v@outlook.com" className="button-primary">Start a conversation <ArrowUpRight size={19}/></a><div className="contact-social"><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><Github size={18}/> Explore GitHub <ArrowUpRight size={14}/></a><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> Connect on LinkedIn <ArrowUpRight size={14}/></a></div><div className="contact-decor" aria-hidden="true"><span>&lt;/&gt;</span></div></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><BrandMark/><p>Designed and built with intention. © {new Date().getFullYear()} Giridharan Veeran.</p><div className="footer-social"><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={19}/></a><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a><a href="mailto:giri18v@outlook.com" aria-label="Email"><Mail size={19}/></a></div></div></footer>
    </div>
  )
}
