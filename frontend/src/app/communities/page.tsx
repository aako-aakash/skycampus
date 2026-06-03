'use client'
import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { communityAPI } from '@/services/api'
import Navbar from '@/components/layout/Navbar'
import { Users, Plus, Search, Lock, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Community } from '@/types'

export default function CommunitiesPage() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ name: '', slug: '', description: '', tags: '' })
  const [creating, setCreating] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['communities'],
    queryFn: async () => { const { data } = await communityAPI.getAll(); return data.data as { data: Community[] } },
  })

  const communities = data?.data ?? []
  const filtered = search ? communities.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : communities

  const handleJoin = async (id: string) => {
    try { await communityAPI.join(id); qc.invalidateQueries({ queryKey: ['communities'] }); toast.success('Joined!') }
    catch { toast.error('Failed') }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setCreating(true)
    try {
      await communityAPI.create({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) })
      qc.invalidateQueries({ queryKey: ['communities'] })
      toast.success('Community created!')
      setShowCreate(false)
      setForm({ name: '', slug: '', description: '', tags: '' })
    } catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setCreating(false) }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-14 px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Users size={22} /> Communities</h1>
            <p className="text-sm text-slate-500 mt-1">Join groups, clubs and study communities</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold hover:opacity-90 transition">
            <Plus size={16} /> Create
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-6">
          <Search size={15} className="text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search communities..."
            className="flex-1 text-sm bg-transparent outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400" />
        </div>

        {isLoading && <div className="flex justify-center py-12"><Loader2 className="animate-spin text-sky-500" size={28} /></div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(c => (
            <div key={c.id} className="card p-5 hover:border-sky-300 dark:hover:border-sky-700 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                    {c.avatar ? <img src={c.avatar} alt={c.name} className="w-full h-full rounded-2xl object-cover" /> : c.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {c.name} {c.isPrivate && <Lock size={12} className="text-slate-400" />}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1"><Users size={11} /> {c.memberCount} members</div>
                  </div>
                </div>
                <button onClick={() => handleJoin(c.id)}
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition border border-sky-200 dark:border-sky-800">
                  Join
                </button>
              </div>
              {c.description && <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{c.description}</p>}
              {c.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.slice(0, 4).map(t => <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">#{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Create modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-700 shadow-2xl">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Create Community</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                {(['name','slug','description'] as const).map(f => (
                  <div key={f}>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 capitalize">{f}</label>
                    <input value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-sky-400 transition" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-sky-400 transition" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">Cancel</button>
                  <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition">
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
