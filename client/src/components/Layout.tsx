import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0914' }}>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl border-b' : ''
      }`} style={scrolled ? { background: 'rgba(10,9,20,0.92)', borderColor: 'rgba(255,255,255,0.07)' } : {}}>
        <nav className="section h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#c026d3)' }}>
              <span className="text-white text-[9px] font-bold">CS</span>
            </span>
            <span className="text-sm font-bold tracking-tight text-white">cleanstack</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) =>
                  `px-3.5 py-2 text-sm rounded-xl transition-all duration-150 ${
                    isActive ? 'text-brand-300 font-semibold bg-brand-500/10' : 'text-slate-400 hover:text-brand-300 hover:bg-brand-500/8'
                  }`
                }>{label}</NavLink>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="hidden md:inline-flex btn-primary text-xs px-4 py-2">
            Get in touch
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors"
            style={{ background: open ? 'rgba(99,102,241,0.12)' : 'transparent' }}
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span className={`block h-px bg-white transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[3px] w-[18px]' : 'w-[18px]'}`} />
            <span className={`block h-px bg-white transition-all duration-200 ${open ? 'opacity-0 w-0' : 'w-[14px]'}`} />
            <span className={`block h-px bg-white transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[3px] w-[18px]' : 'w-[18px]'}`} />
          </button>
        </nav>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-72' : 'max-h-0'}`}>
          <div className="px-6 py-4 flex flex-col gap-1 border-t" style={{ background: 'rgba(10,9,20,0.98)', borderColor: 'rgba(255,255,255,0.07)' }}>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) =>
                `px-3 py-2.5 text-sm rounded-xl transition-colors ${isActive ? 'text-brand-300 font-semibold bg-brand-500/10' : 'text-slate-400'}`
              }>{label}</NavLink>
            ))}
            <Link to="/contact" className="btn-primary mt-2 justify-center text-xs">Get in touch</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16"><Outlet /></main>

      <footer className="mt-24 border-t" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="section py-14">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div className="max-w-xs">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#4f46e5,#c026d3)' }}>
                  <span className="text-white text-[8px] font-bold">CS</span>
                </span>
                <span className="text-sm font-bold text-white">cleanstack</span>
              </Link>
              <p className="text-xs leading-relaxed text-muted">
                A lean software development studio building fast, production-ready digital products.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                <p className="text-2xs font-bold tracking-widest text-brand-500 uppercase mb-4">Pages</p>
                <ul className="space-y-2.5">
                  {navLinks.map(({ to, label }) => (
                    <li key={to}><Link to={to} className="text-sm text-muted hover:text-brand-300 transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-2xs font-bold tracking-widest text-brand-500 uppercase mb-4">Contact</p>
                <ul className="space-y-2.5">
                  <li className="text-sm text-muted">hello@cleanstack.dev</li>
                  <li className="text-sm text-muted">Remote — worldwide</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-faint">© {new Date().getFullYear()} Cleanstack Studio. All rights reserved.</p>
            <p className="text-xs text-faint">Built with React · TypeScript · Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
