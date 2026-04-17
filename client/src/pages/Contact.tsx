import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

type Status = 'idle' | 'loading' | 'success' | 'error';

// ── Web3Forms ─────────────────────────────────────────────────
// Get your FREE access key at https://web3forms.com
// Takes 30 seconds — just enter your email, they send you a key
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      // Always save to database first (for admin messages)
      const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      await fetch(`${BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      // Also send email via Web3Forms if key is configured
      if (WEB3FORMS_KEY) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name:       form.name,
            email:      form.email,
            message:    form.message,
          }),
        });
        await res.json();
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
    }
  };

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };

  return (
    <>
      <section className="relative overflow-hidden border-b border-subtle"
        style={{ background: 'linear-gradient(160deg,var(--bg-3) 0%,var(--bg) 60%,var(--bg) 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle,#6366f1,transparent 70%)' }} />
        <div className="section relative pt-28 pb-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <span className="label">Get in touch</span>
            <h1 className="mt-4 heading-lg">Let's work together</h1>
            <p className="mt-5 text-[17px] text-muted max-w-lg leading-relaxed">Tell us about your project. We respond within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="section py-24" style={{ background: 'var(--bg-2)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }} className="lg:col-span-2 space-y-8">
            {[
              { icon: '✉️', label: 'Email',         value: 'hello@cleanstack.dev' },
              { icon: '📍', label: 'Location',      value: 'Remote — worldwide' },
              { icon: '⏱️', label: 'Response time', value: 'Within 24 hours' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border border-subtle bg-surface">{icon}</div>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-wider mb-1 text-indigo-500">{label}</p>
                  <p className="text-[16px]" style={{ color: 'var(--text)' }}>{value}</p>
                </div>
              </div>
            ))}

            <div className="card-gradient p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-slow" />
                <span className="text-[16px] font-semibold" style={{ color: 'var(--text)' }}>Currently available</span>
              </div>
              <p className="text-[15px] text-muted leading-relaxed">We're taking on new projects. Typical engagement starts within 1–2 weeks.</p>
            </div>

            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider mb-5 text-indigo-500">What happens next</p>
              <ol className="space-y-4">
                {['We review your message within 24h', 'Schedule a 30-min discovery call', 'Receive a tailored proposal'].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 text-white"
                      style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>{i + 1}</span>
                    <span className="text-[15px] text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }} className="lg:col-span-3">
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card-gradient p-16 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[1.4rem] font-semibold" style={{ color: 'var(--text)' }}>Message sent!</h3>
                <p className="mt-3 text-[15px] text-muted max-w-xs mx-auto leading-relaxed">Thanks for reaching out. We'll be in touch within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 text-[15px] text-indigo-500 hover:text-indigo-700 transition-colors underline underline-offset-4">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="card p-9 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider mb-2.5 text-indigo-500">Name</label>
                    <input type="text" placeholder="Your name" value={form.name} onChange={set('name')} className={`input-field ${errors.name ? 'input-error' : ''}`} />
                    {errors.name && <p className="mt-2 text-[13px] text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider mb-2.5 text-indigo-500">Email</label>
                    <input type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} className={`input-field ${errors.email ? 'input-error' : ''}`} />
                    {errors.email && <p className="mt-2 text-[13px] text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider mb-2.5 text-indigo-500">Message</label>
                  <textarea placeholder="Tell us about your project — what you're building, your timeline, and budget range..."
                    value={form.message} onChange={set('message')} rows={7} className={`input-field resize-none ${errors.message ? 'input-error' : ''}`} />
                  {errors.message && <p className="mt-2 text-[13px] text-red-500">{errors.message}</p>}
                </div>
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-red-100 bg-red-50">
                    <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  <p className="text-[14px] text-red-500">Something went wrong. Please try again.</p>
                  </div>
                )}
                <button type="submit" disabled={status === 'loading'}
                  className="w-full btn-primary justify-center !py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100">
                  {status === 'loading' ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <>Send message
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-center text-[13px] text-faint">No spam, ever. We'll only use your info to respond to your message.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
