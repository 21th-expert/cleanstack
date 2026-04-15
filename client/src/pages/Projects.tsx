import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' } }),
};

const projects = [
  {
    id: '1', name: 'Polcode', category: 'Software Agency', tag: 'Agency', letter: 'P',
    description: 'A full-service software development company delivering web, mobile, and cloud solutions for global clients across industries.',
    techStack: ['React', 'Node.js', 'PHP', 'AWS', 'TypeScript'],
    link: 'https://polcode.com/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fpolcode.com%2F?w=1280&h=720',
    gradient: 'linear-gradient(135deg,#3b82f6,#6366f1)', bgGlow: 'rgba(59,130,246,0.1)', accentColor: '#3b82f6',
  },
  {
    id: '2', name: 'Netguru', category: 'Digital Product Studio', tag: 'Studio', letter: 'N',
    description: 'A leading digital product studio helping startups and enterprises design, build, and scale world-class software products.',
    techStack: ['Ruby on Rails', 'React', 'Vue.js', 'AWS', 'Figma'],
    link: 'https://www.netguru.com/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.netguru.com%2F?w=1280&h=720',
    gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)', bgGlow: 'rgba(99,102,241,0.1)', accentColor: '#6366f1',
  },
  {
    id: '3', name: 'Cyber-Duck', category: 'UX & Dev Agency', tag: 'UX', letter: 'C',
    description: 'An award-winning UX and development agency crafting human-centred digital experiences for enterprise and public sector clients.',
    techStack: ['UX Design', 'React', 'Laravel', 'Accessibility', 'CMS'],
    link: 'https://www.cyber-duck.co.uk/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.cyber-duck.co.uk%2F?w=1280&h=720',
    gradient: 'linear-gradient(135deg,#0ea5e9,#3b82f6)', bgGlow: 'rgba(14,165,233,0.1)', accentColor: '#0ea5e9',
  },
  {
    id: '4', name: 'Awesomic', category: 'Design Subscription', tag: 'Design', letter: 'A',
    description: 'On-demand design subscription service matching companies with top-tier designers for unlimited design tasks at a flat monthly rate.',
    techStack: ['Figma', 'Webflow', 'React', 'Branding', 'UI/UX'],
    link: 'https://www.awesomic.com/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.awesomic.com%2F?w=1280&h=720',
    gradient: 'linear-gradient(135deg,#38bdf8,#6366f1)', bgGlow: 'rgba(56,189,248,0.1)', accentColor: '#38bdf8',
  },
  {
    id: '5', name: 'Scandiweb', category: 'E-commerce Agency', tag: 'E-commerce', letter: 'S',
    description: "The world's largest e-commerce agency specialising in Magento, PWA, and headless commerce solutions for global retail brands.",
    techStack: ['Magento', 'React', 'PWA', 'GraphQL', 'PHP'],
    link: 'https://scandiweb.com/',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fscandiweb.com%2F?w=1280&h=720',
    gradient: 'linear-gradient(135deg,#3b82f6,#0ea5e9)', bgGlow: 'rgba(59,130,246,0.1)', accentColor: '#3b82f6',
  },
  {
    id: '6', name: 'OpenZeppelin ERC20', category: 'Web3 Docs', tag: 'Blockchain', letter: 'O',
    description: 'The industry-standard library for secure smart contract development. ERC20 token standard documentation, implementation guides, and audited contract templates.',
    techStack: ['Solidity', 'ERC20', 'Smart Contracts', 'Ethereum', 'Security'],
    link: 'https://docs.openzeppelin.com/contracts/4.x/erc20',
    image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fdocs.openzeppelin.com%2Fcontracts%2F4.x%2Ferc20?w=1280&h=720',
    gradient: 'linear-gradient(135deg,#8b5cf6,#6366f1)', bgGlow: 'rgba(139,92,246,0.1)', accentColor: '#8b5cf6',
  },
];

const stats = [
  { value: '6',   label: 'Featured studios' },
  { value: '4',   label: 'Service areas' },
  { value: '30+', label: 'Happy clients' },
  { value: '98%', label: 'On-time delivery' },
];

function ProjectImage({ src, alt, gradient, letter, bgGlow }: {
  src: string; alt: string; gradient: string; letter: string; bgGlow: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="relative w-full h-56 overflow-hidden bg-slate-50"
      style={{ background: `linear-gradient(135deg,${bgGlow},var(--bg-3) 80%)` }}>
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: loaded && !error ? 0 : 1 }}>
        <span className="text-[6rem] font-black select-none leading-none"
          style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {letter}
        </span>
      </div>
      {!error && (
        <img src={src} alt={alt}
          onLoad={() => setLoaded(true)} onError={() => setError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
          style={{ opacity: loaded ? 1 : 0 }} />
      )}
      {loaded && !error && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to bottom,transparent 40%,rgba(15,23,42,0.4) 100%)' }} />
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100"
        style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#1e40af 40%,#3730a3 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#60a5fa,transparent 70%)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#818cf8,transparent 70%)' }} />

        <div className="section relative pt-28 pb-24">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-semibold mb-8"
              style={{ borderColor: 'rgba(147,197,253,0.3)', background: 'rgba(59,130,246,0.15)', color: '#93c5fd' }}>
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse-slow" />
              Inspiration & partners
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-white">
              Studios we admire<br />
              <span style={{ background: 'linear-gradient(90deg,#93c5fd,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                & learn from.
              </span>
            </h1>
            <p className="mt-6 text-[17px] max-w-xl leading-relaxed" style={{ color: '#bfdbfe' }}>
              A curated selection of world-class development studios and agencies that inspire the way we work and build.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-2xl">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-2xl p-5 border"
                style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}>
                <p className="text-2xl font-bold tracking-tight"
                  style={{ background: 'linear-gradient(135deg,#93c5fd,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {value}
                </p>
                <p className="text-[13px] mt-1 text-blue-200">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24" style={{ background: 'var(--bg-3)' }}>
        <div className="section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.id} custom={i} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-40px' }}
                // @ts-ignore
                variants={fadeUp}
                className="group relative rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300"
                style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: 'var(--card-shadow)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(99,102,241,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}>

                <div className="relative">
                  <ProjectImage src={p.image} alt={p.name}
                    gradient={p.gradient} letter={p.letter}
                    bgGlow={p.bgGlow} />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border z-10"
                    style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderColor: p.accentColor + '33', color: p.accentColor }}>
                    {p.tag}
                  </span>

                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all opacity-0 group-hover:opacity-100 z-10"
                    style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderColor: p.accentColor + '33', color: p.accentColor }}
                    onClick={e => e.stopPropagation()}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-slow" style={{ background: p.accentColor }} />
                    Visit
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="p-7">
                  <div className="h-px w-full mb-5 rounded-full"
                    style={{ background: `linear-gradient(90deg,${p.accentColor}33,transparent)` }} />

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-widest mb-1" style={{ color: p.accentColor }}>{p.category}</p>
                      <h3 className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>{p.name}</h3>
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all hover:scale-105"
                      style={{ background: p.accentColor + '12', borderColor: p.accentColor + '25' }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: p.accentColor }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  <p className="text-[14px] text-muted leading-relaxed mb-5">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border"
                        style={{ background: p.accentColor + '0f', borderColor: p.accentColor + '22', color: p.accentColor }}>
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

      {/* CTA */}
      <section className="py-24" style={{ background: 'var(--bg-3)' }}>
        <div className="section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden px-10 py-20 text-center border border-indigo-200"
            style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#3730a3 50%,#4f46e5 100%)' }}>
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-30 pointer-events-none"
              style={{ background: 'linear-gradient(90deg,#60a5fa,#818cf8)' }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Want to work with us?
              </h2>
              <p className="mt-4 max-w-sm mx-auto text-[16px] leading-relaxed" style={{ color: '#bfdbfe' }}>
                Let's build something remarkable together.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="btn-dark">
                  Start a project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-medium transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}
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
