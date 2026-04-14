import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TechBadge from '../components/TechBadge';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const services = [
  {
    id: 'web',
    order: '01',
    label: 'Web Development',
    tagline: 'Fast, scalable, production-ready.',
    description:
      'We build full-stack web applications that are fast, maintainable, and built to scale. From landing pages to complex SaaS platforms, we own the entire stack — frontend, backend, database, and deployment.',
    gradient: 'linear-gradient(135deg,#4f46e5 0%,#6366f1 100%)',
    lightBg: 'linear-gradient(135deg,#eef2ff 0%,#e0e7ff 100%)',
    accentColor: '#4f46e5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    offerings: [
      { title: 'SaaS Platforms', body: 'Multi-tenant apps with auth, billing, dashboards, and role-based access.' },
      { title: 'Marketing Sites', body: 'High-performance landing pages with animations, CMS, and SEO built in.' },
      { title: 'Web Apps & MVPs', body: 'Rapid prototypes and production-grade apps shipped in weeks, not months.' },
      { title: 'E-commerce', body: 'Custom storefronts, checkout flows, and inventory systems that convert.' },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: 'blockchain',
    order: '02',
    label: 'Blockchain & Web3',
    tagline: 'Secure. Audited. On-chain.',
    description:
      'We design and build decentralized applications, smart contracts, and Web3 infrastructure. From DeFi protocols to NFT marketplaces, we write secure, gas-optimized Solidity and integrate seamlessly with modern frontends.',
    gradient: 'linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)',
    lightBg: 'linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)',
    accentColor: '#7c3aed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    offerings: [
      { title: 'Smart Contracts', body: 'ERC-20, ERC-721, ERC-1155, custom protocols — audited and gas-optimized.' },
      { title: 'DeFi Protocols', body: 'AMMs, lending platforms, yield vaults, and staking mechanisms.' },
      { title: 'NFT Platforms', body: 'Minting, marketplace, royalty logic, and metadata pipelines.' },
      { title: 'dApp Frontends', body: 'Wallet-connected React apps with real-time on-chain data.' },
    ],
    techStack: ['Solidity', 'Hardhat', 'Foundry', 'Ethers.js', 'Wagmi', 'Solana', 'IPFS', 'The Graph'],
  },
  {
    id: 'design',
    order: '03',
    label: 'UI/UX Design',
    tagline: 'Purposeful. Minimal. Delightful.',
    description:
      'Great software starts with great design. We create interfaces that are intuitive, beautiful, and conversion-focused. From early wireframes to polished design systems, we make sure every pixel earns its place.',
    gradient: 'linear-gradient(135deg,#db2777 0%,#f472b6 100%)',
    lightBg: 'linear-gradient(135deg,#fdf2f8 0%,#fce7f3 100%)',
    accentColor: '#db2777',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    offerings: [
      { title: 'Product Design', body: 'End-to-end UX from user research and flows to high-fidelity Figma screens.' },
      { title: 'Design Systems', body: 'Scalable component libraries with tokens, variants, and documentation.' },
      { title: 'Prototyping', body: 'Interactive prototypes for user testing and stakeholder sign-off.' },
      { title: 'Brand & Identity', body: 'Logos, color systems, typography, and visual language that sticks.' },
    ],
    techStack: ['Figma', 'Framer', 'Storybook', 'Tailwind CSS', 'Lottie', 'Principle', 'Adobe CC'],
  },
  {
    id: '3d',
    order: '04',
    label: '3D & Motion',
    tagline: 'Immersive. Real-time. Unforgettable.',
    description:
      'We bring depth, motion, and interactivity to the web. From real-time 3D product configurators to cinematic scroll experiences, we use WebGL and modern tooling to create moments that make people stop and stare.',
    gradient: 'linear-gradient(135deg,#0891b2 0%,#06b6d4 100%)',
    lightBg: 'linear-gradient(135deg,#ecfeff 0%,#cffafe 100%)',
    accentColor: '#0891b2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    offerings: [
      { title: '3D Web Experiences', body: 'Interactive WebGL scenes, product viewers, and immersive hero sections.' },
      { title: 'Product Visualization', body: 'Photorealistic 3D renders and real-time configurators for e-commerce.' },
      { title: 'Motion & Animation', body: 'Scroll-driven animations, micro-interactions, and cinematic transitions.' },
      { title: '3D Modeling', body: 'Custom assets, characters, and environments modeled and optimized for web.' },
    ],
    techStack: ['Three.js', 'React Three Fiber', 'Blender', 'GSAP', 'WebGL', 'Spline', 'Lottie', 'Framer Motion'],
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

export default function Services() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-brand-100"
        style={{ background: 'linear-gradient(135deg,#eef2ff 0%,#fdf4ff 55%,#fff 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#818cf8,transparent 70%)' }} />
        <div className="section relative pt-24 pb-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <span className="label">What we offer</span>
            <h1 className="mt-3 heading-lg">
              Services built for
              <br />
              <span className="gradient-text">the modern web.</span>
            </h1>
            <p className="mt-5 text-[16px] text-neutral-500 max-w-xl leading-relaxed">
              From pixel-perfect interfaces to on-chain protocols and immersive 3D — we cover every layer of the modern digital product stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Start a project</Link>
              <Link to="/projects" className="btn-secondary">See our work</Link>
            </div>
          </motion.div>

          {/* Service pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-12 flex flex-wrap gap-3">
            {services.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-200 bg-white text-sm font-medium text-brand-700 hover:bg-brand-50 transition-colors shadow-soft">
                <span className="w-2 h-2 rounded-full" style={{ background: s.accentColor }} />
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Service Sections ── */}
      {services.map((s, si) => (
        <section key={s.id} id={s.id}
          className={`py-28 ${si % 2 === 1 ? 'border-y border-brand-100' : ''}`}
          style={si % 2 === 1 ? { background: 'linear-gradient(180deg,#f8f7ff 0%,#fff 100%)' } : {}}>
          <div className="section">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${si % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

              {/* Left: info */}
              <motion.div initial={{ opacity: 0, x: si % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-brand"
                    style={{ background: s.gradient }}>
                    {s.icon}
                  </div>
                  <span className="text-xs font-bold text-neutral-300 tracking-widest">{s.order}</span>
                </div>

                <span className="label" style={{ color: s.accentColor }}>{s.label}</span>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 leading-tight">
                  {s.tagline}
                </h2>
                <p className="mt-4 text-[15px] text-neutral-500 leading-relaxed">{s.description}</p>

                {/* Tech stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.techStack.map((t) => <TechBadge key={t} label={t} />)}
                </div>

                <Link to="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: s.accentColor }}>
                  Start this project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              {/* Right: offering cards */}
              <motion.div initial={{ opacity: 0, x: si % 2 === 0 ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {s.offerings.map((o, oi) => (
                  <motion.div key={o.title}
                    custom={oi} initial="hidden" whileInView="show"
                    viewport={{ once: true }} variants={fadeUp}
                    className="rounded-2xl p-6 border transition-all duration-200 hover:shadow-card group"
                    style={{ background: s.lightBg, borderColor: `${s.accentColor}18` }}>
                    <div className="w-7 h-7 rounded-lg mb-4 flex items-center justify-center"
                      style={{ background: `${s.accentColor}18` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: s.accentColor }} />
                    </div>
                    <h4 className="font-semibold text-neutral-900 text-sm mb-1.5">{o.title}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">{o.body}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Process ── */}
      <section className="py-28 border-t border-brand-100"
        style={{ background: 'linear-gradient(180deg,#f8f7ff 0%,#fff 100%)' }}>
        <div className="section">
          <div className="text-center mb-14">
            <span className="label">How it works</span>
            <h2 className="mt-3 heading-md">Our process</h2>
            <p className="mt-4 text-[15px] text-neutral-500 max-w-md mx-auto leading-relaxed">
              Every engagement follows the same proven framework — no surprises, just results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px rounded-2xl overflow-hidden shadow-soft"
            style={{ background: 'linear-gradient(135deg,#e0e7ff,#f5d0fe)' }}>
            {process.map(({ step, title, body }, i) => (
              <motion.div key={step} custom={i} initial="hidden"
                whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-white p-8 text-center hover:bg-brand-50/40 transition-colors group">
                <span className="text-xs font-bold gradient-text tracking-widest">{step}</span>
                <h4 className="mt-2 font-semibold text-neutral-900">{title}</h4>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <span className="label">FAQ</span>
            <h2 className="mt-3 heading-md">Common questions</h2>
            <p className="mt-4 text-[15px] text-neutral-500 leading-relaxed">
              Still have questions? <Link to="/contact" className="text-brand-600 font-medium hover:underline">Drop us a message.</Link>
            </p>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} custom={i} initial="hidden"
                whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="card p-6">
                <h4 className="font-semibold text-neutral-900 text-sm mb-2">{faq.q}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section pb-28">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
          style={{ background: 'linear-gradient(135deg,#312e81 0%,#4f46e5 40%,#7c3aed 70%,#a21caf 100%)' }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle,#e879f9,transparent 70%)' }} />
          <div className="relative">
            <span className="badge-dark mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              Open for work
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight mt-2">
              Ready to build something great?
            </h2>
            <p className="mt-4 text-indigo-200 max-w-sm mx-auto text-[15px] leading-relaxed">
              Tell us what you're building. We'll get back to you within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="btn-dark">
                Get in touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/80 text-sm font-medium rounded-xl hover:bg-white/10 transition-all">
                View our work
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
