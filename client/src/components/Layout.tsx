import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import Logo from './Logo';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setOpen(false); }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f8faff' }}>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl border-b' : ''}`}
        style={scrolled ? { background: 'rgba(248,250,255,0.95)', borderColor: '#e2e8f0', boxShadow: '0 1px 12px rgba(0,0,0,0.06)' } : {}}>
        <nav className="section h-[68px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="group-hover:scale-105 transition-transform duration-200 inline-flex drop-shadow-sm">
              <Logo size={36} />
            </span>
            <span className="text-[16px] font-bold tracking-tight"
              style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              cleanstack
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to}
                  className={({ isActive }) => `px-4 py-2.5 text-[15px] rounded-xl transition-all duration-150 ${isActive ? 'font-semibold' : ''}`}
                  style={({ isActive }) => ({ color: isActive ? '#6366f1' : '#64748b', background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent' })}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="hidden md:inline-flex btn-primary !px-5 !py-2.5 !text-[14px]">
            Get in touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <button className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors"
            style={{ background: open ? 'rgba(99,102,241,0.08)' : 'transparent' }}
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span className={`block h-[1.5px] bg-slate-700 transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[4px] w-5' : 'w-5'}`} />
            <span className={`block h-[1.5px] bg-slate-700 transition-all duration-200 ${open ? 'opacity-0 w-0' : 'w-3.5'}`} />
            <span className={`block h-[1.5px] bg-slate-700 transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[4px] w-5' : 'w-5'}`} />
          </button>
        </nav>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80' : 'max-h-0'}`}>
          <div className="px-6 py-5 flex flex-col gap-1 border-t" style={{ background: 'rgba(248,250,255,0.98)', borderColor: '#e2e8f0' }}>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `px-4 py-3 text-[15px] rounded-xl transition-colors ${isActive ? 'font-semibold' : ''}`}
                style={({ isActive }) => ({ color: isActive ? '#6366f1' : '#64748b', background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent' })}>
                {label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary mt-3 justify-center">Get in touch</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[68px]"><Outlet /></main>

      <footer className="mt-24 border-t" style={{ background: '#fff', borderColor: '#e2e8f0' }}>
        <div className="section py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="max-w-xs">
              <Link to="/" className="flex items-center gap-2.5 mb-5">
                <Logo size={30} />
                <span className="text-[15px] font-bold"
                  style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  cleanstack
                </span>
              </Link>
              <p className="text-[14px] leading-relaxed text-slate-500">
                A lean software development studio building fast, production-ready digital products.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-12">
              <div>
                <p className="text-[12px] font-bold tracking-widest uppercase mb-5 text-indigo-500">Pages</p>
                <ul className="space-y-3">
                  {navLinks.map(({ to, label }) => (
                    <li key={to}><Link to={to} className="text-[15px] text-slate-500 hover:text-indigo-600 transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-widest uppercase mb-5 text-indigo-500">Contact</p>
                <ul className="space-y-3">
                  <li className="text-[15px] text-slate-500">hello@cleanstack.dev</li>
                  <li className="text-[15px] text-slate-500">Remote — worldwide</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[13px] text-slate-400">© {new Date().getFullYear()} Cleanstack Studio. All rights reserved.</p>
            <p className="text-[13px] text-slate-300">Built with React · TypeScript · Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
