import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';

interface Message {
  id: string; name: string; email: string; message: string; createdAt: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    api.get('/admin/messages')
      .then(r => setMessages(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>Messages</h1>
          <p className="text-[14px] text-muted mt-1">{messages.length} contact submissions — read only</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-3)' }}>
                  {['Name', 'Email', 'Message', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map((m, i) => (
                  <tr key={m.id} className="border-b transition-colors cursor-pointer"
                    style={{ borderColor: 'var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-3)' }}
                    onClick={() => setSelected(m)}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'var(--bg-3)')}>
                    <td className="px-5 py-3.5 font-semibold" style={{ color: 'var(--text)' }}>{m.name}</td>
                    <td className="px-5 py-3.5 text-muted">{m.email}</td>
                    <td className="px-5 py-3.5 text-muted max-w-xs truncate">{m.message}</td>
                    <td className="px-5 py-3.5 text-muted whitespace-nowrap text-[13px]">{fmt(m.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] font-medium" style={{ color: '#6366f1' }}>View →</span>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-muted text-[14px]">No messages yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Message detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div className="w-full max-w-md rounded-2xl p-7 shadow-2xl" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[17px] font-bold" style={{ color: 'var(--text)' }}>Message</h2>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-slate-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              {[['Name', selected.name], ['Email', selected.email], ['Date', fmt(selected.createdAt)]].map(([l, v]) => (
                <div key={l}>
                  <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#6366f1' }}>{l}</p>
                  <p className="text-[14px]" style={{ color: 'var(--text)' }}>{v}</p>
                </div>
              ))}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: '#6366f1' }}>Message</p>
                <div className="p-4 rounded-xl text-[14px] leading-relaxed" style={{ background: 'var(--bg-3)', color: 'var(--text)' }}>
                  {selected.message}
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={`mailto:${selected.email}`} className="flex-1 btn-primary justify-center !text-[14px]">
                Reply via email
              </a>
              <button onClick={() => setSelected(null)} className="flex-1 btn-secondary justify-center">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
