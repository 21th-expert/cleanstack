import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import type { TeamMember, ValueItem } from '../../types';

const emptyTeam = { name: '', role: '', photoUrl: '', order: '0' };
const emptyValue = { icon: '', title: '', body: '', order: '0' };

export default function AdminAbout() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [values, setValues] = useState<ValueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamModal, setTeamModal] = useState<'create' | 'edit' | null>(null);
  const [valueModal, setValueModal] = useState<'create' | 'edit' | null>(null);
  const [teamForm, setTeamForm] = useState(emptyTeam);
  const [valueForm, setValueForm] = useState(emptyValue);
  const [editTeamId, setEditTeamId] = useState('');
  const [editValueId, setEditValueId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([
      api.get<TeamMember[]>('/admin/team'),
      api.get<ValueItem[]>('/admin/values'),
    ])
      .then(([teamRes, valuesRes]) => {
        setTeam(teamRes.data);
        setValues(valuesRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openTeamCreate = () => { setTeamForm(emptyTeam); setEditTeamId(''); setError(''); setTeamModal('create'); };
  const openTeamEdit = (member: TeamMember) => {
    setTeamForm({ name: member.name, role: member.role, photoUrl: member.photoUrl || '', order: String(member.order ?? 0) });
    setEditTeamId(member.id);
    setError('');
    setTeamModal('edit');
  };

  const openValueCreate = () => { setValueForm(emptyValue); setEditValueId(''); setError(''); setValueModal('create'); };
  const openValueEdit = (value: ValueItem) => {
    setValueForm({ icon: value.icon || '', title: value.title, body: value.body, order: String(value.order ?? 0) });
    setEditValueId(value.id);
    setError('');
    setValueModal('edit');
  };

  const saveTeam = async () => {
    if (!teamForm.name.trim() || !teamForm.role.trim()) {
      setError('Name and role are required');
      return;
    }

    setSaving(true);
    setError('');
    const payload = {
      name: teamForm.name.trim(),
      role: teamForm.role.trim(),
      photoUrl: teamForm.photoUrl.trim() || null,
      order: Number(teamForm.order) || 0,
    };

    try {
      if (teamModal === 'create') await api.post('/admin/team', payload);
      else await api.put(`/admin/team/${editTeamId}`, payload);
      setTeamModal(null);
      load();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const saveValue = async () => {
    if (!valueForm.title.trim() || !valueForm.body.trim()) {
      setError('Title and body are required');
      return;
    }

    setSaving(true);
    setError('');
    const payload = {
      icon: valueForm.icon.trim() || '◆',
      title: valueForm.title.trim(),
      body: valueForm.body.trim(),
      order: Number(valueForm.order) || 0,
    };

    try {
      if (valueModal === 'create') await api.post('/admin/values', payload);
      else await api.put(`/admin/values/${editValueId}`, payload);
      setValueModal(null);
      load();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const deleteTeam = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    await api.delete(`/admin/team/${id}`);
    load();
  };

  const deleteValue = async (id: string) => {
    if (!confirm('Delete this value?')) return;
    await api.delete(`/admin/values/${id}`);
    load();
  };

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-[24px] font-bold" style={{ color: 'var(--text)' }}>Team & Values</h1>
          <p className="text-[14px] text-muted mt-1">Manage your team members and company values.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-10">
            <section className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[18px] font-semibold" style={{ color: 'var(--text)' }}>Team members</h2>
                  <p className="text-[13px] text-muted mt-1">The team shown on the about page.</p>
                </div>
                <button onClick={openTeamCreate} className="btn-primary !px-4 !py-2.5 !text-[14px]">New member</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-3)' }}>
                      {['Name', 'Role', 'Photo URL', 'Order', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((member, i) => (
                      <tr key={member.id} className="border-b" style={{ borderColor: 'var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-3)' }}>
                        <td className="px-4 py-3.5 font-semibold" style={{ color: 'var(--text)' }}>{member.name}</td>
                        <td className="px-4 py-3.5 text-muted">{member.role}</td>
                        <td className="px-4 py-3.5 text-muted truncate max-w-xs">{member.photoUrl || '—'}</td>
                        <td className="px-4 py-3.5 text-muted">{member.order}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openTeamEdit(member)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>Edit</button>
                            <button onClick={() => deleteTeam(member.id)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {team.length === 0 && (
                      <tr><td colSpan={5} className="px-4 py-12 text-center text-muted text-[14px]">No team members defined yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[18px] font-semibold" style={{ color: 'var(--text)' }}>Values</h2>
                  <p className="text-[13px] text-muted mt-1">Company values shown on the about page.</p>
                </div>
                <button onClick={openValueCreate} className="btn-primary !px-4 !py-2.5 !text-[14px]">New value</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-3)' }}>
                      {['Icon', 'Title', 'Body', 'Order', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {values.map((value, i) => (
                      <tr key={value.id} className="border-b" style={{ borderColor: 'var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-3)' }}>
                        <td className="px-4 py-3.5 font-semibold" style={{ color: 'var(--text)' }}>{value.icon}</td>
                        <td className="px-4 py-3.5 text-muted">{value.title}</td>
                        <td className="px-4 py-3.5 text-muted truncate max-w-xs">{value.body}</td>
                        <td className="px-4 py-3.5 text-muted">{value.order}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openValueEdit(value)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>Edit</button>
                            <button onClick={() => deleteValue(value.id)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {values.length === 0 && (
                      <tr><td colSpan={5} className="px-4 py-12 text-center text-muted text-[14px]">No values defined yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </main>

      {(teamModal || valueModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={e => { if (e.target === e.currentTarget) { setTeamModal(null); setValueModal(null); } }}>
          <div className="w-full max-w-xl rounded-2xl p-7 shadow-2xl" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>
                {teamModal ? (teamModal === 'create' ? 'New team member' : 'Edit team member') : valueModal ? (valueModal === 'create' ? 'New value' : 'Edit value') : ''}
              </h2>
              <button onClick={() => { setTeamModal(null); setValueModal(null); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-slate-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-4">
              {teamModal ? (
                <>
                  {[
                    { label: 'Name *', key: 'name', placeholder: 'Full name' },
                    { label: 'Role *', key: 'role', placeholder: 'Role or title' },
                    { label: 'Photo URL', key: 'photoUrl', placeholder: 'https://...' },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>{label}</label>
                      <input value={teamForm[key as keyof typeof teamForm]} onChange={e => setTeamForm(f => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder} className="input-field" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>Order</label>
                    <input type="number" value={teamForm.order} onChange={e => setTeamForm(f => ({ ...f, order: e.target.value }))} className="input-field" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>Icon</label>
                    <input value={valueForm.icon} onChange={e => setValueForm(f => ({ ...f, icon: e.target.value }))} placeholder="◆" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>Title *</label>
                    <input value={valueForm.title} onChange={e => setValueForm(f => ({ ...f, title: e.target.value }))} placeholder="Value title" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>Body *</label>
                    <textarea value={valueForm.body} onChange={e => setValueForm(f => ({ ...f, body: e.target.value }))} rows={4} placeholder="Value description" className="input-field resize-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>Order</label>
                    <input type="number" value={valueForm.order} onChange={e => setValueForm(f => ({ ...f, order: e.target.value }))} className="input-field" />
                  </div>
                </>
              )}
            </div>

            {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button onClick={() => { setTeamModal(null); setValueModal(null); }} className="flex-1 btn-secondary justify-center">Cancel</button>
              <button onClick={teamModal ? saveTeam : saveValue} disabled={saving} className="flex-1 btn-primary justify-center disabled:opacity-50">
                {saving ? 'Saving...' : teamModal ? (teamModal === 'create' ? 'Create member' : 'Save member') : valueModal ? (valueModal === 'create' ? 'Create value' : 'Save value') : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
