import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';

interface Project {
  id: string; name: string; description: string;
  techStack: string[]; imageUrl?: string; projectUrl?: string; createdAt: string;
}

const emptyForm = { name: '', description: '', techStack: '', imageUrl: '', projectUrl: '' };

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/admin/projects')
      .then(r => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setError(''); setModal('create'); };
  const openEdit = (p: Project) => {
    setForm({ name: p.name, description: p.description, techStack: p.techStack.join(', '), imageUrl: p.imageUrl || '', projectUrl: p.projectUrl || '' });
    setEditId(p.id); setError(''); setModal('edit');
  };

  const save = async () => {
    if (!form.name.trim() || !form.description.trim()) { setError('Name and description are required'); return; }
    setSaving(true); setError('');
    const payload = { ...form, techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (modal === 'create') await api.post('/admin/projects', payload);
      else await api.put(`/admin/projects/${editId}`, payload);
      setModal(null); load();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Save failed');
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/admin/projects/${id}`);
    load();
  };

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>Projects</h1>
            <p className="text-[14px] text-muted mt-1">{projects.length} total</p>
          </div>
          <button onClick={openCreate} className="btn-primary !px-4 !py-2.5 !text-[14px]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            New Project
          </button>
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
                  {['Name', 'Description', 'Tech Stack', 'URL', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={p.id} className="border-b transition-colors"
                    style={{ borderColor: 'var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-3)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'var(--bg-3)')}>
                    <td className="px-5 py-3.5 font-semibold" style={{ color: 'var(--text)' }}>{p.name}</td>
                    <td className="px-5 py-3.5 text-muted max-w-xs truncate">{p.description}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.techStack.slice(0, 3).map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                            style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>{t}</span>
                        ))}
                        {p.techStack.length > 3 && <span className="text-[11px] text-muted">+{p.techStack.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {p.projectUrl ? (
                        <a href={p.projectUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[13px] text-indigo-500 hover:underline truncate block max-w-[120px]">
                          {p.projectUrl.replace(/^https?:\/\//, '')}
                        </a>
                      ) : <span className="text-muted text-[13px]">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(p)}
                          className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                          style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>Edit</button>
                        <button onClick={() => remove(p.id)}
                          className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                          style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-muted text-[14px]">No projects yet. Create your first one.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="w-full max-w-lg rounded-2xl p-7 shadow-2xl" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>
                {modal === 'create' ? 'New Project' : 'Edit Project'}
              </h2>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-slate-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Name *', key: 'name', placeholder: 'Project name' },
                { label: 'Image URL', key: 'imageUrl', placeholder: 'https://...' },
                { label: 'Project URL', key: 'projectUrl', placeholder: 'https://...' },
                { label: 'Tech Stack (comma separated)', key: 'techStack', placeholder: 'React, Node.js, TypeScript' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>{label}</label>
                  <input value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder} className="input-field" />
                </div>
              ))}
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>Description *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Project description..." rows={3} className="input-field resize-none" />
              </div>
            </div>

            {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 btn-secondary justify-center">Cancel</button>
              <button onClick={save} disabled={saving} className="flex-1 btn-primary justify-center disabled:opacity-50">
                {saving ? 'Saving...' : modal === 'create' ? 'Create' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
