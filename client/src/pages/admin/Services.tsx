import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import type { Service } from '../../types';

const emptyForm = { title: '', description: '', techStack: '', order: '0' };

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get<Service[]>('/admin/services')
      .then(r => setServices(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(''); setError(''); setModal('create'); };
  const openEdit = (item: Service) => {
    setForm({
      title: item.title,
      description: item.description,
      techStack: item.techStack.join(', '),
      order: String(item.order ?? 0),
    });
    setEditId(item.id);
    setError('');
    setModal('edit');
  };

  const save = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required');
      return;
    }

    setSaving(true);
    setError('');
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };

    try {
      if (modal === 'create') await api.post('/admin/services', payload);
      else await api.put(`/admin/services/${editId}`, payload);
      setModal(null);
      load();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await api.delete(`/admin/services/${id}`);
    load();
  };

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>Services</h1>
            <p className="text-[14px] text-muted mt-1">Manage the services shown on the public site.</p>
          </div>
          <button onClick={openCreate} className="btn-primary !px-4 !py-2.5 !text-[14px]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            New Service
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
                  {['Title', 'Description', 'Tech Stack', 'Order', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((service, i) => (
                  <tr key={service.id} className="border-b transition-colors"
                    style={{ borderColor: 'var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-3)' }}>
                    <td className="px-5 py-3.5 font-semibold" style={{ color: 'var(--text)' }}>{service.title}</td>
                    <td className="px-5 py-3.5 text-muted max-w-xs truncate">{service.description}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {service.techStack.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-semibold" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted">{service.order}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(service)}
                          className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                          style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>Edit</button>
                        <button onClick={() => remove(service.id)}
                          className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                          style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-muted text-[14px]">No services yet. Create one to publish it publicly.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="w-full max-w-xl rounded-2xl p-7 shadow-2xl" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>
                {modal === 'create' ? 'New Service' : 'Edit Service'}
              </h2>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-slate-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Title *', key: 'title', placeholder: 'Service title' },
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
                  placeholder="Service description..." rows={4} className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>Order</label>
                <input value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                  placeholder="0" type="number" className="input-field" />
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
