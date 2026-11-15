import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ChevronDown, Play, Zap, Layers, Target, CodeXml, Rocket, FileText, Bot,
  Database, LayoutGrid, Search, Settings, Check, Box, Users, Headphones, Megaphone, Server,
  CalendarDays, FileSpreadsheet, FileSearch, FileBarChart2, Contact, Menu, X, Mail, Linkedin,
  Twitter, Compass, Hammer, Cloud, LifeBuoy, Clock, TrendingDown, TrendingUp,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Custom glyphs                                                       */
/* ------------------------------------------------------------------ */

function BarsTrend({ size = 24, strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M4.5 18v-3M8 18v-5M11.5 18v-7M15 18V9M18.5 18V7" />
      <path d="M4 10.5 9 7l3 2 7.5-5.5" />
      <path d="M16.5 3.5h3v3" />
    </svg>
  );
}

function NodesIcon({ size = 26, strokeWidth = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="4.5" r="2.5" />
      <circle cx="4.5" cy="18.5" r="2.5" />
      <circle cx="19.5" cy="18.5" r="2.5" />
      <path d="M12 7v5.5M12 12.5l-5.6 4.3M12 12.5l5.6 4.3" />
    </svg>
  );
}

function BarsIcon({ size = 26, strokeWidth = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
      <path d="M3 20v-4M7.5 20v-7M12 20v-9M16.5 20V8M21 20V4" />
    </svg>
  );
}

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Capigrowth home">
      <svg width="31" height="28" viewBox="0 0 31 28" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="lg-logo" x1="0" y1="0" x2="31" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e3c8ff" />
            <stop offset="0.55" stopColor="#a98bff" />
            <stop offset="1" stopColor="#7c4dff" />
          </linearGradient>
        </defs>
        <path d="M6.5 22.5 L15.5 5 L25.5 23.5" stroke="url(#lg-logo)" strokeWidth="6.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="23" r="3.6" fill="#cfa6ff" />
      </svg>
      <span>Capigrowth</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const SERVICES = [
  { icon: Target, title: 'AI Opportunity Audit', text: 'Analyze your processes, identify automation opportunities, and estimate business impact.' },
  { icon: Layers, title: 'Solution Design', text: 'Turn opportunities into a practical AI roadmap and solution architecture.' },
  { icon: CodeXml, title: 'Build & Integrate', text: 'Develop and integrate AI workflows, agents, and systems into your existing tools.' },
  { icon: Rocket, title: 'Run & Scale', text: 'Deploy to production, monitor performance, and continuously optimize for greater ROI.' },
];

const SOLUTIONS = [
  { icon: FileText, title: 'Document & Data Automation', text: 'Extract, process, and understand information from invoices, contracts, reports, and more.' },
  { icon: NodesIcon, title: 'Workflow Automation', text: 'Automate repetitive, rule-based work across finance, operations, HR, and customer support.' },
  { icon: Bot, title: 'AI Agents & Copilots', text: 'Build custom AI agents to answer questions, take actions, and work alongside your team.' },
  { icon: BarsIcon, title: 'Business Intelligence with AI', text: 'Turn your business data into insights, reports, and proactive recommendations.' },
  { icon: Database, title: 'Data & Knowledge Systems', text: 'Unify your company knowledge (docs, data, policies) and make it instantly accessible with AI.' },
  { icon: LayoutGrid, title: 'Custom AI Solutions', text: 'Bespoke AI applications tailored to your unique business processes and industry needs.' },
];

const APPROACH = [
  'Business-first, not just tech',
  'End-to-end delivery (Strategy → Build → Deploy → Support)',
  'Focused on real ROI (time saved, cost reduced, higher output)',
  'Flexible engagement (consulting, project, or long-term)',
];

const STEPS = [
  { icon: Search, title: 'Discover', text: 'Understand your business, goals, and manual work.' },
  { icon: Layers, title: 'Design', text: 'Define the right AI solution, workflow, and roadmap.' },
  { icon: CodeXml, title: 'Build', text: 'Develop, integrate, and test end\u2011to\u2011end.' },
  { icon: Rocket, title: 'Deploy & Scale', text: 'Go live, measure impact, and expand to more use cases.' },
];

const INDUSTRIES = [
  { icon: Database, label: 'Finance & Accounting' },
  { icon: Box, label: 'Operations & Supply Chain' },
  { icon: Users, label: 'HR & People Operations' },
  { icon: Headphones, label: 'Customer Service & Support' },
  { icon: Megaphone, label: 'Sales & Marketing' },
  { icon: Server, label: 'IT & Platform Operations' },
];

const BOOKING_URL = 'https://calendar.app.google/x1JccbBnZXbfP1JY8';
const EXT = { target: '_blank', rel: 'noopener noreferrer' };

const NAV = [
  { label: 'Services', href: '#services', items: SERVICES.map((s) => ({ icon: s.icon, label: s.title, text: s.text })) },
  { label: 'Solutions', href: '#solutions', items: SOLUTIONS.map((s) => ({ icon: s.icon, label: s.title, text: s.text })) },
  { label: 'Industries', href: '#industries', items: INDUSTRIES.map((s) => ({ icon: s.icon, label: s.label })) },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#approach' },
];

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

// Fades elements in as they enter the viewport.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container header-in">
        <Logo />
        <nav className="nav" aria-label="Primary">
          {NAV.map((n) => (
            <div key={n.label} className={`nav-item${n.items ? ' has-menu' : ''}`}>
              <a href={n.href} className="nav-link">
                {n.label}
                {n.items && <ChevronDown size={14} strokeWidth={2.4} />}
              </a>
              {n.items && (
                <div className={`menu${n.items.length > 4 ? ' menu-wide' : ''}`}>
                  {n.items.map(({ icon: Icon, label, text }) => (
                    <a key={label} href={n.href} className="menu-item">
                      <span className="menu-ic"><Icon size={18} strokeWidth={1.9} /></span>
                      <span>
                        <strong>{label}</strong>
                        {text && <small>{text}</small>}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <a href={BOOKING_URL} {...EXT} className="btn btn-white btn-sm header-cta">
          Book a Strategy Call <ArrowRight size={15} strokeWidth={2.4} />
        </a>
        <button
          type="button"
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="drawer" hidden={!open}>
        <div className="container">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} onClick={close} className="drawer-link">
              {n.label} <ArrowRight size={16} />
            </a>
          ))}
          <a href={BOOKING_URL} {...EXT} onClick={close} className="btn btn-white btn-lg drawer-cta">
            Book a Strategy Call <ArrowRight size={16} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const OPS = [
  { icon: FileText, label: 'Invoices & Documents' },
  { icon: FileSpreadsheet, label: 'Data Processing' },
  { icon: FileSearch, label: 'Workflows & Approvals' },
  { icon: FileBarChart2, label: 'Reports & Insights' },
  { icon: Contact, label: 'Customer Operations' },
];

const STAGE_W = 420;
const STAGE_H = 250;

// The AI diagram is authored on a fixed stage and scaled to fit its column.
function HeroVisual() {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1.4, e.contentRect.width / STAGE_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="hv" ref={ref} style={{ height: STAGE_H * scale }} aria-hidden="true">
      <div className="hv-stage" style={{ transform: `scale(${scale})` }}>
        <div className="hv-panel-wrap">
          <div className="hv-panel">
            <div className="hv-dots"><i /><i /><i /></div>
            <div className="hv-head">Business Operations</div>
            {OPS.map(({ icon: Icon, label }, i) => (
              <div className="hv-row" key={label} style={{ '--d': `${0.6 + i * 0.15}s` }}>
                <Icon size={15} strokeWidth={2.1} />
                <span>{label}</span>
                <b className="hv-ok"><Check size={10} strokeWidth={4} /></b>
              </div>
            ))}
          </div>
        </div>
        <svg className="hv-lines" width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} fill="none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g stroke="#cdbcff" strokeWidth="1.6" filter="url(#glow)" strokeLinecap="round" className="hv-paths">
            <path d="M204 82 H220 Q231 82 231 93 V106" />
            <path d="M204 187 H220 Q231 187 231 176 V161" />
            <path d="M265 106 V72 Q265 61 276 61 H300" />
            <path d="M280 133 H302" />
            <path d="M265 161 V182 Q265 193 276 193 H305" />
          </g>
        </svg>
        <div className="hv-ai">AI</div>
        <div className="hv-pill" style={{ left: 300, top: 39, width: 104 }}>
          <Settings size={19} strokeWidth={1.8} /> Automate
        </div>
        <div className="hv-pill" style={{ left: 302, top: 105, width: 105 }}>
          <Search size={20} strokeWidth={1.9} /> Augment
        </div>
        <div className="hv-pill" style={{ left: 305, top: 172, width: 103 }}>
          <BarsTrend size={20} strokeWidth={1.7} /> Scale
        </div>
      </div>
    </div>
  );
}

// Particle "terrain" that sweeps along the bottom of the hero.
function DotWave() {
  const dots = useMemo(() => {
    const out = [];
    const cols = 96;
    const rows = 14;
    for (let r = 0; r < rows; r += 1) {
      const depth = r / (rows - 1); // 0 = far, 1 = near
      for (let c = 0; c < cols; c += 1) {
        const t = (c + (r % 2) * 0.5) / (cols - 1);
        const x = t * 1440;
        const y = 70 + Math.pow(depth, 1.35) * 150
          - Math.sin(t * Math.PI * 1.4 + depth * 1.4) * (26 + depth * 18)
          - Math.pow(t, 2.6) * 70;
        const o = (0.1 + 0.8 * Math.pow(t, 1.6)) * (0.35 + depth * 0.65);
        out.push([+x.toFixed(1), +y.toFixed(1), +o.toFixed(2), +(0.7 + depth * 0.9 + t * 0.4).toFixed(2)]);
      }
    }
    return out;
  }, []);
  return (
    <svg className="dotwave" viewBox="0 0 1440 240" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="dw" x1="0" x2="1">
          <stop offset="0" stopColor="#7b5cff" />
          <stop offset="1" stopColor="#c08cff" />
        </linearGradient>
      </defs>
      <g fill="url(#dw)">
        {dots.map(([x, y, o, s], i) => <circle key={i} cx={x} cy={y} r={s} opacity={o} />)}
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid-bg" aria-hidden="true" />
      <DotWave />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light hero-eyebrow"><span className="dot" />AI Consulting &amp; Implementation</p>
          <h1>
            <span className="h1-line">Turn Your Business</span>{' '}
            <span className="h1-line">Into an <span className="grad">AI&#8209;First</span> Company</span>
          </h1>
          <p className="hero-lead">
            End-to-end AI solutions to identify opportunities, automate manual work, and integrate
            AI into your business from strategy to production.
          </p>
          <div className="hero-btns">
            <a href={BOOKING_URL} {...EXT} className="btn btn-white btn-lg">
              Book a Free AI Discovery Call <ArrowRight size={17} strokeWidth={2.3} />
            </a>
            <a href="#process" className="btn btn-ghost btn-lg">
              <Play size={16} strokeWidth={2} /> See How We Help
            </a>
          </div>
        </div>
        <HeroVisual />
      </div>
      <div className="container">
        <ul className="hero-feats">
          <li><Zap size={26} strokeWidth={1.5} /><span>Find Automation{' '}<br />Opportunities</span></li>
          <li><Layers size={28} strokeWidth={1.5} /><span>Build &amp; Integrate{' '}<br />AI Solutions</span></li>
          <li><BarsTrend size={28} strokeWidth={1.5} /><span>Deliver Measurable{' '}<br />Business Impact</span></li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function SectionHead({ eyebrow, title, children, action }) {
  return (
    <div className="shead" data-reveal>
      <div className="shead-main">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children && <p className="shead-aside">{children}</p>}
      {action}
    </div>
  );
}

function WhatWeDo() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead eyebrow="What We Do" title="End-to-End AI Consulting & Implementation">
          We help businesses discover high-impact opportunities, design the right AI solutions,
          implement them, and scale them across the organization.
        </SectionHead>
        <div className="svc-grid">
          {SERVICES.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="card svc" data-reveal style={{ '--d': `${i * 70}ms` }}>
              <span className="svc-num">0{i + 1}</span>
              <span className="ic-tile"><Icon size={24} strokeWidth={1.9} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="section section-tint" id="solutions">
      <div className="container">
        <SectionHead
          eyebrow="Solutions"
          title="Solve Real Business Problems with AI & Automation"
          action={<a href="#contact" className="link-arrow">Explore All Solutions <ArrowRight size={16} strokeWidth={2.2} /></a>}
        />
        <div className="sol-grid">
          {SOLUTIONS.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="card sol-card" data-reveal style={{ '--d': `${(i % 3) * 70}ms` }}>
              <span className="ic-tile ic-tile-soft"><Icon size={24} strokeWidth={1.9} /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <ArrowRight className="sol-go" size={18} strokeWidth={2} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PIPE = [
  { icon: Compass, label: 'Strategy', note: 'Opportunity map & roadmap' },
  { icon: Hammer, label: 'Build', note: 'Workflows, agents & integrations' },
  { icon: Cloud, label: 'Deploy', note: 'Production rollout & training' },
  { icon: LifeBuoy, label: 'Support', note: 'Monitoring & continuous tuning' },
];

function Approach() {
  return (
    <section className="section" id="approach">
      <div className="container appr-grid">
        <div data-reveal>
          <p className="eyebrow">Our Approach</p>
          <h2>A Practical, Outcome&#8209;Driven AI Partner</h2>
          <p className="lead">
            We combine business understanding, automation, and modern AI to deliver real,
            measurable results — not just PoCs.
          </p>
          <ul className="checks">
            {APPROACH.map((t) => (
              <li key={t}>
                <span className="check"><Check size={11} strokeWidth={3.6} /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="appr-card" data-reveal style={{ '--d': '120ms' }} aria-hidden="true">
          <div className="appr-card-head">
            <span>Engagement Model</span>
            <span className="pill-live"><i /> End-to-end</span>
          </div>
          <ol className="pipe">
            {PIPE.map(({ icon: Icon, label, note }) => (
              <li key={label}>
                <span className="pipe-ic"><Icon size={18} strokeWidth={2} /></span>
                <span className="pipe-txt"><strong>{label}</strong><small>{note}</small></span>
                <span className="pipe-ok"><Check size={12} strokeWidth={3.2} /></span>
              </li>
            ))}
          </ol>
          <div className="roi">
            <div><Clock size={18} /><span>Time saved</span></div>
            <div><TrendingDown size={18} /><span>Cost reduced</span></div>
            <div><TrendingUp size={18} /><span>Higher output</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section section-tint" id="process">
      <div className="container">
        <SectionHead eyebrow="Our Process" title="From Idea to Business Impact">
          A clear, four-step path from the first conversation to AI running in production.
        </SectionHead>
        <ol className="steps">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="step" data-reveal style={{ '--d': `${i * 90}ms` }}>
              <span className="step-ic"><Icon size={24} strokeWidth={2} /></span>
              <span className="step-n">Step {i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <SectionHead eyebrow="Industries" title="Industries We Work With">
          Supporting businesses across a range of industries, with practical AI solutions and
          automation.
        </SectionHead>
        <div className="chips">
          {INDUSTRIES.map(({ icon: Icon, label }, i) => (
            <a href="#contact" key={label} className="chip" data-reveal style={{ '--d': `${i * 50}ms` }}>
              <span className="chip-ic"><Icon size={20} strokeWidth={1.9} /></span>
              {label}
              <ArrowRight className="chip-go" size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mountains() {
  return (
    <svg className="cta-art" viewBox="0 0 640 360" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="sky" cx="0.8" cy="0.15" r="0.7">
          <stop offset="0" stopColor="#9b6fc8" stopOpacity=".75" />
          <stop offset="1" stopColor="#1a1530" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a64b8" />
          <stop offset="1" stopColor="#2a2150" />
        </linearGradient>
        <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4a8ec" />
          <stop offset=".35" stopColor="#7553a8" />
          <stop offset="1" stopColor="#1d1838" />
        </linearGradient>
        <linearGradient id="m3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2d63" />
          <stop offset="1" stopColor="#120f22" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#sky)" />
      <path d="M120 360 L250 210 L300 240 L360 170 L420 215 L470 190 L560 250 L640 220 V360 Z" fill="url(#m1)" opacity=".55" />
      <path d="M200 360 L340 230 L400 250 L500 92 L540 128 L560 115 L640 190 V360 Z" fill="url(#m2)" />
      <path d="M500 92 L478 150 L496 140 L505 170 L520 135 L540 128 Z" fill="#f1e2ff" opacity=".75" />
      <path d="M560 115 L548 150 L565 138 L580 160 L590 140 Z" fill="#f1e2ff" opacity=".45" />
      <path d="M500 92 L470 200 M540 128 L520 210 M560 115 L600 210" stroke="#efdcff" strokeOpacity=".25" strokeWidth="1.2" />
      <path d="M140 360 L300 280 L380 300 L460 250 L540 290 L640 260 V360 Z" fill="url(#m3)" />
    </svg>
  );
}

function Cta() {
  return (
    <section className="section cta-wrap" id="contact">
      <div className="container">
        <div className="cta" data-reveal>
          <Mountains />
          <div className="cta-body">
            <p className="eyebrow eyebrow-light">Let’s Explore Together</p>
            <h2>Turn Your AI Ideas Into Real Business Impact</h2>
            <p className="cta-lead">
              Book a free, no-obligation strategy call. We’ll discuss your goals, identify quick
              wins, and outline a practical roadmap.
            </p>
            <div className="cta-btns">
              <a href={BOOKING_URL} {...EXT} className="btn btn-white btn-lg">
                Book a Free AI Discovery Call <ArrowRight size={17} strokeWidth={2.4} />
              </a>
              <a href={BOOKING_URL} {...EXT} className="btn btn-ghost btn-lg">
                <CalendarDays size={17} strokeWidth={2} /> Schedule a Time
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: 'Services', links: SERVICES.map((s) => [s.title, '#services']) },
    { title: 'Solutions', links: SOLUTIONS.slice(0, 4).map((s) => [s.title, '#solutions']) },
    { title: 'Company', links: [['Our Approach', '#approach'], ['Process', '#process'], ['Industries', '#industries'], ['Contact', '#contact']] },
  ];
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>AI consulting &amp; implementation for businesses that want real, measurable results.</p>
          <div className="socials">
            <a href="mailto:hello@capigrowth.com" aria-label="Email"><Mail size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" aria-label="X / Twitter"><Twitter size={18} /></a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="footer-col">
            <h4>{c.title}</h4>
            <ul>
              {c.links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Capigrowth. All rights reserved.</span>
        <span className="footer-legal"><a href="#">Privacy</a><a href="#">Terms</a></span>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Solutions />
        <Approach />
        <Process />
        <Industries />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
