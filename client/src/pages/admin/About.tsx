import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import type { TeamMember, ValueItem } from '../../types';

const emptyTeam = { name: '', role: '', photoUrl: '', portfolioUrl: '', githubUrl: '', order: '0' };
const emptyValue = { icon: '', title: '', body: '', order: '0' };
const defaultValueIcon = '*';

const SummaryCard = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl border p-4" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
    <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
    <p className="mt-2 text-[28px] font-bold" style={{ color: 'var(--text)' }}>{value}</p>
  </div>
);

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
    setError('');
    Promise.all([
      api.get<TeamMember[]>('/admin/team'),
      api.get<ValueItem[]>('/admin/values'),
    ])
      .then(([teamRes, valuesRes]) => {
        setTeam(teamRes.data);
        setValues(valuesRes.data);
      })
      .catch((e: any) => {
        console.error(e);
        setError(e.response?.data?.error || 'Failed to load team and values');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const closeModal = () => {
    setTeamModal(null);
    setValueModal(null);
    setSaving(false);
    setError('');
  };

  const openTeamCreate = () => {
    setTeamForm(emptyTeam);
    setEditTeamId('');
    setError('');
    setTeamModal('create');
  };

  const openTeamEdit = (member: TeamMember) => {
    setTeamForm({ name: member.name, role: member.role, photoUrl: member.photoUrl || '', portfolioUrl: member.portfolioUrl || '', githubUrl: member.githubUrl || '', order: String(member.order ?? 0) });
    setEditTeamId(member.id);
    setError('');
    setTeamModal('edit');
  };

  const openValueCreate = () => {
    setValueForm(emptyValue);
    setEditValueId('');
    setError('');
    setValueModal('create');
  };

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
      portfolioUrl: teamForm.portfolioUrl.trim() || null,
      githubUrl: teamForm.githubUrl.trim() || null,
      order: Number(teamForm.order) || 0,
    };

    try {
      if (teamModal === 'create') await api.post('/admin/team', payload);
      else await api.put(`/admin/team/${editTeamId}`, payload);
      closeModal();
      load();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Save failed');
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
      icon: valueForm.icon.trim() || defaultValueIcon,
      title: valueForm.title.trim(),
      body: valueForm.body.trim(),
      order: Number(valueForm.order) || 0,
    };

    try {
      if (valueModal === 'create') await api.post('/admin/values', payload);
      else await api.put(`/admin/values/${editValueId}`, payload);
      closeModal();
      load();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Save failed');
      setSaving(false);
    }
  };

  const deleteTeam = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    setError('');
    try {
      await api.delete(`/admin/team/${id}`);
      load();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Delete failed');
    }
  };

  const deleteValue = async (id: string) => {
    if (!confirm('Delete this value?')) return;
    setError('');
    try {
      await api.delete(`/admin/values/${id}`);
      load();
    } catch (e: any) {
      setError(e.response?.data?.error || 'Delete failed');
    }
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
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard label="Team members" value={team.length} />
              <SummaryCard label="Values" value={values.length} />
              <SummaryCard label="About page items" value={team.length + values.length} />
            </section>

            <section className="card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: 'var(--text)' }}>Current database content</h2>
                <p className="text-[13px] text-muted mt-1">Everything listed here is what the admin panel will use for the public About page.</p>
              </div>
              <button onClick={load} className="btn-secondary justify-center !px-4 !py-2.5 !text-[14px]">
                Refresh data
              </button>
            </section>

            {error && (
              <section className="rounded-2xl border px-4 py-3 text-[14px]" style={{ borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.06)', color: '#dc2626' }}>
                {error}
              </section>
            )}

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
                      {['Name', 'Role', 'Photo URL', 'Portfolio URL', 'GitHub URL', 'Order', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[12px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((member, i) => (
                      <tr key={member.id} className="border-b" style={{ borderColor: 'var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-3)' }}>
                        <td className="px-4 py-3.5 font-semibold" style={{ color: 'var(--text)' }}>{member.name}</td>
                        <td className="px-4 py-3.5 text-muted">{member.role}</td>
                        <td className="px-4 py-3.5 text-muted truncate max-w-xs">{member.photoUrl || '-'}</td>
                        <td className="px-4 py-3.5 text-muted truncate max-w-xs">{member.portfolioUrl || '-'}</td>
                        <td className="px-4 py-3.5 text-muted truncate max-w-xs">{member.githubUrl || '-'}</td>
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
                      <tr><td colSpan={7} className="px-4 py-12 text-center text-muted text-[14px]">No team members defined yet.</td></tr>
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

            <section className="card p-6">
              <div className="mb-6">
                <h2 className="text-[18px] font-semibold" style={{ color: 'var(--text)' }}>Public preview</h2>
                <p className="text-[13px] text-muted mt-1">This is how your current team and values will appear on the public About page.</p>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text)' }}>Values preview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {values.map((value) => (
                      <div key={value.id} className="rounded-3xl border p-6" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
                        <div className="text-3xl mb-4">{value.icon}</div>
                        <h4 className="font-semibold text-[16px] mb-2" style={{ color: 'var(--text)' }}>{value.title}</h4>
                        <p className="text-[14px] text-muted leading-relaxed">{value.body}</p>
                      </div>
                    ))}
                    {values.length === 0 && (
                      <div className="rounded-3xl border p-6 text-[14px] text-muted" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
                        No values to preview yet.
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--text)' }}>Team preview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {team.map((member, i) => {
                      const photo = member.photoUrl;
                      return (
                        <div key={`${member.name}-${member.role}-${i}`} className="rounded-3xl overflow-hidden border" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
                          <div className="w-full h-48 overflow-hidden bg-[var(--bg-3)] flex items-center justify-center">
                            {photo ? (
                              <img src={photo} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-[32px] font-semibold" style={{ color: 'var(--text)' }}>
                                {member.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <p className="font-semibold text-[16px]" style={{ color: 'var(--text)' }}>{member.name}</p>
                            <p className="text-[14px] text-muted mt-1 leading-relaxed">{member.role}</p>
                          </div>
                        </div>
                      );
                    })}
                    {team.length === 0 && (
                      <div className="rounded-3xl border p-6 text-[14px] text-muted" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
                        No team members to preview yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {(teamModal || valueModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="w-full max-w-xl rounded-2xl p-7 shadow-2xl" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold" style={{ color: 'var(--text)' }}>
                {teamModal ? (teamModal === 'create' ? 'New team member' : 'Edit team member') : valueModal ? (valueModal === 'create' ? 'New value' : 'Edit value') : ''}
              </h2>
              <button onClick={closeModal} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-slate-100 transition-colors">
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
                    { label: 'Portfolio URL', key: 'portfolioUrl', placeholder: 'https://...' },
                    { label: 'GitHub URL', key: 'githubUrl', placeholder: 'https://...' },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#6366f1' }}>{label}</label>
                      <input
                        value={teamForm[key as keyof typeof teamForm]}
                        onChange={e => setTeamForm(f => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="input-field"
                      />
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
                    <input value={valueForm.icon} onChange={e => setValueForm(f => ({ ...f, icon: e.target.value }))} placeholder={defaultValueIcon} className="input-field" />
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
              <button onClick={closeModal} className="flex-1 btn-secondary justify-center">Cancel</button>
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
