import { motion } from 'framer-motion';
import { api } from '../api';
import { useFetch } from '../hooks/useFetch';
import SectionHeader from '../components/SectionHeader';
import TechBadge from '../components/TechBadge';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const gradients = [
  { from: '#818cf8', to: '#c084fc' },
  { from: '#f472b6', to: '#fb923c' },
  { from: '#34d399', to: '#22d3ee' },
  { from: '#fbbf24', to: '#f87171' },
];

export default function Projects() {
  const { data: projects, loading, error } = useFetch(api.getProjects);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-100"
        style={{ background: 'linear-gradient(135deg,#eef2ff 0%,#fdf4ff 55%,#fff 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="section relative pt-24 pb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="label">Our work</span>
            <h1 className="mt-3 heading-lg">Projects</h1>
            <p className="mt-4 text-[15px] text-neutral-500 max-w-lg leading-relaxed">
              A selection of products we've designed, built, and shipped.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section py-20">
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {projects && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => {
              const g = gradients[i % gradients.length];
              return (
                <motion.div key={p.id} custom={i} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} className="card group overflow-hidden flex flex-col">
                  {/* Colorful image area */}
                  <div className="w-full h-56 flex items-center justify-center relative overflow-hidden border-b border-brand-100"
                    style={{ background: `linear-gradient(135deg,${g.from}22,${g.to}33)` }}>
                    <div className="absolute inset-0 bg-dot-pattern" />
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="relative text-7xl font-bold select-none group-hover:scale-110 transition-transform duration-500"
                        style={{ color: g.from, filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.12))' }}>
                        {p.name.charAt(0)}
                      </span>
                    )}
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer"
                        className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm border border-brand-100
                          flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-soft hover:bg-white">
                        <svg className="w-3.5 h-3.5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-semibold text-neutral-900 text-[15px]">{p.name}</h3>
                    <p className="mt-2 text-sm text-neutral-500 leading-relaxed flex-1">{p.description}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.techStack.map((t) => <TechBadge key={t} label={t} />)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-brand-100 py-20"
        style={{ background: 'linear-gradient(180deg,#f8f7ff 0%,#fff 100%)' }}>
        <div className="section text-center">
          <SectionHeader label="Work with us" title="Have a project in mind?"
            subtitle="We'd love to hear about it. Let's build something great together." center />
          <Link to="/contact" className="btn-primary mx-auto">
            Get in touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
