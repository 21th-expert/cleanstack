import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
];

const navStyle = (isActive: boolean) => ({
  color: isActive ? '#6366f1' : 'var(--text-muted)',
  background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent',
});

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setOpen(false); }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl border-b' : ''}`}
        style={scrolled ? { background: 'var(--nav-bg)', borderColor: 'var(--border)', boxShadow: '0 1px 12px rgba(0,0,0,0.06)' } : {}}
      >
        <nav className="section h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="group-hover:scale-105 transition-transform duration-200 inline-flex drop-shadow-sm">
              <Logo size={36} />
            </span>
            <span className="text-[16px] font-bold tracking-tight"
              style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              cleanstack
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to}
                  className={({ isActive }) => `px-4 py-2.5 text-[15px] rounded-xl transition-all duration-150 ${isActive ? 'font-semibold' : ''}`}
                  style={({ isActive }) => navStyle(isActive)}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Theme toggle */}
            <button onClick={toggle}
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-150 hover:scale-105"
              style={{ background: 'var(--bg-3)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              aria-label="Toggle theme">
              {isDark ? (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* CTA */}
            <Link to="/contact" className="hidden md:inline-flex btn-primary !px-5 !py-2.5 !text-[14px]">
              Get in touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors"
              style={{ background: open ? 'rgba(99,102,241,0.08)' : 'transparent' }}
              onClick={() => setOpen(!open)} aria-label="Toggle menu">
              <span className={`block h-[1.5px] transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[4px] w-5' : 'w-5'}`} style={{ background: 'var(--text)' }} />
              <span className={`block h-[1.5px] transition-all duration-200 ${open ? 'opacity-0 w-0' : 'w-3.5'}`} style={{ background: 'var(--text)' }} />
              <span className={`block h-[1.5px] transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[4px] w-5' : 'w-5'}`} style={{ background: 'var(--text)' }} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80' : 'max-h-0'}`}>
          <div className="px-6 py-5 flex flex-col gap-1 border-t" style={{ background: 'var(--nav-bg)', borderColor: 'var(--border)' }}>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `px-4 py-3 text-[15px] rounded-xl transition-colors ${isActive ? 'font-semibold' : ''}`}
                style={({ isActive }) => navStyle(isActive)}>
                {label}
              </NavLink>
            ))}
            <div className="flex items-center justify-between mt-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button onClick={toggle}
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{ background: 'var(--bg-3)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                {isDark ? '☀️' : '🌙'}
              </button>
              <Link to="/contact" className="btn-primary !text-[13px] !px-4 !py-2">Get in touch</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[68px]"><Outlet /></main>

      {/* Footer */}
      <footer className="mt-24 border-t" style={{ background: 'var(--footer-bg)', borderColor: 'var(--border)' }}>
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
              <p className="text-[14px] leading-relaxed text-muted">
                A lean software development studio building fast, production-ready digital products.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-12">
              <div>
                <p className="text-[12px] font-bold tracking-widest uppercase mb-5" style={{ color: '#6366f1' }}>Pages</p>
                <ul className="space-y-3">
                  {navLinks.map(({ to, label }) => (
                    <li key={to}><Link to={to} className="text-[15px] text-muted hover:text-indigo-500 transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-widest uppercase mb-5" style={{ color: '#6366f1' }}>Contact</p>
                <ul className="space-y-3">
                  <li className="text-[15px] text-muted">hello@cleanstack.dev</li>
                  <li className="text-[15px] text-muted">Remote — worldwide</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[13px] text-faint">© {new Date().getFullYear()} Cleanstack Studio. All rights reserved.</p>
            <p className="text-[13px] text-faint">Built with React · TypeScript · Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
