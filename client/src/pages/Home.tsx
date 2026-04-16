import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TechBadge from '../components/TechBadge';
import DevAnimation from '../components/DevAnimation';

const staticServices = [
  { id: 'web',        order: '01', title: 'Web Development',   description: 'Full-stack web apps, SaaS platforms, and MVPs built with modern frameworks. Clean code, fast delivery.', techStack: ['React', 'Next.js', 'Node.js'], gradient: 'linear-gradient(135deg,#3b82f6,#6366f1)' },
  { id: 'blockchain', order: '02', title: 'Blockchain & Web3', description: 'Smart contracts, DeFi protocols, NFT platforms, and dApps across EVM chains and Solana.',              techStack: ['Solidity', 'Ethers.js', 'Solana'], gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { id: 'design',     order: '03', title: 'UI/UX Design',      description: 'Minimal, purposeful interfaces. Design systems, prototypes, and pixel-perfect implementation.',          techStack: ['Figma', 'Framer', 'Tailwind CSS'], gradient: 'linear-gradient(135deg,#0ea5e9,#3b82f6)' },
  { id: '3d',         order: '04', title: '3D & Motion',       description: 'Immersive WebGL experiences, product visualizations, and scroll-driven animations.',                     techStack: ['Three.js', 'Blender', 'GSAP'], gradient: 'linear-gradient(135deg,#38bdf8,#6366f1)' },
];

const featuredProjects = [
  { id: '1', name: 'Polcode',       category: 'Software Agency',       tag: 'Agency',      letter: 'P', description: 'A full-service software development company delivering web, mobile, and cloud solutions for global clients.', techStack: ['React', 'Node.js', 'PHP', 'AWS'],          link: 'https://polcode.com/',                                    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fpolcode.com%2F?w=1280&h=720',                                                         accent: '#3b82f6' },
  { id: '2', name: 'Netguru',       category: 'Digital Product Studio', tag: 'Studio',     letter: 'N', description: 'A leading digital product studio helping startups and enterprises design, build, and scale world-class software.', techStack: ['Ruby on Rails', 'React', 'Vue.js', 'Figma'], link: 'https://www.netguru.com/',                                image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.netguru.com%2F?w=1280&h=720',                                                     accent: '#6366f1' },
  { id: '3', name: 'Awesomic',      category: 'Design Subscription',   tag: 'Design',     letter: 'A', description: 'On-demand design subscription matching companies with top-tier designers for unlimited tasks at a flat monthly rate.', techStack: ['Figma', 'Webflow', 'React', 'Branding'],  link: 'https://www.awesomic.com/',                               image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.awesomic.com%2F?w=1280&h=720',                                                    accent: '#0ea5e9' },
  { id: '4', name: 'OpenZeppelin',  category: 'Web3 Docs',             tag: 'Blockchain', letter: 'O', description: 'The industry-standard library for secure smart contract development. ERC20 token standard docs and audited templates.', techStack: ['Solidity', 'ERC20', 'Ethereum', 'Security'], link: 'https://docs.openzeppelin.com/contracts/4.x/erc20',       image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fdocs.openzeppelin.com%2Fcontracts%2F4.x%2Ferc20?w=1280&h=720',                        accent: '#38bdf8' },
  { id: '5', name: 'Scandiweb',     category: 'E-commerce Agency',     tag: 'E-commerce', letter: 'S', description: "The world's largest e-commerce agency specialising in Magento, PWA, and headless commerce for global retail brands.", techStack: ['Magento', 'React', 'PWA', 'GraphQL'],     link: 'https://scandiweb.com/',                                  image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fscandiweb.com%2F?w=1280&h=720',                                                       accent: '#8b5cf6' },
  { id: '6', name: 'Nocliche',      category: 'Creative Dev Studio',   tag: 'Creative',   letter: 'N', description: 'A boutique creative development studio building immersive, high-performance websites with cutting-edge animations.',  techStack: ['Three.js', 'GSAP', 'Next.js', 'WebGL'],   link: 'https://nocliche.dev/',                                   image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fnocliche.dev%2F?w=1280&h=720',                                                        accent: '#6366f1' },
];

const testimonials = [
  { quote: 'Cleanstack delivered our MVP in 6 weeks. Clean code, zero drama.',                    author: 'Sarah K.',  role: 'Founder, Fintrack' },
  { quote: "The best technical partner we've worked with. They think like founders.",              author: 'Marcus T.', role: 'CTO, Shipfast' },
  { quote: 'Minimal, fast, and exactly what we asked for. Highly recommend.',                     author: 'Priya M.',  role: 'Product Lead, Logbase' },
];

const stats = [
  { value: '50+',  label: 'Projects shipped' },
  { value: '4yr',  label: 'In business' },
  { value: '30+',  label: 'Happy clients' },
  { value: '100%', label: 'Remote' },
];

const techLogos = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js', 'Docker', 'AWS', 'Prisma', 'GraphQL', 'Tailwind', 'Solidity', 'Three.js'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.09, duration: 0.55, ease: 'easeOut' as const } }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function AnimatedHeroBg() {
  return <DevAnimation />;
}

function ProjectCard({ p, i }: { p: typeof featuredProjects[0]; i: number }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <motion.div variants={fadeUp} custom={i}
      className="group rounded-2xl overflow-hidden border transition-all duration-300"
      style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: 'var(--card-shadow)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent + '66'; e.currentTarget.style.boxShadow = `0 8px 32px -8px ${p.accent}33`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}>
      <div className="relative w-full h-44 overflow-hidden border-b border-subtle"
        style={{ background: `linear-gradient(135deg,${p.accent}12,${p.accent}06)` }}>
        {!error && (
          <img src={p.image} alt={p.name}
            onLoad={() => setLoaded(true)} onError={() => setError(true)}
            className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
            style={{ opacity: loaded ? 1 : 0 }} />
        )}
        {(!loaded || error) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black select-none" style={{ color: p.accent + '33' }}>{p.letter}</span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border z-10"
          style={{ background: 'var(--card-bg)', backdropFilter: 'blur(8px)', borderColor: p.accent + '33', color: p.accent }}>
          {p.tag}
        </span>
        <a href={p.link} target="_blank" rel="noopener noreferrer"
          className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all opacity-0 group-hover:opacity-100 z-10"
          style={{ background: 'var(--card-bg)', backdropFilter: 'blur(8px)', borderColor: p.accent + '33', color: p.accent }}
          onClick={e => e.stopPropagation()}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-slow" style={{ background: p.accent }} />
          Visit
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>{p.category}</p>
            <h3 className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{p.name}</h3>
          </div>
          <a href={p.link} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all hover:scale-105"
            style={{ background: p.accent + '12', borderColor: p.accent + '25' }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: p.accent }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <p className="text-[13px] text-muted leading-relaxed mb-4">{p.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.techStack.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border"
              style={{ background: p.accent + '0f', borderColor: p.accent + '22', color: p.accent }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
        <AnimatedHeroBg />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />

        <div className="section relative pt-32 pb-40">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="badge mb-10">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-slow" />
              Available for new projects
            </motion.div>
            <h1 className="heading-xl">
              We build software<br />
              <span className="gradient-text">that ships.</span>
            </h1>
            <p className="mt-8 text-[18px] leading-[1.8] max-w-xl text-muted">
              Cleanstack is a lean development studio. We partner with startups and scale-ups to design, build, and launch digital products — fast.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Start a project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/services" className="btn-secondary">View services</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }} className="mt-24 flex flex-wrap gap-x-12 gap-y-8">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold tracking-tight gradient-text">{value}</p>
                <p className="text-[14px] mt-1 text-faint">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-4 overflow-hidden border-y border-subtle" style={{ background: 'var(--bg-3)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techLogos, ...techLogos].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 mx-10 text-[13px] font-bold uppercase tracking-widest" style={{ color: '#6366f1' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#3b82f6' }} />{t}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="py-28" style={{ background: 'var(--bg-2)' }}>
        <div className="section">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="label">What we do</span>
              <h2 className="mt-3 heading-md">Services</h2>
            </div>
            <Link to="/services" className="hidden md:inline-flex items-center gap-2 text-[15px] font-medium transition-colors" style={{ color: '#6366f1' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              All services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {staticServices.map((s, i) => (
              <motion.div key={s.id} variants={fadeUp} custom={i}
                className="card p-8 group flex flex-col"
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(99,102,241,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}>
                <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center text-white text-[11px] font-bold group-hover:scale-105 transition-transform"
                  style={{ background: s.gradient, boxShadow: '0 4px 16px -4px rgba(99,102,241,0.35)' }}>
                  {s.order}
                </div>
                <h3 className="font-semibold text-[16px] mb-3" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-[14px] text-muted leading-relaxed flex-1">{s.description}</p>
                <div className="mt-6 pt-5 border-t border-subtle flex flex-wrap gap-2">
                  {s.techStack.map((t) => <TechBadge key={t} label={t} />)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-28 border-y border-subtle" style={{ background: 'var(--bg-3)' }}>
        <div className="section">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="label">Our work</span>
              <h2 className="mt-3 heading-md">Featured projects</h2>
            </div>
            <Link to="/projects" className="hidden md:inline-flex items-center gap-2 text-[15px] font-medium transition-colors" style={{ color: '#6366f1' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              All projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28" style={{ background: 'var(--bg-2)' }}>
        <div className="section">
          <div className="mb-14">
            <span className="label">Kind words</span>
            <h2 className="mt-3 heading-md">What clients say</h2>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="card-gradient p-9 flex flex-col justify-between">
                <div>
                  <svg className="w-8 h-8 mb-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#c7d2fe' }}>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[16px] leading-relaxed text-muted">{t.quote}</p>
                </div>
                <div className="mt-8 flex items-center gap-3.5 pt-6 border-t border-subtle">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                    <span className="text-white text-[11px] font-bold">{t.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>{t.author}</p>
                    <p className="text-[13px] text-faint">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28" style={{ background: 'var(--bg-3)' }}>
        <div className="section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden px-12 py-24 text-center border"
            style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#3730a3 40%,#4f46e5 100%)', borderColor: 'rgba(99,102,241,0.3)' }}>
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 blur-3xl opacity-30 pointer-events-none"
              style={{ background: 'linear-gradient(90deg,#60a5fa,#818cf8)' }} />
            <div className="relative">
              <span className="badge-dark mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse-slow" />
                Open for work
              </span>
              <h2 className="text-[2.8rem] md:text-[3.5rem] font-semibold tracking-tight text-white leading-tight mt-2">
                Ready to build<br />something great?
              </h2>
              <p className="mt-6 max-w-md mx-auto text-[17px] leading-relaxed" style={{ color: '#bfdbfe' }}>
                Tell us about your project. We'll get back to you within 24 hours.
              </p>
              <div className="mt-12 flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="btn-dark">
                  Start a project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-medium transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.8)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
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
