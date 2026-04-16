import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';

interface Stats { projects: number; messages: number; }

const StatCard = ({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) => (
  <div className="card p-6 flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
      style={{ background: color }}>
      {icon}
    </div>
    <div>
      <p className="text-[28px] font-bold" style={{ color: 'var(--text)' }}>{value}</p>
      <p className="text-[13px] text-muted">{label}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(r => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>Dashboard</h1>
          <p className="text-[14px] text-muted mt-1">Welcome back to your admin panel.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
            <StatCard label="Total Projects" value={stats?.projects ?? 0} color="linear-gradient(135deg,#3b82f6,#6366f1)"
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            />
            <StatCard label="Total Messages" value={stats?.messages ?? 0} color="linear-gradient(135deg,#0ea5e9,#6366f1)"
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            />
          </div>
        )}

        <div className="mt-10 card p-6 max-w-xl">
          <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text)' }}>Quick links</h2>
          <div className="space-y-2">
            {[
              { to: '/admin/projects', label: 'Manage Projects', desc: 'Create, edit, delete projects' },
              { to: '/admin/messages', label: 'View Messages', desc: 'Read contact form submissions' },
            ].map(({ to, label, desc }) => (
              <Link key={to} to={to}
                className="flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-indigo-50"
                style={{ color: 'var(--text)' }}>
                <div>
                  <p className="text-[14px] font-medium">{label}</p>
                  <p className="text-[12px] text-muted">{desc}</p>
                </div>
                <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
