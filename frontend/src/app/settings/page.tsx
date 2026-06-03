'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchMe } from '@/store/slices/authSlice'
import { userAPI } from '@/services/api'
import { useAuth } from '@/hooks'
import Navbar from '@/components/layout/Navbar'
import { Settings, Save, Loader2, User, Briefcase, Link } from 'lucide-react'
import toast from 'react-hot-toast'
import type { AppDispatch } from '@/store'

export default function SettingsPage() {
  const { user } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const [saving, setSaving] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState<string[]>(user?.skills ?? [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user?.name, bio: user?.bio, university: user?.university, branch: user?.branch, year: user?.year }
  })

  const onSubmit = async (d: any) => {
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(d).forEach(([k, v]) => { if (v) fd.append(k, String(v)) })
      skills.forEach(s => fd.append('skills', s))
      await userAPI.updateProfile(fd)
      await dispatch(fetchMe())
      toast.success('Profile updated!')
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills(p => [...p, skillInput.trim()])
      setSkillInput('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-14 px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6"><Settings size={22} /> Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Personal */}
          <div className="card p-6">
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-5"><User size={16} /> Personal Info</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['name','Full Name'],['bio','Bio']].map(([k,l]) => (
                <div key={k} className={k==='bio'?'col-span-2':''}>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">{l}</label>
                  {k==='bio'
                    ? <textarea {...register(k as any)} rows={3} className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-sky-400 transition resize-none" />
                    : <input {...register(k as any)} className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-sky-400 transition" />
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Academic */}
          <div className="card p-6">
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-5"><Briefcase size={16} /> Academic Info</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['university','University'],['branch','Branch/Major']].map(([k,l]) => (
                <div key={k}>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">{l}</label>
                  <input {...register(k as any)} className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-sky-400 transition" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Year</label>
                <select {...register('year', { valueAsNumber: true })} className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-sky-400 transition">
                  {[1,2,3,4,5,6].map(y => <option key={y} value={y}>Year {y}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card p-6">
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-5">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map(s => (
                <span key={s} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  {s}
                  <button type="button" onClick={() => setSkills(p => p.filter(x => x !== s))} className="opacity-60 hover:opacity-100">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&(e.preventDefault(),addSkill())} placeholder="Add a skill..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-sky-400 transition" />
              <button type="button" onClick={addSkill} className="px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-400 transition">Add</button>
            </div>
          </div>

          <button type="submit" disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold text-sm disabled:opacity-60 hover:opacity-90 transition">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
