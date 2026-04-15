import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';

import alexImg from '../assets/Smiling man in office setting.png';
import jordanImg from '../assets/b8b32948-0fb2-4cdf-bdbf-d3d698a1f24e.png';
import samImg from '../assets/Gentle smile and blue eyes.png';
import morganImg from '../assets/Professional portrait on modern sofa.png';

const team = [
  { name: 'Alex Rivera',  role: 'Founder & Lead Engineer', photo: alexImg,   gradient: 'linear-gradient(135deg,#3b82f6,#6366f1)' },
  { name: 'Jordan Lee',   role: 'Full-Stack Developer',    photo: jordanImg,  gradient: 'linear-gradient(135deg,#0ea5e9,#3b82f6)' },
  { name: 'Sam Chen',     role: 'UI/UX Designer',          photo: samImg,     gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { name: 'Morgan Blake', role: 'DevOps Engineer',         photo: morganImg,  gradient: 'linear-gradient(135deg,#38bdf8,#6366f1)' },
];

const values = [
  { icon: '◆', title: 'Simplicity first', body: 'We resist complexity. Every line of code, every design decision is questioned.' },
  { icon: '⚡', title: 'Ship fast',        body: 'Speed matters. We move quickly without cutting corners on quality.' },
  { icon: '🎯', title: 'Ownership',        body: 'We treat your product like our own. No hand-holding required.' },
  { icon: '◎', title: 'Transparency',     body: 'No surprises. You always know where things stand.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100"
        style={{ background: 'linear-gradient(160deg,#eff6ff 0%,#eef2ff 60%,#f8faff 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute -top-32 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#6366f1,transparent 70%)' }} />
        <div className="section relative pt-28 pb-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="label">Who we are</span>
            <h1 className="mt-4 heading-lg">About Cleanstack</h1>
            <p className="mt-5 text-[17px] text-slate-500 max-w-lg leading-relaxed">A lean studio of engineers and designers who care deeply about craft.</p>
          </motion.div>
        </div>
      </section>

      <section className="section py-28" style={{ background: '#fff' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="label">Our story</span>
            <h2 className="mt-4 text-[1.9rem] font-semibold mb-7 text-slate-900">Built by engineers, for builders</h2>
            <div className="space-y-5 text-[16px] text-slate-500 leading-[1.85]">
              <p>Cleanstack was founded by engineers who were tired of bloated agencies, missed deadlines, and over-engineered solutions. We set out to build a different kind of studio — one that values clarity, speed, and craft.</p>
              <p>We work with a small number of clients at a time, which means you get our full attention. No account managers, no middlemen — just engineers who care deeply about what they build.</p>
              <p>Since 2020, we've helped startups launch MVPs, scale-ups modernize legacy systems, and founders turn ideas into products people love.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="space-y-5">
            <div className="card-gradient p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[13px] font-bold" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>M</div>
                <h3 className="font-semibold text-[16px] text-slate-800">Mission</h3>
              </div>
              <p className="text-[15px] text-slate-500 leading-relaxed">To help ambitious teams build software that is fast, maintainable, and genuinely useful — without unnecessary complexity.</p>
            </div>
            <div className="card-gradient p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[13px] font-bold" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>V</div>
                <h3 className="font-semibold text-[16px] text-slate-800">Vision</h3>
              </div>
              <p className="text-[15px] text-slate-500 leading-relaxed">A world where great software is accessible to every founder, not just those with deep pockets or large engineering teams.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['50+','Projects shipped'],['4yr','In business'],['30+','Happy clients'],['100%','Remote']].map(([stat, label]) => (
                <div key={label} className="card p-6">
                  <p className="text-3xl font-bold tracking-tight gradient-text">{stat}</p>
                  <p className="text-[14px] text-slate-400 mt-1.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-100 py-28" style={{ background: '#f8faff' }}>
        <div className="section">
          <SectionHeader label="How we work" title="Our values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} className="card-gradient p-8 group">
                <span className="text-3xl mb-6 block group-hover:scale-110 transition-transform duration-300 origin-left">{v.icon}</span>
                <h4 className="font-semibold text-[16px] mb-3 text-slate-800">{v.title}</h4>
                <p className="text-[15px] text-slate-500 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-28" style={{ background: '#fff' }}>
        <SectionHeader label="The people" title="Our team" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <motion.div key={member.name} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="card overflow-hidden group">
              <div className="w-full h-64 overflow-hidden">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <p className="font-semibold text-[16px] text-slate-800">{member.name}</p>
                <p className="text-[14px] text-slate-400 mt-1 leading-relaxed">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
