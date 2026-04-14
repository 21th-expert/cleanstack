import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';

const team = [
  { name: 'Alex Rivera', role: 'Founder & Lead Engineer', initials: 'AR', gradient: 'linear-gradient(135deg,#4f46e5,#7c3aed)' },
  { name: 'Jordan Lee',  role: 'Full-Stack Developer',    initials: 'JL', gradient: 'linear-gradient(135deg,#0ea5e9,#6366f1)' },
  { name: 'Sam Chen',    role: 'UI/UX Designer',          initials: 'SC', gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { name: 'Morgan Blake',role: 'DevOps Engineer',         initials: 'MB', gradient: 'linear-gradient(135deg,#10b981,#0ea5e9)' },
];

const values = [
  { icon: '◆', title: 'Simplicity first', body: 'We resist complexity. Every line of code, every design decision is questioned.' },
  { icon: '⚡', title: 'Ship fast',        body: 'Speed matters. We move quickly without cutting corners on quality.' },
  { icon: '🎯', title: 'Ownership',        body: 'We treat your product like our own. No hand-holding required.' },
  { icon: '◎', title: 'Transparency',     body: 'No surprises. You always know where things stand.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-100"
        style={{ background: 'linear-gradient(135deg,#eef2ff 0%,#fdf4ff 55%,#fff 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="section relative pt-24 pb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="label">Who we are</span>
            <h1 className="mt-3 heading-lg">About Cleanstack</h1>
            <p className="mt-4 text-[15px] text-neutral-500 max-w-lg leading-relaxed">
              A lean studio of engineers and designers who care deeply about craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story + Mission */}
      <section className="section py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="label">Our story</span>
            <h2 className="mt-3 text-2xl font-semibold text-neutral-900 mb-6">Built by engineers, for builders</h2>
            <div className="space-y-4 text-[15px] text-neutral-500 leading-[1.8]">
              <p>Cleanstack was founded by engineers who were tired of bloated agencies, missed deadlines, and over-engineered solutions. We set out to build a different kind of studio — one that values clarity, speed, and craft.</p>
              <p>We work with a small number of clients at a time, which means you get our full attention. No account managers, no middlemen — just engineers who care deeply about what they build.</p>
              <p>Since 2020, we've helped startups launch MVPs, scale-ups modernize legacy systems, and founders turn ideas into products people love.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5">
            {/* Mission */}
            <div className="card-gradient p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>M</div>
                <h3 className="font-semibold text-neutral-900">Mission</h3>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed">
                To help ambitious teams build software that is fast, maintainable, and genuinely useful — without unnecessary complexity.
              </p>
            </div>
            {/* Vision */}
            <div className="card-gradient p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#c026d3)' }}>V</div>
                <h3 className="font-semibold text-neutral-900">Vision</h3>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed">
                A world where great software is accessible to every founder, not just those with deep pockets or large engineering teams.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[['50+','Projects shipped'],['4yr','In business'],['30+','Happy clients'],['100%','Remote']].map(([stat, label]) => (
                <div key={label} className="card p-5">
                  <p className="text-2xl font-bold tracking-tight gradient-text">{stat}</p>
                  <p className="text-xs text-neutral-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-brand-100 py-24"
        style={{ background: 'linear-gradient(180deg,#f8f7ff 0%,#fff 100%)' }}>
        <div className="section">
          <SectionHeader label="How we work" title="Our values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} custom={i} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} className="card-gradient p-7 group">
                <span className="text-2xl mb-5 block group-hover:scale-110 transition-transform duration-300 origin-left">
                  {v.icon}
                </span>
                <h4 className="font-semibold text-neutral-900 mb-2">{v.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section py-24">
        <SectionHeader label="The people" title="Our team" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div key={member.name} custom={i} initial="hidden"
              whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="card p-6 text-center group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
                group-hover:scale-105 transition-transform"
                style={{ background: member.gradient }}>
                <span className="text-white text-base font-bold">{member.initials}</span>
              </div>
              <p className="font-semibold text-neutral-900 text-sm">{member.name}</p>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
