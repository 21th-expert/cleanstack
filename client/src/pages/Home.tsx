import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import TechBadge from '../components/TechBadge';
import Spinner from '../components/Spinner';

const staticServices = [
  { id: 'web',        order: '01', title: 'Web Development',   description: 'Full-stack web apps, SaaS platforms, and MVPs built with modern frameworks. Clean code, fast delivery.', techStack: ['React', 'Next.js', 'Node.js'], gradient: 'linear-gradient(135deg,#4f46e5,#6366f1)' },
  { id: 'blockchain', order: '02', title: 'Blockchain & Web3', description: 'Smart contracts, DeFi protocols, NFT platforms, and dApps across EVM chains and Solana.',              techStack: ['Solidity', 'Ethers.js', 'Solana'], gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
  { id: 'design',     order: '03', title: 'UI/UX Design',      description: 'Minimal, purposeful interfaces. Design systems, prototypes, and pixel-perfect implementation.',          techStack: ['Figma', 'Framer', 'Tailwind CSS'], gradient: 'linear-gradient(135deg,#db2777,#f472b6)' },
  { id: '3d',         order: '04', title: '3D & Motion',       description: 'Immersive WebGL experiences, product visualizations, and scroll-driven animations.',                     techStack: ['Three.js', 'Blender', 'GSAP'], gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const testimonials = [
  { quote: 'Cleanstack delivered our MVP in 6 weeks. Clean code, zero drama.', author: 'Sarah K.', role: 'Founder, Fintrack' },
  { quote: "The best technical partner we've worked with. They think like founders.", author: 'Marcus T.', role: 'CTO, Shipfast' },
  { quote: 'Minimal, fast, and exactly what we asked for. Highly recommend.', author: 'Priya M.', role: 'Product Lead, Logbase' },
];

const stats = [
  { value: '50+', label: 'Projects shipped' },
  { value: '4yr',  label: 'In business' },
  { value: '30+', label: 'Happy clients' },
  { value: '100%', label: 'Remote' },
];

const techLogos = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js', 'Docker', 'AWS', 'Prisma', 'GraphQL', 'Tailwind', 'Solidity', 'Three.js'];

const projectColors = [
  { from: '#818cf8', to: '#c084fc', glow: 'rgba(129,140,248,0.15)' },
  { from: '#f472b6', to: '#fb923c', glow: 'rgba(244,114,182,0.15)' },
  { from: '#34d399', to: '#22d3ee', glow: 'rgba(52,211,153,0.15)' },
  { from: '#fbbf24', to: '#f87171', glow: 'rgba(251,191,36,0.15)' },
];

export default function Home() {
  const { data: projects, loading: prjLoading } = useFetch(api.getProjects);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#0f0d1e 0%,#130f2a 50%,#0a0914 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#4f46e5,transparent 70%)' }} />
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#c026d3,transparent 70%)' }} />

        <div className="section relative pt-28 pb-36">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }} className="badge mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              Available for new projects
            </motion.div>
            <h1 className="heading-xl">
              We build software<br />
              <span className="gradient-text">that ships.</span>
            </h1>
            <p className="mt-7 text-[17px] leading-[1.8] text-muted max-w-lg">
              Cleanstack is a lean development studio. We partner with startups and scale-ups to design, build, and launch digital products — fast.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Start a project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/services" className="btn-secondary">View services</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }} className="mt-20 flex flex-wrap gap-x-10 gap-y-6">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold tracking-tight gradient-text">{value}</p>
                <p className="text-xs text-faint mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="py-4 overflow-hidden border-y border-subtle">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techLogos, ...techLogos].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-8 text-xs font-bold text-brand-500 uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-brand-600" />{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section className="py-28">
        <div className="section">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="label">What we do</span>
              <h2 className="mt-3 heading-md">Services</h2>
            </div>
            <Link to="/services" className="btn-ghost hidden md:inline-flex">
              All services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {staticServices.map((s, i) => (
              <motion.div key={s.id} variants={fadeUp} custom={i} className="card p-7 group flex flex-col">
                <div className="w-11 h-11 rounded-2xl mb-5 flex items-center justify-center text-white text-[10px] font-bold group-hover:scale-105 transition-transform"
                  style={{ background: s.gradient, boxShadow: '0 4px 20px -4px ' + s.gradient.match(/#[0-9a-f]+/i)?.[0] + '66' }}>
                  {s.order}
                </div>
                <h3 className="font-semibold text-white text-[15px] mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1">{s.description}</p>
                <div className="mt-5 pt-4 border-t border-subtle flex flex-wrap gap-1.5">
                  {s.techStack.map((t) => <TechBadge key={t} label={t} />)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="py-28 border-y border-subtle" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="section">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="label">Our work</span>
              <h2 className="mt-3 heading-md">Featured projects</h2>
            </div>
            <Link to="/projects" className="btn-ghost hidden md:inline-flex">
              All projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          {prjLoading ? <Spinner /> : (
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(projects ?? []).slice(0, 4).map((p, i) => {
                const c = projectColors[i % 4];
                return (
                  <motion.div key={p.id} variants={fadeUp} custom={i}
                    className="group rounded-2xl overflow-hidden border transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = c.from + '55')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
                    <div className="w-full h-44 flex items-center justify-center relative overflow-hidden border-b border-subtle"
                      style={{ background: `linear-gradient(135deg,${c.glow},transparent 80%)` }}>
                      <div className="absolute inset-0 bg-dot-pattern opacity-50" />
                      <span className="relative text-6xl font-black select-none group-hover:scale-110 transition-transform duration-500"
                        style={{ background: `linear-gradient(135deg,${c.from},${c.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {p.name.charAt(0)}
                      </span>
                    </div>
                    <div className="p-7">
                      <h3 className="font-semibold text-white">{p.name}</h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">{p.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.techStack.map((t) => <TechBadge key={t} label={t} />)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-28">
        <div className="section">
          <div className="mb-14">
            <span className="label">Kind words</span>
            <h2 className="mt-3 heading-md">What clients say</h2>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="card-gradient p-8 flex flex-col justify-between">
                <div>
                  <svg className="w-7 h-7 mb-5 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#c4c0e0' }}>{t.quote}</p>
                </div>
                <div className="mt-7 flex items-center gap-3 pt-6 border-t border-subtle">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg,#4f46e5,#c026d3)' }}>
                    <span className="text-white text-[10px] font-bold">{t.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-faint">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28">
        <div className="section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden px-10 py-24 text-center border border-subtle"
            style={{ background: 'linear-gradient(135deg,#1e1b4b 0%,#2d1b69 50%,#1a0f2e 100%)' }}>
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-40 pointer-events-none"
              style={{ background: 'linear-gradient(90deg,#4f46e5,#c026d3)' }} />
            <div className="relative">
              <span className="badge-dark mb-6"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />Open for work</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight mt-2">
                Ready to build<br />something great?
              </h2>
              <p className="mt-5 max-w-sm mx-auto text-[15px] leading-relaxed" style={{ color: '#a5b4fc' }}>
                Tell us about your project. We'll get back to you within 24 hours.
              </p>
              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-dark">
                  Start a project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
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
