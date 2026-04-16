import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' as const } }),
};

const COLORS = [
  { gradient: 'linear-gradient(135deg,#3b82f6,#6366f1)', glow: 'rgba(59,130,246,0.1)', accent: '#3b82f6' },
  { gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)', glow: 'rgba(99,102,241,0.1)',  accent: '#6366f1' },
  { gradient: 'linear-gradient(135deg,#0ea5e9,#3b82f6)', glow: 'rgba(14,165,233,0.1)',  accent: '#0ea5e9' },
  { gradient: 'linear-gradient(135deg,#38bdf8,#6366f1)', glow: 'rgba(56,189,248,0.1)',  accent: '#38bdf8' },
  { gradient: 'linear-gradient(135deg,#8b5cf6,#6366f1)', glow: 'rgba(139,92,246,0.1)',  accent: '#8b5cf6' },
  { gradient: 'linear-gradient(135deg,#3b82f6,#0ea5e9)', glow: 'rgba(59,130,246,0.1)',  accent: '#3b82f6' },
];

interface Project {
  id: string; name: string; description: string;
  techStack: string[]; imageUrl?: string; projectUrl?: string; createdAt: string;
}

function ProjectImage({ src, gradient, letter, glow }: { src?: string; gradient: string; letter: string; glow: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="relative w-full h-56 overflow-hidden"
      style={{ background: `linear-gradient(135deg,${glow},var(--bg-3) 80%)` }}>
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: loaded && !error ? 0 : 1 }}>
        <span className="text-[6rem] font-black select-none leading-none"
          style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {letter}
        </span>
      </div>
      {src && !error && (
        <img src={src} alt={letter}
          onLoad={() => setLoaded(true)} onError={() => setError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
          style={{ opacity: loaded ? 1 : 0 }} />
      )}
      {loaded && !error && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.35) 100%)' }} />
      )}
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
    fetch(`${BASE}/projects`)
      .then(r => r.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-subtle"
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
              Our work
            </span>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-white">
              Projects we've<br />
              <span style={{ background: 'linear-gradient(90deg,#93c5fd,#c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                built & shipped.
              </span>
            </h1>
            <p className="mt-6 text-[17px] max-w-xl leading-relaxed" style={{ color: '#bfdbfe' }}>
              A curated selection of products and studios that inspire the way we work and build.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24" style={{ background: 'var(--bg-3)' }}>
        <div className="section">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((p, i) => {
                const c = COLORS[i % COLORS.length];
                const imgSrc = p.imageUrl || (p.projectUrl
                  ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(p.projectUrl)}?w=1280&h=720`
                  : undefined);
                return (
                  <motion.div key={p.id} custom={i} initial="hidden"
                    whileInView="show" viewport={{ once: true, margin: '-40px' }}
                    variants={fadeUp}
                    className="group relative rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300"
                    style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: 'var(--card-shadow)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.boxShadow = '0 8px 32px -8px rgba(99,102,241,0.18)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}>

                    <div className="relative">
                      <ProjectImage src={imgSrc} gradient={c.gradient} letter={p.name.charAt(0)} glow={c.glow} />
                      {p.projectUrl && (
                        <a href={p.projectUrl} target="_blank" rel="noopener noreferrer"
                          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all opacity-0 group-hover:opacity-100 z-10"
                          style={{ background: 'var(--card-bg)', backdropFilter: 'blur(8px)', borderColor: c.accent + '33', color: c.accent }}
                          onClick={e => e.stopPropagation()}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse-slow" style={{ background: c.accent }} />
                          Visit
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>

                    <div className="p-7">
                      <div className="h-px w-full mb-5 rounded-full"
                        style={{ background: `linear-gradient(90deg,${c.accent}33,transparent)` }} />
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>{p.name}</h3>
                        {p.projectUrl && (
                          <a href={p.projectUrl} target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all hover:scale-105"
                            style={{ background: c.accent + '12', borderColor: c.accent + '25' }}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: c.accent }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <p className="text-[14px] text-muted leading-relaxed mb-5">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.techStack.map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border"
                            style={{ background: c.accent + '0f', borderColor: c.accent + '22', color: c.accent }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {!loading && projects.length === 0 && (
                <p className="col-span-2 text-center text-muted py-20">No projects found.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: 'var(--bg-3)' }}>
        <div className="section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden px-10 py-20 text-center border border-indigo-200"
            style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#3730a3 50%,#4f46e5 100%)' }}>
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-30 pointer-events-none"
              style={{ background: 'linear-gradient(90deg,#60a5fa,#818cf8)' }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Want to work with us?</h2>
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
