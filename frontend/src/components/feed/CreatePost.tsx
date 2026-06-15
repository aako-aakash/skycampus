'use client'
import { useState, useRef } from 'react'
import { Image as ImageIcon, X, Loader2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { postAPI } from '@/services/api'
import { useAuth } from '@/hooks'
import toast from 'react-hot-toast'

export default function CreatePost() {
  const { user } = useAuth()
  const qc = useQueryClient()
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setImage(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('content', content)
      if (image) fd.append('image', image)
      const tagArr = tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
      tagArr.forEach((t) => fd.append('tags', t))
      await postAPI.create(fd)
      setContent(''); setImage(null); setPreview(null); setTags('')
      qc.invalidateQueries({ queryKey: ['feed'] })
      toast.success('Posted!')
    } catch { toast.error('Failed to post') }
    finally { setLoading(false) }
  }

  return (
    <div className="card p-5">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {user?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?" rows={3}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition text-sm resize-none" />
          {preview && (
            <div className="relative mt-2 rounded-xl overflow-hidden">
              <img src={preview} alt="preview" className="max-h-48 w-full object-cover rounded-xl" />
              <button type="button" onClick={() => { setImage(null); setPreview(null) }}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition">
                <X size={14} />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 mt-3">
            <input value={tags} onChange={(e) => setTags(e.target.value)}
              placeholder="Tags: ai, react (comma separated)"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition" />
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <ImageIcon size={16} />
            </button>
            <button type="submit" disabled={loading || !content.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition">
              {loading ? <Loader2 size={14} className="animate-spin" /> : null}
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
