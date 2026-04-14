import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import TechBadge from '../components/TechBadge';
import Spinner from '../components/Spinner';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const testimonials = [
  { quote: 'Cleanstack delivered our MVP in 6 weeks. Clean code, zero drama.', author: 'Sarah K.', role: 'Founder, Fintrack' },
  { quote: "The best technical partner we've worked with. They think like founders.", author: 'Marcus T.', role: 'CTO, Shipfast' },
  { quote: 'Minimal, fast, and exactly what we asked for. Highly recommend.', author: 'Priya M.', role: 'Product Lead, Logbase' },
];

const stats = [
  { value: '50+', label: 'Projects shipped' },
  { value: '4yr', label: 'In business' },
  { value: '30+', label: 'Happy clients' },
  { value: '100%', label: 'Remote' },
];

const techLogos = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js', 'Docker', 'AWS', 'Prisma', 'GraphQL', 'Tailwind'];

export default function Home() {
  const { data: services, loading: svcLoading } = useFetch(api.getServices);
  const { data: projects, loading: prjLoading } = useFetch(api.getProjects);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#eef2ff 0%,#fdf4ff 55%,#fff 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        {/* Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#818cf8,transparent 70%)' }} />
        <div className="absolute -top-16 right-0 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#e879f9,transparent 70%)' }} />

        <div className="section relative pt-28 pb-36">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="badge mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
              Available for new projects
            </motion.div>

            <h1 className="heading-xl">
              We build software
              <br />
              <span className="gradient-text">that ships.</span>
            </h1>

            <p className="mt-7 text-[17px] text-neutral-500 max-w-lg leading-[1.8]">
              Cleanstack is a lean development studio. We partner with startups and
              scale-ups to design, build, and launch digital products — fast.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Start a project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/services" className="btn-secondary">View services</Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-20 flex flex-wrap gap-x-10 gap-y-6">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold tracking-tight gradient-text">{value}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="border-y border-brand-100 py-4 overflow-hidden" style={{ background: 'linear-gradient(90deg,#f8f7ff,#fdf4ff,#f8f7ff)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techLogos, ...techLogos].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-8 text-xs font-bold text-brand-400 uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-brand-300" />{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Services preview ── */}
      <section className="py-28">
        <div className="section">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="label">What we do</span>
              <h2 className="mt-3 heading-md">Services</h2>
            </div>
            <Link to="/services" className="btn-ghost hidden md:inline-flex">
              All services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {svcLoading ? <Spinner /> : (
            <motion.div variants={stagger} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden shadow-soft"
              style={{ background: 'linear-gradient(135deg,#e0e7ff,#f5d0fe)' }}>
              {(services ?? []).slice(0, 3).map((s, i) => (
                <motion.div key={s.id} variants={fadeUp} custom={i}
                  className="bg-white p-8 hover:bg-brand-50/40 transition-colors group">
                  <div className="w-10 h-10 rounded-xl mb-6 flex items-center justify-center text-white text-[10px] font-bold
                    group-hover:scale-105 transition-transform"
                    style={{ background: 'linear-gradient(135deg,#4f46e5,#c026d3)' }}>
                    {String(s.order).padStart(2, '0')}
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-[15px]">{s.title}</h3>
                  <p className="mt-2.5 text-sm text-neutral-500 leading-relaxed">{s.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.techStack.slice(0, 3).map((t) => <TechBadge key={t} label={t} />)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Projects preview ── */}
      <section className="py-28 border-y border-brand-100" style={{ background: 'linear-gradient(180deg,#f8f7ff 0%,#fff 100%)' }}>
        <div className="section">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="label">Our work</span>
              <h2 className="mt-3 heading-md">Featured projects</h2>
            </div>
            <Link to="/projects" className="btn-ghost hidden md:inline-flex">
              All projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {prjLoading ? <Spinner /> : (
            <motion.div variants={stagger} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(projects ?? []).slice(0, 4).map((p, i) => {
                const gradients = [
                  'from-violet-100 via-indigo-50 to-blue-50',
                  'from-fuchsia-100 via-pink-50 to-rose-50',
                  'from-sky-100 via-cyan-50 to-teal-50',
                  'from-amber-100 via-orange-50 to-yellow-50',
                ];
                return (
                  <motion.div key={p.id} variants={fadeUp} custom={i} className="card group overflow-hidden">
                    <div className={`w-full h-44 bg-gradient-to-br ${gradients[i % 4]} flex items-center justify-center relative overflow-hidden border-b border-brand-100`}>
                      <div className="absolute inset-0 bg-dot-pattern" />
                      <span className="relative text-6xl font-bold text-white/60 select-none group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">
                        {p.name.charAt(0)}
                      </span>
                    </div>
                    <div className="p-7">
                      <h3 className="font-semibold text-neutral-900">{p.name}</h3>
                      <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{p.description}</p>
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
          <motion.div variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="card-gradient p-8 flex flex-col justify-between">
                <div>
                  <svg className="w-7 h-7 text-brand-200 mb-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[15px] text-neutral-700 leading-relaxed">{t.quote}</p>
                </div>
                <div className="mt-7 flex items-center gap-3 pt-6 border-t border-brand-100">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg,#4f46e5,#c026d3)' }}>
                    <span className="text-white text-[10px] font-bold">{t.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{t.author}</p>
                    <p className="text-xs text-neutral-400">{t.role}</p>
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
            className="relative rounded-3xl overflow-hidden px-10 py-24 text-center"
            style={{ background: 'linear-gradient(135deg,#312e81 0%,#4f46e5 40%,#7c3aed 70%,#a21caf 100%)' }}>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle,#e879f9,transparent 70%)' }} />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle,#818cf8,transparent 70%)' }} />

            <div className="relative">
              <span className="badge-dark mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                Open for work
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight mt-2">
                Ready to build
                <br />something great?
              </h2>
              <p className="mt-5 text-indigo-200 max-w-sm mx-auto text-[15px] leading-relaxed">
                Tell us about your project. We'll get back to you within 24 hours.
              </p>
              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-dark">
                  Start a project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/80 text-sm font-medium rounded-xl hover:bg-white/10 hover:border-white/30 transition-all">
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
