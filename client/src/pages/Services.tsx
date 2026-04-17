import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TechBadge from '../components/TechBadge';
import { api } from '../api';
import type { Service } from '../types';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } }),
};

const initialServices: Service[] = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Full-stack web applications with reliable architecture, clean UI, and performance tuned for production.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    order: 1,
    createdAt: '',
  },
  {
    id: 'blockchain',
    title: 'Web3 & Blockchain',
    description: 'Decentralized applications, smart contracts, and secure wallet-connected frontend experiences.',
    techStack: ['Solidity', 'Hardhat', 'Ethers.js', 'Wagmi'],
    order: 2,
    createdAt: '',
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'Product-first design systems, polished interfaces, and user flows that convert and delight.',
    techStack: ['Figma', 'Framer', 'Tailwind CSS', 'Storybook'],
    order: 3,
    createdAt: '',
  },
  {
    id: 'motion',
    title: '3D & Motion',
    description: 'Immersive motion design, animated web experiences, and interactive visual storytelling.',
    techStack: ['Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion'],
    order: 4,
    createdAt: '',
  },
];

const process = [
  { step: '01', title: 'Discovery', body: 'We dig into your goals, users, and constraints before writing a single line.' },
  { step: '02', title: 'Design', body: 'Wireframes, architecture diagrams, and a clear execution plan.' },
  { step: '03', title: 'Build', body: 'Iterative sprints with weekly demos and continuous feedback.' },
  { step: '04', title: 'Ship', body: 'Deploy, monitor, document, and hand off with full confidence.' },
];

const faqs = [
  { q: 'How long does a typical project take?', a: 'Most projects run 4–12 weeks depending on scope. MVPs can ship in as little as 3 weeks.' },
  { q: 'Do you work with early-stage startups?', a: 'Yes — we love working with founders from day one. We can help you validate, design, and build your first product.' },
  { q: 'Can you take over an existing codebase?', a: 'Absolutely. We do code audits and can onboard onto your existing stack without disruption.' },
  { q: 'Do you offer ongoing retainers?', a: 'Yes. Many clients keep us on a monthly retainer for feature development, maintenance, and consulting.' },
  { q: 'What chains do you support for Web3?', a: 'Ethereum, Base, Polygon, Arbitrum, Optimism, and Solana. We can also support other EVM-compatible chains.' },
  { q: 'How do you handle 3D performance on mobile?', a: 'We build with progressive enhancement — full 3D on desktop, graceful fallbacks on mobile for smooth performance.' },
];

const themeCards = [
  { gradient: 'linear-gradient(135deg,#3b82f6,#6366f1)', cardBg: '#eff6ff', borderColor: '#bfdbfe', accentColor: '#3b82f6', glowColor: 'rgba(59,130,246,0.2)' },
  { gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)', cardBg: '#eef2ff', borderColor: '#c7d2fe', accentColor: '#6366f1', glowColor: 'rgba(99,102,241,0.2)' },
  { gradient: 'linear-gradient(135deg,#0ea5e9,#3b82f6)', cardBg: '#f0f9ff', borderColor: '#bae6fd', accentColor: '#0ea5e9', glowColor: 'rgba(14,165,233,0.2)' },
  { gradient: 'linear-gradient(135deg,#38bdf8,#6366f1)', cardBg: '#f0f9ff', borderColor: '#7dd3fc', accentColor: '#38bdf8', glowColor: 'rgba(56,189,248,0.2)' },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getServices()
      .then((data) => setServices(data))
      .catch((err) => setError(err.message || 'Unable to load services.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden border-b border-subtle"
        style={{ background: 'linear-gradient(160deg,var(--bg-3) 0%,var(--bg) 60%,var(--bg) 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#6366f1,transparent 70%)' }} />

        <div className="section relative pt-28 pb-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }} className="max-w-3xl">
            <span className="label">What we offer</span>
            <h1 className="mt-4 heading-lg">Services built for<br />
              <span style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                the modern web.
              </span>
            </h1>
            <p className="mt-6 text-[17px] text-muted max-w-xl leading-relaxed">
              From pixel-perfect interfaces to on-chain protocols and immersive motion, we cover every layer of the modern digital product stack.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">Start a project</Link>
              <Link to="/projects" className="btn-secondary">See our work</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }} className="mt-14 flex flex-wrap gap-3">
            {services.map((service) => {
              const theme = themeCards[(service.order - 1) % themeCards.length];
              return (
                <a key={service.id} href={`#${service.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 border"
                  style={{ background: 'var(--bg-2)', borderColor: theme.accentColor + '22', color: theme.accentColor }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: theme.accentColor }} />
                  {service.title}
                </a>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-32 border-b border-subtle" style={{ background: 'var(--bg-2)' }}>
        <div className="section">
          <div className="grid gap-8 lg:grid-cols-2">
            {loading && (
              <div className="card p-10 col-span-full text-center">
                <p className="text-muted">Loading services...</p>
              </div>
            )}
            {error && (
              <div className="card p-10 col-span-full text-center border border-red-200 bg-red-50 text-red-700">
                <p>{error}</p>
              </div>
            )}
            {services.map((service, index) => {
              const theme = themeCards[index % themeCards.length];
              return (
                <motion.article key={service.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="rounded-[2rem] border p-10 transition-shadow duration-200 hover:shadow-[0_18px_80px_rgba(15,23,42,0.12)]"
                  style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div style={{ background: theme.gradient }} className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_24px_56px_-28px_rgba(59,130,246,0.8)]">
                      <span className="text-xl font-bold">{service.order}</span>
                    </div>
                    <span className="text-[13px] font-semibold uppercase tracking-[0.3em]" style={{ color: theme.accentColor }}>Service</span>
                  </div>
                  <h2 className="text-[1.75rem] font-semibold leading-tight" style={{ color: 'var(--text)' }}>{service.title}</h2>
                  <p className="mt-4 text-[15px] text-muted leading-relaxed">{service.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.techStack.map((tech) => <TechBadge key={tech} label={tech} />)}
                  </div>
                  <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold" style={{ color: theme.accentColor }}>
                    Talk to us
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 border-b border-subtle" style={{ background: 'var(--bg-3)' }}>
        <div className="section">
          <div className="text-center mb-16">
            <span className="label">How it works</span>
            <h2 className="mt-4 heading-md">Our process</h2>
            <p className="mt-5 text-[16px] text-muted max-w-md mx-auto leading-relaxed">Every engagement follows the same proven framework — no surprises, just results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#bfdbfe,#c7d2fe)' }}>
            {process.map(({ step, title, body }, i) => (
              <motion.div key={step} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="p-9 text-center transition-colors" style={{ background: 'var(--bg-2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-3)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-2)')}>
                <span className="text-[13px] font-bold tracking-widest"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {step}
                </span>
                <h4 className="mt-3 font-semibold text-[16px]" style={{ color: 'var(--text)' }}>{title}</h4>
                <p className="mt-2 text-[14px] text-muted leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-32" style={{ background: 'var(--bg-2)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <span className="label">FAQ</span>
            <h2 className="mt-4 heading-md">Common questions</h2>
            <p className="mt-5 text-[16px] text-muted leading-relaxed">
              Still have questions?{' '}
              <Link to="/contact" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Drop us a message.</Link>
            </p>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="card p-7">
                <h4 className="font-semibold text-[16px] mb-3" style={{ color: 'var(--text)' }}>{faq.q}</h4>
                <p className="text-[15px] text-muted leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pb-32">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden px-12 py-24 text-center border border-indigo-200"
          style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#3730a3 40%,#4f46e5 100%)' }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 blur-3xl opacity-30 pointer-events-none"
            style={{ background: 'linear-gradient(90deg,#60a5fa,#818cf8)' }} />
          <div className="relative">
            <span className="badge-dark mb-8"><span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse-slow" />Open for work</span>
            <h2 className="text-[2.4rem] md:text-[3rem] font-semibold tracking-tight text-white leading-tight mt-3">Ready to build something great?</h2>
            <p className="mt-6 max-w-md mx-auto text-[17px] leading-relaxed" style={{ color: '#bfdbfe' }}>Tell us what you're building. We'll get back to you within 24 hours.</p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-dark">
                Get in touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-medium transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                View our work
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
