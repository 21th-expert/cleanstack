import type { Service, Project, ContactForm } from '../types';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getServices: () => request<Service[]>('/services'),
  getProjects: () => request<Project[]>('/projects'),
  submitContact: (data: ContactForm) =>
    request<{ success: boolean; id: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
