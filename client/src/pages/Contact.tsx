import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api';

type Status = 'idle' | 'loading' | 'success' | 'error';

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
      await api.submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-100"
        style={{ background: 'linear-gradient(135deg,#eef2ff 0%,#fdf4ff 55%,#fff 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="section relative pt-24 pb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="label">Get in touch</span>
            <h1 className="mt-3 heading-lg">Let's work together</h1>
            <p className="mt-4 text-[15px] text-neutral-500 max-w-lg leading-relaxed">
              Tell us about your project. We respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Info panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-8">

            {[
              { icon: '✉️', label: 'Email',         value: 'hello@cleanstack.dev' },
              { icon: '📍', label: 'Location',      value: 'Remote — worldwide' },
              { icon: '⏱️', label: 'Response time', value: 'Within 24 hours' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border border-brand-100 bg-brand-50">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm text-neutral-700">{value}</p>
                </div>
              </div>
            ))}

            {/* Availability */}
            <div className="card-gradient p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
                <span className="text-sm font-semibold text-neutral-900">Currently available</span>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed">
                We're taking on new projects. Typical engagement starts within 1–2 weeks.
              </p>
            </div>

            {/* Steps */}
            <div>
              <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-4">What happens next</p>
              <ol className="space-y-3">
                {['We review your message within 24h', 'Schedule a 30-min discovery call', 'Receive a tailored proposal'].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 text-white"
                      style={{ background: 'linear-gradient(135deg,#4f46e5,#c026d3)' }}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-neutral-500">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3">

            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="card-gradient p-14 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg,#4f46e5,#c026d3)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Message sent!</h3>
                <p className="mt-2 text-sm text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Thanks for reaching out. We'll be in touch within 24 hours.
                </p>
                <button onClick={() => setStatus('idle')}
                  className="mt-7 text-sm text-brand-500 hover:text-brand-700 transition-colors underline underline-offset-4">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-brand-500 mb-2 uppercase tracking-wider">Name</label>
                    <input type="text" placeholder="Your name" value={form.name} onChange={set('name')}
                      className={`input-field ${errors.name ? 'input-error' : ''}`} />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-500 mb-2 uppercase tracking-wider">Email</label>
                    <input type="email" placeholder="you@company.com" value={form.email} onChange={set('email')}
                      className={`input-field ${errors.email ? 'input-error' : ''}`} />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-500 mb-2 uppercase tracking-wider">Message</label>
                  <textarea placeholder="Tell us about your project — what you're building, your timeline, and budget range..."
                    value={form.message} onChange={set('message')} rows={7}
                    className={`input-field resize-none ${errors.message ? 'input-error' : ''}`} />
                  {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100">
                    <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full btn-primary justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100">
                  {status === 'loading' ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <>Send message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-neutral-400">
                  No spam, ever. We'll only use your info to respond to your message.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
