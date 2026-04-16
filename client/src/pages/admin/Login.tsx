import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('admin_token', data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-bold mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>CS</div>
          <h1 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>Admin Login</h1>
          <p className="text-[14px] mt-1 text-muted">Cleanstack internal dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-7 space-y-5">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-2" style={{ color: '#6366f1' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@cleanstack.dev" required
              className="input-field" />
          </div>
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-2" style={{ color: '#6366f1' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required
              className="input-field" />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl text-[13px] text-red-600 bg-red-50 border border-red-100">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full btn-primary justify-center !py-3 disabled:opacity-50">
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
            ) : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
