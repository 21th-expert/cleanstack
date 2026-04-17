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
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/admin/messages')
      .then(r => setMessages(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  // Select / deselect
  const toggleCheck = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (checked.size === messages.length) setChecked(new Set());
    else setChecked(new Set(messages.map(m => m.id)));
  };

  // Delete one
  const deleteOne = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/admin/messages/${id}`);
    setSelected(null);
    setChecked(prev => { const n = new Set(prev); n.delete(id); return n; });
    load();
  };

  // Delete selected
  const deleteSelected = async () => {
    if (checked.size === 0) return;
    if (!confirm(`Delete ${checked.size} message(s)?`)) return;
    setDeleting(true);
    await Promise.all([...checked].map(id => api.delete(`/admin/messages/${id}`)));
    setChecked(new Set());
    setDeleting(false);
    load();
  };

  // Reply via backend API
  const sendReply = async () => {
    if (!selected || !replyText.trim()) return;
    setReplying(true);
    try {
      await api.post('/admin/messages/reply', {
        to: selected.email,
        subject: `Re: Your message to Cleanstack`,
        body: replyText,
      });
      setReplyText('');
      setSelected(null);
      alert('✅ Reply sent successfully!');
    } catch (err: any) {
      alert('❌ ' + (err.response?.data?.error || 'Failed to send reply'));
    } finally {
      setReplying(false);
    }
  };

  const allChecked = messages.length > 0 && checked.size === messages.length;
  const someChecked = checked.size > 0 && checked.size < messages.length;

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>Messages</h1>
            <p className="text-[14px] text-muted mt-1">{messages.length} contact submissions</p>
          </div>
          {checked.size > 0 && (
            <button onClick={deleteSelected} disabled={deleting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors disabled:opacity-50"
              style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {deleting ? 'Deleting...' : `Delete ${checked.size} selected`}
            </button>
          )}
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
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" checked={allChecked} ref={el => { if (el) el.indeterminate = someChecked; }}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded accent-indigo-600 cursor-pointer" />
                  </th>
                  {['Name', 'Email', 'Message', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map((m, i) => (
                  <tr key={m.id}
                    className="border-b transition-colors cursor-pointer"
                    style={{ borderColor: 'var(--border)', background: checked.has(m.id) ? 'rgba(99,102,241,0.06)' : i % 2 === 0 ? 'transparent' : 'var(--bg-3)' }}
                    onMouseEnter={e => { if (!checked.has(m.id)) e.currentTarget.style.background = 'rgba(99,102,241,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = checked.has(m.id) ? 'rgba(99,102,241,0.06)' : i % 2 === 0 ? 'transparent' : 'var(--bg-3)'; }}>
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={checked.has(m.id)} onChange={() => toggleCheck(m.id)}
                        className="w-4 h-4 rounded accent-indigo-600 cursor-pointer" />
                    </td>
                    <td className="px-4 py-3.5 font-semibold" style={{ color: 'var(--text)' }} onClick={() => setSelected(m)}>{m.name}</td>
                    <td className="px-4 py-3.5 text-muted" onClick={() => setSelected(m)}>{m.email}</td>
                    <td className="px-4 py-3.5 text-muted max-w-xs truncate" onClick={() => setSelected(m)}>{m.message}</td>
                    <td className="px-4 py-3.5 text-muted whitespace-nowrap text-[13px]" onClick={() => setSelected(m)}>{fmt(m.createdAt)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelected(m)}
                          className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                          style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
                          View
                        </button>
                        <button onClick={e => { e.stopPropagation(); deleteOne(m.id); }}
                          className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                          style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-muted text-[14px]">No messages yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Message detail + reply modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) { setSelected(null); setReplyText(''); } }}>
          <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-[17px] font-bold" style={{ color: 'var(--text)' }}>Message</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => deleteOne(selected.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
                <button onClick={() => { setSelected(null); setReplyText(''); }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-muted"
                  style={{ background: 'var(--bg-3)' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-7 space-y-5">
              {/* Sender info */}
              <div className="grid grid-cols-2 gap-4">
                {[['Name', selected.name], ['Email', selected.email], ['Date', fmt(selected.createdAt)]].map(([l, v]) => (
                  <div key={l} className={l === 'Date' ? 'col-span-2' : ''}>
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#6366f1' }}>{l}</p>
                    <p className="text-[14px]" style={{ color: 'var(--text)' }}>{v}</p>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: '#6366f1' }}>Message</p>
                <div className="p-4 rounded-xl text-[14px] leading-relaxed" style={{ background: 'var(--bg-3)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                  {selected.message}
                </div>
              </div>

              {/* Reply */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: '#6366f1' }}>Reply to {selected.email}</p>
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={`Hi ${selected.name},\n\nThank you for reaching out...`}
                  rows={5}
                  className="input-field resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button onClick={sendReply} disabled={!replyText.trim() || replying}
                  className="flex-1 btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {replying ? 'Sending...' : 'Send Reply'}
                </button>
                <button onClick={() => { setSelected(null); setReplyText(''); }} className="btn-secondary !px-5">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
