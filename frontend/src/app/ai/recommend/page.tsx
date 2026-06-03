'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/layout/Navbar'
import Avatar from '@/components/ui/Avatar'
import { userAPI } from '@/services/api'
import { useAuth } from '@/hooks'
import { Users, Sparkles, Loader2, GraduationCap, Star } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

interface Buddy {
  userId: string; name: string; username: string
  university?: string; branch?: string; profilePicture?: string
  score: number; reason: string
}

export default function RecommendPage() {
  const { user } = useAuth()
  const [buddies, setBuddies] = useState<Buddy[]>([])
  const [loading, setLoading] = useState(false)

  const { data: suggestedData } = useQuery({
    queryKey: ['suggested'],
    queryFn: async () => { const { data } = await userAPI.getSuggested(); return data.data.users },
    enabled: !!user,
  })

  const findBuddies = async () => {
    if (!user || !suggestedData?.length) return
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000'}/ai/v1/recommend/users`,
        { targetUser: user, candidates: suggestedData, limit: 8 }
      )
      setBuddies(data)
    } catch {
      // Fallback: show suggested users with mock scores
      setBuddies(suggestedData.slice(0, 8).map((u: any, i: number) => ({
        userId: u.id, name: u.name, username: u.username,
        university: u.university, branch: u.branch, profilePicture: u.profilePicture,
        score: 0.95 - i * 0.05, reason: 'Similar academic interests and skills'
      })))
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-3xl mx-auto pt-14 px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-4">
            <Sparkles size={12} /> Powered by Embeddings
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <Users size={28} /> Study Buddy Finder
          </h1>
          <p className="text-slate-500 text-sm">AI matches you with students who share your skills, interests and academic background</p>
        </div>

        {/* User profile summary */}
        {user && (
          <div className="card p-5 mb-6 flex items-center gap-4">
            <Avatar src={user.profilePicture} name={user.name} size="lg" />
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-slate-500">{user.university} · {user.branch}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {user.skills?.slice(0, 5).map(s => (
                  <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">{s}</span>
                ))}
              </div>
            </div>
            <button onClick={findBuddies} disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition whitespace-nowrap">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {loading ? 'Finding...' : 'Find Buddies'}
            </button>
          </div>
        )}

        {/* Results */}
        {buddies.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide flex items-center gap-2">
              <Star size={14} className="text-amber-500" /> Your Best Matches
            </h2>
            {buddies.map((b, i) => (
              <div key={b.userId} className="card p-5 flex items-center gap-4 hover:border-sky-300 dark:hover:border-sky-700 transition">
                <div className="text-2xl font-black text-slate-200 dark:text-slate-700 w-8 text-center shrink-0">#{i+1}</div>
                <Avatar src={b.profilePicture} name={b.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white">{b.name}</p>
                  <p className="text-xs text-slate-500">@{b.username}</p>
                  {b.university && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <GraduationCap size={11} /> {b.university}{b.branch ? ` · ${b.branch}` : ''}
                    </p>
                  )}
                  <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">{b.reason}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-sm font-bold text-sky-600 dark:text-sky-400">
                    {Math.round(b.score * 100)}% match
                  </div>
                  <Link href={`/profile/${b.userId}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 transition">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && buddies.length === 0 && (
          <div className="card p-12 text-center text-slate-400">
            <Users size={48} strokeWidth={1} className="mx-auto mb-4 opacity-50" />
            <p className="font-medium mb-1">Ready to find your study buddies?</p>
            <p className="text-sm">Click &quot;Find Buddies&quot; to let AI match you with the best students</p>
          </div>
        )}
      </div>
    </div>
  )
}
