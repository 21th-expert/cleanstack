import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TechBadge from '../components/TechBadge';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const projects = [
  {
    id: '1',
    name: 'Fintrack',
    category: 'Web App',
    description: 'A personal finance dashboard with real-time analytics, budget tracking, and AI-powered spending insights.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'OpenAI'],
    gradient: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
    bgGlow: 'rgba(99,102,241,0.15)',
    accentColor: '#6366f1',
    letter: 'F',
    tag: 'Finance',
  },
  {
    id: '2',
    name: 'Shipfast',
    category: 'SaaS Platform',
    description: 'SaaS boilerplate that lets founders launch in days, not months. Auth, billing, email, and dashboard included.',
    techStack: ['React', 'Node.js', 'Stripe', 'Resend', 'Supabase'],
    gradient: 'linear-gradient(135deg,#db2777 0%,#f97316 100%)',
    bgGlow: 'rgba(219,39,119,0.15)',
    accentColor: '#db2777',
    letter: 'S',
    tag: 'Startup',
  },
  {
    id: '3',
    name: 'Logbase',
    category: 'Developer Tool',
    description: 'Developer-first logging and monitoring. Ingest, search, and alert on logs with a clean, fast UI.',
    techStack: ['Go', 'React', 'ClickHouse', 'Docker', 'Redis'],
    gradient: 'linear-gradient(135deg,#0891b2 0%,#059669 100%)',
    bgGlow: 'rgba(8,145,178,0.15)',
    accentColor: '#0891b2',
    letter: 'L',
    tag: 'DevOps',
  },
  {
    id: '4',
    name: 'Crewboard',
    category: 'Collaboration',
    description: 'Remote team collaboration with async standups, project tracking, and team health metrics.',
    techStack: ['Next.js', 'tRPC', 'Prisma', 'Tailwind CSS', 'WebSockets'],
    gradient: 'linear-gradient(135deg,#7c3aed 0%,#0891b2 100%)',
    bgGlow: 'rgba(124,58,237,0.15)',
    accentColor: '#7c3aed',
    letter: 'C',
    tag: 'Productivity',
  },
  {
    id: '5',
    name: 'NFTVault',
    category: 'Web3',
    description: 'NFT portfolio tracker and marketplace aggregator. Real-time floor prices, rarity scores, and wallet analytics.',
    techStack: ['Solidity', 'Ethers.js', 'Next.js', 'The Graph', 'IPFS'],
    gradient: 'linear-gradient(135deg,#a21caf 0%,#4f46e5 100%)',
    bgGlow: 'rgba(162,28,175,0.15)',
    accentColor: '#a21caf',
    letter: 'N',
    tag: 'Blockchain',
  },
  {
    id: '6',
    name: 'Lumina',
    category: '3D Experience',
    description: 'Interactive 3D product configurator for a luxury furniture brand. Real-time WebGL rendering with custom materials.',
    techStack: ['Three.js', 'React Three Fiber', 'Blender', 'GSAP', 'Framer Motion'],
    gradient: 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',
    bgGlow: 'rgba(245,158,11,0.15)',
    accentColor: '#f59e0b',
    letter: 'L',
    tag: '3D & Motion',
  },
];

const stats = [
  { value: '50+', label: 'Projects delivered' },
  { value: '4', label: 'Service areas' },
  { value: '30+', label: 'Happy clients' },
  { value: '98%', label: 'On-time delivery' },
];

export default function Projects() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4c1d95 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#e879f9,transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#818cf8,transparent 70%)' }} />

        <div className="section relative pt-28 pb-24">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 text-xs font-semibold text-white/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              Our work
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
              Products we've
              <br />
              <span style={{
                background: 'linear-gradient(90deg,#a5b4fc,#f0abfc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                built & shipped.
              </span>
            </h1>
            <p className="mt-6 text-[16px] text-indigo-200 max-w-lg leading-relaxed">
              From SaaS platforms to Web3 protocols and immersive 3D experiences — here's a selection of what we've built.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                <p className="text-2xl font-bold text-white tracking-tight"
                  style={{ background: 'linear-gradient(90deg,#a5b4fc,#f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {value}
                </p>
                <p className="text-xs text-indigo-300 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#0f0e1a 0%,#13111f 100%)' }}>
        <div className="section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.id} custom={i} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="group relative rounded-3xl overflow-hidden border border-white/8 cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#1a1830 0%,#16142a 100%)' }}>

                {/* Glow blob */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%,${p.bgGlow},transparent)` }} />

                {/* Top image area */}
                <div className="relative h-52 flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg,${p.bgGlow.replace('0.15', '0.25')},transparent 80%)` }}>
                  {/* Decorative circles */}
                  <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20 blur-2xl"
                    style={{ background: p.gradient }} />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-15 blur-2xl"
                    style={{ background: p.gradient }} />

                  {/* Big letter */}
                  <span className="relative text-[7rem] font-black select-none leading-none
                    group-hover:scale-110 transition-transform duration-500"
                    style={{
                      background: p.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 40px ' + p.accentColor + '66)',
                    }}>
                    {p.letter}
                  </span>

                  {/* Category tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                    style={{
                      background: p.accentColor + '22',
                      borderColor: p.accentColor + '44',
                      color: p.accentColor,
                    }}>
                    {p.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7 relative">
                  {/* Divider with gradient */}
                  <div className="h-px w-full mb-6 rounded-full"
                    style={{ background: `linear-gradient(90deg,${p.accentColor}44,transparent)` }} />

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                        style={{ color: p.accentColor }}>{p.category}</p>
                      <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    </div>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10
                      group-hover:border-white/20 transition-colors"
                      style={{ background: p.accentColor + '22' }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        strokeWidth={2} style={{ color: p.accentColor }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed mb-5">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border"
                        style={{
                          background: p.accentColor + '15',
                          borderColor: p.accentColor + '30',
                          color: p.accentColor,
                        }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#13111f 0%,#0f0e1a 100%)' }}>
        <div className="section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden px-10 py-20 text-center border border-white/8"
            style={{ background: 'linear-gradient(135deg,#1e1b4b 0%,#2d1b69 50%,#1e1b4b 100%)' }}>
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-30 pointer-events-none"
              style={{ background: 'linear-gradient(90deg,#818cf8,#e879f9)' }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                Want to be on this list?
              </h2>
              <p className="mt-4 text-indigo-300 max-w-sm mx-auto text-[15px] leading-relaxed">
                Let's build something remarkable together.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-dark">
                  Start a project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/70 text-sm font-medium rounded-xl hover:bg-white/5 transition-all">
                  View services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
